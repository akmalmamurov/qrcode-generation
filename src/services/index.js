import axios from 'axios';
import { getCookie } from '@/utils/cookie';
import * as API from '@/constants/api';

const request = axios.create({
  baseURL: API.DOMAIN_NAME,
  headers: {
    'Content-Type': 'application/json',
  }
});

request.interceptors.request.use((config) => {
  const token = getCookie('_auth');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default request;
