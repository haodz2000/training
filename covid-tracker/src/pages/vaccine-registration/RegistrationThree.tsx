import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Heading from './Heading';
import StepCheck from './StepCheck';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { useAppSelector } from '../../app';
import { selectUser } from '../../features/auth/authSlice';
import { IVaccineRegistrationResponse } from '../../interfaces/interface';
import { useAccessToken } from '../../hooks/useAccessToken';
import { STATUS } from '../../enum/status.enum';
import { GENDER } from '../../enum/gender.enum';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Wrapper = styled.div`
  width: 100vw;
  min-height: calc(100vh - 80px - 256px);
`;
const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  padding: 0 36px;
  box-sizing: border-box;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;
const Form = styled.div`
  width: 100%;
  margin-top: 65px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Pdf = styled.div``;
const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
`;
const Code = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px 0;
`;
const CodeStrong = styled.span`
  color: #ef5350;
`;
const OutLink = styled.a`
  color: #ef5350;
  text-decoration: none;
`;
const Information = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 16px 0;
`;
const Col = styled.div`
  width: 33%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const Submit = styled.div`
  width: 100%;
  margin-top: 25px;
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Cancel = styled(Button)`
  text-decoration: none;
  padding: 6px 16px;
  border: 1px solid #303f9f;
  border-radius: 8px 8px 8px 0px;
  color: #303f9f;
  margin-right: 16px;
`;
const Continue = styled(Button)`
  text-decoration: none;
  padding: 6px 32px;
  background: #303f9f;
  border-radius: 8px 8px 8px 0px;
  color: #ffffff;
  &:hover {
    background: #303f9f;
    color: #ffffff;
  }
`;
const RegistrationThree = () => {
  const axiosToken = useAxiosPrivate();
  const currentUser = useAppSelector(selectUser);
  const token = useAccessToken();
  const [vaccineRegister, setVaccineRegister] =
    useState<IVaccineRegistrationResponse>();
  useEffect(() => {
    const fetchNewRegister = async () => {
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
        if (res) {
          setVaccineRegister(res.data);
        }
      } catch (error: any) {
        throw new Error(error.message);
      }
    };
    fetchNewRegister();
  }, [token, axiosToken]);

  const exportPDF = () => {
    const PDF: HTMLElement | null = document.getElementById('export-pdf');
    if (PDF) {
      html2canvas(PDF).then((canvas: HTMLCanvasElement) => {
        const doc = new jsPDF();
        doc.addImage(canvas, 'JEPG', 5, 40, 200, 60);
        doc.save('phieudangkytiem.pdf');
      });
    }
  };
  return (
    <Wrapper>
      <Heading />
      <Container>
        {vaccineRegister && <StepCheck currentStep={4} />}
        <Form>
          <Pdf id="export-pdf">
            <HeaderText>
              <Code>
                {vaccineRegister ? (
                  <Typography variant="h6" component={'h6'}>
                    Đăng ký tiêm chủng COVID-19 thành công. Mã đặt tiêm của bạn
                    là: <CodeStrong>{vaccineRegister?.code}</CodeStrong>.
                  </Typography>
                ) : (
                  <>
                    <Typography variant="h6">Bạn chưa đăng ký tiêm</Typography>
                    <Link
                      style={{ textDecoration: 'none', marginLeft: '10px' }}
                      to={'/registration-step-1'}>
                      <Cancel startIcon={<ArrowForward />}>
                        <Typography sx={{ fontWeight: 500 }}>
                          Đăng ký tiêm
                        </Typography>
                      </Cancel>
                    </Link>
                  </>
                )}
              </Code>
              {vaccineRegister && (
                <Code>
                  <Typography variant="body1" component={'span'}>
                    Cảm ơn quý khách đã đăng ký tiêm chủng vắc xin COVID-19.
                    Hiện tại Bộ y tế đang tiến hành thu thập nhu cầu và thông
                    tin để lập danh sách đối tượng đăng ký tiêm vắc xin COVID-19
                    theo từng địa bàn. Chúng tôi sẽ liên hệ với quý khách theo
                    số điện thoại 0123456789 khi có kế hoạch tiêm trong thời
                    gian sớm nhất.
                  </Typography>
                </Code>
              )}
              <Code>
                <Typography variant="body1" component={'span'}>
                  Mời bạn tải ứng dụng "SỔ SỨC KHỎE ĐIỆN TỬ" tại{' '}
                  <OutLink href="https://hssk.kcb.vn/#/sskdt">
                    https://hssk.kcb.vn/#/sskdt
                  </OutLink>{' '}
                  để theo dõi kết quả đăng ký tiêm và nhận chứng nhận tiêm chủng
                  COVID-19
                </Typography>
              </Code>
            </HeaderText>
            <Information>
              <Row>
                <Col>
                  <Typography variant="body1">Họ và tên</Typography>
                  <Typography fontWeight={500} variant="body1">
                    {currentUser?.name}
                  </Typography>
                </Col>
                <Col>
                  <Typography variant="body1">Ngày sinh</Typography>
                  <Typography fontWeight={500} variant="body1">
                    {currentUser?.birthday + ''}
                  </Typography>
                </Col>
                <Col>
                  <Typography variant="body1">Giới tính</Typography>
                  <Typography fontWeight={500} variant="body1">
                    {currentUser?.gender === GENDER.FEMALE
                      ? 'Nữ'
                      : currentUser?.gender === GENDER.MALE
                      ? 'Nam'
                      : 'Other'}
                  </Typography>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Typography variant="body1">
                    Số CMND/CCCD/Mã định dạng công dân
                  </Typography>
                  <Typography fontWeight={500} variant="body1">
                    {currentUser?.identifyCard}
                  </Typography>
                </Col>
                <Col>
                  <Typography variant="body1">Số thẻ BHYT</Typography>
                  <Typography fontWeight={500} variant="body1">
                    {vaccineRegister?.insurranceCard}
                  </Typography>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Typography variant="body1">Tỉnh/Thành phố</Typography>
                  <Typography fontWeight={500} variant="body1">
                    {currentUser.ward?.district?.province?.name}
                  </Typography>
                </Col>
                <Col>
                  <Typography variant="body1">Quận/Huyện</Typography>
                  <Typography fontWeight={500} variant="body1">
                    {currentUser.ward?.district?.name}
                  </Typography>
                </Col>
                <Col>
                  <Typography variant="body1">Xã/Phường</Typography>
                  <Typography fontWeight={500} variant="body1">
                    {currentUser?.ward?.name}
                  </Typography>
                </Col>
              </Row>
            </Information>
          </Pdf>
          <Submit>
            <Link style={{ textDecoration: 'none' }} to={'/'}>
              <Cancel startIcon={<ArrowBack />}>
                <Typography sx={{ fontWeight: 500 }}>Trang chủ</Typography>
              </Cancel>
            </Link>
            {vaccineRegister && (
              <Continue onClick={exportPDF} startIcon={<ArrowForward />}>
                <Typography sx={{ fontWeight: 500 }}>Xuất thông tin</Typography>
              </Continue>
            )}
          </Submit>
        </Form>
      </Container>
    </Wrapper>
  );
};

export default RegistrationThree;
