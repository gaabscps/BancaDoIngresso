import { Reducer } from 'redux';
import { PermissionDataType, PermissionState, PermissionTypes } from './types';

const INITIAL_STATE: PermissionState = {
  data: {} as PermissionDataType,
  loading: false,
  error: undefined,
};

const reducer: Reducer<PermissionState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PermissionTypes.ACTIVATE_PERMISSION_REQUEST:
      return { ...state, loading: true };
    case PermissionTypes.ACTIVATE_PERMISSION_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case PermissionTypes.ACTIVATE_PERMISSION_FAILURE:
      return {
        ...state,
        data: {} as PermissionDataType,
        loading: false,
        error: action.payload.error,
      };
    case PermissionTypes.CREATE_PERMISSION_REQUEST:
      return { ...state, loading: true };
    case PermissionTypes.CREATE_PERMISSION_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case PermissionTypes.CREATE_PERMISSION_FAILURE:
      return {
        ...state,
        data: {} as PermissionDataType,
        loading: false,
        error: action.payload.error,
      };
    case PermissionTypes.DELETE_PERMISSION_REQUEST:
      return { ...state, loading: true };
    case PermissionTypes.DELETE_PERMISSION_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case PermissionTypes.DELETE_PERMISSION_FAILURE:
      return {
        ...state,
        data: {} as PermissionDataType,
        loading: false,
        error: action.payload.error,
      };
    case PermissionTypes.GET_ALL_PERMISSION_REQUEST:
      return { ...state, loading: true };
    case PermissionTypes.GET_ALL_PERMISSION_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case PermissionTypes.GET_ALL_PERMISSION_FAILURE:
      return {
        ...state,
        data: {} as PermissionDataType,
        loading: false,
        error: action.payload.error,
      };
    case PermissionTypes.GET_PERMISSION_REQUEST:
      return { ...state, loading: true };
    case PermissionTypes.GET_PERMISSION_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case PermissionTypes.GET_PERMISSION_FAILURE:
      return {
        ...state,
        data: {} as PermissionDataType,
        loading: false,
        error: action.payload.error,
      };
    case PermissionTypes.INACTIVATE_PERMISSION_REQUEST:
      return { ...state, loading: true };
    case PermissionTypes.INACTIVATE_PERMISSION_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case PermissionTypes.INACTIVATE_PERMISSION_FAILURE:
      return {
        ...state,
        data: {} as PermissionDataType,
        loading: false,
        error: action.payload.error,
      };
    case PermissionTypes.LIST_PERMISSION_REQUEST:
      return { ...state, loading: true, saved: false, deleted: false };
    case PermissionTypes.LIST_PERMISSION_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case PermissionTypes.LIST_PERMISSION_FAILURE:
      return {
        ...state,
        data: {} as PermissionDataType,
        loading: false,
        error: action.payload.error,
      };

    case PermissionTypes.UPDATE_PERMISSION_REQUEST:
      return { ...state, loading: true };
    case PermissionTypes.UPDATE_PERMISSION_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case PermissionTypes.UPDATE_PERMISSION_FAILURE:
      return {
        ...state,
        data: {} as PermissionDataType,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
