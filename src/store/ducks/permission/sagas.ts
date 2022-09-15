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
import { PermissionDataType } from './types';
import { ApplicationState } from '../..';
import { parse } from '../../../model/CustomError';
import api from '../../../services/api';
import Page from '../../../model/Page';
import Permission from '../../../model/Permission';

export function* activatePermission(data: any) {
  try {
    yield call(api.patch, `/permission/activate/${data.payload}`);
    yield put(activateSuccess());
  } catch (err) {
    const error = err as AxiosError;
    yield put(activateFailure(parse(error)));
  }
}

export function* createPermission(data: any) {
  try {
    const response: AxiosResponse<Permission> = yield call(api.post, '/permission', data.payload);
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      permission: state.permission,
    }));
    const { page, list } = stateData.permission.data;
    const dataType: PermissionDataType = {
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

export function* deletePermission(data: any) {
  try {
    yield call(api.delete, `/permission/${data.payload}`);
    yield put(deleteSuccess());
  } catch (err) {
    const error = err as AxiosError;
    yield put(deleteFailure(parse(error)));
  }
}

export function* getAllPermissions() {
  try {
    const response: AxiosResponse<Permission[]> = yield call(api.get, `/permission/find`);
    const list = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      permission: state.permission,
    }));
    const { entity, page } = stateData.permission.data;
    const dataType: PermissionDataType = {
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

export function* getPermission(data: any) {
  try {
    const response: AxiosResponse<Permission> = yield call(api.get, `/permission/${data.payload}`);
    const entity = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      permission: state.permission,
    }));
    const { page, list } = stateData.permission.data;
    const dataType: PermissionDataType = {
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

export function* inactivatePermission(data: any) {
  try {
    yield call(api.patch, `/permission/inactivate/${data.payload}`);
    yield put(inactivateSuccess());
  } catch (err) {
    const error = err as AxiosError;
    yield put(inactivateFailure(parse(error)));
  }
}

export function* listPermissions(page: any) {
  try {
    const response: AxiosResponse<Page<Permission, Permission>> = yield call(
      api.post,
      '/permission/page',
      page.payload,
    );
    const pageResponse = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      permission: state.permission,
    }));

    const { entity, list } = stateData.permission.data;

    const dataType: PermissionDataType = {
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

export function* updatePermission(data: any) {
  try {
    const response: AxiosResponse<Permission> = yield call(api.put, '/permission', data.payload);
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      permission: state.permission,
    }));
    const { page, list } = stateData.permission.data;
    const dataType: PermissionDataType = {
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
