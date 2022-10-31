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
  useGridSelector,
  GridValueGetterParams
} from '@mui/x-data-grid';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TransitionProps } from '@mui/material/transitions';
import {
  ISite,
  IVaccine,
  IVaccineRegistrationResponse
} from '../../interfaces/interface';
import { axioInstance } from '../../utils/request/httpRequest';
import { format } from '../../utils/formatTime';
import { SHIFT } from '../../enum/shift.enum';
import { STATUS as ESTATUS } from '../../enum/status.enum';
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
    width: 60,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'name',
    headerName: 'Họ và tên',
    minWidth: 200,
    headerAlign: 'center',
    align: 'center',
    valueGetter: (params: GridValueGetterParams) => params.row.user.name
  },
  {
    field: 'birthday',
    headerName: 'Ngày sinh',
    minWidth: 150,
    headerAlign: 'center',
    align: 'center',
    valueGetter: (params: GridValueGetterParams) => params.row.user.birthday
  },
  {
    field: 'identifyCard',
    headerName: 'Số CMND/CCCD/Mã định danh công dân',
    type: 'string',
    minWidth: 200,
    headerAlign: 'center',
    align: 'center',
    valueGetter: (params: GridValueGetterParams) => params.row.user.identifyCard
  },
  {
    field: 'address',
    headerName: 'Địa chỉ',
    type: 'string',
    minWidth: 200,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'time',
    headerName: 'Ngày đăng kí tiêm',
    minWidth: 200,
    type: 'string',
    headerAlign: 'center',
    align: 'center',
    valueGetter: (params: GridValueGetterParams) => params.row.time
  },
  {
    field: 'shift',
    headerName: 'Buổi tiêm',
    type: 'string',
    minWidth: 200,
    headerAlign: 'center',
    align: 'center',
    valueGetter: (params: GridValueGetterParams) => {
      const shitf = params.row.shift;
      return shitf === SHIFT.BOTH
        ? 'Cả ngày'
        : shitf === SHIFT.AFTERNOON
        ? 'Buổi chiều'
        : 'Buổi sáng';
    }
  },
  {
    field: 'status',
    headerName: 'Trạng thái',
    type: 'string',
    minWidth: 200,
    headerAlign: 'center',
    align: 'center',
    valueGetter: (params: GridValueGetterParams) => {
      const status: number = params.row.status;
      return status === ESTATUS.SUCCESS
        ? 'Thành công'
        : status === ESTATUS.COMPLETED
        ? 'Đã tiêm'
        : 'Hủy';
    }
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
  identifyCard: string;
  address: string;
  time: Date;
  shiftName: string;
  shift: number;
  vaccineId: number;
  vaccine: string;
  siteId: number;
  site: string;
  status: number;
  statusName: string;
}
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
type IStatus = {
  id: number;
  name: string;
};
const STATUS: IStatus[] = [
  {
    id: 0,
    name: 'Hủy'
  },
  {
    id: 1,
    name: 'Thành công'
  },
  {
    id: 2,
    name: 'Đã tiêm'
  }
];
const Register = () => {
  const axiosToken = useAxiosPrivate();
  const [edit, setEdit] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [sites, setSites] = useState<ISite[]>([]);
  const [vaccines, setVaccines] = useState<IVaccine[]>([]);
  const [siteSelect, setSiteSelect] = useState<ISite>();
  const [vaccineSelect, setVaccineSelect] = useState<IVaccine>();
  const [statusSelect, setStatusSelect] = useState<IStatus>();
  const [totalRegisters, setTotalRegisters] = useState<
    IVaccineRegistrationResponse[]
  >([]);
  const [vaccineRegisters, setVaccineRegisters] = useState<
    IVaccineRegistrationResponse[]
  >([]);
  const [rowSelected, setRowSelected] =
    useState<IVaccineRegistrationResponse | null>();
  const [open, setOpen] = React.useState<boolean>(false);
  const { watch, register, handleSubmit, setValue } = useForm<IFormEdit>({
    mode: 'onChange',
    defaultValues: {
      statusName: '',
      vaccine: '',
      site: ''
    }
  });
  const vaccineId = watch('vaccineId');
  const siteId = watch('siteId');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosToken.get<IVaccineRegistrationResponse[]>(
          'vaccine-registrations'
        );
        setVaccineRegisters(res.data);
        setTotalRegisters(res.data);
      } catch (error) {
        throw new Error();
      }
    };
    const fetchSites = async () => {
      try {
        const res = await axiosToken.get<ISite[]>('sites');
        setSites(res.data);
      } catch (error) {
        throw new Error();
      }
    };
    const fetchVaccines = async () => {
      try {
        const res = await axioInstance.get<IVaccine[]>('vaccines');
        setVaccines(res.data);
      } catch (error) {
        throw new Error();
      }
    };
    fetchData();
    fetchSites();
    fetchVaccines();
  }, [axiosToken]);
  const setData = useCallback(() => {
    if (rowSelected) {
      const data = rowSelected;
      if (data.vaccineId) {
        const vaccine = vaccines.find((item) => item.id === data.vaccineId);
        if (vaccine) {
          setValue('vaccine', vaccine?.name + '-' + vaccine?.code);
          setValue('vaccineId', vaccine?.id);
        }
      } else {
        setValue('vaccine', '');
        setValue('vaccineId', 0);
      }
      if (data.siteId) {
        const site = sites.find((item) => item.id === data.siteId);
        if (site) {
          setValue('site', site?.name + '-' + site.ward?.name);
          setValue('siteId', site.id);
        }
      } else {
        setValue('site', '');
        setValue('siteId', 0);
      }
      setValue('id', data.id);
      setValue('name', data?.user?.name as string);
      setValue('address', data?.address as string);
      setValue('identifyCard', data?.user?.identifyCard as string);
      setValue('time', data.time);
      const status = STATUS.find((item) => item.id === data.status);
      if (status) {
        setValue('statusName', status.name);
        setValue('status', status.id);
      }
    }
  }, [rowSelected, setValue, sites, vaccines]);
  useEffect(() => {
    if (rowSelected) {
      setData();
    }
  }, [rowSelected, setData]);
  useEffect(() => {
    if (siteSelect) {
      setValue('site', siteSelect.name + '-' + siteSelect.ward?.name);
      setValue('siteId', siteSelect.id);
    }
  }, [siteSelect, setValue]);
  useEffect(() => {
    if (vaccineSelect) {
      setValue('vaccine', vaccineSelect.name + '-' + vaccineSelect.code);
      setValue('vaccineId', vaccineSelect.id);
    }
  }, [vaccineSelect, setValue]);
  useEffect(() => {
    if (statusSelect) {
      setValue('statusName', statusSelect.name);
      setValue('status', statusSelect.id);
    }
  }, [statusSelect, setValue]);

  useEffect(() => {
    if (vaccineId && siteId) {
      setStatusSelect(STATUS[2]);
    }
  }, [vaccineId, siteId]);

  const handleClickOpen = (raw: IVaccineRegistrationResponse) => {
    setRowSelected(raw);
    setOpen(true);
  };

  const handleClose = () => {
    setEdit(false);
    setOpen(false);
  };
  const onSubmitSearch = () => {
    if (totalRegisters) {
      const res = totalRegisters
        .filter((item) => {
          return item.address?.includes(address);
        })
        .filter((item) => {
          return item.user?.name?.includes(name);
        });
      setVaccineRegisters(res);
    }
  };
  const onUpdateSubmit: SubmitHandler<IFormEdit> = async (data) => {
    const { siteId, vaccineId, status, time, address, id } = data;
    const update = { siteId, vaccineId, status, time, address };
    try {
      const res = await axiosToken.patch<IVaccineRegistrationResponse>(
        `vaccine-registrations/${id}`,
        update
      );
      const data = vaccineRegisters.filter((item) => item.id !== res.data.id);
      setVaccineRegisters(data);
      setTotalRegisters(data);
      handleClose();
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  };
  return (
    <Wrapper>
      <Container>
        <Row>
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
            <FormControl>
              <TextField
                onChange={(e: any) => setName(e.target.value as string)}
                size="small"
                placeholder="Tên người đăng kí"
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
            onRowClick={(param) =>
              handleClickOpen(param.row as IVaccineRegistrationResponse)
            }
            autoPageSize
            autoHeight
            rows={vaccineRegisters}
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
              <Form onSubmit={handleSubmit(onUpdateSubmit)}>
                <DialogContent>
                  <HeaderForm>
                    <Title>
                      <Typography variant="h6" component={'h6'}>
                        Cập Nhật Thông Tin
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
                      <Typography>Tên người đăng kí</Typography>
                      <FormControl fullWidth>
                        <TextField
                          inputProps={{ readOnly: true }}
                          {...register('name')}
                          size="small"
                        />
                      </FormControl>
                    </Input>
                    <Input>
                      <Typography>Số CMND/CCCD</Typography>
                      <FormControl fullWidth>
                        <TextField
                          inputProps={{ readOnly: true }}
                          {...register('identifyCard')}
                          size="small"
                        />
                      </FormControl>
                    </Input>
                    <Input>
                      <Typography>Địa chỉ</Typography>
                      <FormControl fullWidth>
                        <TextField
                          inputProps={{ readOnly: !edit }}
                          {...register('address')}
                          size="small"
                        />
                      </FormControl>
                    </Input>
                    <Input>
                      <Typography>Thời gian đăng kí</Typography>
                      <FormControl fullWidth>
                        <Stack
                          sx={{
                            width: '100%',
                            textAlign: 'left'
                          }}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              InputProps={{
                                size: 'small'
                              }}
                              readOnly={!edit}
                              // openTo="year"
                              views={['year', 'month', 'day']}
                              value={watch('time')}
                              onChange={(date: any) => {
                                setValue('time', format(date));
                              }}
                              renderInput={(params) => {
                                return (
                                  <TextField
                                    {...register('time')}
                                    {...params}
                                  />
                                );
                              }}
                            />
                          </LocalizationProvider>
                        </Stack>
                      </FormControl>
                    </Input>
                    <Input>
                      <Typography>Địa điểm tiêm</Typography>
                      <Autocomplete
                        fullWidth
                        readOnly={!edit}
                        options={sites}
                        getOptionLabel={(option) =>
                          option.name + '-' + option.ward?.name
                        }
                        onChange={(event, value) =>
                          setSiteSelect(value as ISite)
                        }
                        inputValue={watch('site')}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            {...register('site')}
                            size="small"
                            placeholder="Địa điểm tiêm"
                          />
                        )}
                      />
                    </Input>
                    <Input>
                      <Typography>Vaccine</Typography>
                      <Autocomplete
                        fullWidth
                        readOnly={!edit}
                        disablePortal
                        options={vaccines}
                        getOptionLabel={(option) =>
                          option.name + '-' + option.code
                        }
                        onChange={(event, value) =>
                          setVaccineSelect(value as IVaccine)
                        }
                        inputValue={watch('vaccine')}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            {...register('vaccine')}
                            size="small"
                            placeholder="Vaccine"
                          />
                        )}
                      />
                    </Input>
                    <Input>
                      <Typography>Trạng thái</Typography>
                      <Autocomplete
                        fullWidth
                        readOnly={!edit}
                        disablePortal
                        options={STATUS}
                        getOptionLabel={(option) => option.name}
                        inputValue={watch('statusName')}
                        onChange={(event, value) => {
                          setStatusSelect(value as IStatus);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            {...register('statusName')}
                            size="small"
                            placeholder="Trang thai"
                          />
                        )}
                      />
                    </Input>
                  </BodyForm>
                  {edit && (
                    <FooterForm>
                      <Cancel onClick={handleClose}>
                        <Typography fontWeight={500}>Hủy bỏ</Typography>
                      </Cancel>
                      <Save type="submit">
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

export default Register;
