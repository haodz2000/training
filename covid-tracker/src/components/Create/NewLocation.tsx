import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Close, NoteAdd } from '@mui/icons-material';
import {
  Typography,
  Dialog,
  DialogContent,
  Slide,
  Button,
  FormControl,
  TextField,
  Autocomplete
} from '@mui/material';
import {
  ILocation,
  IProvince,
  IWard,
  IDistrict
} from '../../interfaces/interface';
import { TransitionProps } from '@mui/material/transitions';
import { useAppDispatch } from '../../app';
import { fetchCreateLocation } from '../../features/vaccine/locationSlice';
import * as areaService from '../../services/areaService';

const Wrapper = styled.div`
  width: 100%;
`;
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #eeeeee;
`;
const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
`;
const Form = styled.form``;
const FormDialog = styled.div`
  width: 50%;
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

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
interface IFormData {
  name: string;
  address: string;
  leader: string;
  table: number;
  province: string;
  district: string;
  ward: string;
  wardId: number;
}
const schema = yup
  .object({
    name: yup.string().required('Tên địa điểm không được để trống'),
    address: yup.string().required('Địa chỉ không được để trống'),
    leader: yup.string().required('Tên quản lí không được để trống'),
    table: yup.number().required().min(1, 'Bàn tiêm phải lớn hơn 0'),
    wardId: yup.number().required().min(1)
  })
  .required();
const NewLocation = () => {
  const dispatch = useAppDispatch();
  const [provinceSelect, setProvinceSelect] = useState<IProvince>();
  const [districtSelect, setDistrictSelect] = useState<IDistrict>();
  const [wardSelect, setWardSelect] = useState<IWard>();
  const [provinces, setProvinces] = useState<IProvince[]>([]);
  const [districts, setDistricts] = useState<IDistrict[]>([]);
  const [wards, setWards] = useState<IWard[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid }
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      address: '',
      leader: '',
      table: 1,
      province: '',
      district: '',
      ward: ''
    }
  });

  const province = watch('province');
  const district = watch('district');
  const ward = watch('ward');
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const provinces = await areaService.findAllProvinces();
        setProvinces(provinces);
      } catch (error) {
        throw new Error();
      }
    };
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
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit: SubmitHandler<IFormData> = (data) => {
    const { province, district, ward, ...rest } = data;
    dispatch(fetchCreateLocation(rest as Partial<ILocation>));
    setValue('name', '');
    setValue('address', '');
    setValue('leader', '');
    setValue('table', 1);
    setValue('province', '');
    setValue('ward', '');
    setValue('district', '');
    setValue('wardId', 0);
    setOpen(false);
  };
  return (
    <Wrapper>
      <Container>
        <Row onClick={() => setOpen(true)}>
          <NoteAdd fontSize="large" color="primary" />
          <Typography variant="h6">Thêm địa điểm</Typography>
        </Row>
        <FormDialog>
          <Dialog
            fullWidth
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <DialogContent>
                <HeaderForm>
                  <Title>
                    <Typography variant="h6" component={'h6'}>
                      Tạo mới điểm Tiêm
                    </Typography>
                  </Title>
                  <Label onClick={handleClose}>
                    <Close />
                  </Label>
                </HeaderForm>
                <Divider />
                <BodyForm>
                  <Input>
                    <Typography>Tên điểm tiêm</Typography>
                    <FormControl fullWidth>
                      <TextField
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        {...register('name')}
                        size="small"
                      />
                    </FormControl>
                  </Input>
                  <Input>
                    <Typography>Địa chỉ</Typography>
                    <FormControl fullWidth>
                      <TextField
                        helperText={errors.address?.message}
                        error={!!errors.address}
                        {...register('address')}
                        size="small"
                      />
                    </FormControl>
                  </Input>
                  <Input>
                    <Typography>Tỉnh/Thành phố</Typography>
                    <Autocomplete
                      fullWidth
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
                      readOnly={!province}
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
                      // readOnly={!!district}
                      options={wards}
                      inputValue={ward}
                      onChange={(event, value) => setWardSelect(value as IWard)}
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
                        helperText={errors.leader?.message}
                        error={!!errors.leader}
                        {...register('leader')}
                        size="small"
                      />
                    </FormControl>
                  </Input>
                  <Input>
                    <Typography>Số bàn tiêm</Typography>
                    <FormControl fullWidth>
                      <TextField
                        helperText={errors.table?.message}
                        error={!!errors.table}
                        {...register('table')}
                        size="small"
                      />
                    </FormControl>
                  </Input>
                </BodyForm>
                <FooterForm>
                  <Cancel onClick={handleClose}>
                    <Typography fontWeight={500}>Hủy bỏ</Typography>
                  </Cancel>
                  <Save disabled={!isValid} type="submit">
                    <Typography fontWeight={500}>Xác nhận</Typography>
                  </Save>
                </FooterForm>
              </DialogContent>
            </Form>
          </Dialog>
        </FormDialog>
      </Container>
    </Wrapper>
  );
};

export default NewLocation;
