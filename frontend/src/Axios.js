/* eslint-disable */
import axios from 'axios';
import apiConfig from './config';

const env = import.meta.env.VITE_NODE_ENV;

const getBaseUrl = () => {
  if (env === 'testing') {
    return apiConfig.test.API_BASE;
  }
  if (env === 'production') {
    return apiConfig.prod.API_BASE;
  }
  return apiConfig.dev.API_BASE;
};

const Axios = axios.create({
  baseURL: getBaseUrl(),
  timeout: 300000,
  mode: 'no-cors',
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
  headers: {
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${window.localStorage.getItem('token')}`,
  },
});

Axios.interceptors.request.use(
  settings => {
    const token = `Bearer ${window.localStorage.getItem('token')}`;
    if (token) {
      settings.headers.Authorization = token;
    }
    return settings;
  },
  error => {
    Promise.reject(error);
  }
);

Axios.defaults.headers.common['Content-Type'] = 'application/json';

export default Axios;
