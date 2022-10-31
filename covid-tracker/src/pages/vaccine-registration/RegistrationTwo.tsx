import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Heading from './Heading';
import StepCheck from './StepCheck';
import { ShieldIcon, Vaccine, HospitalIcon } from '../../assets/images';
import {
  Button,
  FormControlLabel,
  FormGroup,
  Typography,
  Checkbox
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../app';
import { registrationAsync } from '../../features/user/registrationVaccineSlice';
import { selectUser } from '../../features/auth/authSlice';

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
const Form = styled.form`
  margin-top: 65px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const Item = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  align-items: center;
`;
const Image = styled.div`
  position: relative;
  width: 35px;
  height: 35px;
`;
const Icon = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: cover;
`;
const Policy = styled.div`
  width: calc(100% - 35px);
`;
const Divider = styled.div`
  width: 100%;
  height: 2px;
  background-color: #eeeeee;
`;
const Verify = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
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
interface Ilocation {
  pathname: string;
  hash: string;
  key: string;
  search: string;
  state: any;
}
const RegistrationTwo = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectUser);
  const [check, setCheck] = useState<boolean>(false);
  const navigate = useNavigate();
  const location: Ilocation = useLocation();
  const data = location.state?.data || null;
  useEffect(() => {
    if (data === null) {
      navigate('/registration-step-1');
    }
  }, [data, navigate]);
  const handleContinue = (e: any) => {
    e.preventDefault();
    if (check) {
      const vaccineRegistrationInfo = {
        ...data,
        userId: currentUser.id
      };
      dispatch(registrationAsync(vaccineRegistrationInfo));
      setTimeout(() => {
        navigate('/registration-step-3');
      }, 500);
    }
  };

  return (
    <Wrapper>
      <Heading />
      <Container>
        <StepCheck currentStep={1} />
        <Form onSubmit={handleContinue}>
          <List>
            <Item>
              <Image>
                <Icon src={ShieldIcon} alt="icon" />
              </Image>
              <Policy>
                <Typography variant="body1" align="left">
                  1. Tiêm chủng vắc xin là biện pháp phòng chống dịch hiệu quả,
                  tuy nhiên vắc xin phòng COVID-19 có thể không phòng được bệnh
                  hoàn toàn. Người được tiêm chủng vắc xin phòng COVID-19 có thể
                  phòng được bệnh hoặc giảm mức độ nặng nếu mắc bệnh. Tuy nhiên,
                  sau khi tiêm chủng vẫn phải tiếp tục thực hiện nghiêm các biện
                  pháp phòng chống dịch theo quy định.
                </Typography>
              </Policy>
            </Item>
            <Item>
              <Image>
                <Icon src={Vaccine} alt="icon" />
              </Image>
              <Policy>
                <Typography variant="body1" align="left">
                  2. Tiêm chủng vắc xin phòng COVID-19 có thể gây ra một số biểu
                  hiện tại chỗ tiêm hoặc toàn thân như sưng, đau chỗ tiêm, nhức
                  đầu, buồn nôn, sốt, đau cơ…hoặc tai biến nặng sau tiêm chủng.
                  Tiêm vắc xin mũi 2 do Pfizer sản xuất ở người đã tiêm mũi 1
                  bằng vắc xin AstraZeneca có thể tăng khả năng xảy ra phản ứng
                  thông thường sau tiêm chủng.
                </Typography>
              </Policy>
            </Item>
            <Item>
              <Image>
                <Icon src={HospitalIcon} alt="icon" />
              </Image>
              <Policy>
                <Typography variant="body1" align="left">
                  3. Khi có triệu chứng bất thường về sức khỏe, người được tiêm
                  chủng cần đến ngay cơ sở y tế gần nhất để được tư vấn, thăm
                  khám và điều trị kịp thời.
                </Typography>
              </Policy>
            </Item>
          </List>
          <Divider />
          <Verify>
            <Typography variant="body1" sx={{ marginRight: '15px' }}>
              Sau khi đã đọc các thông tin nêu trên, tôi đã hiểu về các nguy cơ
              và:
            </Typography>
            <FormGroup>
              <FormControlLabel
                onChange={() => setCheck(!check)}
                control={<Checkbox checked={check} name="agree" />}
                label="Đồng ý tiêm chủng"
              />
            </FormGroup>
          </Verify>
          <Submit>
            <Link
              style={{ textDecoration: 'none' }}
              to={'/registration-step-1'}>
              <Cancel startIcon={<ArrowBack />}>
                <Typography sx={{ fontWeight: 500 }}>Hủy bỏ</Typography>
              </Cancel>
            </Link>
            <Continue
              type="submit"
              disabled={!check}
              startIcon={<ArrowForward />}>
              <Typography sx={{ fontWeight: 500 }}>Tiếp tục</Typography>
            </Continue>
          </Submit>
        </Form>
      </Container>
    </Wrapper>
  );
};

export default RegistrationTwo;
