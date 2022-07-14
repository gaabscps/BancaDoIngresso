import { Reducer } from 'redux';
import { PdvDataType, PdvState, PdvTypes } from './types';

const INITIAL_STATE: PdvState = {
  data: {} as PdvDataType,
  loading: false,
  error: undefined,
};

const reducer: Reducer<PdvState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PdvTypes.ACTIVATE_PDV_REQUEST:
      return { ...state, loading: true };
    case PdvTypes.ACTIVATE_PDV_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case PdvTypes.ACTIVATE_PDV_FAILURE:
      return {
        ...state,
        data: {} as PdvDataType,
        loading: false,
        error: action.payload.error,
      };
    case PdvTypes.ADD_USER_PDV_REQUEST:
      return { ...state, loading: true };
    case PdvTypes.ADD_USER_PDV_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case PdvTypes.ADD_USER_PDV_FAILURE:
      return {
        ...state,
        data: {} as PdvDataType,
        loading: false,
        error: action.payload.error,
      };
    case PdvTypes.CREATE_PDV_REQUEST:
      return { ...state, loading: true };
    case PdvTypes.CREATE_PDV_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case PdvTypes.CREATE_PDV_FAILURE:
      return {
        ...state,
        data: {} as PdvDataType,
        loading: false,
        error: action.payload.error,
      };
    case PdvTypes.DELETE_PDV_REQUEST:
      return { ...state, loading: true };
    case PdvTypes.DELETE_PDV_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case PdvTypes.DELETE_PDV_FAILURE:
      return {
        ...state,
        data: {} as PdvDataType,
        loading: false,
        error: action.payload.error,
      };
    case PdvTypes.GET_ALL_PDV_REQUEST:
      return { ...state, loading: true };
    case PdvTypes.GET_ALL_PDV_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case PdvTypes.GET_ALL_PDV_FAILURE:
      return {
        ...state,
        data: {} as PdvDataType,
        loading: false,
        error: action.payload.error,
      };
    case PdvTypes.GET_PDV_REQUEST:
      return { ...state, loading: true };
    case PdvTypes.GET_PDV_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case PdvTypes.GET_PDV_FAILURE:
      return {
        ...state,
        data: {} as PdvDataType,
        loading: false,
        error: action.payload.error,
      };
    case PdvTypes.INACTIVATE_PDV_REQUEST:
      return { ...state, loading: true };
    case PdvTypes.INACTIVATE_PDV_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case PdvTypes.INACTIVATE_PDV_FAILURE:
      return {
        ...state,
        data: {} as PdvDataType,
        loading: false,
        error: action.payload.error,
      };
    case PdvTypes.LIST_PDV_REQUEST:
      return { ...state, loading: true, saved: false, deleted: false };
    case PdvTypes.LIST_PDV_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case PdvTypes.LIST_PDV_FAILURE:
      return {
        ...state,
        data: {} as PdvDataType,
        loading: false,
        error: action.payload.error,
      };

    case PdvTypes.UPDATE_PDV_REQUEST:
      return { ...state, loading: true };
    case PdvTypes.UPDATE_PDV_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case PdvTypes.UPDATE_PDV_FAILURE:
      return {
        ...state,
        data: {} as PdvDataType,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
