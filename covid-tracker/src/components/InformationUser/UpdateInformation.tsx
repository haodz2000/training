import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  Autocomplete,
  Button,
  FormControl,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { IDistrict, IProvince, IWard } from '../../interfaces/interface';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useAppDispatch, useAppSelector } from '../../app';
import { selectUser, updateUser } from '../../features/auth/authSlice';
import { IUser } from '../../interfaces/interface';
import * as areaService from '../../services/areaService';
import { format } from '../../utils/formatTime';
import { useAccessToken } from '../../hooks/useAccessToken';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Wrapper = styled.div`
  width: 100%;
`;
const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 16px;
`;
const Component = styled.div`
  width: 318px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 16px;
`;
const Label = styled(Typography)`
  font-weight: 400;
  color: rgba(0, 0, 0, 0.87);
  margin-bottom: 5px;
`;
const Cancel = styled(Button)`
  padding: 6px 16px;
  border: 1px solid rgba(63, 81, 181, 0.5);
  border-radius: 4px;
  color: #3f51b5;
  margin-right: 16px;
`;
const Save = styled(Button)`
  padding: 6px 16px;
  background: #3f51b5;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  color: #ffffff;
`;

interface IFormData {
  id: number;
  identifyCard: string;
  name: string;
  birthday: Date;
  gender: number;
  genderName: string;
  provinceId: number;
  province: string;
  districtId: number;
  district: string;
  wardId: number;
  ward: string;
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
    genderName: yup.string().required('Giới tính không để trống'),
    province: yup.string().required().trim('Tỉnh không để trống'),
    district: yup.string().required().trim('Huyện không để trống'),
    ward: yup.string().required().trim('Xã không để trống'),
    wardId: yup.number().required().min(1),
    id: yup.number().required()
  })
  .required();
interface EditProps {
  edit?: boolean;
}
interface IGender {
  id: number;
  name: string;
}
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
const UpdateInformation: React.FC<EditProps> = (props) => {
  const token = useAccessToken();
  const dispatch = useAppDispatch();
  const axiosToken = useAxiosPrivate();
  const currentUser: Partial<IUser> = useAppSelector(selectUser);
  const [provinceSelect, setProvinceSelect] = useState<IProvince>();
  const [districtSelect, setDistrictSelect] = useState<IDistrict>();
  const [wardSelect, setWardSelect] = useState<IWard>();
  const [genderSelect, setGenderSelect] = useState<IGender>();
  const [provinces, setProvinces] = useState<IProvince[]>([]);
  const [districts, setDistricts] = useState<IDistrict[]>([]);
  const [wards, setWards] = useState<IWard[]>([]);
  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      name: currentUser.name,
      identifyCard: currentUser.identifyCard,
      province: currentUser.ward?.district?.province?.name,
      provinceId: currentUser.ward?.district?.province?.id,
      district: currentUser.ward?.district?.name,
      districtId: currentUser.ward?.district?.id,
      ward: currentUser.ward?.name,
      birthday: currentUser?.birthday,
      wardId: currentUser?.wardId,
      id: currentUser?.id,
      genderName: (function () {
        const gender = genders.find((item) => item.id === currentUser.id);
        return gender?.name;
      })(),
      gender: currentUser.gender
    }
  });
  const province = watch('province');
  const district = watch('district');
  const ward = watch('ward');
  useEffect(() => {
    const fetchProvinces = async () => {
      const res = await areaService.findAllProvinces();
      setProvinces(res);
    };
    fetchProvinces();
  }, []);
  useEffect(() => {
    if (currentUser) {
      const war = currentUser.ward as IWard;
      const dis = war?.district as IDistrict;
      const pro = war?.district?.province as IProvince;
      setProvinceSelect(pro);
      setDistrictSelect(dis);
      setWardSelect(war);
    }
  }, [currentUser]);
  const setData = useCallback(() => {
    if (currentUser) {
      const war = currentUser.ward as IWard;
      const dis = war?.district as IDistrict;
      const pro = war?.district?.province as IProvince;
      setProvinceSelect(pro);
      setDistrictSelect(dis);
      setWardSelect(war);
      setValue('birthday', currentUser.birthday as Date);
      setValue('identifyCard', currentUser.identifyCard as string);
      setValue('name', currentUser.name as string);
      const gender = genders.find((item) => item.id === currentUser.gender);
      if (gender) {
        setValue('genderName', gender.name);
        setValue('gender', gender.id);
      }
      setValue('ward', currentUser.ward?.name as string);
      setValue('wardId', currentUser.wardId as number);
      setValue('district', currentUser.ward?.district?.name as string);
      setValue('districtId', currentUser.ward?.district?.id as number);
      setValue(
        'province',
        currentUser.ward?.district?.province?.name as string
      );
      setValue(
        'provinceId',
        currentUser.ward?.district?.province?.id as number
      );
    }
  }, [currentUser, setValue]);
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
    if (genderSelect) {
      setValue('gender', genderSelect.id);
      setValue('genderName', genderSelect.name);
    }
  }, [genderSelect, setValue]);
  const handleReset = () => {
    setData();
  };
  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    try {
      const { id, name, identifyCard, gender, birthday, wardId } = data;
      const payload = { name, identifyCard, gender, wardId, birthday };
      const updated = await axiosToken.patch<Partial<IUser>>(
        `users/only/${id}`,
        payload,
        {
          params: {
            token: token
          }
        }
      );
      if (updated) {
        dispatch(updateUser(updated));
        alert('Cap nhat thanh cong');
      }
    } catch (error: any) {
      throw new Error(error.message, {});
    }
  };
  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row style={{ marginBottom: '24px' }}>
          <Component>
            <Label>Số CMND/CCCD/Mã định danh</Label>
            <FormControl fullWidth>
              <TextField
                inputProps={{
                  readOnly: !props.edit
                }}
                {...register('identifyCard')}
                error={!!errors.identifyCard}
                helperText={errors.identifyCard?.message}
                size="small"
                defaultValue={currentUser?.identifyCard}
              />
            </FormControl>
          </Component>
        </Row>
        <Row>
          <Component>
            <Label>Họ và tên</Label>
            <FormControl fullWidth>
              <TextField
                inputProps={{
                  readOnly: !props.edit
                }}
                error={!!errors.name}
                helperText={errors.name?.message}
                {...register('name')}
                size="small"
                defaultValue={currentUser?.name}
              />
            </FormControl>
          </Component>
          <Component>
            <Label>Ngày sinh</Label>
            <FormControl fullWidth>
              <Controller
                control={control}
                {...register('birthday')}
                render={({ field }) => (
                  <Stack
                    sx={{
                      width: '100%',
                      height: '50px',
                      textAlign: 'left'
                    }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        readOnly={!props.edit}
                        disableFuture
                        openTo="year"
                        views={['year', 'month', 'day']}
                        value={field.value || currentUser?.birthday}
                        onChange={(date: any) => {
                          setValue('birthday', format(date));
                        }}
                        renderInput={(params: any) => {
                          return <TextField {...params} size="small" />;
                        }}
                      />
                    </LocalizationProvider>
                  </Stack>
                )}
              />
            </FormControl>
          </Component>
          <Component>
            <Label>Giới tính</Label>
            <FormControl fullWidth>
              <Autocomplete
                readOnly={!props.edit}
                disablePortal
                options={genders}
                defaultValue={genders.find(
                  (item) => item.id === currentUser.gender
                )}
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
          </Component>
        </Row>
        <Row>
          <Component>
            <Label>Tỉnh/Thành phố</Label>
            <FormControl fullWidth>
              <Autocomplete
                readOnly={!props.edit}
                disablePortal
                options={provinces}
                inputValue={province}
                defaultValue={currentUser.ward?.district?.province}
                onChange={(event, value) =>
                  setProvinceSelect(value as IProvince)
                }
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={() => true}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    {...register('province')}
                    size="small"
                    placeholder="Tỉnh/Thành phố"
                    defaultValue={province}
                  />
                )}
              />
            </FormControl>
          </Component>
          <Component>
            <Label>Quận/Huyện</Label>
            <FormControl fullWidth>
              <Autocomplete
                readOnly={!props.edit || province === ''}
                disablePortal
                options={districts}
                inputValue={district}
                defaultValue={currentUser.ward?.district}
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
                    defaultValue={district}
                  />
                )}
              />
            </FormControl>
          </Component>
          <Component>
            <Label>Phường/Xã</Label>
            <FormControl fullWidth>
              <Autocomplete
                disablePortal
                readOnly={!props.edit || district === ''}
                options={wards}
                inputValue={ward}
                defaultValue={currentUser.ward}
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
            </FormControl>
          </Component>
        </Row>
        {props.edit && (
          <Row>
            <Cancel onClick={handleReset} type="reset">
              <Typography fontWeight={500}>Hủy bỏ</Typography>
            </Cancel>
            <Save disabled={!isValid} type="submit">
              <Typography fontWeight={500}>Lưu</Typography>
            </Save>
          </Row>
        )}
      </Form>
    </Wrapper>
  );
};

export default UpdateInformation;
