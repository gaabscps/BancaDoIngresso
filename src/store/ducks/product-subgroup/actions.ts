import { action } from 'typesafe-actions';
import { ProductSubgroupDataType, ProductSubgroupTypes } from './types';
import CustomError from '../../../model/CustomError';
import Page from '../../../model/Page';
import ProductSubgroup from '../../../model/ProductSubgroup';

export const activateRequest = (
  id: string,
): {
  type: ProductSubgroupTypes.ACTIVATE_PRODUCT_SUBGROUP_REQUEST;
  payload: string;
} => action(ProductSubgroupTypes.ACTIVATE_PRODUCT_SUBGROUP_REQUEST, id);

export const activateSuccess = (): {
  type: ProductSubgroupTypes.ACTIVATE_PRODUCT_SUBGROUP_SUCCCES;
} => action(ProductSubgroupTypes.ACTIVATE_PRODUCT_SUBGROUP_SUCCCES);

export const activateFailure = (
  error: CustomError | undefined,
): {
  type: ProductSubgroupTypes.ACTIVATE_PRODUCT_SUBGROUP_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ProductSubgroupTypes.ACTIVATE_PRODUCT_SUBGROUP_FAILURE, { error });

export const createRequest = (
  entity: ProductSubgroup,
): {
  type: ProductSubgroupTypes.CREATE_PRODUCT_SUBGROUP_REQUEST;
  payload: ProductSubgroup;
} => action(ProductSubgroupTypes.CREATE_PRODUCT_SUBGROUP_REQUEST, entity);

export const createSuccess = (
  data: ProductSubgroupDataType,
): {
  type: ProductSubgroupTypes.CREATE_PRODUCT_SUBGROUP_SUCCCES;
  payload: { data: ProductSubgroupDataType };
} => action(ProductSubgroupTypes.CREATE_PRODUCT_SUBGROUP_SUCCCES, { data });

export const createFailure = (
  error: CustomError | undefined,
): {
  type: ProductSubgroupTypes.CREATE_PRODUCT_SUBGROUP_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ProductSubgroupTypes.CREATE_PRODUCT_SUBGROUP_FAILURE, { error });

export const deleteRequest = (
  id: string,
): {
  type: ProductSubgroupTypes.DELETE_PRODUCT_SUBGROUP_REQUEST;
  payload: string;
} => action(ProductSubgroupTypes.DELETE_PRODUCT_SUBGROUP_REQUEST, id);

export const deleteSuccess = (): { type: ProductSubgroupTypes.DELETE_PRODUCT_SUBGROUP_SUCCCES } =>
  action(ProductSubgroupTypes.DELETE_PRODUCT_SUBGROUP_SUCCCES);

export const deleteFailure = (
  error: CustomError | undefined,
): {
  type: ProductSubgroupTypes.DELETE_PRODUCT_SUBGROUP_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ProductSubgroupTypes.DELETE_PRODUCT_SUBGROUP_FAILURE, { error });

export const getAllRequest = (): {
  type: ProductSubgroupTypes.GET_ALL_PRODUCT_SUBGROUP_REQUEST;
} => action(ProductSubgroupTypes.GET_ALL_PRODUCT_SUBGROUP_REQUEST);

export const getAllSuccess = (
  data: ProductSubgroupDataType,
): {
  type: ProductSubgroupTypes.GET_ALL_PRODUCT_SUBGROUP_SUCCCES;
  payload: { data: ProductSubgroupDataType };
} => action(ProductSubgroupTypes.GET_ALL_PRODUCT_SUBGROUP_SUCCCES, { data });

export const getAllFailure = (
  error: CustomError | undefined,
): {
  type: ProductSubgroupTypes.GET_ALL_PRODUCT_SUBGROUP_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ProductSubgroupTypes.GET_ALL_PRODUCT_SUBGROUP_FAILURE, { error });

export const getRequest = (
  id: string,
): {
  type: ProductSubgroupTypes.GET_PRODUCT_SUBGROUP_REQUEST;
  payload: string;
} => action(ProductSubgroupTypes.GET_PRODUCT_SUBGROUP_REQUEST, id);

export const getSuccess = (
  data: ProductSubgroupDataType,
): {
  type: ProductSubgroupTypes.GET_PRODUCT_SUBGROUP_SUCCCES;
  payload: { data: ProductSubgroupDataType };
} => action(ProductSubgroupTypes.GET_PRODUCT_SUBGROUP_SUCCCES, { data });

export const getFailure = (
  error: CustomError | undefined,
): {
  type: ProductSubgroupTypes.GET_PRODUCT_SUBGROUP_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ProductSubgroupTypes.GET_PRODUCT_SUBGROUP_FAILURE, { error });

export const inactivateRequest = (
  id: string,
): {
  type: ProductSubgroupTypes.INACTIVATE_PRODUCT_SUBGROUP_REQUEST;
  payload: string;
} => action(ProductSubgroupTypes.INACTIVATE_PRODUCT_SUBGROUP_REQUEST, id);

export const inactivateSuccess = (): {
  type: ProductSubgroupTypes.INACTIVATE_PRODUCT_SUBGROUP_SUCCCES;
} => action(ProductSubgroupTypes.INACTIVATE_PRODUCT_SUBGROUP_SUCCCES);

export const inactivateFailure = (
  error: CustomError | undefined,
): {
  type: ProductSubgroupTypes.INACTIVATE_PRODUCT_SUBGROUP_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ProductSubgroupTypes.INACTIVATE_PRODUCT_SUBGROUP_FAILURE, { error });

export const listRequest = (
  page: Page<ProductSubgroup, ProductSubgroup>,
): {
  type: ProductSubgroupTypes.LIST_PRODUCT_SUBGROUP_REQUEST;
  payload: Page<ProductSubgroup, ProductSubgroup>;
} => action(ProductSubgroupTypes.LIST_PRODUCT_SUBGROUP_REQUEST, page);

export const listSuccess = (
  data: ProductSubgroupDataType,
): {
  type: ProductSubgroupTypes.LIST_PRODUCT_SUBGROUP_SUCCCES;
  payload: { data: ProductSubgroupDataType };
} => action(ProductSubgroupTypes.LIST_PRODUCT_SUBGROUP_SUCCCES, { data });

export const listFailure = (
  error: CustomError | undefined,
): {
  type: ProductSubgroupTypes.LIST_PRODUCT_SUBGROUP_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ProductSubgroupTypes.LIST_PRODUCT_SUBGROUP_FAILURE, { error });

export const updateRequest = (
  entity: ProductSubgroup,
): {
  type: ProductSubgroupTypes.UPDATE_PRODUCT_SUBGROUP_REQUEST;
  payload: ProductSubgroup;
} => action(ProductSubgroupTypes.UPDATE_PRODUCT_SUBGROUP_REQUEST, entity);

export const updateSuccess = (
  data: ProductSubgroupDataType,
): {
  type: ProductSubgroupTypes.UPDATE_PRODUCT_SUBGROUP_SUCCCES;
  payload: { data: ProductSubgroupDataType };
} => action(ProductSubgroupTypes.UPDATE_PRODUCT_SUBGROUP_SUCCCES, { data });

export const updateFailure = (
  error: CustomError | undefined,
): {
  type: ProductSubgroupTypes.UPDATE_PRODUCT_SUBGROUP_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ProductSubgroupTypes.UPDATE_PRODUCT_SUBGROUP_FAILURE, { error });
