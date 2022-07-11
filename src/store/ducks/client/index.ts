import { Reducer } from 'redux';
import { ClientDataType, ClientState, ClientTypes } from './types';

const INITIAL_STATE: ClientState = {
  data: {} as ClientDataType,
  loading: false,
  error: undefined,
};

const reducer: Reducer<ClientState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ClientTypes.LIST_CLIENT_REQUEST:
      return { ...state, loading: true, saved: false, deleted: false };
    case ClientTypes.LIST_CLIENT_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case ClientTypes.LIST_CLIENT_FAILURE:
      return {
        ...state,
        data: {} as ClientDataType,
        loading: false,
        error: action.payload.error,
      };
    case ClientTypes.GET_CLIENT_REQUEST:
      return { ...state, loading: true };
    case ClientTypes.GET_CLIENT_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case ClientTypes.GET_CLIENT_FAILURE:
      return {
        ...state,
        data: {} as ClientDataType,
        loading: false,
        error: action.payload.error,
      };
    case ClientTypes.UPDATE_CLIENT_REQUEST:
      return { ...state, loading: true };
    case ClientTypes.UPDATE_CLIENT_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case ClientTypes.UPDATE_CLIENT_FAILURE:
      return {
        ...state,
        data: {} as ClientDataType,
        loading: false,
        error: action.payload.error,
      };
    case ClientTypes.ACTIVATE_CLIENT_REQUEST:
      return { ...state, loading: true };
    case ClientTypes.ACTIVATE_CLIENT_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case ClientTypes.ACTIVATE_CLIENT_FAILURE:
      return {
        ...state,
        data: {} as ClientDataType,
        loading: false,
        error: action.payload.error,
      };
    case ClientTypes.INACTIVATE_CLIENT_REQUEST:
      return { ...state, loading: true };
    case ClientTypes.INACTIVATE_CLIENT_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case ClientTypes.INACTIVATE_CLIENT_FAILURE:
      return {
        ...state,
        data: {} as ClientDataType,
        loading: false,
        error: action.payload.error,
      };
    case ClientTypes.DELETE_CLIENT_REQUEST:
      return { ...state, loading: true };
    case ClientTypes.DELETE_CLIENT_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case ClientTypes.DELETE_CLIENT_FAILURE:
      return {
        ...state,
        data: {} as ClientDataType,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
