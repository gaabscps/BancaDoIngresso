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
import { PrinterDataType } from './types';
import { checkUserCall } from '../check-user/actions';
import { ApplicationState } from '../..';
import { parse } from '../../../entities/CustomError';
import Page from '../../../entities/Page';
import Printer from '../../../entities/Printer';
import api from '../../../services/api';

export function* activatePrinter(data: any) {
  try {
    yield call(api.patch, `/printer/activate/${data.payload}`);
    yield put(activateSuccess());
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      yield put(checkUserCall());
    }
    yield put(activateFailure(parse(error)));
  }
}

export function* createPrinter(data: any) {
  try {
    const response: AxiosResponse<Printer> = yield call(api.post, '/printer', data.payload);
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      printer: state.printer,
    }));
    const { page, list } = stateData.printer.data;
    const dataType: PrinterDataType = {
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

export function* deletePrinter(data: any) {
  try {
    yield call(api.delete, `/printer/${data.payload}`);
    yield put(deleteSuccess());
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      yield put(checkUserCall());
    }
    yield put(deleteFailure(parse(error)));
  }
}

export function* getAllPrinters() {
  try {
    const response: AxiosResponse<Printer[]> = yield call(api.get, `/printer/find`);
    const list = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      printer: state.printer,
    }));
    const { entity, page } = stateData.printer.data;
    const dataType: PrinterDataType = {
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

export function* getPrinter(data: any) {
  try {
    const response: AxiosResponse<Printer> = yield call(api.get, `/printer/${data.payload}`);
    const entity = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      printer: state.printer,
    }));
    const { page, list } = stateData.printer.data;
    const dataType: PrinterDataType = {
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

export function* inactivatePrinter(data: any) {
  try {
    yield call(api.patch, `/printer/inactivate/${data.payload}`);
    yield put(inactivateSuccess());
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      yield put(checkUserCall());
    }
    yield put(inactivateFailure(parse(error)));
  }
}

export function* listPrinters(page: any) {
  try {
    const response: AxiosResponse<Page<Printer, Printer>> = yield call(
      api.post,
      '/printer/page',
      page.payload,
    );
    const pageResponse = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      printer: state.printer,
    }));

    const { entity, list } = stateData.printer.data;

    const dataType: PrinterDataType = {
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

export function* updatePrinter(data: any) {
  try {
    const response: AxiosResponse<Printer> = yield call(api.put, '/printer', data.payload);
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      printer: state.printer,
    }));
    const { page, list } = stateData.printer.data;
    const dataType: PrinterDataType = {
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
