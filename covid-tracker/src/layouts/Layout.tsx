import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import styled from '@emotion/styled';

type MainProps = {
  children: React.ReactNode;
};
const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
`;
const Content = styled.div`
  margin-top: 80px;
`;
const Layout = (props: MainProps) => {
  return (
    <Wrapper>
      <Header />
      <Content>{props.children}</Content>
      <Footer />
    </Wrapper>
  );
};

export default Layout;
