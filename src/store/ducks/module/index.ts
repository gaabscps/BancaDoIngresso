import { Reducer } from 'redux';
import { ModuleDataType, ModuleState, ModuleTypes } from './types';

const INITIAL_STATE: ModuleState = {
  data: {} as ModuleDataType,
  loading: false,
  error: undefined,
};

const reducer: Reducer<ModuleState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ModuleTypes.ACTIVATE_MODULE_REQUEST:
      return { ...state, loading: true };
    case ModuleTypes.ACTIVATE_MODULE_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case ModuleTypes.ACTIVATE_MODULE_FAILURE:
      return {
        ...state,
        data: {} as ModuleDataType,
        loading: false,
        error: action.payload.error,
      };
    case ModuleTypes.CREATE_MODULE_REQUEST:
      return { ...state, loading: true };
    case ModuleTypes.CREATE_MODULE_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case ModuleTypes.CREATE_MODULE_FAILURE:
      return {
        ...state,
        data: {} as ModuleDataType,
        loading: false,
        error: action.payload.error,
      };
    case ModuleTypes.DELETE_MODULE_REQUEST:
      return { ...state, loading: true };
    case ModuleTypes.DELETE_MODULE_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case ModuleTypes.DELETE_MODULE_FAILURE:
      return {
        ...state,
        data: {} as ModuleDataType,
        loading: false,
        error: action.payload.error,
      };
    case ModuleTypes.GET_ALL_MODULE_REQUEST:
      return { ...state, loading: true };
    case ModuleTypes.GET_ALL_MODULE_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case ModuleTypes.GET_ALL_MODULE_FAILURE:
      return {
        ...state,
        data: {} as ModuleDataType,
        loading: false,
        error: action.payload.error,
      };
    case ModuleTypes.GET_MODULE_REQUEST:
      return { ...state, loading: true };
    case ModuleTypes.GET_MODULE_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case ModuleTypes.GET_MODULE_FAILURE:
      return {
        ...state,
        data: {} as ModuleDataType,
        loading: false,
        error: action.payload.error,
      };
    case ModuleTypes.INACTIVATE_MODULE_REQUEST:
      return { ...state, loading: true };
    case ModuleTypes.INACTIVATE_MODULE_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case ModuleTypes.INACTIVATE_MODULE_FAILURE:
      return {
        ...state,
        data: {} as ModuleDataType,
        loading: false,
        error: action.payload.error,
      };
    case ModuleTypes.LIST_MODULE_REQUEST:
      return { ...state, loading: true, saved: false, deleted: false };
    case ModuleTypes.LIST_MODULE_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case ModuleTypes.LIST_MODULE_FAILURE:
      return {
        ...state,
        data: {} as ModuleDataType,
        loading: false,
        error: action.payload.error,
      };

    case ModuleTypes.UPDATE_MODULE_REQUEST:
      return { ...state, loading: true };
    case ModuleTypes.UPDATE_MODULE_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case ModuleTypes.UPDATE_MODULE_FAILURE:
      return {
        ...state,
        data: {} as ModuleDataType,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
