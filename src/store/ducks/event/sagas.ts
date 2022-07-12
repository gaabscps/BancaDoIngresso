/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { call, put, select } from 'redux-saga/effects';
import { AxiosResponse, AxiosError } from 'axios';
import { ApplicationState } from '../..';
import {
  listSuccess,
  listFailure,
  generalInformationFailure,
  generalInformationSuccess,
  getAllSuccess,
  getAllFailure,
  getSuccess,
  getFailure,
} from './actions';

import { checkUserCall } from '../check-user/actions';
import { EventDataType } from './types';
import { parse } from '../../../entities/CustomError';
import Event from '../../../entities/Event';
import EventFind from '../../../entities/EventFind';
import EventGeneralInformation, {
  parseGeneralInformation,
} from '../../../entities/EventGeneralInformation';
import Page from '../../../entities/Page';
import api from '../../../services/api';

export function* listEvents(page: any) {
  try {
    const response: AxiosResponse<Page<EventFind, Event>> = yield call(
      api.post,
      '/event/page',
      page.payload,
    );
    const pageResponse = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      event: state.event,
    }));

    const { eventGeneralInformation, list } = stateData.event.data;

    const dataType: EventDataType = {
      page: pageResponse,
      eventGeneralInformation,
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

export function* getEvent(data: any) {
  try {
    const response: AxiosResponse<Event> = yield call(api.get, `/event/${data.payload}`);
    const event = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      event: state.event,
    }));
    const eventGeneralInformation = parseGeneralInformation(event);
    const { page, list } = stateData.event.data;
    const dataType: EventDataType = {
      page,
      eventGeneralInformation,
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

export function* getAllEvents() {
  try {
    const response: AxiosResponse<Event[]> = yield call(api.get, `/event/find`);
    const list = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      event: state.event,
    }));
    const { eventGeneralInformation, page } = stateData.event.data;
    const dataType: EventDataType = {
      page,
      eventGeneralInformation,
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

export function* generalInformationEvent(data: any) {
  try {
    const response: AxiosResponse<EventGeneralInformation> = yield call(
      api.post,
      '/event/general-information',
      data.payload,
    );
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      event: state.event,
    }));
    const { page, list } = stateData.event.data;
    const companyDataType: EventDataType = {
      page,
      eventGeneralInformation: response.data,
      list,
    };
    yield put(generalInformationSuccess(companyDataType));
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      yield put(checkUserCall());
    }
    yield put(generalInformationFailure(parse(error)));
  }
}
