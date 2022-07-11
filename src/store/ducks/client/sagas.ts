/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { call, put, select } from 'redux-saga/effects';
import { AxiosResponse, AxiosError } from 'axios';
import {
  activateSuccess,
  activateFailure,
  deleteSuccess,
  deleteFailure,
  getSuccess,
  getFailure,
  inactivateSuccess,
  inactivateFailure,
  listSuccess,
  listFailure,
  updateSuccess,
  updateFailure,
} from './actions';
import { ClientDataType } from './types';
import { parse } from '../../../entities/CustomError';
import api from '../../../services/api';
import Page from '../../../entities/Page';
import Client from '../../../entities/Client';
import { ApplicationState } from '../..';

export function* listClients(page: any) {
  try {
    const response: AxiosResponse<Page<Client, Client>> = yield call(
      api.post,
      '/client/find',
      page.payload,
    );
    const pageResponse = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      client: state.client,
    }));

    const { entity, list } = stateData.client.data;

    const dataType: ClientDataType = {
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

export function* getClient(data: any) {
  try {
    const response: AxiosResponse<Client> = yield call(api.get, `/client/${data.payload}`);
    const entity = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      client: state.client,
    }));
    const { page, list } = stateData.client.data;
    const dataType: ClientDataType = {
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

export function* updateClient(data: any) {
  try {
    const response: AxiosResponse<Client> = yield call(api.put, '/client/', data.payload);
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      client: state.client,
    }));
    const { page, list } = stateData.client.data;
    const dataType: ClientDataType = {
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

export function* activateClient(data: any) {
  try {
    yield call(api.patch, `/client/activate/${data.payload}`);
    yield put(activateSuccess());
  } catch (err) {
    const error = err as AxiosError;
    yield put(activateFailure(parse(error)));
  }
}

export function* inactivateClient(data: any) {
  try {
    yield call(api.patch, `/client/inactivate/${data.payload}`);
    yield put(inactivateSuccess());
  } catch (err) {
    const error = err as AxiosError;
    yield put(inactivateFailure(parse(error)));
  }
}

export function* deleteClient(data: any) {
  try {
    yield call(api.delete, `/client/${data.payload}`);
    yield put(deleteSuccess());
  } catch (err) {
    const error = err as AxiosError;
    yield put(deleteFailure(parse(error)));
  }
}
