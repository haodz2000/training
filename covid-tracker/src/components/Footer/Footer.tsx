import React from 'react';
import styled from '@emotion/styled';
import { Button, Typography } from '@mui/material';
import { Cert, Logo_2 } from '../../assets/images';
const Wrapper = styled.div`
  overflow-x: hidden;
  width: 100vw;
  height: 256px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2d2188;
`;
const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 1440px;
  height: 256px;
  margin: 0 auto;
  padding: 0 36px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Frame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
const Frame2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
`;
const ContainerButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;
const ButtonDownload = styled(Button)`
  padding: 8px 22px;
  border-radius: 8px 8px 8px 0px;
  border: 1px solid #ffffff;
  color: #ffffff;
  font-weight: 500;
  font-size: 16px;
  box-sizing: border-box;
  margin: 15px 0 10px 15px;
`;
const Logo = styled.img``;
const Footer = () => {
  return (
    <Wrapper>
      <Container>
        <Frame>
          <Typography
            component="span"
            align="left"
            variant="body2"
            sx={{
              color: '#FFFFFF',
              marginBottom: '3px'
            }}>
            © Bản quyền thuộc{' '}
            <strong>
              TRUNG TÂM CÔNG NGHỆ PHÒNG, CHỐNG DỊCH COVID-19 QUỐC GIA
            </strong>
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: '400',
              color: '#FFFFFF'
            }}>
            Phát triển bởi{' '}
            <Typography component={'span'} sx={{ color: '#D32F2F' }}>
              Viettel
            </Typography>
          </Typography>
          <Logo src={Logo_2} alt="Logo2" />
        </Frame>
        <Frame2>
          <Typography
            variant="body2"
            align="left"
            sx={{ color: '#FFFFFF', fontWeight: '400' }}>
            Tải sổ sức khỏe điện tử để đăng kí tiêm và nhận giấy chứng nhận tiêm
          </Typography>
          <ContainerButton>
            <ButtonDownload>App tiem di dong(Cho HCM)</ButtonDownload>
            <ButtonDownload>App Store</ButtonDownload>
            <ButtonDownload>Google play</ButtonDownload>
          </ContainerButton>
          <Logo src={Cert} alt="Certificate" />
        </Frame2>
      </Container>
    </Wrapper>
  );
};

export default Footer;
