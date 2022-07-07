import { Reducer } from 'redux';
import { AuthDataType, AuthState, AuthTypes } from './types';

const INITIAL_STATE: AuthState = {
  data: {} as AuthDataType,
  loading: false,
  error: undefined,
};

const reducer: Reducer<AuthState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthTypes.LOGIN_AUTH_REQUEST:
      return { ...state, loading: true };
    case AuthTypes.LOGIN_AUTH_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case AuthTypes.LOGIN_AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case AuthTypes.RECOVER_PASSWORD_AUTH_REQUEST:
      return { ...state, loading: true };
    case AuthTypes.RECOVER_PASSWORD_AUTH_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case AuthTypes.RECOVER_PASSWORD_AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case AuthTypes.CHANGE_PASSWORD_AUTH_REQUEST:
      return { ...state, loading: true };
    case AuthTypes.CHANGE_PASSWORD_AUTH_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case AuthTypes.CHANGE_PASSWORD_AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case AuthTypes.REFRESH_TOKEN_AUTH_REQUEST:
      return { ...state, loading: true };
    case AuthTypes.REFRESH_TOKEN_AUTH_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case AuthTypes.REFRESH_TOKEN_AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
