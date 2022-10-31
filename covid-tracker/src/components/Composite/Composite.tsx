import React from 'react';
import styled from '@emotion/styled';
import { Shield, Vaccine, People } from '../../assets/images';
import { Typography } from '@mui/material';
const Wrapper = styled.div`
  width: 100vw;
  height: 132px;
  background-color: #f7fbfe;
  box-sizing: border-box;
`;
const Container = styled.div`
  width: 1440px;
  margin: 0 auto;
  padding: 16px 36px;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
`;
const Component = styled.div`
  padding: 0 10px;
  box-sizing: border-box;
  flex: 1;
  background: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;
const Divider = styled.div`
  width: 1px;
  height: 100px;
  background: #eeeeee;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;
const Icon = styled.img`
  width: 46px;
  height: 44px;
  margin-right: 15px;
  overflow-x: hidden;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
`;
const Sub = styled.sub`
  font-size: 13px;
  font-style: italic;
`;
const Composite = () => {
  return (
    <Wrapper>
      <Container>
        <Component>
          <Icon src={People} alt="icon" />
          <Info>
            <Typography
              align="left"
              variant="subtitle1"
              sx={{ fontWeight: '700' }}>
              Đối tượng đăng kí tiêm
            </Typography>
            <Typography sx={{ fontWeight: '500' }} align="left" variant="h5">
              11,023,873<Sub>(lượt)</Sub>
            </Typography>
          </Info>
        </Component>
        <Divider></Divider>
        <Component>
          <Icon src={Vaccine} alt="icon" />
          <Info>
            <Typography
              align="left"
              variant="subtitle1"
              sx={{ fontWeight: '700' }}>
              Số mũi tiêm hôm qua
            </Typography>
            <Typography sx={{ fontWeight: '500' }} align="left" variant="h5">
              11,023,873<Sub>(mũi)</Sub>
            </Typography>
          </Info>
        </Component>
        <Divider></Divider>
        <Component>
          <Icon src={Shield} alt="icon" />
          <Info>
            <Typography
              align="left"
              variant="subtitle1"
              sx={{ fontWeight: '700' }}>
              Số mũi đã tiêm toàn quốc
            </Typography>
            <Typography sx={{ fontWeight: '500' }} align="left" variant="h5">
              11,023,873<Sub>(mũi)</Sub>
            </Typography>
          </Info>
        </Component>
      </Container>
    </Wrapper>
  );
};

export default Composite;
