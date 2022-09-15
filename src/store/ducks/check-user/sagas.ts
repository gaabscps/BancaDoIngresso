/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { call, put, select } from 'redux-saga/effects';
import { AxiosError, AxiosResponse } from 'axios';
import { setItem } from '@/helpers/common/localStorage';
import { REACT_APP_AUTH } from '@/utils/config';
import { parse } from '@/model/CustomError';
import { Auth } from '@/model/Auth';
import api from '@/services/api';
import { checkUserFailure, checkUserSuccess } from './actions';
import { refreshTokenFailure, refreshTokenSuccess } from '../auth/actions';
import { ApplicationState } from '../..';

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
    setItem(String(REACT_APP_AUTH), stateData.auth.data.refreshToken);
    yield put(checkUserSuccess());
  } catch (err) {
    const error = err as AxiosError;
    yield put(refreshTokenFailure(parse(error)));
    yield put(checkUserFailure(parse(error)));
  }
}
