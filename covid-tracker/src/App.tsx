import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import styled from '@emotion/styled';
import Login from './pages/login';
import ForgotPassword from './pages/forgot-password';
import Register from './pages/register/Register';
import Homepage from './pages/homepage/Homepage';
import Layout from './layouts/Layout';
import {
  RegistrationOne,
  RegistrationTwo,
  RegistrationThree
} from './pages/vaccine-registration';
import { Account, Certification, ResultRegistration } from './pages/user';
import { Place } from './pages/admin';
import { useLogin } from './hooks/useLogin';
import RequireAuth from './layouts/RequireAuth';
import RequireAdmin from './layouts/RequiredAdmin';
import Document from './pages/document/Document';

const Wrapper = styled.div`
  overflow-x: hidden;
`;
function App() {
  const isLogin = useLogin();
  return (
    <Wrapper>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Homepage />
              </Layout>
            }
          />
          <Route
            path="/login"
            element={!isLogin ? <Login /> : <Navigate to={'/'} />}
          />
          <Route
            path="/forgot-password"
            element={!isLogin ? <ForgotPassword /> : <Navigate to={'/'} />}
          />
          <Route
            path="/register"
            element={!isLogin ? <Register /> : <Navigate to={'/'} />}
          />
          <Route
            path="/home"
            element={
              <Layout>
                <Homepage />
              </Layout>
            }
          />
          <Route
            path="/document"
            element={
              <Layout>
                <Document />
              </Layout>
            }
          />
          <Route element={<RequireAuth />}>
            <Route
              path="/registration-step-1"
              element={
                <Layout>
                  <RegistrationOne />
                </Layout>
              }
            />
          </Route>
          <Route element={<RequireAuth />}>
            <Route
              path="/registration-step-2"
              element={
                <Layout>
                  <RegistrationTwo />
                </Layout>
              }
            />
          </Route>
          <Route element={<RequireAuth />}>
            <Route
              path="/registration-step-3"
              element={
                <Layout>
                  <RegistrationThree />
                </Layout>
              }
            />
          </Route>
          <Route element={<RequireAuth />}>
            <Route
              path="/user/certification"
              element={
                <Layout>
                  <Certification />
                </Layout>
              }
            />
          </Route>
          <Route element={<RequireAuth />}>
            <Route
              path="/user/result"
              element={
                <Layout>
                  <ResultRegistration />
                </Layout>
              }
            />
          </Route>
          <Route element={<RequireAuth />}>
            <Route
              path="/user/account"
              element={
                <Layout>
                  <Account />
                </Layout>
              }
            />
          </Route>
          <Route element={<RequireAuth />}>
            <Route element={<RequireAdmin />}>
              <Route
                path="/admin/place"
                element={
                  <Layout>
                    <Place />
                  </Layout>
                }
              />
            </Route>
          </Route>
        </Routes>
      </Router>
    </Wrapper>
  );
}

export default App;
