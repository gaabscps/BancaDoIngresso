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
import { ProductGroupDataType } from './types';
import { checkUserCall } from '../check-user/actions';
import { ApplicationState } from '../..';
import { parse } from '../../../model/CustomError';
import Page from '../../../model/Page';
import ProductGroup from '../../../model/ProductGroup';
import api from '../../../services/api';

export function* activateProductGroup(data: any) {
  try {
    yield call(api.patch, `/product-group/activate/${data.payload}`);
    yield put(activateSuccess());
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      yield put(checkUserCall());
    }
    yield put(activateFailure(parse(error)));
  }
}

export function* createProductGroup(data: any) {
  try {
    const response: AxiosResponse<ProductGroup> = yield call(
      api.post,
      '/product-group',
      data.payload,
    );
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      productGroup: state.productGroup,
    }));
    const { page, list } = stateData.productGroup.data;
    const dataType: ProductGroupDataType = {
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

export function* deleteProductGroup(data: any) {
  try {
    yield call(api.delete, `/product-group/${data.payload}`);
    yield put(deleteSuccess());
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      yield put(checkUserCall());
    }
    yield put(deleteFailure(parse(error)));
  }
}

export function* getAllProductGroups() {
  try {
    const response: AxiosResponse<ProductGroup[]> = yield call(api.get, `/product-group/find`);
    const list = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      productGroup: state.productGroup,
    }));
    const { entity, page } = stateData.productGroup.data;
    const dataType: ProductGroupDataType = {
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

export function* getProductGroup(data: any) {
  try {
    const response: AxiosResponse<ProductGroup> = yield call(
      api.get,
      `/product-group/${data.payload}`,
    );
    const entity = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      productGroup: state.productGroup,
    }));
    const { page, list } = stateData.productGroup.data;
    const dataType: ProductGroupDataType = {
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

export function* inactivateProductGroup(data: any) {
  try {
    yield call(api.patch, `/product-group/inactivate/${data.payload}`);
    yield put(inactivateSuccess());
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      yield put(checkUserCall());
    }
    yield put(inactivateFailure(parse(error)));
  }
}

export function* listProductGroups(page: any) {
  try {
    const response: AxiosResponse<Page<ProductGroup, ProductGroup>> = yield call(
      api.post,
      '/product-group/page',
      page.payload,
    );
    const pageResponse = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      productGroup: state.productGroup,
    }));

    const { entity, list } = stateData.productGroup.data;

    const dataType: ProductGroupDataType = {
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

export function* updateProductGroup(data: any) {
  try {
    const response: AxiosResponse<ProductGroup> = yield call(
      api.put,
      '/product-group',
      data.payload,
    );
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      productGroup: state.productGroup,
    }));
    const { page, list } = stateData.productGroup.data;
    const dataType: ProductGroupDataType = {
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
