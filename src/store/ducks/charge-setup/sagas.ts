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
} from './actions';
import { ChargeSetupDataType } from './types';
import { ApplicationState } from '../..';
import ChargeSetup from '../../../model/ChargeSetup';
import Page from '../../../model/Page';
import { parse } from '../../../model/CustomError';
import api from '../../../services/api';

export function* listChargeSetup(page: any) {
  try {
    const response: AxiosResponse<Page<ChargeSetup, ChargeSetup>> = yield call(
      api.post,
      '/charge-setup/page',
      page.payload,
    );
    const pageResponse = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      chargeSetup: state.chargeSetup,
    }));

    const { entity, list } = stateData.chargeSetup.data;

    const companyDataType: ChargeSetupDataType = {
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

export function* getAllChargeSetups() {
  try {
    const response: AxiosResponse<ChargeSetup[]> = yield call(api.get, `/charge-setup/find`);
    const list: ChargeSetup[] = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      chargeSetup: state.chargeSetup,
    }));
    const { entity, page } = stateData.chargeSetup.data;
    const companyDataType: ChargeSetupDataType = {
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

export function* getChargeSetup(data: any) {
  try {
    const response: AxiosResponse<ChargeSetup> = yield call(
      api.get,
      `/charge-setup/${data.payload}`,
    );
    const company: ChargeSetup = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      chargeSetup: state.chargeSetup,
    }));
    const { page, list } = stateData.chargeSetup.data;
    const companyDataType: ChargeSetupDataType = {
      page,
      entity: company,
      list,
    };
    yield put(getSuccess(companyDataType));
  } catch (err) {
    const error = err as AxiosError;
    yield put(getFailure(parse(error)));
  }
}

export function* createChargeSetup(data: any) {
  try {
    const response: AxiosResponse<ChargeSetup> = yield call(
      api.post,
      '/charge-setup',
      data.payload,
    );
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      chargeSetup: state.chargeSetup,
    }));
    const { page, list } = stateData.chargeSetup.data;
    const companyDataType: ChargeSetupDataType = {
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

export function* updateChargeSetup(data: any) {
  try {
    const response: AxiosResponse<ChargeSetup> = yield call(api.put, '/charge-setup', data.payload);
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      chargeSetup: state.chargeSetup,
    }));
    const { page, list } = stateData.chargeSetup.data;
    const companyDataType: ChargeSetupDataType = {
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
