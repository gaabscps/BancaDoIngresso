import { Reducer } from 'redux';
import { ComboDataType, ComboState, ComboTypes } from './types';

const INITIAL_STATE: ComboState = {
  data: {} as ComboDataType,
  loading: false,
  error: undefined,
};

const reducer: Reducer<ComboState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ComboTypes.LIST_COMBO_REQUEST:
      return { ...state, loading: true, saved: false, deleted: false };
    case ComboTypes.LIST_COMBO_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case ComboTypes.LIST_COMBO_FAILURE:
      return {
        ...state,
        data: {} as ComboDataType,
        loading: false,
        error: action.payload.error,
      };
    case ComboTypes.GET_ALL_COMBO_REQUEST:
      return { ...state, loading: true };
    case ComboTypes.GET_ALL_COMBO_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case ComboTypes.GET_ALL_COMBO_FAILURE:
      return {
        ...state,
        data: {} as ComboDataType,
        loading: false,
        error: action.payload.error,
      };
    case ComboTypes.GET_COMBO_REQUEST:
      return { ...state, loading: true };
    case ComboTypes.GET_COMBO_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case ComboTypes.GET_COMBO_FAILURE:
      return {
        ...state,
        data: {} as ComboDataType,
        loading: false,
        error: action.payload.error,
      };
    case ComboTypes.CREATE_COMBO_REQUEST:
      return { ...state, loading: true };
    case ComboTypes.CREATE_COMBO_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case ComboTypes.CREATE_COMBO_FAILURE:
      return {
        ...state,
        data: {} as ComboDataType,
        loading: false,
        error: action.payload.error,
      };
    case ComboTypes.UPDATE_COMBO_REQUEST:
      return { ...state, loading: true };
    case ComboTypes.UPDATE_COMBO_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case ComboTypes.UPDATE_COMBO_FAILURE:
      return {
        ...state,
        data: {} as ComboDataType,
        loading: false,
        error: action.payload.error,
      };
    case ComboTypes.ACTIVATE_COMBO_REQUEST:
      return { ...state, loading: true };
    case ComboTypes.ACTIVATE_COMBO_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case ComboTypes.ACTIVATE_COMBO_FAILURE:
      return {
        ...state,
        data: {} as ComboDataType,
        loading: false,
        error: action.payload.error,
      };
    case ComboTypes.INACTIVATE_COMBO_REQUEST:
      return { ...state, loading: true };
    case ComboTypes.INACTIVATE_COMBO_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case ComboTypes.INACTIVATE_COMBO_FAILURE:
      return {
        ...state,
        data: {} as ComboDataType,
        loading: false,
        error: action.payload.error,
      };
    case ComboTypes.DELETE_COMBO_REQUEST:
      return { ...state, loading: true };
    case ComboTypes.DELETE_COMBO_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case ComboTypes.DELETE_COMBO_FAILURE:
      return {
        ...state,
        data: {} as ComboDataType,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
