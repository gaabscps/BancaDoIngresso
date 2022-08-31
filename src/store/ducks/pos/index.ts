import { Reducer } from 'redux';
import { PosDataType, PosState, PosTypes } from './types';

const INITIAL_STATE: PosState = {
  data: {} as PosDataType,
  loading: false,
  error: undefined,
};

const reducer: Reducer<PosState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PosTypes.CREATE_POS_REQUEST:
      return { ...state, loading: true };
    case PosTypes.CREATE_POS_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case PosTypes.CREATE_POS_FAILURE:
      return {
        ...state,
        data: {} as PosDataType,
        loading: false,
        error: action.payload.error,
      };
    case PosTypes.DELETE_POS_REQUEST:
      return { ...state, loading: true };
    case PosTypes.DELETE_POS_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case PosTypes.DELETE_POS_FAILURE:
      return {
        ...state,
        data: {} as PosDataType,
        loading: false,
        error: action.payload.error,
      };
    case PosTypes.GET_ALL_POS_REQUEST:
      return { ...state, loading: true };
    case PosTypes.GET_ALL_POS_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case PosTypes.GET_ALL_POS_FAILURE:
      return {
        ...state,
        data: {} as PosDataType,
        loading: false,
        error: action.payload.error,
      };
    case PosTypes.GET_POS_REQUEST:
      return { ...state, loading: true };
    case PosTypes.GET_POS_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case PosTypes.GET_POS_FAILURE:
      return {
        ...state,
        data: {} as PosDataType,
        loading: false,
        error: action.payload.error,
      };
    case PosTypes.LIST_POS_REQUEST:
      return { ...state, loading: true, saved: false, deleted: false };
    case PosTypes.LIST_POS_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case PosTypes.LIST_POS_FAILURE:
      return {
        ...state,
        data: {} as PosDataType,
        loading: false,
        error: action.payload.error,
      };

    case PosTypes.UPDATE_POS_REQUEST:
      return { ...state, loading: true };
    case PosTypes.UPDATE_POS_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case PosTypes.UPDATE_POS_FAILURE:
      return {
        ...state,
        data: {} as PosDataType,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
