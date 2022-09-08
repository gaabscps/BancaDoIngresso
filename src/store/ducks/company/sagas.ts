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
import { CompanyDataType } from './types';
import { ApplicationState } from '../..';
import { parse } from '../../../model/CustomError';
import api from '../../../services/api';
import Company from '../../../model/Company';
import Page from '../../../model/Page';

export function* listCompanies(page: any) {
  try {
    const response: AxiosResponse<Page<Company, Company>> = yield call(
      api.post,
      '/company/page',
      page.payload,
    );
    const pageResponse = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      company: state.company,
    }));

    const { entity, list } = stateData.company.data;

    const companyDataType: CompanyDataType = {
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

export function* getAllCompanies() {
  try {
    const response: AxiosResponse<Company[]> = yield call(api.get, `/company/find`);
    const list: Company[] = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      company: state.company,
    }));
    const { entity, page } = stateData.company.data;
    const companyDataType: CompanyDataType = {
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

export function* getCompany(data: any) {
  try {
    const response: AxiosResponse<Company> = yield call(api.get, `/company/${data.payload}`);
    const entity = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      company: state.company,
    }));
    const { page, list } = stateData.company.data;
    const companyDataType: CompanyDataType = {
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

export function* createCompany(data: any) {
  try {
    const response: AxiosResponse<Company> = yield call(api.post, '/company', data.payload);
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      company: state.company,
    }));
    const { page, list } = stateData.company.data;
    const companyDataType: CompanyDataType = {
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

export function* updateCompany(data: any) {
  try {
    const response: AxiosResponse<Company> = yield call(api.put, '/company', data.payload);
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      company: state.company,
    }));
    const { page, list } = stateData.company.data;
    const companyDataType: CompanyDataType = {
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

export function* activateCompany(data: any) {
  try {
    yield call(api.patch, `/company/activate/${data.payload}`);
    yield put(activateSuccess());
  } catch (err) {
    const error = err as AxiosError;
    yield put(activateFailure(parse(error)));
  }
}

export function* inactivateCompany(data: any) {
  try {
    yield call(api.patch, `/company/inactivate/${data.payload}`);
    yield put(inactivateSuccess());
  } catch (err) {
    const error = err as AxiosError;
    yield put(inactivateFailure(parse(error)));
  }
}

export function* deleteCompany(data: any) {
  try {
    yield call(api.delete, `/company/${data.payload}`);
    yield put(deleteSuccess());
  } catch (err) {
    const error = err as AxiosError;
    yield put(deleteFailure(parse(error)));
  }
}
