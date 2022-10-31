import React, { useCallback, useEffect, useState } from 'react';
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
  Stack,
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
import { TransitionProps } from '@mui/material/transitions';
import { IDistrict, IProvince, IUser, IWard } from '../../interfaces/interface';
import * as areaService from '../../services/areaService';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { format } from '../../utils/formatTime';
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
  margin: 8px 0px;
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

interface IGender {
  id: number;
  name: string;
}
interface ILevel {
  id: number;
  name: string;
}
const levels: ILevel[] = [
  {
    id: 0,
    name: 'User'
  },
  {
    id: 1,
    name: 'Admin'
  }
];
const genders: IGender[] = [
  {
    id: 0,
    name: 'Nữ'
  },
  {
    id: 1,
    name: 'Nam'
  },
  {
    id: 2,
    name: 'Other'
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
    headerName: 'Họ và tên',
    minWidth: 400,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'email',
    headerName: 'Email',
    minWidth: 400,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'identifyCard',
    headerName: 'CMND/CCCD',
    minWidth: 350,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'gender',
    headerName: 'Giới tính',
    type: 'string',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: any) => {
      const gender = genders.find((item) => item.id === params.row.gender);
      return gender?.name;
    }
  }
];
interface IFormEdit {
  id: number;
  name: string;
  email: string;
  birthday: Date;
  identifyCard: string;
  gender: number;
  genderName: string;
  province: string;
  district: string;
  ward: string;
  wardId: number;
  type: number;
  level: string;
}
const schema = yup
  .object({
    name: yup.string().required('Tên không được để trống').trim(),
    identifyCard: yup
      .string()
      .required('CCCD là bắt buộc')
      .matches(/^[0-9]+$/, 'CMND phải là dạng số ')
      .matches(/^(\d{9}|\d{12})$/, 'CMND chỉ chứa 9 hoặc 12 số'),
    gender: yup.number().required(),
    email: yup.string().email().required(),
    genderName: yup.string().required('Giới tính không để trống'),
    province: yup.string().required().trim('Tỉnh không để trống'),
    district: yup.string().required().trim('Huyện không để trống'),
    ward: yup.string().required().trim('Xã không để trống'),
    wardId: yup.number().required().min(1),
    id: yup.number().required()
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
const Account = () => {
  const axiosToken = useAxiosPrivate();
  const [name, setName] = useState<string>('');
  const [totalAccounts, setTotalAccounts] = useState<Partial<IUser>[]>([]);
  const [accounts, setAccounts] = useState<Partial<IUser>[]>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [rowSelected, setRowSelected] = useState<Partial<IUser>>();
  const [open, setOpen] = React.useState<boolean>(false);
  const [provinceSelect, setProvinceSelect] = useState<IProvince>();
  const [districtSelect, setDistrictSelect] = useState<IDistrict>();
  const [wardSelect, setWardSelect] = useState<IWard>();
  const [genderSelect, setGenderSelect] = useState<IGender>();
  const [levelSelect, setLevelSelect] = useState<ILevel>();
  const [provinces, setProvinces] = useState<IProvince[]>([]);
  const [districts, setDistricts] = useState<IDistrict[]>([]);
  const [wards, setWards] = useState<IWard[]>([]);
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
      birthday: format(Date()),
      id: 0,
      name: rowSelected?.name,
      identifyCard: rowSelected?.identifyCard,
      email: rowSelected?.email,
      genderName: '',
      gender: 0,
      province: '',
      district: '',
      ward: '',
      wardId: 0
    }
  });
  const province = watch('province');
  const district = watch('district');
  const ward = watch('ward');
  const genderName = watch('genderName');

  const setData = useCallback(() => {
    if (rowSelected) {
      const user = rowSelected as IUser;
      setValue('id', user.id);
      setValue('birthday', user.birthday);
      setValue('name', user.name);
      setValue('identifyCard', user.identifyCard);
      setValue('email', user.email);
      const gender = genders.find((item) => item.id === user.gender);
      if (gender) {
        setValue('gender', gender.id);
        setValue('genderName', gender.name);
      }
      const province = user.ward?.district?.province;
      if (province) {
        setProvinceSelect(province);
      }
      const district = user.ward?.district;
      if (district) {
        setDistrictSelect(district);
      }
      const ward = user.ward;
      if (ward) {
        setWardSelect(ward);
      }
    }
  }, [rowSelected, setValue]);
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await axiosToken.get<Partial<IUser>[]>('users');
        setAccounts(res.data);
        setTotalAccounts(res.data);
      } catch (error) {
        throw new Error();
      }
    };
    const fetchProvinces = async () => {
      const res = await areaService.findAllProvinces();
      setProvinces(res);
    };
    fetchAccounts();
    fetchProvinces();
  }, [axiosToken]);

  useEffect(() => {
    if (provinceSelect) {
      setValue('district', '');
      setValue('ward', '');
      setValue('wardId', 0);
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
      setValue('wardId', 0);
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
      setData();
    }
  }, [rowSelected, setData]);
  useEffect(() => {
    if (genderSelect) {
      setValue('gender', genderSelect.id);
      setValue('genderName', genderSelect.name);
    }
  }, [genderSelect, setValue]);
  useEffect(() => {
    if (levelSelect) {
      setValue('type', levelSelect.id);
      setValue('level', setLevelSelect.name);
    }
  }, [levelSelect, setValue]);
  const handleClickOpen = (param: Partial<IUser>) => {
    setRowSelected(param);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmitSearch = () => {
    const research = totalAccounts.filter((item) =>
      item.name?.toLocaleLowerCase()?.includes(name.toLocaleLowerCase())
    );
    setAccounts(research);
  };
  useEffect(() => {
    if (name === '') {
      setAccounts(totalAccounts);
    }
  }, [name, totalAccounts]);
  const onUpdateUser: SubmitHandler<Partial<IFormEdit>> = async (data) => {
    try {
      const {
        id,
        province,
        ward,
        district,
        email,
        level,
        genderName,
        ...rest
      } = data;
      const updated = await axiosToken.patch<Partial<IUser>>(
        `users/${id}`,
        rest
      );
      if (updated) {
        const newAccounts = accounts.map((item) => {
          if (item.id === updated.data.id) {
            item = {
              ...item,
              ...updated.data
            };
          }
          return item;
        });
        setAccounts(newAccounts);
        setEdit(false);
        setOpen(false);
        alert('Cap nhat thanh cong');
      }
    } catch (error) {
      alert('Cap nhat that bai');
    }
  };
  return (
    <Wrapper>
      <Container>
        <Row>
          <ComponentInput>
            <FormControl>
              <TextField
                onChange={(e: any) => {
                  setName(e.target.value as string);
                }}
                size="small"
                placeholder="Tên"
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
            onRowClick={(param) => handleClickOpen(param.row as Partial<IUser>)}
            autoPageSize
            autoHeight
            rows={accounts}
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
              <Form onSubmit={handleSubmit(onUpdateUser)}>
                <DialogContent>
                  <HeaderForm>
                    <Title>
                      <Typography variant="h6" component={'h6'}>
                        Cập nhật thông tin
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
                    <Input>
                      <Typography>Họ và tên</Typography>
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
                      <Typography>CMND/CCCD</Typography>
                      <FormControl fullWidth>
                        <TextField
                          inputProps={{ readOnly: !edit }}
                          {...register('identifyCard')}
                          size="small"
                        />
                      </FormControl>
                    </Input>
                    <Input>
                      <Typography>Email</Typography>
                      <FormControl fullWidth>
                        <TextField
                          error={!!errors.email}
                          helperText={errors.email?.message}
                          inputProps={{ readOnly: true }}
                          {...register('email')}
                          size="small"
                        />
                      </FormControl>
                    </Input>
                    <Input>
                      <Typography>Giới tính</Typography>
                      <FormControl fullWidth>
                        <Autocomplete
                          readOnly={!edit}
                          disablePortal
                          options={genders}
                          inputValue={genderName}
                          onChange={(event, value) => {
                            setGenderSelect(value as IGender);
                          }}
                          getOptionLabel={(option) => option.name}
                          isOptionEqualToValue={() => true}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              {...register('genderName')}
                              size="small"
                              placeholder="Giới tính"
                            />
                          )}
                        />
                      </FormControl>
                    </Input>
                    <Input>
                      <Typography>Ngày sinh</Typography>
                      <FormControl fullWidth>
                        <Stack
                          sx={{
                            width: '100%',
                            height: '50px',
                            textAlign: 'left'
                          }}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              readOnly={!edit}
                              disableFuture
                              openTo="year"
                              views={['year', 'month', 'day']}
                              value={watch('birthday') || rowSelected?.birthday}
                              onChange={(date: any) => {
                                setValue('birthday', format(date));
                              }}
                              renderInput={(params: any) => {
                                return <TextField {...params} size="small" />;
                              }}
                            />
                          </LocalizationProvider>
                        </Stack>
                      </FormControl>
                    </Input>
                    <Input>
                      <Typography>Tỉnh/Thành phố</Typography>
                      <FormControl fullWidth>
                        <Autocomplete
                          readOnly={!edit}
                          disablePortal
                          options={provinces}
                          onChange={(event, value) =>
                            setProvinceSelect(value as IProvince)
                          }
                          inputValue={province}
                          getOptionLabel={(option) => option.name}
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
                      </FormControl>
                    </Input>
                    <Input>
                      <Typography>Quận/Huyện</Typography>
                      <FormControl fullWidth>
                        <Autocomplete
                          readOnly={!edit || province === ''}
                          disablePortal
                          options={districts}
                          inputValue={district}
                          // defaultValue={currentUser.ward?.district}
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
                      </FormControl>
                    </Input>
                    <Input>
                      <Typography>Xã/Phường</Typography>
                      <FormControl fullWidth>
                        <Autocomplete
                          disablePortal
                          readOnly={!edit || district === ''}
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
                      </FormControl>
                    </Input>
                    <Input>
                      <Typography>Level</Typography>
                      <FormControl fullWidth>
                        <Autocomplete
                          readOnly={!edit}
                          disablePortal
                          options={levels}
                          onChange={(event, value) => {
                            setLevelSelect(value as ILevel);
                          }}
                          getOptionLabel={(option) => option.name}
                          isOptionEqualToValue={() => true}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              {...register('level')}
                              size="small"
                              placeholder="Level"
                            />
                          )}
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

export default Account;
