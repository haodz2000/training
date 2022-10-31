import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  FormControl,
  Pagination,
  PaginationItem,
  Slide,
  TextField,
  Typography
} from '@mui/material';
import { Close, Edit, Search } from '@mui/icons-material';
import {
  DataGrid,
  GridColDef,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector
} from '@mui/x-data-grid';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  ILocation,
  IProvince,
  IWard,
  IDistrict
} from '../../interfaces/interface';
import { TransitionProps } from '@mui/material/transitions';
import { NewLocation } from '../../components/Create';
import * as areaService from '../../services/areaService';
import * as siteService from '../../services/siteService';
import { selectLocation } from '../../features/vaccine/locationSlice';
import { useAppSelector } from '../../app';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Wrapper = styled.div`
  margin-top: 42px;
  width: 100vw;
`;
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #eeeeee;
`;
const Container = styled.div`
  border: 1px solid rgba(38, 56, 150, 0.14);
  max-width: 1440px;
  width: 100%;
  padding: 12px 12px 0;
  margin: 0 auto;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: 50px;
`;
const ComponentInput = styled.div`
  box-sizing: border-box;
  margin-right: 16px;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 12px;
`;
const Form = styled.form`
  width: 100%;
  display: flex;
`;
const ButtonSearch = styled(Button)`
  padding: 8px 16px;
  background: #171a88;
  border-radius: 8px 8px 8px 0px;
  color: #ffffff;
`;
const FormDialog = styled.div`
  width: 444px;
`;
const HeaderForm = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Label = styled.label`
  cursor: pointer;
  &:hover {
    padding: 0 2px;
    background: #d3d3d3;
    border-radius: 50%;
  }
`;
const BodyForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  box-sizing: border-box;
`;
const Input = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 24px;
`;
const FooterForm = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const Cancel = styled(Button)`
  padding: 6px 16px;
  border: 1px solid rgba(63, 81, 181, 0.5);
  color: #3f51b5;
  margin-right: 16px;
  border-radius: 8px 8px 8px 0;
`;
const Save = styled(Button)`
  padding: 6px 16px;
  background: #3f51b5;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12);
  border-radius: 8px 8px 8px 0;
  color: #ffffff;
`;
const Hidden = styled.div`
  display: none;
`;
const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'STT',
    width: 100,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'name',
    headerName: 'Tên điểm tiêm',
    minWidth: 400,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'address',
    headerName: 'Địa chỉ',
    minWidth: 400,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'leader',
    headerName: 'Người đứng đầu cơ sở tiêm chủng',
    type: 'string',
    minWidth: 350,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'table',
    headerName: 'Số bàn tiêm',
    type: 'number',
    headerAlign: 'center',
    align: 'center'
  }
];
function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  return (
    <Pagination
      color="primary"
      page={page + 1}
      count={pageCount}
      // @ts-expect-error
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event: React.ChangeEvent<unknown>, value: number) =>
        apiRef.current.setPage(value - 1)
      }
    />
  );
}
interface IFormEdit {
  id: number;
  name: string;
  address: string;
  leader: string;
  table: number;
  ward: string;
  district: string;
  province: string;
  wardId: number;
}
const schema = yup
  .object({
    name: yup.string().required('Tên địa điểm không được để trống'),
    address: yup.string().required('Địa chỉ không được để trống'),
    leader: yup.string().required('Tên quản lí không được để trống'),
    wardId: yup.number().required().min(1),
    table: yup
      .number()
      .positive('Phai la so lon hon 0')
      .required()
      .min(1, 'Bàn tiêm phải lớn hơn 0')
  })
  .required();
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Location = () => {
  const axiosToken = useAxiosPrivate();
  const newLocation = useAppSelector(selectLocation);
  const [provinceSelect, setProvinceSelect] = useState<IProvince>();
  const [districtSelect, setDistrictSelect] = useState<IDistrict>();
  const [wardSelect, setWardSelect] = useState<IWard>();
  const [provinces, setProvinces] = useState<IProvince[]>([]);
  const [districts, setDistricts] = useState<IDistrict[]>([]);
  const [wards, setWards] = useState<IWard[]>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [location, setLocation] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [totalSites, setTotalSites] = useState<ILocation[]>([]);
  const [sites, setSites] = useState<ILocation[]>([]);
  const [rowSelected, setRowSelected] = useState<Partial<ILocation>>();
  const [open, setOpen] = React.useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isValid, errors }
  } = useForm<IFormEdit>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      province: '',
      district: '',
      ward: ''
    }
  });
  const province = watch('province');
  const district = watch('district');
  const ward = watch('ward');
  useEffect(() => {
    const fetchSites = async () => {
      try {
        const sites = await siteService.findAll();
        setTotalSites(sites);
        setSites(sites);
      } catch (error) {
        throw new Error();
      }
    };
    const fetchProvinces = async () => {
      try {
        const provinces = await areaService.findAllProvinces();
        setProvinces(provinces);
      } catch (error) {
        throw new Error();
      }
    };
    fetchSites();
    fetchProvinces();
  }, []);
  useEffect(() => {
    if (provinceSelect) {
      setValue('district', '');
      setValue('ward', '');
      setValue('province', provinceSelect.name);
      setDistricts([]);
      setWards([]);
      const fetchDistricts = async () => {
        try {
          const districts = await areaService.findDistricts(provinceSelect.id);
          setDistricts(districts);
        } catch (error) {
          throw new Error();
        }
      };
      fetchDistricts();
    }
  }, [provinceSelect, setValue]);
  useEffect(() => {
    if (districtSelect) {
      setValue('district', districtSelect.name);
      setValue('ward', '');
      setWards([]);
      const fetchWards = async () => {
        try {
          const wards = await areaService.findWards(districtSelect.id);
          setWards(wards);
        } catch (error) {
          throw new Error();
        }
      };
      fetchWards();
    }
  }, [districtSelect, setValue]);
  useEffect(() => {
    if (wardSelect) {
      setValue('wardId', wardSelect.id);
      setValue('ward', wardSelect.name);
    }
  }, [wardSelect, setValue]);
  useEffect(() => {
    if (rowSelected) {
      const war = rowSelected.ward;
      const dis = war?.district;
      const pro = war?.district?.province;
      setProvinceSelect(pro);
      setDistrictSelect(dis);
      setWardSelect(war);
      setValue('wardId', rowSelected.wardId as number);
      setValue('id', rowSelected?.id as number);
      setValue('name', rowSelected?.name as string);
      setValue('address', rowSelected?.address as string);
      setValue('leader', rowSelected?.leader as string);
      setValue('table', rowSelected?.table as number);
      setValue('ward', rowSelected?.ward?.name as string);
      setValue('district', rowSelected?.ward?.district?.name as string);
      setValue(
        'province',
        rowSelected?.ward?.district?.province?.name as string
      );
    }
  }, [rowSelected, setValue]);
  useEffect(() => {
    if (newLocation.id) {
      setSites((prev) => [newLocation as ILocation, ...prev]);
    }
  }, [newLocation]);
  useEffect(() => {
    if (location === '' && address === '') {
      setSites(totalSites);
    }
  }, [location, address, totalSites]);
  const handleClickOpen = (param: Partial<ILocation>) => {
    setRowSelected(param);
    setOpen(true);
  };

  const handleClose = () => {
    setEdit(false);
    setOpen(false);
  };
  const onSubmitSearch = () => {
    const res = totalSites
      .filter((item) => {
        return item.name
          .toLocaleLowerCase()
          .includes(location.toLocaleLowerCase());
      })
      .filter((item) => {
        return item.address.includes(address);
      });
    setSites(res);
  };
  const onUpdateLocation: SubmitHandler<Partial<IFormEdit>> = async (data) => {
    try {
      const { ward, district, province, id, ...rest } = data;
      if (id && rest) {
        rest.table as number;
        const res = await axiosToken.post<ILocation>(`sites/${id}`, rest);
        const updatedSite = res.data;
        const result = sites.map((item) => {
          if (item.id === updatedSite.id) {
            item = {
              ...item,
              ...updatedSite
            };
          }
          return item;
        });
        setSites(result);
        setEdit(false);
        setOpen(false);
      }
    } catch (error) {}
  };
  return (
    <Wrapper>
      <NewLocation />
      <Container>
        <Row>
          <ComponentInput>
            <FormControl>
              <TextField
                onChange={(e: any) => setLocation(e.target.value as string)}
                size="small"
                placeholder="Điểm tiêm"
              />
            </FormControl>
          </ComponentInput>
          <ComponentInput>
            <FormControl>
              <TextField
                onChange={(e: any) => setAddress(e.target.value as string)}
                size="small"
                placeholder="Địa chỉ"
              />
            </FormControl>
          </ComponentInput>
          <ComponentInput>
            <ButtonSearch onClick={onSubmitSearch} startIcon={<Search />}>
              <Typography fontWeight={500}>Tìm kiếm</Typography>
            </ButtonSearch>
          </ComponentInput>
        </Row>
        <Divider />
        <Row>
          <DataGrid
            disableColumnMenu
            onRowClick={(param) => handleClickOpen(param.row as ILocation)}
            autoPageSize
            autoHeight
            rows={sites}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            pagination
            components={{ Pagination: CustomPagination }}
          />
        </Row>
        <Row>
          <FormDialog>
            <Dialog
              fullWidth
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description">
              <Form onSubmit={handleSubmit(onUpdateLocation)}>
                <DialogContent>
                  <HeaderForm>
                    <Title>
                      <Typography variant="h6" component={'h6'}>
                        Cập Nhật Điểm Tiêm
                      </Typography>
                      <Label onClick={() => setEdit(!edit)}>
                        <Edit />
                      </Label>
                    </Title>
                    <Label onClick={handleClose}>
                      <Close />
                    </Label>
                  </HeaderForm>
                  <Divider />
                  <BodyForm>
                    <Hidden>
                      <FormControl fullWidth>
                        <TextField
                          inputProps={{ readOnly: true }}
                          {...register('id')}
                          size="small"
                        />
                      </FormControl>
                    </Hidden>
                    <Input>
                      <Typography>Tên điểm tiêm</Typography>
                      <FormControl fullWidth>
                        <TextField
                          error={!!errors.name}
                          helperText={errors.name?.message}
                          inputProps={{ readOnly: !edit }}
                          {...register('name')}
                          size="small"
                        />
                      </FormControl>
                    </Input>
                    <Input>
                      <Typography>Địa chỉ</Typography>
                      <FormControl fullWidth>
                        <TextField
                          error={!!errors.address}
                          helperText={errors.address?.message}
                          inputProps={{ readOnly: !edit }}
                          {...register('address')}
                          size="small"
                        />
                      </FormControl>
                    </Input>{' '}
                    <Input>
                      <Typography>Tỉnh/Thành phố</Typography>
                      <Autocomplete
                        fullWidth
                        readOnly={!edit}
                        disablePortal
                        options={provinces}
                        inputValue={province}
                        getOptionLabel={(option) => option.name}
                        onChange={(event, value) =>
                          setProvinceSelect(value as IProvince)
                        }
                        isOptionEqualToValue={() => true}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            {...register('province')}
                            size="small"
                            placeholder="Tỉnh/Thành phố"
                          />
                        )}
                      />
                    </Input>
                    <Input>
                      <Typography>Quận/Huyện</Typography>
                      <Autocomplete
                        fullWidth
                        readOnly={!!province && !edit}
                        disablePortal
                        options={districts}
                        inputValue={district}
                        onChange={(event, value) =>
                          setDistrictSelect(value as IDistrict)
                        }
                        getOptionLabel={(option) => option.name}
                        isOptionEqualToValue={() => true}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            {...register('district')}
                            size="small"
                            placeholder="Quận/Huyện"
                          />
                        )}
                      />
                    </Input>
                    <Input>
                      <Typography>Xã/Phường</Typography>
                      <Autocomplete
                        fullWidth
                        disablePortal
                        readOnly={!!district && !edit}
                        options={wards}
                        inputValue={ward}
                        onChange={(event, value) =>
                          setWardSelect(value as IWard)
                        }
                        getOptionLabel={(option) => option.name}
                        isOptionEqualToValue={() => true}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            {...register('ward')}
                            size="small"
                            placeholder="Xã/Phường"
                          />
                        )}
                      />
                    </Input>
                    <Input>
                      <Typography>Người đứng đầu cơ sở</Typography>
                      <FormControl fullWidth>
                        <TextField
                          error={!!errors.leader}
                          helperText={errors.leader?.message}
                          inputProps={{ readOnly: !edit }}
                          {...register('leader')}
                          size="small"
                        />
                      </FormControl>
                    </Input>
                    <Input>
                      <Typography>Số bàn tiêm</Typography>
                      <FormControl fullWidth>
                        <TextField
                          error={!!errors.table}
                          helperText={errors.table?.message}
                          inputProps={{ readOnly: !edit }}
                          {...register('table')}
                          size="small"
                        />
                      </FormControl>
                    </Input>
                  </BodyForm>
                  {edit && (
                    <FooterForm>
                      <Cancel onClick={handleClose}>
                        <Typography fontWeight={500}>Hủy bỏ</Typography>
                      </Cancel>
                      <Save disabled={!isValid} type="submit">
                        <Typography fontWeight={500}>Xác nhận</Typography>
                      </Save>
                    </FooterForm>
                  )}
                </DialogContent>
              </Form>
            </Dialog>
          </FormDialog>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default Location;
