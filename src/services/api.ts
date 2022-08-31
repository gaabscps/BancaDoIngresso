import axios, { AxiosRequestHeaders } from 'axios';
import { toast } from 'react-toastify';
import handleSweetAlert from '../helpers/sweetAlerts';

import { getLocalStorage, removeAuthLocalStorage } from '../helpers/localStorage';

const baseUrl = process.env.REACT_APP_BASE_URL as string;
const prefixBaseUrl = process.env.REACT_APP_SUFFIX_BASE_URL as string;

const mountHeader = (): AxiosRequestHeaders => {
  const token = getLocalStorage(process.env.REACT_APP_AUTH as string);
  const headers: AxiosRequestHeaders = {
    ContentType: 'application/json',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

const api = axios.create({
  baseURL: baseUrl + prefixBaseUrl,
  responseType: 'json',
  headers: mountHeader(),
});

api.interceptors.response.use(
  response => response,
  async error => {
    const { response, config } = error;
    const { data } = response;
    const originalRequest = config;
    // if ((response.status === 401 || response.status === 403) && data?.message) {
    if (response.status === 403 && data?.message) {
      const { message } = data;
      toast.error(`Opss... ${message}`, {});
    }

    if (response.status >= 500 && response.status < 600) {
      toast.error('Opss... Erro interno, tente novamente mais tarde!');
    }

    if (response.status === 401 && originalRequest.url.includes('/v1/adm/auth/refresh_token')) {
      removeAuthLocalStorage();
      handleSweetAlert(
        'warn',
        'Opss...',
        'Foi detectado um grande periodo de inatividade, logue-se novamente!',
      );
      setTimeout(() => {
        window.location.reload();
      }, 4000);
      return Promise.reject(error);
    }

    if (response.status !== 401 && response?.data?.errors?.length) {
      return Promise.reject(error);
    }

    if (data && data.detail && data.detail.length > 0) {
      let errors = '';
      data.detail.forEach((value: string) => {
        errors += `${value} \n`;
      });
      handleSweetAlert('warn', 'Opss...', null, errors);
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export default api;
