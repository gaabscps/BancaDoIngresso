import { Reducer } from 'redux';
import { ProductGroupDataType, ProductGroupState, ProductGroupTypes } from './types';

const INITIAL_STATE: ProductGroupState = {
  data: {} as ProductGroupDataType,
  loading: false,
  error: undefined,
};

const reducer: Reducer<ProductGroupState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProductGroupTypes.ACTIVATE_PRODUCT_GROUP_REQUEST:
      return { ...state, loading: true };
    case ProductGroupTypes.ACTIVATE_PRODUCT_GROUP_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case ProductGroupTypes.ACTIVATE_PRODUCT_GROUP_FAILURE:
      return {
        ...state,
        data: {} as ProductGroupDataType,
        loading: false,
        error: action.payload.error,
      };
    case ProductGroupTypes.CREATE_PRODUCT_GROUP_REQUEST:
      return { ...state, loading: true };
    case ProductGroupTypes.CREATE_PRODUCT_GROUP_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case ProductGroupTypes.CREATE_PRODUCT_GROUP_FAILURE:
      return {
        ...state,
        data: {} as ProductGroupDataType,
        loading: false,
        error: action.payload.error,
      };
    case ProductGroupTypes.DELETE_PRODUCT_GROUP_REQUEST:
      return { ...state, loading: true };
    case ProductGroupTypes.DELETE_PRODUCT_GROUP_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case ProductGroupTypes.DELETE_PRODUCT_GROUP_FAILURE:
      return {
        ...state,
        data: {} as ProductGroupDataType,
        loading: false,
        error: action.payload.error,
      };
    case ProductGroupTypes.GET_ALL_PRODUCT_GROUP_REQUEST:
      return { ...state, loading: true };
    case ProductGroupTypes.GET_ALL_PRODUCT_GROUP_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case ProductGroupTypes.GET_ALL_PRODUCT_GROUP_FAILURE:
      return {
        ...state,
        data: {} as ProductGroupDataType,
        loading: false,
        error: action.payload.error,
      };
    case ProductGroupTypes.GET_PRODUCT_GROUP_REQUEST:
      return { ...state, loading: true };
    case ProductGroupTypes.GET_PRODUCT_GROUP_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case ProductGroupTypes.GET_PRODUCT_GROUP_FAILURE:
      return {
        ...state,
        data: {} as ProductGroupDataType,
        loading: false,
        error: action.payload.error,
      };
    case ProductGroupTypes.INACTIVATE_PRODUCT_GROUP_REQUEST:
      return { ...state, loading: true };
    case ProductGroupTypes.INACTIVATE_PRODUCT_GROUP_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case ProductGroupTypes.INACTIVATE_PRODUCT_GROUP_FAILURE:
      return {
        ...state,
        data: {} as ProductGroupDataType,
        loading: false,
        error: action.payload.error,
      };
    case ProductGroupTypes.LIST_PRODUCT_GROUP_REQUEST:
      return { ...state, loading: true, saved: false, deleted: false };
    case ProductGroupTypes.LIST_PRODUCT_GROUP_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case ProductGroupTypes.LIST_PRODUCT_GROUP_FAILURE:
      return {
        ...state,
        data: {} as ProductGroupDataType,
        loading: false,
        error: action.payload.error,
      };

    case ProductGroupTypes.UPDATE_PRODUCT_GROUP_REQUEST:
      return { ...state, loading: true };
    case ProductGroupTypes.UPDATE_PRODUCT_GROUP_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case ProductGroupTypes.UPDATE_PRODUCT_GROUP_FAILURE:
      return {
        ...state,
        data: {} as ProductGroupDataType,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
