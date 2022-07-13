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
import { SectionDataType } from './types';
import { ApplicationState } from '../..';
import { checkUserCall } from '../check-user/actions';
import { parse } from '../../../entities/CustomError';
import api from '../../../services/api';
import Page from '../../../entities/Page';
import Section from '../../../entities/Section';

export function* activateSection(data: any) {
  try {
    yield call(api.patch, `/section/activate/${data.payload}`);
    yield put(activateSuccess());
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      yield put(checkUserCall());
    }
    yield put(activateFailure(parse(error)));
  }
}

export function* createSection(data: any) {
  try {
    const response: AxiosResponse<Section> = yield call(api.post, '/section', data.payload);
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      section: state.section,
    }));
    const { page, list } = stateData.section.data;
    const dataType: SectionDataType = {
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

export function* deleteSection(data: any) {
  try {
    yield call(api.delete, `/section/${data.payload}`);
    yield put(deleteSuccess());
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      yield put(checkUserCall());
    }
    yield put(deleteFailure(parse(error)));
  }
}

export function* getAllSections() {
  try {
    const response: AxiosResponse<Section[]> = yield call(api.get, `/section/find`);
    const list = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      section: state.section,
    }));
    const { entity, page } = stateData.section.data;
    const dataType: SectionDataType = {
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

export function* getSection(data: any) {
  try {
    const response: AxiosResponse<Section> = yield call(api.get, `/section/${data.payload}`);
    const entity = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      section: state.section,
    }));
    const { page, list } = stateData.section.data;
    const dataType: SectionDataType = {
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

export function* inactivateSection(data: any) {
  try {
    yield call(api.patch, `/section/inactivate/${data.payload}`);
    yield put(inactivateSuccess());
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      yield put(checkUserCall());
    }
    yield put(inactivateFailure(parse(error)));
  }
}

export function* listSections(page: any) {
  try {
    const response: AxiosResponse<Page<Section, Section>> = yield call(
      api.post,
      '/section/page',
      page.payload,
    );
    const pageResponse = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      section: state.section,
    }));

    const { entity, list } = stateData.section.data;

    const dataType: SectionDataType = {
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

export function* updateSection(data: any) {
  try {
    const response: AxiosResponse<Section> = yield call(api.put, '/section', data.payload);
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      section: state.section,
    }));
    const { page, list } = stateData.section.data;
    const dataType: SectionDataType = {
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
