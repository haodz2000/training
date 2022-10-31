import React from 'react';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const Wrapper = styled.div`
  width: 100vw;
  height: 80px;
  box-sizing: border-box;
  box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
`;
const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0 36px;
  box-sizing: border-box;
`;
const ListItem = styled.div`
  height: 100%;
  box-sizing: border-box;
  display: flex;
`;
const To = styled(Link)`
  text-decoration: none;
`;
const Item = styled.div<{ active: boolean }>`
  height: 100%;
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${(props) =>
    props.active ? 'inset 0px -2px 0px rgba(0, 0, 0, 0.87)' : ''};
  margin-right: 16px;
  color: ${(props) => (props.active ? 'rgba(0, 0, 0, 0.87)' : '#6E6D7A')};
`;

const Menu = () => {
  const location = useLocation();
  const page = location.pathname.split('/')[2];
  return (
    <Wrapper>
      <Container>
        <ListItem>
          <To to="/user/certification">
            <Item active={page === 'certification'}>
              <Typography>Chứng nhận tiêm chủng</Typography>
            </Item>
          </To>
          <To to="/user/result">
            <Item active={page === 'result'}>
              <Typography>Kết quả đăng ký</Typography>
            </Item>
          </To>
          <To to="/user/account">
            <Item active={page === 'account'}>
              <Typography>Tài khoản</Typography>
            </Item>
          </To>
        </ListItem>
      </Container>
    </Wrapper>
  );
};

export default Menu;
