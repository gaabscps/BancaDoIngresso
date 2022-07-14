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
import { SubPdvDataType } from './types';
import { ApplicationState } from '../..';
import { parse } from '../../../entities/CustomError';
import Page from '../../../entities/Page';
import SubPdv from '../../../entities/SubPdv';
import api from '../../../services/api';

export function* activateSubPdv(data: any) {
  try {
    yield call(api.patch, `/sub-pdv/activate/${data.payload}`);
    yield put(activateSuccess());
  } catch (err) {
    const error = err as AxiosError;
    yield put(activateFailure(parse(error)));
  }
}

export function* addSubPdvUsers(data: any) {
  try {
    yield call(api.post, '/sub-pdv/user/', data.payload);
    yield put(addUserSuccess());
  } catch (err) {
    const error = err as AxiosError;
    yield put(addUserFailure(parse(error)));
  }
}

export function* createSubPdv(data: any) {
  try {
    const response: AxiosResponse<SubPdv> = yield call(api.post, '/sub-pdv', data.payload);
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      subPdv: state.subPdv,
    }));
    const { page, list } = stateData.subPdv.data;
    const dataType: SubPdvDataType = {
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

export function* deleteSubPdv(data: any) {
  try {
    yield call(api.delete, `/sub-pdv/${data.payload}`);
    yield put(deleteSuccess());
  } catch (err) {
    const error = err as AxiosError;
    yield put(deleteFailure(parse(error)));
  }
}

export function* getAllSubPdvs() {
  try {
    const response: AxiosResponse<SubPdv[]> = yield call(api.get, `/sub-pdv/find`);
    const list = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      subPdv: state.subPdv,
    }));
    const { entity, page } = stateData.subPdv.data;
    const dataType: SubPdvDataType = {
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

export function* getSubPdv(data: any) {
  try {
    const response: AxiosResponse<SubPdv> = yield call(api.get, `/sub-pdv/${data.payload}`);
    const entity = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      subPdv: state.subPdv,
    }));
    const { page, list } = stateData.subPdv.data;
    const dataType: SubPdvDataType = {
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

export function* inactivateSubPdv(data: any) {
  try {
    yield call(api.patch, `/sub-pdv/inactivate/${data.payload}`);
    yield put(inactivateSuccess());
  } catch (err) {
    const error = err as AxiosError;
    yield put(inactivateFailure(parse(error)));
  }
}

export function* listSubPdvs(page: any) {
  try {
    const response: AxiosResponse<Page<SubPdv, SubPdv>> = yield call(
      api.post,
      '/sub-pdv/page',
      page.payload,
    );
    const pageResponse = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      subPdv: state.subPdv,
    }));

    const { entity, list } = stateData.subPdv.data;

    const dataType: SubPdvDataType = {
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

export function* updateSubPdv(data: any) {
  try {
    const response: AxiosResponse<SubPdv> = yield call(api.put, '/sub-pdv', data.payload);
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      subPdv: state.subPdv,
    }));
    const { page, list } = stateData.subPdv.data;
    const dataType: SubPdvDataType = {
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
