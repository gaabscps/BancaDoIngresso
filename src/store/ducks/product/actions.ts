import { action } from 'typesafe-actions';
import { ProductDataType, ProductTypes } from './types';
import CustomError from '../../../model/CustomError';
import Page from '../../../model/Page';
import Product from '../../../model/Product';

export const activateRequest = (
  id: string,
): {
  type: ProductTypes.ACTIVATE_PRODUCT_REQUEST;
  payload: string;
} => action(ProductTypes.ACTIVATE_PRODUCT_REQUEST, id);

export const activateSuccess = (): { type: ProductTypes.ACTIVATE_PRODUCT_SUCCCES } =>
  action(ProductTypes.ACTIVATE_PRODUCT_SUCCCES);

export const activateFailure = (
  error: CustomError | undefined,
): {
  type: ProductTypes.ACTIVATE_PRODUCT_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ProductTypes.ACTIVATE_PRODUCT_FAILURE, { error });

export const createRequest = (
  entity: Product,
): {
  type: ProductTypes.CREATE_PRODUCT_REQUEST;
  payload: Product;
} => action(ProductTypes.CREATE_PRODUCT_REQUEST, entity);

export const createSuccess = (
  data: ProductDataType,
): {
  type: ProductTypes.CREATE_PRODUCT_SUCCCES;
  payload: { data: ProductDataType };
} => action(ProductTypes.CREATE_PRODUCT_SUCCCES, { data });

export const createFailure = (
  error: CustomError | undefined,
): {
  type: ProductTypes.CREATE_PRODUCT_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ProductTypes.CREATE_PRODUCT_FAILURE, { error });

export const deleteRequest = (
  id: string,
): {
  type: ProductTypes.DELETE_PRODUCT_REQUEST;
  payload: string;
} => action(ProductTypes.DELETE_PRODUCT_REQUEST, id);

export const deleteSuccess = (): { type: ProductTypes.DELETE_PRODUCT_SUCCCES } =>
  action(ProductTypes.DELETE_PRODUCT_SUCCCES);

export const deleteFailure = (
  error: CustomError | undefined,
): {
  type: ProductTypes.DELETE_PRODUCT_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ProductTypes.DELETE_PRODUCT_FAILURE, { error });

export const getAllRequest = (): {
  type: ProductTypes.GET_ALL_PRODUCT_REQUEST;
} => action(ProductTypes.GET_ALL_PRODUCT_REQUEST);

export const getAllSuccess = (
  data: ProductDataType,
): {
  type: ProductTypes.GET_ALL_PRODUCT_SUCCCES;
  payload: { data: ProductDataType };
} => action(ProductTypes.GET_ALL_PRODUCT_SUCCCES, { data });

export const getAllFailure = (
  error: CustomError | undefined,
): {
  type: ProductTypes.GET_ALL_PRODUCT_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ProductTypes.GET_ALL_PRODUCT_FAILURE, { error });

export const getRequest = (
  id: string,
): {
  type: ProductTypes.GET_PRODUCT_REQUEST;
  payload: string;
} => action(ProductTypes.GET_PRODUCT_REQUEST, id);

export const getSuccess = (
  data: ProductDataType,
): {
  type: ProductTypes.GET_PRODUCT_SUCCCES;
  payload: { data: ProductDataType };
} => action(ProductTypes.GET_PRODUCT_SUCCCES, { data });

export const getFailure = (
  error: CustomError | undefined,
): {
  type: ProductTypes.GET_PRODUCT_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ProductTypes.GET_PRODUCT_FAILURE, { error });

export const inactivateRequest = (
  id: string,
): {
  type: ProductTypes.INACTIVATE_PRODUCT_REQUEST;
  payload: string;
} => action(ProductTypes.INACTIVATE_PRODUCT_REQUEST, id);

export const inactivateSuccess = (): {
  type: ProductTypes.INACTIVATE_PRODUCT_SUCCCES;
} => action(ProductTypes.INACTIVATE_PRODUCT_SUCCCES);

export const inactivateFailure = (
  error: CustomError | undefined,
): {
  type: ProductTypes.INACTIVATE_PRODUCT_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ProductTypes.INACTIVATE_PRODUCT_FAILURE, { error });

export const listRequest = (
  page: Page<Product, Product>,
): {
  type: ProductTypes.LIST_PRODUCT_REQUEST;
  payload: Page<Product, Product>;
} => action(ProductTypes.LIST_PRODUCT_REQUEST, page);

export const listSuccess = (
  data: ProductDataType,
): {
  type: ProductTypes.LIST_PRODUCT_SUCCCES;
  payload: { data: ProductDataType };
} => action(ProductTypes.LIST_PRODUCT_SUCCCES, { data });

export const listFailure = (
  error: CustomError | undefined,
): {
  type: ProductTypes.LIST_PRODUCT_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ProductTypes.LIST_PRODUCT_FAILURE, { error });

export const updateRequest = (
  entity: Product,
): {
  type: ProductTypes.UPDATE_PRODUCT_REQUEST;
  payload: Product;
} => action(ProductTypes.UPDATE_PRODUCT_REQUEST, entity);

export const updateSuccess = (
  data: ProductDataType,
): {
  type: ProductTypes.UPDATE_PRODUCT_SUCCCES;
  payload: { data: ProductDataType };
} => action(ProductTypes.UPDATE_PRODUCT_SUCCCES, { data });

export const updateFailure = (
  error: CustomError | undefined,
): {
  type: ProductTypes.UPDATE_PRODUCT_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ProductTypes.UPDATE_PRODUCT_FAILURE, { error });
