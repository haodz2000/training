import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../app';
import { selectIsLogin } from '../features/auth/authSlice';

const RequireAuth = () => {
  const isLogin: boolean = useAppSelector(selectIsLogin);
  const location = useLocation();
  return isLogin ? (
    <Outlet />
  ) : (
    <Navigate to={'/login'} state={{ from: location }} replace />
  );
};

export default RequireAuth;
