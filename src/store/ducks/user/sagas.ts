/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { call, put, select } from 'redux-saga/effects';
import { AxiosResponse, AxiosError } from 'axios';
import {
  activateFailure,
  activateSuccess,
  createFailure,
  createSuccess,
  deleteFailure,
  deleteSuccess,
  getAllFailure,
  getAllSuccess,
  getFailure,
  getSuccess,
  inactivateFailure,
  inactivateSuccess,
  listFailure,
  listSuccess,
  updateSuccess,
  updateFailure,
} from './actions';
import { UserDataType } from './types';
import { ApplicationState } from '../..';
import { parse } from '../../../entities/CustomError';
import api from '../../../services/api';
import Page from '../../../entities/Page';
import User from '../../../entities/User';

export function* activateUser(data: any) {
  try {
    yield call(api.patch, `/user/activate/${data.payload}`);
    yield put(activateSuccess());
  } catch (err) {
    const error = err as AxiosError;
    yield put(activateFailure(parse(error)));
  }
}

export function* createUser(data: any) {
  try {
    const response: AxiosResponse<User> = yield call(api.post, '/user', data.payload);
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      user: state.user,
    }));
    const { page, list } = stateData.user.data;
    const dataType: UserDataType = {
      page,
      entity: response.data,
      list,
    };
    yield put(createSuccess(dataType));
  } catch (err) {
    const error = err as AxiosError;
    yield put(createFailure(parse(error)));
  }
}

export function* deleteUser(data: any) {
  try {
    yield call(api.delete, `/user/${data.payload}`);
    yield put(deleteSuccess());
  } catch (err) {
    const error = err as AxiosError;
    yield put(deleteFailure(parse(error)));
  }
}

export function* getAllUsers() {
  try {
    const response: AxiosResponse<User[]> = yield call(api.get, `/user/find`);
    const list = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      user: state.user,
    }));
    const { entity, page } = stateData.user.data;
    const dataType: UserDataType = {
      page,
      entity,
      list,
    };
    yield put(getAllSuccess(dataType));
  } catch (err) {
    const error = err as AxiosError;
    yield put(getAllFailure(parse(error)));
  }
}

export function* getUser(data: any) {
  try {
    const response: AxiosResponse<User> = yield call(api.get, `/user/${data.payload}`);
    const entity = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      user: state.user,
    }));
    const { page, list } = stateData.user.data;
    const dataType: UserDataType = {
      page,
      entity,
      list,
    };
    yield put(getSuccess(dataType));
  } catch (err) {
    const error = err as AxiosError;
    yield put(getFailure(parse(error)));
  }
}

export function* inactivateUser(data: any) {
  try {
    yield call(api.patch, `/user/inactivate/${data.payload}`);
    yield put(inactivateSuccess());
  } catch (err) {
    const error = err as AxiosError;
    yield put(inactivateFailure(parse(error)));
  }
}

export function* listUsers(page: any) {
  try {
    const response: AxiosResponse<Page<User, User>> = yield call(
      api.post,
      '/user/page',
      page.payload,
    );
    const pageResponse = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      user: state.user,
    }));

    const { entity, list } = stateData.user.data;

    const dataType: UserDataType = {
      page: pageResponse,
      entity,
      list,
    };
    yield put(listSuccess(dataType));
  } catch (err) {
    const error = err as AxiosError;
    yield put(listFailure(parse(error)));
  }
}

export function* updateUser(data: any) {
  try {
    const response: AxiosResponse<User> = yield call(api.put, '/user', data.payload);
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      user: state.user,
    }));
    const { page, list } = stateData.user.data;
    const dataType: UserDataType = {
      page,
      entity: response.data,
      list,
    };
    yield put(updateSuccess(dataType));
  } catch (err) {
    const error = err as AxiosError;
    yield put(updateFailure(parse(error)));
  }
}
