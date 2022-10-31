import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Divider from './Divider';
import Menu from './Menu';
import {
  Table,
  TableHead,
  TableContainer,
  TableRow,
  TableBody,
  Typography,
  TableCell
} from '@mui/material';
import { useAppSelector } from '../../app';
import { selectUser } from '../../features/auth/authSlice';
import { useAccessToken } from '../../hooks/useAccessToken';
import { IVaccineRegistrationResponse } from '../../interfaces/interface';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { STATUS } from '../../enum/status.enum';

const Wrapper = styled.div`
  width: 100vw;
  min-height: calc(100vh - 80px - 256px);
`;
const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 0 36px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;
const Status = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2px 0;
  background: #e8eaf6;
  border: 1px solid #3f51b5;
  border-radius: 30px;
`;
const Cell = styled(TableCell)`
  text-align: center;
`;

// const STATUS: number = 1;
const Result = () => {
  const axiosToken = useAxiosPrivate();
  const currentUser = useAppSelector(selectUser);
  const token = useAccessToken();
  const [vaccineRegister, setVaccineRegister] =
    useState<IVaccineRegistrationResponse>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosToken.get<IVaccineRegistrationResponse>(
          `vaccine-registrations/users`,
          {
            params: {
              token: token,
              status: STATUS.SUCCESS
            }
          }
        );
        setVaccineRegister(res.data);
      } catch (error: any) {
        throw new Error(error.response.data.message);
      }
    };
    fetchData();
  }, [token, axiosToken]);
  return (
    <Wrapper>
      <Menu />
      <Divider />
      <Container>
        <TableContainer>
          <Table sx={{ border: '1px solid #EEEEEE' }}>
            <TableHead sx={{ background: 'rgba(238, 238, 238,0.4)' }}>
              <TableRow sx={{ height: '72px' }}>
                <Cell>STT</Cell>
                <Cell>Họ và tên</Cell>
                <Cell>Ngày sinh</Cell>
                <Cell>Giới tính</Cell>
                <Cell>Số CMND/CCCD/Mã định danh công dân</Cell>
                <Cell>Trạng thái</Cell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vaccineRegister && (
                <TableRow>
                  <Cell>
                    <Typography>1</Typography>
                  </Cell>
                  <Cell>
                    <Typography>{currentUser?.name}</Typography>
                  </Cell>
                  <Cell>
                    <Typography>{currentUser?.birthday + ''}</Typography>
                  </Cell>
                  <Cell>
                    <Typography>{currentUser?.gender}</Typography>
                  </Cell>
                  <Cell>
                    <Typography>{currentUser?.identifyCard}</Typography>
                  </Cell>
                  <Cell>
                    <Status>
                      <Typography>
                        {vaccineRegister.status === 1
                          ? 'Đăng ký thành công'
                          : 'Cancel'}
                      </Typography>
                    </Status>
                  </Cell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Wrapper>
  );
};

export default Result;
