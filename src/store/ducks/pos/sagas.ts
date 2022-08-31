/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { call, put, select } from 'redux-saga/effects';
import { AxiosResponse, AxiosError } from 'axios';
import {
  createFailure,
  createSuccess,
  deleteFailure,
  deleteSuccess,
  getAllFailure,
  getAllSuccess,
  getFailure,
  getSuccess,
  listFailure,
  listSuccess,
  updateSuccess,
  updateFailure,
} from './actions';
import { PosDataType } from './types';
import { checkUserCall } from '../check-user/actions';
import { ApplicationState } from '../..';
import { parse } from '../../../entities/CustomError';
import Page from '../../../entities/Page';
import Pos from '../../../entities/Pos';
import api from '../../../services/api';

export function* createPos(data: any) {
  try {
    const response: AxiosResponse<Pos> = yield call(api.post, '/pos', data.payload);
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      pos: state.pos,
    }));
    const { page, list } = stateData.pos.data;
    const dataType: PosDataType = {
      page,
      entity: response.data,
      list,
    };
    yield put(createSuccess(dataType));
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      yield put(checkUserCall());
    }
    yield put(createFailure(parse(error)));
  }
}

export function* deletePos(data: any) {
  try {
    yield call(api.delete, `/pos/${data.payload}`);
    yield put(deleteSuccess());
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      yield put(checkUserCall());
    }
    yield put(deleteFailure(parse(error)));
  }
}

export function* getAllPoss() {
  try {
    const response: AxiosResponse<Pos[]> = yield call(api.get, `/pos/find`);
    const list = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      pos: state.pos,
    }));
    const { entity, page } = stateData.pos.data;
    const dataType: PosDataType = {
      page,
      entity,
      list,
    };
    yield put(getAllSuccess(dataType));
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      yield put(checkUserCall());
    }
    yield put(getAllFailure(parse(error)));
  }
}

export function* getPos(data: any) {
  try {
    const response: AxiosResponse<Pos> = yield call(api.get, `/pos/${data.payload}`);
    const entity = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      pos: state.pos,
    }));
    const { page, list } = stateData.pos.data;
    const dataType: PosDataType = {
      page,
      entity,
      list,
    };
    yield put(getSuccess(dataType));
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      yield put(checkUserCall());
    }
    yield put(getFailure(parse(error)));
  }
}

export function* listPoss(page: any) {
  try {
    const response: AxiosResponse<Page<Pos, Pos>> = yield call(api.post, '/pos/page', page.payload);
    const pageResponse = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      pos: state.pos,
    }));

    const { entity, list } = stateData.pos.data;

    const dataType: PosDataType = {
      page: pageResponse,
      entity,
      list,
    };
    yield put(listSuccess(dataType));
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      yield put(checkUserCall());
    }
    yield put(listFailure(parse(error)));
  }
}

export function* updatePos(data: any) {
  try {
    const response: AxiosResponse<Pos> = yield call(api.put, '/pos', data.payload);
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      pos: state.pos,
    }));
    const { page, list } = stateData.pos.data;
    const dataType: PosDataType = {
      page,
      entity: response.data,
      list,
    };
    yield put(updateSuccess(dataType));
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      yield put(checkUserCall());
    }
    yield put(updateFailure(parse(error)));
  }
}
