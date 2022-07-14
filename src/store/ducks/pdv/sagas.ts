/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { call, put, select } from 'redux-saga/effects';
import { AxiosResponse, AxiosError } from 'axios';
import {
  activateFailure,
  activateSuccess,
  addUserFailure,
  addUserSuccess,
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
import { PdvDataType } from './types';
import { ApplicationState } from '../..';
import { parse } from '../../../entities/CustomError';
import Page from '../../../entities/Page';
import Pdv from '../../../entities/Pdv';
import api from '../../../services/api';

export function* activatePdv(data: any) {
  try {
    yield call(api.patch, `/pdv/activate/${data.payload}`);
    yield put(activateSuccess());
  } catch (err) {
    const error = err as AxiosError;
    yield put(activateFailure(parse(error)));
  }
}

export function* addPdvUsers(data: any) {
  try {
    yield call(api.post, '/pdv/user/', data.payload);
    yield put(addUserSuccess());
  } catch (err) {
    const error = err as AxiosError;
    yield put(addUserFailure(parse(error)));
  }
}

export function* createPdv(data: any) {
  try {
    const response: AxiosResponse<Pdv> = yield call(api.post, '/pdv', data.payload);
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      pdv: state.pdv,
    }));
    const { page, list } = stateData.pdv.data;
    const dataType: PdvDataType = {
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

export function* deletePdv(data: any) {
  try {
    yield call(api.delete, `/pdv/${data.payload}`);
    yield put(deleteSuccess());
  } catch (err) {
    const error = err as AxiosError;
    yield put(deleteFailure(parse(error)));
  }
}

export function* getAllPdvs() {
  try {
    const response: AxiosResponse<Pdv[]> = yield call(api.get, `/pdv/find`);
    const list = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      pdv: state.pdv,
    }));
    const { entity, page } = stateData.pdv.data;
    const dataType: PdvDataType = {
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

export function* getPdv(data: any) {
  try {
    const response: AxiosResponse<Pdv> = yield call(api.get, `/pdv/${data.payload}`);
    const entity = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      pdv: state.pdv,
    }));
    const { page, list } = stateData.pdv.data;
    const dataType: PdvDataType = {
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

export function* inactivatePdv(data: any) {
  try {
    yield call(api.patch, `/pdv/inactivate/${data.payload}`);
    yield put(inactivateSuccess());
  } catch (err) {
    const error = err as AxiosError;
    yield put(inactivateFailure(parse(error)));
  }
}

export function* listPdvs(page: any) {
  try {
    const response: AxiosResponse<Page<Pdv, Pdv>> = yield call(api.post, '/pdv/page', page.payload);
    const pageResponse = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      pdv: state.pdv,
    }));

    const { entity, list } = stateData.pdv.data;

    const dataType: PdvDataType = {
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

export function* updatePdv(data: any) {
  try {
    const response: AxiosResponse<Pdv> = yield call(api.put, '/pdv', data.payload);
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      pdv: state.pdv,
    }));
    const { page, list } = stateData.pdv.data;
    const dataType: PdvDataType = {
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
