/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { call, put, select } from 'redux-saga/effects';
import { AxiosError, AxiosResponse } from 'axios';
import { checkUserFailure, checkUserSuccess } from './actions';
import { parse } from '../../../entities/CustomError';
import { ApplicationState } from '../..';
import { setAuthLocalStorage } from '../../../helpers/localStorage';
import Auth from '../../../entities/Auth';
import api from '../../../services/api';
import { refreshTokenFailure, refreshTokenSuccess } from '../auth/actions';

export function* checkUser() {
  try {
    const response: AxiosResponse<Auth> = yield call(api.get, '/auth/refresh-token');
    const refreshToken = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      auth: state.auth,
    }));
    const authData = stateData.auth.data;
    authData.refreshToken = refreshToken;
    yield put(refreshTokenSuccess(authData));
    setAuthLocalStorage(stateData.auth.data.refreshToken, true);
    yield put(checkUserSuccess());
  } catch (err) {
    const error = err as AxiosError;
    yield put(refreshTokenFailure(parse(error)));
    yield put(checkUserFailure(parse(error)));
  }
}
