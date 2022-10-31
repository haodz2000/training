import styled from '@emotion/styled';
import { Step, Stepper, StepLabel, Box } from '@mui/material';
import React from 'react';

interface TypeStep {
  currentStep: number;
}
const Wrapper = styled.div`
  margin-top: 45px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Container = styled.div`
  width: 60%;
`;
const steps = ['Thông tin cá nhân', 'Phiếu đồng ý tiêm', 'Hoàn thành'];
const StepCheck = ({ currentStep }: TypeStep) => {
  return (
    <Wrapper>
      <Container>
        <Box width={'100%'}>
          <Stepper activeStep={currentStep}>
            {steps.map((step, index) => (
              <Step
                key={index}
                active={currentStep === index ? true : false}
                completed={currentStep > index ? true : false}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Container>
    </Wrapper>
  );
};

export default StepCheck;
