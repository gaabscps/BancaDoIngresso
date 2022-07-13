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
import { PaymentGatewayDataType } from './types';
import { checkUserCall } from '../check-user/actions';
import { ApplicationState } from '../..';
import { parse } from '../../../entities/CustomError';
import Page from '../../../entities/Page';
import PaymentGateway from '../../../entities/PaymentGateway';
import api from '../../../services/api';

export function* activatePaymentGateway(data: any) {
  try {
    yield call(api.patch, `/payment-gateway/activate/${data.payload}`);
    yield put(activateSuccess());
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      yield put(checkUserCall());
    }
    yield put(activateFailure(parse(error)));
  }
}

export function* createPaymentGateway(data: any) {
  try {
    const response: AxiosResponse<PaymentGateway> = yield call(
      api.post,
      '/payment-gateway',
      data.payload,
    );
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      paymentGateway: state.paymentGateway,
    }));
    const { page, list } = stateData.paymentGateway.data;
    const dataType: PaymentGatewayDataType = {
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

export function* deletePaymentGateway(data: any) {
  try {
    yield call(api.delete, `/payment-gateway/${data.payload}`);
    yield put(deleteSuccess());
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      yield put(checkUserCall());
    }
    yield put(deleteFailure(parse(error)));
  }
}

export function* getAllPaymentGateways() {
  try {
    const response: AxiosResponse<PaymentGateway[]> = yield call(api.get, `/payment-gateway/find`);
    const list = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      paymentGateway: state.paymentGateway,
    }));
    const { entity, page } = stateData.paymentGateway.data;
    const dataType: PaymentGatewayDataType = {
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

export function* getPaymentGateway(data: any) {
  try {
    const response: AxiosResponse<PaymentGateway> = yield call(
      api.get,
      `/payment-gateway/${data.payload}`,
    );
    const entity = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      paymentGateway: state.paymentGateway,
    }));
    const { page, list } = stateData.paymentGateway.data;
    const dataType: PaymentGatewayDataType = {
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

export function* inactivatePaymentGateway(data: any) {
  try {
    yield call(api.patch, `/payment-gateway/inactivate/${data.payload}`);
    yield put(inactivateSuccess());
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      yield put(checkUserCall());
    }
    yield put(inactivateFailure(parse(error)));
  }
}

export function* listPaymentGateways(page: any) {
  try {
    const response: AxiosResponse<Page<PaymentGateway, PaymentGateway>> = yield call(
      api.post,
      '/payment-gateway/page',
      page.payload,
    );
    const pageResponse = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      paymentGateway: state.paymentGateway,
    }));

    const { entity, list } = stateData.paymentGateway.data;

    const dataType: PaymentGatewayDataType = {
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

export function* updatePaymentGateway(data: any) {
  try {
    const response: AxiosResponse<PaymentGateway> = yield call(
      api.put,
      '/payment-gateway',
      data.payload,
    );
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      paymentGateway: state.paymentGateway,
    }));
    const { page, list } = stateData.paymentGateway.data;
    const dataType: PaymentGatewayDataType = {
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
