import React from 'react';
import styled from '@emotion/styled';
import { Button, FormControl, TextField, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppSelector } from '../../app';
import { selectUser } from '../../features/auth/authSlice';
import { useAccessToken } from '../../hooks/useAccessToken';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
const schema = yup
  .object({
    password: yup
      .string()
      .required('Không được để trống')
      .min(8, 'Mật khẩu dài ít nhất 8 kí tự')
      .trim(),
    verifyPassword: yup
      .string()
      .required('Không được để trống')
      .trim()
      .oneOf([yup.ref('password'), null], 'Mật khẩu sai')
  })
  .required();
interface IFormData {
  password: string;
  verifyPassword: string;
}
const UpdatePassword = () => {
  const currentUser = useAppSelector(selectUser);
  const axiosToken = useAxiosPrivate();
  const token = useAccessToken();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });
  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    try {
      const { password } = data;
      const payload = { password };
      const res = await axiosToken.patch(
        `users/only/${currentUser.id}`,
        payload,
        {
          params: {
            token: token
          }
        }
      );
      if (res) {
        alert('Cap nhat thanh cong');
        setValue('password', '');
        setValue('verifyPassword', '');
      }
    } catch (error) {
      alert('Cap nhat that bai');
      throw new Error();
    }
  };
  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Component>
            <Label>Mật khẩu mới</Label>
            <FormControl fullWidth>
              <TextField
                type={'password'}
                helperText={errors.password?.message}
                error={!!errors.password}
                {...register('password')}
                size="small"
                placeholder="Mật khẩu mới"
              />
            </FormControl>
          </Component>
        </Row>
        <Row>
          <Component>
            <Label>Xác nhận lại mật khẩu</Label>
            <FormControl fullWidth>
              <TextField
                type={'password'}
                helperText={errors.verifyPassword?.message}
                error={!!errors.verifyPassword}
                {...register('verifyPassword')}
                size="small"
                placeholder="Xác nhận lại mật khẩu"
              />
            </FormControl>
          </Component>
        </Row>
        <Row>
          <Cancel type="reset">
            <Typography fontWeight={500}>Hủy bỏ</Typography>
          </Cancel>
          <Save disabled={!isValid} type="submit">
            <Typography fontWeight={500}>Lưu</Typography>
          </Save>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default UpdatePassword;
