import React from 'react';
import styled from '@emotion/styled';
import { Logo as imgLogo } from '../../assets/images';
import { Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import CustomizedMenus from './Dropdown';
import { useAppDispatch, useAppSelector } from '../../app';
import {
  logout,
  selectIsAdmin,
  selectUser
} from '../../features/auth/authSlice';
import { useLogin } from '../../hooks/useLogin';
import { Logout } from '@mui/icons-material';
const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100vw;
  height: 80px;
  display: flex;
  align-items: center;
  padding: 15px 0;
  box-sizing: border-box;
  background: linear-gradient(90deg, #ed1b23 0%, #2e3091 52.08%, #253494 100%);
`;
const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  height: 80px;
  margin: 0 auto;
  padding: 0 36px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  overflow-x: hidden;
`;
const Branch = styled.div`
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const Image = styled.img`
  width: 42px;
  height: 100%;
  object-fit: cover;
  margin-right: 15px;
`;
const Menu = styled.ul`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  list-style-type: none;
`;
const LinkHeader = styled(Link)`
  margin: 0 2px;
  padding: 0px 10px;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  color: white;
  cursor: pointer;
  text-decoration: none;
`;
const MenuItem = styled(Button)`
  margin: 0 2px;
  padding: 0px 10px;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  color: white;
  cursor: pointer;
  text-decoration: none;
  text-transform: none;
`;
const ButtonLogin = styled(Button)`
  border-radius: 8px 8px 8px 0;
  background-color: white;
  padding: 8px 22px;
  color: #303f9f;
  border: 2px solid #ffffff;
  &:hover {
    color: white;
  }
`;
const TitleBtn = styled.span`
  font-weight: 500;
  letter-spacing: -0.04px;
  font-size: 16px;
`;

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = useAppSelector(selectUser);
  const isLogin = useLogin();
  const isAdmin = useAppSelector(selectIsAdmin);
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  return (
    <Wrapper>
      <Container>
        <Branch>
          <Logo>
            <Image src={imgLogo} alt="Logo" />
            <Typography
              sx={{
                color: '#FFFFFF',
                fontWeight: 400
              }}
              component="h6"
              variant="h6">
              Cổng thông tin tiêm chủng covid-19
            </Typography>
          </Logo>
        </Branch>
        <Menu>
          <LinkHeader to={'/home'}>
            <Typography variant="body1" sx={{ fontWeight: '500' }}>
              Trang chủ
            </Typography>
          </LinkHeader>
          <LinkHeader to={'/registration-step-1'}>
            <Typography variant="body1" sx={{ fontWeight: '500' }}>
              Đăng kí tiêm
            </Typography>
          </LinkHeader>
          <CustomizedMenus />
          <LinkHeader to={isAdmin ? '/admin/place' : '/document'}>
            <Typography variant="body1" sx={{ fontWeight: '500' }}>
              Tài liệu
            </Typography>
          </LinkHeader>
          {isLogin ? (
            <Link to={'/user/account'}>
              <MenuItem>{currentUser?.name}</MenuItem>
            </Link>
          ) : (
            <LinkHeader to={'/login'}>
              <ButtonLogin>
                <TitleBtn>Đăng nhập</TitleBtn>
              </ButtonLogin>
            </LinkHeader>
          )}
          {isLogin && (
            <ButtonLogin onClick={handleLogout} endIcon={<Logout />}>
              <TitleBtn>Đăng xuất</TitleBtn>
            </ButtonLogin>
          )}
        </Menu>
      </Container>
    </Wrapper>
  );
};

export default Header;
