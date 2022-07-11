import { Reducer } from 'redux';
import { CompanyDataType, CompanyState, CompanyTypes } from './types';

const INITIAL_STATE: CompanyState = {
  data: {} as CompanyDataType,
  loading: false,
  error: undefined,
};

const reducer: Reducer<CompanyState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CompanyTypes.LIST_COMPANY_REQUEST:
      return { ...state, loading: true, saved: false, deleted: false };
    case CompanyTypes.LIST_COMPANY_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case CompanyTypes.LIST_COMPANY_FAILURE:
      return {
        ...state,
        data: {} as CompanyDataType,
        loading: false,
        error: action.payload.error,
      };
    case CompanyTypes.GET_ALL_COMPANY_REQUEST:
      return { ...state, loading: true };
    case CompanyTypes.GET_ALL_COMPANY_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case CompanyTypes.GET_ALL_COMPANY_FAILURE:
      return {
        ...state,
        data: {} as CompanyDataType,
        loading: false,
        error: action.payload.error,
      };
    case CompanyTypes.GET_COMPANY_REQUEST:
      return { ...state, loading: true };
    case CompanyTypes.GET_COMPANY_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case CompanyTypes.GET_COMPANY_FAILURE:
      return {
        ...state,
        data: {} as CompanyDataType,
        loading: false,
        error: action.payload.error,
      };
    case CompanyTypes.CREATE_COMPANY_REQUEST:
      return { ...state, loading: true };
    case CompanyTypes.CREATE_COMPANY_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case CompanyTypes.CREATE_COMPANY_FAILURE:
      return {
        ...state,
        data: {} as CompanyDataType,
        loading: false,
        error: action.payload.error,
      };
    case CompanyTypes.UPDATE_COMPANY_REQUEST:
      return { ...state, loading: true };
    case CompanyTypes.UPDATE_COMPANY_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case CompanyTypes.UPDATE_COMPANY_FAILURE:
      return {
        ...state,
        data: {} as CompanyDataType,
        loading: false,
        error: action.payload.error,
      };
    case CompanyTypes.ACTIVATE_COMPANY_REQUEST:
      return { ...state, loading: true };
    case CompanyTypes.ACTIVATE_COMPANY_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case CompanyTypes.ACTIVATE_COMPANY_FAILURE:
      return {
        ...state,
        data: {} as CompanyDataType,
        loading: false,
        error: action.payload.error,
      };
    case CompanyTypes.INACTIVATE_COMPANY_REQUEST:
      return { ...state, loading: true };
    case CompanyTypes.INACTIVATE_COMPANY_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case CompanyTypes.INACTIVATE_COMPANY_FAILURE:
      return {
        ...state,
        data: {} as CompanyDataType,
        loading: false,
        error: action.payload.error,
      };
    case CompanyTypes.DELETE_COMPANY_REQUEST:
      return { ...state, loading: true };
    case CompanyTypes.DELETE_COMPANY_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case CompanyTypes.DELETE_COMPANY_FAILURE:
      return {
        ...state,
        data: {} as CompanyDataType,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
