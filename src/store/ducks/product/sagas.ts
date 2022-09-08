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
import { ProductDataType } from './types';
import { checkUserCall } from '../check-user/actions';
import { ApplicationState } from '../..';
import { parse } from '../../../model/CustomError';
import Page from '../../../model/Page';
import Product from '../../../model/Product';
import api from '../../../services/api';

export function* activateProduct(data: any) {
  try {
    yield call(api.patch, `/product/activate/${data.payload}`);
    yield put(activateSuccess());
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      yield put(checkUserCall());
    }
    yield put(activateFailure(parse(error)));
  }
}

export function* createProduct(data: any) {
  try {
    const response: AxiosResponse<Product> = yield call(api.post, '/product', data.payload);
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      product: state.product,
    }));
    const { page, list } = stateData.product.data;
    const dataType: ProductDataType = {
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

export function* deleteProduct(data: any) {
  try {
    yield call(api.delete, `/product/${data.payload}`);
    yield put(deleteSuccess());
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      yield put(checkUserCall());
    }
    yield put(deleteFailure(parse(error)));
  }
}

export function* getAllProducts() {
  try {
    const response: AxiosResponse<Product[]> = yield call(api.get, `/product/find`);
    const list = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      product: state.product,
    }));
    const { entity, page } = stateData.product.data;
    const dataType: ProductDataType = {
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

export function* getProduct(data: any) {
  try {
    const response: AxiosResponse<Product> = yield call(api.get, `/product/${data.payload}`);
    const entity = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      product: state.product,
    }));
    const { page, list } = stateData.product.data;
    const dataType: ProductDataType = {
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

export function* inactivateProduct(data: any) {
  try {
    yield call(api.patch, `/product/inactivate/${data.payload}`);
    yield put(inactivateSuccess());
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      yield put(checkUserCall());
    }
    yield put(inactivateFailure(parse(error)));
  }
}

export function* listProducts(page: any) {
  try {
    const response: AxiosResponse<Page<Product, Product>> = yield call(
      api.post,
      '/product/page',
      page.payload,
    );
    const pageResponse = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      product: state.product,
    }));

    const { entity, list } = stateData.product.data;

    const dataType: ProductDataType = {
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

export function* updateProduct(data: any) {
  try {
    const response: AxiosResponse<Product> = yield call(api.put, '/product', data.payload);
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      product: state.product,
    }));
    const { page, list } = stateData.product.data;
    const dataType: ProductDataType = {
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
