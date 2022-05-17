import axios from "axios";
import { toast } from "react-toastify";
import handleSweetAlert from "../helpers/sweetAlerts";

import {
  getLocalStorage,
  removeAuthLocalStorage,
  setAuthLocalStorage,
} from "../helpers/localStorage";

const baseUrl = process.env.REACT_APP_BASE_URL;
const prefixBaseUrl = process.env.REACT_APP_SUFFIX_BASE_URL;
// const token = process.env.REACT_APP_AUTH;
// const user = process.env.REACT_APP_USER;
// const tempToken = process.env.REACT_APP_TEMP_TOKEN;

const api = axios.create({
  baseURL: baseUrl + prefixBaseUrl,
  responseType: "json",
  headers: {
    ContentType: "application/json",
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { response, config } = error;
    const { data } = response;
    const originalRequest = config;
    if (response.status !== 401 && data?.message) {
      const { message } = data;
      toast.warn(`Opss... ${message}`, {});
    }

    if (
      response.status === 401 &&
      originalRequest.url.includes("/v1/adm/auth/refresh_token")
    ) {
      removeAuthLocalStorage();
      handleSweetAlert(
        "warn",
        "Opss...",
        "Foi detectado um grande periodo de inatividade, logue-se novamente!"
      );
      setTimeout(() => {
        window.location.reload();
      }, 4000);
      return Promise.reject(error);
    }

    if (response.status !== 401 && response?.data?.errors?.length) {
      return Promise.reject(error);
    }

    if (data?.details?.length) {
      let error = "";

      for (const detail of data?.details) {
        error += `${detail} \n`;
      }

      handleSweetAlert("warn", "Opss...", null, 3000, error);
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default api;
