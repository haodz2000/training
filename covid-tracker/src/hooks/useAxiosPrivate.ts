import { AxiosRequestConfig } from 'axios';
import { useEffect } from 'react';
import { axioInstance } from '../utils/request/httpRequest';
import { useAccessToken } from './useAccessToken';

const useAxiosPrivate = () => {
  const token = useAccessToken();
  useEffect(() => {
    const requestIntercept = axioInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        if (token) {
          config.headers = {
            Authorization: `Bearer ${token}`
          };
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const responseIntercept = axioInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          prevRequest.headers['Authorization'] = `Bearer ${token}`;
          return axioInstance(prevRequest);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axioInstance.interceptors.request.eject(requestIntercept);
      axioInstance.interceptors.response.eject(responseIntercept);
    };
  }, [token]);

  return axioInstance;
};

export default useAxiosPrivate;
