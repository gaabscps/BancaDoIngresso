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
import { ContractorDataType } from './types';
import { ApplicationState } from '../..';
import { parse } from '../../../model/CustomError';
import api from '../../../services/api';
import Contractor from '../../../model/Contractor';
import Page from '../../../model/Page';

export function* activateContractor(data: any) {
  try {
    yield call(api.patch, `/contractor/activate/${data.payload}`);
    yield put(activateSuccess());
  } catch (err) {
    const error = err as AxiosError;
    yield put(activateFailure(parse(error)));
  }
}

export function* addContractorUsers(data: any) {
  try {
    yield call(api.post, '/contractor/user/', data.payload);
    yield put(addUserSuccess());
  } catch (err) {
    const error = err as AxiosError;
    yield put(addUserFailure(parse(error)));
  }
}

export function* createContractor(data: any) {
  try {
    const response: AxiosResponse<Contractor> = yield call(api.post, '/contractor', data.payload);
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      contractor: state.contractor,
    }));
    const { page, list } = stateData.contractor.data;
    const dataType: ContractorDataType = {
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

export function* deleteContractor(data: any) {
  try {
    yield call(api.delete, `/contractor/${data.payload}`);
    yield put(deleteSuccess());
  } catch (err) {
    const error = err as AxiosError;
    yield put(deleteFailure(parse(error)));
  }
}

export function* getAllContractors() {
  try {
    const response: AxiosResponse<Contractor[]> = yield call(api.get, `/contractor/find`);
    const list = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      contractor: state.contractor,
    }));
    const { entity, page } = stateData.contractor.data;
    const dataType: ContractorDataType = {
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

export function* getContractor(data: any) {
  try {
    const response: AxiosResponse<Contractor> = yield call(api.get, `/contractor/${data.payload}`);
    const entity = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      contractor: state.contractor,
    }));
    const { page, list } = stateData.contractor.data;
    const dataType: ContractorDataType = {
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

export function* inactivateContractor(data: any) {
  try {
    yield call(api.patch, `/contractor/inactivate/${data.payload}`);
    yield put(inactivateSuccess());
  } catch (err) {
    const error = err as AxiosError;
    yield put(inactivateFailure(parse(error)));
  }
}

export function* listContractors(page: any) {
  try {
    const response: AxiosResponse<Page<Contractor, Contractor>> = yield call(
      api.post,
      '/contractor/page',
      page.payload,
    );
    const pageResponse = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      contractor: state.contractor,
    }));

    const { entity, list } = stateData.contractor.data;

    const dataType: ContractorDataType = {
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

export function* updateContractor(data: any) {
  try {
    const response: AxiosResponse<Contractor> = yield call(api.put, '/contractor', data.payload);
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      contractor: state.contractor,
    }));
    const { page, list } = stateData.contractor.data;
    const dataType: ContractorDataType = {
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
