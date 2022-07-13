import { Reducer } from 'redux';
import { ProductDataType, ProductState, ProductTypes } from './types';

const INITIAL_STATE: ProductState = {
  data: {} as ProductDataType,
  loading: false,
  error: undefined,
};

const reducer: Reducer<ProductState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProductTypes.ACTIVATE_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case ProductTypes.ACTIVATE_PRODUCT_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case ProductTypes.ACTIVATE_PRODUCT_FAILURE:
      return {
        ...state,
        data: {} as ProductDataType,
        loading: false,
        error: action.payload.error,
      };
    case ProductTypes.CREATE_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case ProductTypes.CREATE_PRODUCT_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case ProductTypes.CREATE_PRODUCT_FAILURE:
      return {
        ...state,
        data: {} as ProductDataType,
        loading: false,
        error: action.payload.error,
      };
    case ProductTypes.DELETE_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case ProductTypes.DELETE_PRODUCT_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case ProductTypes.DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        data: {} as ProductDataType,
        loading: false,
        error: action.payload.error,
      };
    case ProductTypes.GET_ALL_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case ProductTypes.GET_ALL_PRODUCT_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case ProductTypes.GET_ALL_PRODUCT_FAILURE:
      return {
        ...state,
        data: {} as ProductDataType,
        loading: false,
        error: action.payload.error,
      };
    case ProductTypes.GET_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case ProductTypes.GET_PRODUCT_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case ProductTypes.GET_PRODUCT_FAILURE:
      return {
        ...state,
        data: {} as ProductDataType,
        loading: false,
        error: action.payload.error,
      };
    case ProductTypes.INACTIVATE_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case ProductTypes.INACTIVATE_PRODUCT_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case ProductTypes.INACTIVATE_PRODUCT_FAILURE:
      return {
        ...state,
        data: {} as ProductDataType,
        loading: false,
        error: action.payload.error,
      };
    case ProductTypes.LIST_PRODUCT_REQUEST:
      return { ...state, loading: true, saved: false, deleted: false };
    case ProductTypes.LIST_PRODUCT_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case ProductTypes.LIST_PRODUCT_FAILURE:
      return {
        ...state,
        data: {} as ProductDataType,
        loading: false,
        error: action.payload.error,
      };

    case ProductTypes.UPDATE_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case ProductTypes.UPDATE_PRODUCT_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case ProductTypes.UPDATE_PRODUCT_FAILURE:
      return {
        ...state,
        data: {} as ProductDataType,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
