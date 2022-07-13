import CustomError from '../../../entities/CustomError';
import Page from '../../../entities/Page';
import Product from '../../../entities/Product';
/**
 * Action types
 */

// eslint-disable-next-line no-shadow
export enum ProductTypes {
  ACTIVATE_PRODUCT_REQUEST = '@product/ACTIVATE_PRODUCT_REQUEST',
  ACTIVATE_PRODUCT_SUCCCES = '@product/ACTIVATE_PRODUCT_SUCCCES',
  ACTIVATE_PRODUCT_FAILURE = '@product/ACTIVATE_PRODUCT_FAILURE',
  CREATE_PRODUCT_REQUEST = '@product/CREATE_PRODUCT_REQUEST',
  CREATE_PRODUCT_SUCCCES = '@product/CREATE_PRODUCT_SUCCCES',
  CREATE_PRODUCT_FAILURE = '@product/CREATE_PRODUCT_FAILURE',
  DELETE_PRODUCT_REQUEST = '@product/DELETE_PRODUCT_REQUEST',
  DELETE_PRODUCT_SUCCCES = '@product/DELETE_PRODUCT_SUCCCES',
  DELETE_PRODUCT_FAILURE = '@product/DELETE_PRODUCT_FAILURE',
  GET_ALL_PRODUCT_REQUEST = '@product/GET_ALL_PRODUCT_REQUEST',
  GET_ALL_PRODUCT_SUCCCES = '@product/GET_PRODUCT_SUCCCES',
  GET_ALL_PRODUCT_FAILURE = '@product/GET_PRODUCT_FAILURE',
  GET_PRODUCT_REQUEST = '@product/GET_PRODUCT_REQUEST',
  GET_PRODUCT_SUCCCES = '@product/GET_PRODUCT_SUCCCES',
  GET_PRODUCT_FAILURE = '@product/GET_PRODUCT_FAILURE',
  INACTIVATE_PRODUCT_REQUEST = '@product/INACTIVATE_PRODUCT_REQUEST',
  INACTIVATE_PRODUCT_SUCCCES = '@product/INACTIVATE_PRODUCT_SUCCCES',
  INACTIVATE_PRODUCT_FAILURE = '@product/INACTIVATE_PRODUCT_FAILURE',
  LIST_PRODUCT_REQUEST = '@product/LIST_PRODUCT_REQUEST',
  LIST_PRODUCT_SUCCCES = '@product/LIST_PRODUCT_SUCCCES',
  LIST_PRODUCT_FAILURE = '@product/LIST_PRODUCT_FAILURE',
  UPDATE_PRODUCT_REQUEST = '@product/UPDATE_PRODUCT_REQUEST',
  UPDATE_PRODUCT_SUCCCES = '@product/UPDATE_PRODUCT_SUCCCES',
  UPDATE_PRODUCT_FAILURE = '@product/UPDATE_PRODUCT_FAILURE',
}

/**
 * Data types
 */

export interface ProductDataType {
  page: Page<Product, Product>;
  entity: Product;
  list: Product[];
}

/**
 * State type
 */
export interface ProductState {
  readonly data: ProductDataType;
  readonly loading: boolean;
  readonly error: CustomError | undefined;
}
