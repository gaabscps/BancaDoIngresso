/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { call, put } from 'redux-saga/effects';
import { AxiosResponse, AxiosError } from 'axios';
import { getSuccess, getFailure } from './actions';
import { parse } from '../../../entities/CustomError';
import api from '../../../services/api';
import Home from '../../../entities/Home';

export function* getHome() {
  try {
    const response: AxiosResponse<Home> = yield call(api.get, '/home');
    const entity = response.data;
    console.log('entity', entity);
    yield put(getSuccess(entity));
  } catch (err) {
    const error = err as AxiosError;
    yield put(getFailure(parse(error)));
  }
}
