import { Reducer } from 'redux';
import { SubPdvDataType, SubPdvState, SubPdvTypes } from './types';

const INITIAL_STATE: SubPdvState = {
  data: {} as SubPdvDataType,
  loading: false,
  error: undefined,
};

const reducer: Reducer<SubPdvState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SubPdvTypes.ACTIVATE_SUB_PDV_REQUEST:
      return { ...state, loading: true };
    case SubPdvTypes.ACTIVATE_SUB_PDV_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case SubPdvTypes.ACTIVATE_SUB_PDV_FAILURE:
      return {
        ...state,
        data: {} as SubPdvDataType,
        loading: false,
        error: action.payload.error,
      };
    case SubPdvTypes.ADD_USER_SUB_PDV_REQUEST:
      return { ...state, loading: true };
    case SubPdvTypes.ADD_USER_SUB_PDV_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case SubPdvTypes.ADD_USER_SUB_PDV_FAILURE:
      return {
        ...state,
        data: {} as SubPdvDataType,
        loading: false,
        error: action.payload.error,
      };
    case SubPdvTypes.CREATE_SUB_PDV_REQUEST:
      return { ...state, loading: true };
    case SubPdvTypes.CREATE_SUB_PDV_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case SubPdvTypes.CREATE_SUB_PDV_FAILURE:
      return {
        ...state,
        data: {} as SubPdvDataType,
        loading: false,
        error: action.payload.error,
      };
    case SubPdvTypes.DELETE_SUB_PDV_REQUEST:
      return { ...state, loading: true };
    case SubPdvTypes.DELETE_SUB_PDV_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case SubPdvTypes.DELETE_SUB_PDV_FAILURE:
      return {
        ...state,
        data: {} as SubPdvDataType,
        loading: false,
        error: action.payload.error,
      };
    case SubPdvTypes.GET_ALL_SUB_PDV_REQUEST:
      return { ...state, loading: true };
    case SubPdvTypes.GET_ALL_SUB_PDV_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case SubPdvTypes.GET_ALL_SUB_PDV_FAILURE:
      return {
        ...state,
        data: {} as SubPdvDataType,
        loading: false,
        error: action.payload.error,
      };
    case SubPdvTypes.GET_SUB_PDV_REQUEST:
      return { ...state, loading: true };
    case SubPdvTypes.GET_SUB_PDV_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case SubPdvTypes.GET_SUB_PDV_FAILURE:
      return {
        ...state,
        data: {} as SubPdvDataType,
        loading: false,
        error: action.payload.error,
      };
    case SubPdvTypes.INACTIVATE_SUB_PDV_REQUEST:
      return { ...state, loading: true };
    case SubPdvTypes.INACTIVATE_SUB_PDV_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case SubPdvTypes.INACTIVATE_SUB_PDV_FAILURE:
      return {
        ...state,
        data: {} as SubPdvDataType,
        loading: false,
        error: action.payload.error,
      };
    case SubPdvTypes.LIST_SUB_PDV_REQUEST:
      return { ...state, loading: true, saved: false, deleted: false };
    case SubPdvTypes.LIST_SUB_PDV_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case SubPdvTypes.LIST_SUB_PDV_FAILURE:
      return {
        ...state,
        data: {} as SubPdvDataType,
        loading: false,
        error: action.payload.error,
      };

    case SubPdvTypes.UPDATE_SUB_PDV_REQUEST:
      return { ...state, loading: true };
    case SubPdvTypes.UPDATE_SUB_PDV_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case SubPdvTypes.UPDATE_SUB_PDV_FAILURE:
      return {
        ...state,
        data: {} as SubPdvDataType,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
