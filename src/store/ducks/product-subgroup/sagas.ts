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
import { ProductSubgroupDataType } from './types';
import { checkUserCall } from '../check-user/actions';
import { ApplicationState } from '../..';
import { parse } from '../../../entities/CustomError';
import Page from '../../../entities/Page';
import ProductSubgroup from '../../../entities/ProductSubgroup';
import api from '../../../services/api';

export function* activateProductSubgroup(data: any) {
  try {
    yield call(api.patch, `/product-subgroup/activate/${data.payload}`);
    yield put(activateSuccess());
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      yield put(checkUserCall());
    }
    yield put(activateFailure(parse(error)));
  }
}

export function* createProductSubgroup(data: any) {
  try {
    const response: AxiosResponse<ProductSubgroup> = yield call(
      api.post,
      '/product-subgroup',
      data.payload,
    );
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      productSubgroup: state.productSubgroup,
    }));
    const { page, list } = stateData.productSubgroup.data;
    const dataType: ProductSubgroupDataType = {
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

export function* deleteProductSubgroup(data: any) {
  try {
    yield call(api.delete, `/product-subgroup/${data.payload}`);
    yield put(deleteSuccess());
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      yield put(checkUserCall());
    }
    yield put(deleteFailure(parse(error)));
  }
}

export function* getAllProductSubgroups() {
  try {
    const response: AxiosResponse<ProductSubgroup[]> = yield call(
      api.get,
      `/product-subgroup/find`,
    );
    const list = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      productSubgroup: state.productSubgroup,
    }));
    const { entity, page } = stateData.productSubgroup.data;
    const dataType: ProductSubgroupDataType = {
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

export function* getProductSubgroup(data: any) {
  try {
    const response: AxiosResponse<ProductSubgroup> = yield call(
      api.get,
      `/product-subgroup/${data.payload}`,
    );
    const entity = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      productSubgroup: state.productSubgroup,
    }));
    const { page, list } = stateData.productSubgroup.data;
    const dataType: ProductSubgroupDataType = {
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

export function* inactivateProductSubgroup(data: any) {
  try {
    yield call(api.patch, `/product-subgroup/inactivate/${data.payload}`);
    yield put(inactivateSuccess());
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      yield put(checkUserCall());
    }
    yield put(inactivateFailure(parse(error)));
  }
}

export function* listProductSubgroups(page: any) {
  try {
    const response: AxiosResponse<Page<ProductSubgroup, ProductSubgroup>> = yield call(
      api.post,
      '/product-subgroup/page',
      page.payload,
    );
    const pageResponse = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      productSubgroup: state.productSubgroup,
    }));

    const { entity, list } = stateData.productSubgroup.data;

    const dataType: ProductSubgroupDataType = {
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

export function* updateProductSubgroup(data: any) {
  try {
    const response: AxiosResponse<ProductSubgroup> = yield call(
      api.put,
      '/product-subgroup',
      data.payload,
    );
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      productSubgroup: state.productSubgroup,
    }));
    const { page, list } = stateData.productSubgroup.data;
    const dataType: ProductSubgroupDataType = {
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
