import CustomError from '../../../model/CustomError';
import Page from '../../../model/Page';
import ProductGroup from '../../../model/ProductGroup';
/**
 * Action types
 */

// eslint-disable-next-line no-shadow
export enum ProductGroupTypes {
  ACTIVATE_PRODUCT_GROUP_REQUEST = '@product-group/ACTIVATE_PRODUCT_GROUP_REQUEST',
  ACTIVATE_PRODUCT_GROUP_SUCCCES = '@product-group/ACTIVATE_PRODUCT_GROUP_SUCCCES',
  ACTIVATE_PRODUCT_GROUP_FAILURE = '@product-group/ACTIVATE_PRODUCT_GROUP_FAILURE',
  CREATE_PRODUCT_GROUP_REQUEST = '@product-group/CREATE_PRODUCT_GROUP_REQUEST',
  CREATE_PRODUCT_GROUP_SUCCCES = '@product-group/CREATE_PRODUCT_GROUP_SUCCCES',
  CREATE_PRODUCT_GROUP_FAILURE = '@product-group/CREATE_PRODUCT_GROUP_FAILURE',
  DELETE_PRODUCT_GROUP_REQUEST = '@product-group/DELETE_PRODUCT_GROUP_REQUEST',
  DELETE_PRODUCT_GROUP_SUCCCES = '@product-group/DELETE_PRODUCT_GROUP_SUCCCES',
  DELETE_PRODUCT_GROUP_FAILURE = '@product-group/DELETE_PRODUCT_GROUP_FAILURE',
  GET_ALL_PRODUCT_GROUP_REQUEST = '@product-group/GET_ALL_PRODUCT_GROUP_REQUEST',
  GET_ALL_PRODUCT_GROUP_SUCCCES = '@product-group/GET_PRODUCT_GROUP_SUCCCES',
  GET_ALL_PRODUCT_GROUP_FAILURE = '@product-group/GET_PRODUCT_GROUP_FAILURE',
  GET_PRODUCT_GROUP_REQUEST = '@product-group/GET_PRODUCT_GROUP_REQUEST',
  GET_PRODUCT_GROUP_SUCCCES = '@product-group/GET_PRODUCT_GROUP_SUCCCES',
  GET_PRODUCT_GROUP_FAILURE = '@product-group/GET_PRODUCT_GROUP_FAILURE',
  INACTIVATE_PRODUCT_GROUP_REQUEST = '@product-group/INACTIVATE_PRODUCT_GROUP_REQUEST',
  INACTIVATE_PRODUCT_GROUP_SUCCCES = '@product-group/INACTIVATE_PRODUCT_GROUP_SUCCCES',
  INACTIVATE_PRODUCT_GROUP_FAILURE = '@product-group/INACTIVATE_PRODUCT_GROUP_FAILURE',
  LIST_PRODUCT_GROUP_REQUEST = '@product-group/LIST_PRODUCT_GROUP_REQUEST',
  LIST_PRODUCT_GROUP_SUCCCES = '@product-group/LIST_PRODUCT_GROUP_SUCCCES',
  LIST_PRODUCT_GROUP_FAILURE = '@product-group/LIST_PRODUCT_GROUP_FAILURE',
  UPDATE_PRODUCT_GROUP_REQUEST = '@product-group/UPDATE_PRODUCT_GROUP_REQUEST',
  UPDATE_PRODUCT_GROUP_SUCCCES = '@product-group/UPDATE_PRODUCT_GROUP_SUCCCES',
  UPDATE_PRODUCT_GROUP_FAILURE = '@product-group/UPDATE_PRODUCT_GROUP_FAILURE',
}

/**
 * Data types
 */

export interface ProductGroupDataType {
  page: Page<ProductGroup, ProductGroup>;
  entity: ProductGroup;
  list: ProductGroup[];
}

/**
 * State type
 */
export interface ProductGroupState {
  readonly data: ProductGroupDataType;
  readonly loading: boolean;
  readonly error: CustomError | undefined;
}
