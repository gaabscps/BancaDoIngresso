import { Reducer } from 'redux';
import { ProductSubgroupDataType, ProductSubgroupState, ProductSubgroupTypes } from './types';

const INITIAL_STATE: ProductSubgroupState = {
  data: {} as ProductSubgroupDataType,
  loading: false,
  error: undefined,
};

const reducer: Reducer<ProductSubgroupState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProductSubgroupTypes.ACTIVATE_PRODUCT_SUBGROUP_REQUEST:
      return { ...state, loading: true };
    case ProductSubgroupTypes.ACTIVATE_PRODUCT_SUBGROUP_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case ProductSubgroupTypes.ACTIVATE_PRODUCT_SUBGROUP_FAILURE:
      return {
        ...state,
        data: {} as ProductSubgroupDataType,
        loading: false,
        error: action.payload.error,
      };
    case ProductSubgroupTypes.CREATE_PRODUCT_SUBGROUP_REQUEST:
      return { ...state, loading: true };
    case ProductSubgroupTypes.CREATE_PRODUCT_SUBGROUP_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case ProductSubgroupTypes.CREATE_PRODUCT_SUBGROUP_FAILURE:
      return {
        ...state,
        data: {} as ProductSubgroupDataType,
        loading: false,
        error: action.payload.error,
      };
    case ProductSubgroupTypes.DELETE_PRODUCT_SUBGROUP_REQUEST:
      return { ...state, loading: true };
    case ProductSubgroupTypes.DELETE_PRODUCT_SUBGROUP_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case ProductSubgroupTypes.DELETE_PRODUCT_SUBGROUP_FAILURE:
      return {
        ...state,
        data: {} as ProductSubgroupDataType,
        loading: false,
        error: action.payload.error,
      };
    case ProductSubgroupTypes.GET_ALL_PRODUCT_SUBGROUP_REQUEST:
      return { ...state, loading: true };
    case ProductSubgroupTypes.GET_ALL_PRODUCT_SUBGROUP_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case ProductSubgroupTypes.GET_ALL_PRODUCT_SUBGROUP_FAILURE:
      return {
        ...state,
        data: {} as ProductSubgroupDataType,
        loading: false,
        error: action.payload.error,
      };
    case ProductSubgroupTypes.GET_PRODUCT_SUBGROUP_REQUEST:
      return { ...state, loading: true };
    case ProductSubgroupTypes.GET_PRODUCT_SUBGROUP_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case ProductSubgroupTypes.GET_PRODUCT_SUBGROUP_FAILURE:
      return {
        ...state,
        data: {} as ProductSubgroupDataType,
        loading: false,
        error: action.payload.error,
      };
    case ProductSubgroupTypes.INACTIVATE_PRODUCT_SUBGROUP_REQUEST:
      return { ...state, loading: true };
    case ProductSubgroupTypes.INACTIVATE_PRODUCT_SUBGROUP_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case ProductSubgroupTypes.INACTIVATE_PRODUCT_SUBGROUP_FAILURE:
      return {
        ...state,
        data: {} as ProductSubgroupDataType,
        loading: false,
        error: action.payload.error,
      };
    case ProductSubgroupTypes.LIST_PRODUCT_SUBGROUP_REQUEST:
      return { ...state, loading: true, saved: false, deleted: false };
    case ProductSubgroupTypes.LIST_PRODUCT_SUBGROUP_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case ProductSubgroupTypes.LIST_PRODUCT_SUBGROUP_FAILURE:
      return {
        ...state,
        data: {} as ProductSubgroupDataType,
        loading: false,
        error: action.payload.error,
      };

    case ProductSubgroupTypes.UPDATE_PRODUCT_SUBGROUP_REQUEST:
      return { ...state, loading: true };
    case ProductSubgroupTypes.UPDATE_PRODUCT_SUBGROUP_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case ProductSubgroupTypes.UPDATE_PRODUCT_SUBGROUP_FAILURE:
      return {
        ...state,
        data: {} as ProductSubgroupDataType,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
