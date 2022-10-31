import React from 'react';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
const Wrapper = styled.div`
  width: 100vw;
  height: 64px;
  margin-top: 33px;
  background: #f5f5f5;
`;
const Title = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1440px;
  padding: 0 36px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  margin: 0 auto;
`;
const Heading = () => {
  return (
    <Wrapper>
      <Title>
        <Typography variant="h5" component={'h5'}>
          Tra cứu đăng ký tiêm
        </Typography>
      </Title>
    </Wrapper>
  );
};

export default Heading;
