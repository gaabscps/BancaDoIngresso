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
import { ModuleDataType } from './types';
import { ApplicationState } from '../..';
import { parse } from '../../../model/CustomError';
import api from '../../../services/api';
import Module from '../../../model/Module';
import Page from '../../../model/Page';

export function* activateModule(data: any) {
  try {
    yield call(api.patch, `/module/activate/${data.payload}`);
    yield put(activateSuccess());
  } catch (err) {
    const error = err as AxiosError;
    yield put(activateFailure(parse(error)));
  }
}

export function* createModule(data: any) {
  try {
    const response: AxiosResponse<Module> = yield call(api.post, '/module', data.payload);
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      module: state.module,
    }));
    const { page, list } = stateData.module.data;
    const dataType: ModuleDataType = {
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

export function* deleteModule(data: any) {
  try {
    yield call(api.delete, `/module/${data.payload}`);
    yield put(deleteSuccess());
  } catch (err) {
    const error = err as AxiosError;
    yield put(deleteFailure(parse(error)));
  }
}

export function* getAllModules() {
  try {
    const response: AxiosResponse<Module[]> = yield call(api.get, `/module/find`);
    const list = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      module: state.module,
    }));
    const { entity, page } = stateData.module.data;
    const dataType: ModuleDataType = {
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

export function* getModule(data: any) {
  try {
    const response: AxiosResponse<Module> = yield call(api.get, `/module/${data.payload}`);
    const entity = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      module: state.module,
    }));
    const { page, list } = stateData.module.data;
    const dataType: ModuleDataType = {
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

export function* inactivateModule(data: any) {
  try {
    yield call(api.patch, `/module/inactivate/${data.payload}`);
    yield put(inactivateSuccess());
  } catch (err) {
    const error = err as AxiosError;
    yield put(inactivateFailure(parse(error)));
  }
}

export function* listModules(page: any) {
  try {
    const response: AxiosResponse<Page<Module, Module>> = yield call(
      api.post,
      '/module/page',
      page.payload,
    );
    const pageResponse = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      module: state.module,
    }));

    const { entity, list } = stateData.module.data;

    const dataType: ModuleDataType = {
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

export function* updateModule(data: any) {
  try {
    const response: AxiosResponse<Module> = yield call(api.put, '/module', data.payload);
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      module: state.module,
    }));
    const { page, list } = stateData.module.data;
    const dataType: ModuleDataType = {
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
