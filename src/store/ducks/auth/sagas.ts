/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { call, put, select } from 'redux-saga/effects';
import { AxiosResponse, AxiosError } from 'axios';
import { Buffer } from 'buffer';
import { toast } from 'react-toastify';
import {
  loginSuccess,
  loginFailure,
  recoverPasswordSuccess,
  recoverPasswordFailure,
  changePasswordSuccess,
  changePasswordFailure,
  refreshTokenSuccess,
  refreshTokenFailure,
} from './actions';
import { parse } from '../../../entities/CustomError';
import api from '../../../services/api';
import { ApplicationState } from '../..';
import Auth from '../../../entities/Auth';
import RecoverEmail from '../../../entities/RecoverEmail';
import RecoverLogin from '../../../entities/RecoverLogin';

export function* authLogin(data: any) {
  try {
    const { userName, password } = data.payload;
    const initialToken = Buffer.from(`${userName}:${password}`, 'utf8').toString('base64');
    const response: AxiosResponse<Auth> = yield call(
      api.post,
      '/auth',
      {
        grant_type: 'client_credentials',
      },
      {
        headers: {
          Authorization: `Basic ${initialToken}`,
        },
      },
    );
    const auth = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      auth: state.auth,
    }));

    const authData = stateData.auth.data;
    authData.login = auth;
    yield put(loginSuccess(authData));
  } catch (err) {
    const error = err as AxiosError;
    console.log(error);
    if (error?.response?.statusText === 'Bad Request') {
      toast.error('Ops... Credênciais Inválidas');
    }
    yield put(loginFailure(parse(error)));
  }
}

export function* authRecoverPassword(data: any) {
  try {
    const response: AxiosResponse<RecoverEmail> = yield call(api.post, '/auth/recover-password', {
      login: data.payload,
    });
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      auth: state.auth,
    }));
    const authData = stateData.auth.data;
    authData.changePassword = undefined as unknown as RecoverLogin;
    authData.recoverPassword = response.data;
    yield put(recoverPasswordSuccess(authData));
  } catch (err) {
    const error = err as AxiosError;
    if (error?.response?.statusText === 'Not Found') {
      toast.error('Ops... Esse CPF não foi encontrado');
    } else {
      yield put(recoverPasswordFailure(parse(error)));
    }
  }
}

export function* authChangePassword(data: any) {
  try {
    const response: AxiosResponse<RecoverLogin> = yield call(
      api.post,
      '/auth/change-password',
      data.payload,
    );

    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      auth: state.auth,
    }));
    const authData = stateData.auth.data;
    authData.changePassword = response.data;
    authData.recoverPassword = undefined as unknown as RecoverEmail;
    yield put(changePasswordSuccess(authData));
  } catch (err) {
    const error = err as AxiosError;
    yield put(changePasswordFailure(parse(error)));
  }
}

export function* authRefreshToken() {
  try {
    const response: AxiosResponse<Auth> = yield call(api.get, '/auth/refresh-token');
    const refreshToken = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      auth: state.auth,
    }));

    const authData = stateData.auth.data;
    authData.refreshToken = refreshToken;
    yield put(refreshTokenSuccess(authData));
  } catch (err) {
    const error = err as AxiosError;
    yield put(refreshTokenFailure(parse(error)));
  }
}
