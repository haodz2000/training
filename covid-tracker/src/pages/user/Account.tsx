import React, { useState } from 'react';
import styled from '@emotion/styled';
import Menu from './Menu';
import Divider from './Divider';
import { Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';
import {
  UpdateInformation,
  UpdatePassword
} from '../../components/InformationUser/';

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
const Section = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;
const Title = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;
const Content = styled.div`
  width: 100%;
  padding: 0 16px;
  box-sizing: border-box;
`;
const Label = styled.label`
  cursor: pointer;
  &:hover {
    padding: 0 4px;
    border-radius: 50%;
    background: #e9e9e9;
  }
`;
const Account = () => {
  const [edit, setEdit] = useState<boolean>(false);
  return (
    <Wrapper>
      <Menu />
      <Divider />
      <Container>
        <Section>
          <Title>
            <Typography marginRight={1} variant="body1" fontWeight={500}>
              Thông tin cá nhân
            </Typography>

            <Label onClick={() => setEdit(!edit)}>
              <Edit sx={{ color: 'rgba(0, 0, 0, 0.54)' }} />
            </Label>
          </Title>
          <Content>
            <UpdateInformation edit={edit} />
          </Content>
        </Section>
        <Section>
          <Title>
            <Typography marginRight={1} variant="body1" fontWeight={500}>
              Mật khẩu
            </Typography>
            <Edit sx={{ color: 'rgba(0, 0, 0, 0.54)' }} />
          </Title>
          <Content>
            <UpdatePassword />
          </Content>
        </Section>
      </Container>
    </Wrapper>
  );
};

export default Account;
