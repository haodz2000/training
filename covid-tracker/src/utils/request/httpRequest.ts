import axios from 'axios';
export const axioInstance = axios.create({
  baseURL: process.env.REACT_APP_API_HOST
});
