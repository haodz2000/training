import React from 'react';
import styled from '@emotion/styled';
import { Document as Doc } from '../admin';
const Wrapper = styled.div`
  width: 100vw;
  min-height: calc(100vh - 80px - 256px);
`;
const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  padding: 0 36px;
  box-sizing: border-box;
`;
const Document = () => {
  return (
    <Wrapper>
      <Container>
        <Doc />
      </Container>
    </Wrapper>
  );
};

export default Document;
