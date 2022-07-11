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
import { EventCategoryDataType } from './types';
import { parse } from '../../../entities/CustomError';
import api from '../../../services/api';
import Page from '../../../entities/Page';
import EventCategory from '../../../entities/EventCategory';
import { ApplicationState } from '../..';

export function* listEventCategory(page: any) {
  try {
    const response: AxiosResponse<Page<EventCategory, EventCategory>> = yield call(
      api.post,
      '/event-category/page',
      page.payload,
    );
    const pageResponse: Page<EventCategory, EventCategory> = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      eventCategory: state.eventCategory,
    }));

    const { entity, list } = stateData.eventCategory.data;

    const companyDataType: EventCategoryDataType = {
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

export function* getAllEventCategories() {
  try {
    const response: AxiosResponse<EventCategory[]> = yield call(api.get, `/event-category/find`);
    const list: EventCategory[] = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      eventCategory: state.eventCategory,
    }));
    const { entity, page } = stateData.eventCategory.data;
    const companyDataType: EventCategoryDataType = {
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

export function* getEventCategory(data: any) {
  try {
    const response: AxiosResponse<EventCategory> = yield call(
      api.get,
      `/event-category/${data.payload}`,
    );
    const company: EventCategory = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      eventCategory: state.eventCategory,
    }));
    const { page, list } = stateData.eventCategory.data;
    const companyDataType: EventCategoryDataType = {
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

export function* createEventCategory(data: any) {
  try {
    const response: AxiosResponse<EventCategory> = yield call(
      api.post,
      '/event-category',
      data.payload,
    );
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      eventCategory: state.eventCategory,
    }));
    const { page, list } = stateData.eventCategory.data;
    const companyDataType: EventCategoryDataType = {
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

export function* updateEventCategory(data: any) {
  try {
    const response: AxiosResponse<EventCategory> = yield call(
      api.put,
      '/event-category',
      data.payload,
    );
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      eventCategory: state.eventCategory,
    }));
    const { page, list } = stateData.eventCategory.data;
    const companyDataType: EventCategoryDataType = {
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

export function* activateEventCategory(data: any) {
  try {
    yield call(api.patch, `/event-category/activate/${data.payload}`);
    yield put(activateSuccess());
  } catch (err) {
    const error = err as AxiosError;
    yield put(activateFailure(parse(error)));
  }
}

export function* inactivateEventCategory(data: any) {
  try {
    yield call(api.patch, `/event-category/inactivate/${data.payload}`);
    yield put(inactivateSuccess());
  } catch (err) {
    const error = err as AxiosError;
    yield put(inactivateFailure(parse(error)));
  }
}

export function* deleteEventCategory(data: any) {
  try {
    yield call(api.delete, `/event-category/${data.payload}`);
    yield put(deleteSuccess());
  } catch (err) {
    const error = err as AxiosError;
    yield put(deleteFailure(parse(error)));
  }
}
