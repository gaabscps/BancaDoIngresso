import { Reducer } from 'redux';
import { ProfileDataType, ProfileState, ProfileTypes } from './types';

const INITIAL_STATE: ProfileState = {
  data: {} as ProfileDataType,
  loading: false,
  error: undefined,
};

const reducer: Reducer<ProfileState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProfileTypes.ACTIVATE_PROFILE_REQUEST:
      return { ...state, loading: true };
    case ProfileTypes.ACTIVATE_PROFILE_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case ProfileTypes.ACTIVATE_PROFILE_FAILURE:
      return {
        ...state,
        data: {} as ProfileDataType,
        loading: false,
        error: action.payload.error,
      };
    case ProfileTypes.ADD_PERMISSION_PROFILE_REQUEST:
      return { ...state, loading: true };
    case ProfileTypes.ADD_PERMISSION_PROFILE_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case ProfileTypes.ADD_PERMISSION_PROFILE_FAILURE:
      return {
        ...state,
        data: {} as ProfileDataType,
        loading: false,
        error: action.payload.error,
      };
    case ProfileTypes.CREATE_PROFILE_REQUEST:
      return { ...state, loading: true };
    case ProfileTypes.CREATE_PROFILE_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case ProfileTypes.CREATE_PROFILE_FAILURE:
      return {
        ...state,
        data: {} as ProfileDataType,
        loading: false,
        error: action.payload.error,
      };
    case ProfileTypes.DELETE_PROFILE_REQUEST:
      return { ...state, loading: true };
    case ProfileTypes.DELETE_PROFILE_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case ProfileTypes.DELETE_PROFILE_FAILURE:
      return {
        ...state,
        data: {} as ProfileDataType,
        loading: false,
        error: action.payload.error,
      };
    case ProfileTypes.GET_ALL_PROFILE_REQUEST:
      return { ...state, loading: true };
    case ProfileTypes.GET_ALL_PROFILE_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case ProfileTypes.GET_ALL_PROFILE_FAILURE:
      return {
        ...state,
        data: {} as ProfileDataType,
        loading: false,
        error: action.payload.error,
      };
    case ProfileTypes.GET_PROFILE_REQUEST:
      return { ...state, loading: true };
    case ProfileTypes.GET_PROFILE_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case ProfileTypes.GET_PROFILE_FAILURE:
      return {
        ...state,
        data: {} as ProfileDataType,
        loading: false,
        error: action.payload.error,
      };
    case ProfileTypes.INACTIVATE_PROFILE_REQUEST:
      return { ...state, loading: true };
    case ProfileTypes.INACTIVATE_PROFILE_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case ProfileTypes.INACTIVATE_PROFILE_FAILURE:
      return {
        ...state,
        data: {} as ProfileDataType,
        loading: false,
        error: action.payload.error,
      };
    case ProfileTypes.LIST_PROFILE_REQUEST:
      return { ...state, loading: true, saved: false, deleted: false };
    case ProfileTypes.LIST_PROFILE_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case ProfileTypes.LIST_PROFILE_FAILURE:
      return {
        ...state,
        data: {} as ProfileDataType,
        loading: false,
        error: action.payload.error,
      };

    case ProfileTypes.UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true };
    case ProfileTypes.UPDATE_PROFILE_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case ProfileTypes.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        data: {} as ProfileDataType,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
