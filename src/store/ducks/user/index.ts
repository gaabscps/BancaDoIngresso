import { Reducer } from 'redux';
import { UserDataType, UserState, UserTypes } from './types';

const INITIAL_STATE: UserState = {
  data: {} as UserDataType,
  loading: false,
  error: undefined,
};

const reducer: Reducer<UserState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserTypes.ACTIVATE_USER_REQUEST:
      return { ...state, loading: true };
    case UserTypes.ACTIVATE_USER_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case UserTypes.ACTIVATE_USER_FAILURE:
      return {
        ...state,
        data: {} as UserDataType,
        loading: false,
        error: action.payload.error,
      };
    case UserTypes.CREATE_USER_REQUEST:
      return { ...state, loading: true };
    case UserTypes.CREATE_USER_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case UserTypes.CREATE_USER_FAILURE:
      return {
        ...state,
        data: {} as UserDataType,
        loading: false,
        error: action.payload.error,
      };
    case UserTypes.DELETE_USER_REQUEST:
      return { ...state, loading: true };
    case UserTypes.DELETE_USER_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case UserTypes.DELETE_USER_FAILURE:
      return {
        ...state,
        data: {} as UserDataType,
        loading: false,
        error: action.payload.error,
      };
    case UserTypes.GET_ALL_USER_REQUEST:
      return { ...state, loading: true };
    case UserTypes.GET_ALL_USER_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case UserTypes.GET_ALL_USER_FAILURE:
      return {
        ...state,
        data: {} as UserDataType,
        loading: false,
        error: action.payload.error,
      };
    case UserTypes.GET_USER_REQUEST:
      return { ...state, loading: true };
    case UserTypes.GET_USER_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case UserTypes.GET_USER_FAILURE:
      return {
        ...state,
        data: {} as UserDataType,
        loading: false,
        error: action.payload.error,
      };
    case UserTypes.INACTIVATE_USER_REQUEST:
      return { ...state, loading: true };
    case UserTypes.INACTIVATE_USER_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case UserTypes.INACTIVATE_USER_FAILURE:
      return {
        ...state,
        data: {} as UserDataType,
        loading: false,
        error: action.payload.error,
      };
    case UserTypes.LIST_USER_REQUEST:
      return { ...state, loading: true, saved: false, deleted: false };
    case UserTypes.LIST_USER_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case UserTypes.LIST_USER_FAILURE:
      return {
        ...state,
        data: {} as UserDataType,
        loading: false,
        error: action.payload.error,
      };

    case UserTypes.UPDATE_USER_REQUEST:
      return { ...state, loading: true };
    case UserTypes.UPDATE_USER_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case UserTypes.UPDATE_USER_FAILURE:
      return {
        ...state,
        data: {} as UserDataType,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
