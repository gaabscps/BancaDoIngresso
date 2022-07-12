/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { call, put, select } from 'redux-saga/effects';
import { AxiosResponse, AxiosError } from 'axios';
import {
  activateFailure,
  activateSuccess,
  addPermissionsFailure,
  addPermissionsSuccess,
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
import { ProfileDataType } from './types';
import { ApplicationState } from '../..';
import { parse } from '../../../entities/CustomError';
import api from '../../../services/api';
import Page from '../../../entities/Page';
import Profile from '../../../entities/Profile';

export function* activateProfile(data: any) {
  try {
    yield call(api.patch, `/profile/activate/${data.payload}`);
    yield put(activateSuccess());
  } catch (err) {
    const error = err as AxiosError;
    yield put(activateFailure(parse(error)));
  }
}

export function* addProfilePermissions(data: any) {
  try {
    yield call(api.post, '/profile/permission', data.payload);
    yield put(addPermissionsSuccess());
  } catch (err) {
    const error = err as AxiosError;
    yield put(addPermissionsFailure(parse(error)));
  }
}

export function* createProfile(data: any) {
  try {
    const response: AxiosResponse<Profile> = yield call(api.post, '/profile', data.payload);
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      profile: state.profile,
    }));
    const { page, list } = stateData.profile.data;
    const dataType: ProfileDataType = {
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

export function* deleteProfile(data: any) {
  try {
    yield call(api.delete, `/profile/${data.payload}`);
    yield put(deleteSuccess());
  } catch (err) {
    const error = err as AxiosError;
    yield put(deleteFailure(parse(error)));
  }
}

export function* getAllProfiles() {
  try {
    const response: AxiosResponse<Profile[]> = yield call(api.get, `/profile/find`);
    const list = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      profile: state.profile,
    }));
    const { entity, page } = stateData.profile.data;
    const dataType: ProfileDataType = {
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

export function* getProfile(data: any) {
  try {
    const response: AxiosResponse<Profile> = yield call(api.get, `/profile/${data.payload}`);
    const entity = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      profile: state.profile,
    }));
    const { page, list } = stateData.profile.data;
    const dataType: ProfileDataType = {
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

export function* inactivateProfile(data: any) {
  try {
    yield call(api.patch, `/profile/inactivate/${data.payload}`);
    yield put(inactivateSuccess());
  } catch (err) {
    const error = err as AxiosError;
    yield put(inactivateFailure(parse(error)));
  }
}

export function* listProfiles(page: any) {
  try {
    const response: AxiosResponse<Page<Profile, Profile>> = yield call(
      api.post,
      '/profile/page',
      page.payload,
    );
    const pageResponse = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      profile: state.profile,
    }));

    const { entity, list } = stateData.profile.data;

    const dataType: ProfileDataType = {
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

export function* updateProfile(data: any) {
  try {
    const response: AxiosResponse<Profile> = yield call(api.put, '/profile', data.payload);
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      profile: state.profile,
    }));
    const { page, list } = stateData.profile.data;
    const dataType: ProfileDataType = {
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
