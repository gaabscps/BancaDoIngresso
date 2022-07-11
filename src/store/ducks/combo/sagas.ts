/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { call, put, select } from 'redux-saga/effects';
import { AxiosResponse, AxiosError } from 'axios';
import {
  listSuccess,
  listFailure,
  getAllSuccess,
  getAllFailure,
  getSuccess,
  getFailure,
  createSuccess,
  createFailure,
  updateSuccess,
  updateFailure,
  activateSuccess,
  activateFailure,
  inactivateSuccess,
  inactivateFailure,
  deleteSuccess,
  deleteFailure,
} from './actions';
import { ComboDataType } from './types';
import { ApplicationState } from '../..';
import { parse } from '../../../entities/CustomError';
import api from '../../../services/api';
import Combo from '../../../entities/Combo';
import Page from '../../../entities/Page';

export function* listCombos(page: any) {
  try {
    const response: AxiosResponse<Page<Combo, Combo>> = yield call(
      api.post,
      '/combo/page',
      page.payload,
    );
    const pageResponse = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      combo: state.combo,
    }));

    const { entity, list } = stateData.combo.data;

    const companyDataType: ComboDataType = {
      page: pageResponse,
      entity,
      list,
    };
    yield put(listSuccess(companyDataType));
  } catch (err) {
    const error = err as AxiosError;
    yield put(listFailure(parse(error)));
  }
}

export function* getAllCombos() {
  try {
    const response: AxiosResponse<Combo[]> = yield call(api.get, `/combo/find`);
    const list: Combo[] = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      combo: state.combo,
    }));
    const { entity, page } = stateData.combo.data;
    const companyDataType: ComboDataType = {
      page,
      entity,
      list,
    };
    yield put(getAllSuccess(companyDataType));
  } catch (err) {
    const error = err as AxiosError;
    yield put(getAllFailure(parse(error)));
  }
}

export function* getCombo(data: any) {
  try {
    const response: AxiosResponse<Combo> = yield call(api.get, `/combo/${data.payload}`);
    const entity = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      combo: state.combo,
    }));
    const { page, list } = stateData.combo.data;
    const companyDataType: ComboDataType = {
      page,
      entity,
      list,
    };
    yield put(getSuccess(companyDataType));
  } catch (err) {
    const error = err as AxiosError;
    yield put(getFailure(parse(error)));
  }
}

export function* createCombo(data: any) {
  try {
    const response: AxiosResponse<Combo> = yield call(api.post, '/combo', data.payload);
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      combo: state.combo,
    }));
    const { page, list } = stateData.combo.data;
    const companyDataType: ComboDataType = {
      page,
      entity: response.data,
      list,
    };
    yield put(createSuccess(companyDataType));
  } catch (err) {
    const error = err as AxiosError;
    yield put(createFailure(parse(error)));
  }
}

export function* updateCombo(data: any) {
  try {
    const response: AxiosResponse<Combo> = yield call(api.put, '/combo', data.payload);
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      combo: state.combo,
    }));
    const { page, list } = stateData.combo.data;
    const companyDataType: ComboDataType = {
      page,
      entity: response.data,
      list,
    };
    yield put(updateSuccess(companyDataType));
  } catch (err) {
    const error = err as AxiosError;
    yield put(updateFailure(parse(error)));
  }
}

export function* activateCombo(data: any) {
  try {
    yield call(api.patch, `/combo/activate/${data.payload}`);
    yield put(activateSuccess());
  } catch (err) {
    const error = err as AxiosError;
    yield put(activateFailure(parse(error)));
  }
}

export function* inactivateCombo(data: any) {
  try {
    yield call(api.patch, `/combo/inactivate/${data.payload}`);
    yield put(inactivateSuccess());
  } catch (err) {
    const error = err as AxiosError;
    yield put(inactivateFailure(parse(error)));
  }
}

export function* deleteCombo(data: any) {
  try {
    yield call(api.delete, `/combo/${data.payload}`);
    yield put(deleteSuccess());
  } catch (err) {
    const error = err as AxiosError;
    yield put(deleteFailure(parse(error)));
  }
}
