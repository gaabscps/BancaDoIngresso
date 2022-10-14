import axios, { AxiosRequestHeaders, AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { getItem, getBoolean, removeItem } from '@/helpers/common/localStorage';
import { Auth } from '@/model/Auth';
import handleSweetAlert from '@/helpers/sweetAlerts';
import { REACT_APP_BASE_URL, REACT_APP_SUFFIX_BASE_URL, REACT_APP_AUTH } from '@/utils/config';

const baseUrl = String(REACT_APP_BASE_URL);
const prefixBaseUrl = String(REACT_APP_SUFFIX_BASE_URL);
const appAuth = String(REACT_APP_AUTH);

export type AxiosErrorResponse = {
  message: string | string[];
};

const createHeader = (): AxiosRequestHeaders => {
  const isAuthenticated = getBoolean(appAuth);
  const headers: AxiosRequestHeaders = {
    ContentType: 'application/json',
  };
  if (isAuthenticated) {
    const authData: Auth = getItem(appAuth);
    headers.Authorization = `Bearer ${authData.token}`;
  }
  return headers;
};

const api = axios.create({
  baseURL: baseUrl + prefixBaseUrl,
  responseType: 'json',
  headers: createHeader(),
});

api.interceptors.request.use(config => {
  // eslint-disable-next-line no-param-reassign
  config.headers = createHeader();
  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    const { response, config } = error;
    const { data } = response;
    const originalRequest = config;

    if (response.status >= 500 && response.status < 600) {
      toast.error('Opss... Erro interno, tente novamente mais tarde!');

      // eslint-disable-next-line no-param-reassign
      error.message = error.response.data.message as string;
    }

    if (response.status === 401 && originalRequest.url.includes('/v1/adm/auth/refresh_token')) {
      removeItem(appAuth);
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

export { AxiosError };

export default api;
