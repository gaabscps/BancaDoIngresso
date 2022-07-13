import { action } from 'typesafe-actions';
import { ProductGroupDataType, ProductGroupTypes } from './types';
import CustomError from '../../../entities/CustomError';
import Page from '../../../entities/Page';
import ProductGroup from '../../../entities/ProductGroup';

export const activateRequest = (
  id: string,
): {
  type: ProductGroupTypes.ACTIVATE_PRODUCT_GROUP_REQUEST;
  payload: string;
} => action(ProductGroupTypes.ACTIVATE_PRODUCT_GROUP_REQUEST, id);

export const activateSuccess = (): { type: ProductGroupTypes.ACTIVATE_PRODUCT_GROUP_SUCCCES } =>
  action(ProductGroupTypes.ACTIVATE_PRODUCT_GROUP_SUCCCES);

export const activateFailure = (
  error: CustomError | undefined,
): {
  type: ProductGroupTypes.ACTIVATE_PRODUCT_GROUP_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ProductGroupTypes.ACTIVATE_PRODUCT_GROUP_FAILURE, { error });

export const createRequest = (
  entity: ProductGroup,
): {
  type: ProductGroupTypes.CREATE_PRODUCT_GROUP_REQUEST;
  payload: ProductGroup;
} => action(ProductGroupTypes.CREATE_PRODUCT_GROUP_REQUEST, entity);

export const createSuccess = (
  data: ProductGroupDataType,
): {
  type: ProductGroupTypes.CREATE_PRODUCT_GROUP_SUCCCES;
  payload: { data: ProductGroupDataType };
} => action(ProductGroupTypes.CREATE_PRODUCT_GROUP_SUCCCES, { data });

export const createFailure = (
  error: CustomError | undefined,
): {
  type: ProductGroupTypes.CREATE_PRODUCT_GROUP_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ProductGroupTypes.CREATE_PRODUCT_GROUP_FAILURE, { error });

export const deleteRequest = (
  id: string,
): {
  type: ProductGroupTypes.DELETE_PRODUCT_GROUP_REQUEST;
  payload: string;
} => action(ProductGroupTypes.DELETE_PRODUCT_GROUP_REQUEST, id);

export const deleteSuccess = (): { type: ProductGroupTypes.DELETE_PRODUCT_GROUP_SUCCCES } =>
  action(ProductGroupTypes.DELETE_PRODUCT_GROUP_SUCCCES);

export const deleteFailure = (
  error: CustomError | undefined,
): {
  type: ProductGroupTypes.DELETE_PRODUCT_GROUP_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ProductGroupTypes.DELETE_PRODUCT_GROUP_FAILURE, { error });

export const getAllRequest = (): {
  type: ProductGroupTypes.GET_ALL_PRODUCT_GROUP_REQUEST;
} => action(ProductGroupTypes.GET_ALL_PRODUCT_GROUP_REQUEST);

export const getAllSuccess = (
  data: ProductGroupDataType,
): {
  type: ProductGroupTypes.GET_ALL_PRODUCT_GROUP_SUCCCES;
  payload: { data: ProductGroupDataType };
} => action(ProductGroupTypes.GET_ALL_PRODUCT_GROUP_SUCCCES, { data });

export const getAllFailure = (
  error: CustomError | undefined,
): {
  type: ProductGroupTypes.GET_ALL_PRODUCT_GROUP_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ProductGroupTypes.GET_ALL_PRODUCT_GROUP_FAILURE, { error });

export const getRequest = (
  id: string,
): {
  type: ProductGroupTypes.GET_PRODUCT_GROUP_REQUEST;
  payload: string;
} => action(ProductGroupTypes.GET_PRODUCT_GROUP_REQUEST, id);

export const getSuccess = (
  data: ProductGroupDataType,
): {
  type: ProductGroupTypes.GET_PRODUCT_GROUP_SUCCCES;
  payload: { data: ProductGroupDataType };
} => action(ProductGroupTypes.GET_PRODUCT_GROUP_SUCCCES, { data });

export const getFailure = (
  error: CustomError | undefined,
): {
  type: ProductGroupTypes.GET_PRODUCT_GROUP_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ProductGroupTypes.GET_PRODUCT_GROUP_FAILURE, { error });

export const inactivateRequest = (
  id: string,
): {
  type: ProductGroupTypes.INACTIVATE_PRODUCT_GROUP_REQUEST;
  payload: string;
} => action(ProductGroupTypes.INACTIVATE_PRODUCT_GROUP_REQUEST, id);

export const inactivateSuccess = (): {
  type: ProductGroupTypes.INACTIVATE_PRODUCT_GROUP_SUCCCES;
} => action(ProductGroupTypes.INACTIVATE_PRODUCT_GROUP_SUCCCES);

export const inactivateFailure = (
  error: CustomError | undefined,
): {
  type: ProductGroupTypes.INACTIVATE_PRODUCT_GROUP_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ProductGroupTypes.INACTIVATE_PRODUCT_GROUP_FAILURE, { error });

export const listRequest = (
  page: Page<ProductGroup, ProductGroup>,
): {
  type: ProductGroupTypes.LIST_PRODUCT_GROUP_REQUEST;
  payload: Page<ProductGroup, ProductGroup>;
} => action(ProductGroupTypes.LIST_PRODUCT_GROUP_REQUEST, page);

export const listSuccess = (
  data: ProductGroupDataType,
): {
  type: ProductGroupTypes.LIST_PRODUCT_GROUP_SUCCCES;
  payload: { data: ProductGroupDataType };
} => action(ProductGroupTypes.LIST_PRODUCT_GROUP_SUCCCES, { data });

export const listFailure = (
  error: CustomError | undefined,
): {
  type: ProductGroupTypes.LIST_PRODUCT_GROUP_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ProductGroupTypes.LIST_PRODUCT_GROUP_FAILURE, { error });

export const updateRequest = (
  entity: ProductGroup,
): {
  type: ProductGroupTypes.UPDATE_PRODUCT_GROUP_REQUEST;
  payload: ProductGroup;
} => action(ProductGroupTypes.UPDATE_PRODUCT_GROUP_REQUEST, entity);

export const updateSuccess = (
  data: ProductGroupDataType,
): {
  type: ProductGroupTypes.UPDATE_PRODUCT_GROUP_SUCCCES;
  payload: { data: ProductGroupDataType };
} => action(ProductGroupTypes.UPDATE_PRODUCT_GROUP_SUCCCES, { data });

export const updateFailure = (
  error: CustomError | undefined,
): {
  type: ProductGroupTypes.UPDATE_PRODUCT_GROUP_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ProductGroupTypes.UPDATE_PRODUCT_GROUP_FAILURE, { error });
