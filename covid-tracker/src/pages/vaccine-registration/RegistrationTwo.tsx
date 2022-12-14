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
                  1. Ti??m ch???ng v???c xin l?? bi???n ph??p ph??ng ch???ng d???ch hi???u qu???,
                  tuy nhi??n v???c xin ph??ng COVID-19 c?? th??? kh??ng ph??ng ???????c b???nh
                  ho??n to??n. Ng?????i ???????c ti??m ch???ng v???c xin ph??ng COVID-19 c?? th???
                  ph??ng ???????c b???nh ho???c gi???m m???c ????? n???ng n???u m???c b???nh. Tuy nhi??n,
                  sau khi ti??m ch???ng v???n ph???i ti???p t???c th???c hi???n nghi??m c??c bi???n
                  ph??p ph??ng ch???ng d???ch theo quy ?????nh.
                </Typography>
              </Policy>
            </Item>
            <Item>
              <Image>
                <Icon src={Vaccine} alt="icon" />
              </Image>
              <Policy>
                <Typography variant="body1" align="left">
                  2. Ti??m ch???ng v???c xin ph??ng COVID-19 c?? th??? g??y ra m???t s??? bi???u
                  hi???n t???i ch??? ti??m ho???c to??n th??n nh?? s??ng, ??au ch??? ti??m, nh???c
                  ?????u, bu???n n??n, s???t, ??au c?????ho???c tai bi???n n???ng sau ti??m ch???ng.
                  Ti??m v???c xin m??i 2 do Pfizer s???n xu???t ??? ng?????i ???? ti??m m??i 1
                  b???ng v???c xin AstraZeneca c?? th??? t??ng kh??? n??ng x???y ra ph???n ???ng
                  th??ng th?????ng sau ti??m ch???ng.
                </Typography>
              </Policy>
            </Item>
            <Item>
              <Image>
                <Icon src={HospitalIcon} alt="icon" />
              </Image>
              <Policy>
                <Typography variant="body1" align="left">
                  3. Khi c?? tri???u ch???ng b???t th?????ng v??? s???c kh???e, ng?????i ???????c ti??m
                  ch???ng c???n ?????n ngay c?? s??? y t??? g???n nh???t ????? ???????c t?? v???n, th??m
                  kh??m v?? ??i???u tr??? k???p th???i.
                </Typography>
              </Policy>
            </Item>
          </List>
          <Divider />
          <Verify>
            <Typography variant="body1" sx={{ marginRight: '15px' }}>
              Sau khi ???? ?????c c??c th??ng tin n??u tr??n, t??i ???? hi???u v??? c??c nguy c??
              v??:
            </Typography>
            <FormGroup>
              <FormControlLabel
                onChange={() => setCheck(!check)}
                control={<Checkbox checked={check} name="agree" />}
                label="?????ng ?? ti??m ch???ng"
              />
            </FormGroup>
          </Verify>
          <Submit>
            <Link
              style={{ textDecoration: 'none' }}
              to={'/registration-step-1'}>
              <Cancel startIcon={<ArrowBack />}>
                <Typography sx={{ fontWeight: 500 }}>H???y b???</Typography>
              </Cancel>
            </Link>
            <Continue
              type="submit"
              disabled={!check}
              startIcon={<ArrowForward />}>
              <Typography sx={{ fontWeight: 500 }}>Ti???p t???c</Typography>
            </Continue>
          </Submit>
        </Form>
      </Container>
    </Wrapper>
  );
};

export default RegistrationTwo;
