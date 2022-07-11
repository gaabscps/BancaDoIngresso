import { Reducer } from 'redux';
import { ContractorDataType, ContractorState, ContractorTypes } from './types';

const INITIAL_STATE: ContractorState = {
  data: {} as ContractorDataType,
  loading: false,
  error: undefined,
};

const reducer: Reducer<ContractorState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ContractorTypes.ACTIVATE_CONTRACTOR_REQUEST:
      return { ...state, loading: true };
    case ContractorTypes.ACTIVATE_CONTRACTOR_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case ContractorTypes.ACTIVATE_CONTRACTOR_FAILURE:
      return {
        ...state,
        data: {} as ContractorDataType,
        loading: false,
        error: action.payload.error,
      };
    case ContractorTypes.ADD_USER_CONTRACTOR_REQUEST:
      return { ...state, loading: true };
    case ContractorTypes.ADD_USER_CONTRACTOR_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case ContractorTypes.ADD_USER_CONTRACTOR_FAILURE:
      return {
        ...state,
        data: {} as ContractorDataType,
        loading: false,
        error: action.payload.error,
      };
    case ContractorTypes.CREATE_CONTRACTOR_REQUEST:
      return { ...state, loading: true };
    case ContractorTypes.CREATE_CONTRACTOR_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case ContractorTypes.CREATE_CONTRACTOR_FAILURE:
      return {
        ...state,
        data: {} as ContractorDataType,
        loading: false,
        error: action.payload.error,
      };
    case ContractorTypes.DELETE_CONTRACTOR_REQUEST:
      return { ...state, loading: true };
    case ContractorTypes.DELETE_CONTRACTOR_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case ContractorTypes.DELETE_CONTRACTOR_FAILURE:
      return {
        ...state,
        data: {} as ContractorDataType,
        loading: false,
        error: action.payload.error,
      };
    case ContractorTypes.GET_ALL_CONTRACTOR_REQUEST:
      return { ...state, loading: true };
    case ContractorTypes.GET_ALL_CONTRACTOR_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case ContractorTypes.GET_ALL_CONTRACTOR_FAILURE:
      return {
        ...state,
        data: {} as ContractorDataType,
        loading: false,
        error: action.payload.error,
      };
    case ContractorTypes.GET_CONTRACTOR_REQUEST:
      return { ...state, loading: true };
    case ContractorTypes.GET_CONTRACTOR_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case ContractorTypes.GET_CONTRACTOR_FAILURE:
      return {
        ...state,
        data: {} as ContractorDataType,
        loading: false,
        error: action.payload.error,
      };
    case ContractorTypes.INACTIVATE_CONTRACTOR_REQUEST:
      return { ...state, loading: true };
    case ContractorTypes.INACTIVATE_CONTRACTOR_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case ContractorTypes.INACTIVATE_CONTRACTOR_FAILURE:
      return {
        ...state,
        data: {} as ContractorDataType,
        loading: false,
        error: action.payload.error,
      };
    case ContractorTypes.LIST_CONTRACTOR_REQUEST:
      return { ...state, loading: true, saved: false, deleted: false };
    case ContractorTypes.LIST_CONTRACTOR_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case ContractorTypes.LIST_CONTRACTOR_FAILURE:
      return {
        ...state,
        data: {} as ContractorDataType,
        loading: false,
        error: action.payload.error,
      };

    case ContractorTypes.UPDATE_CONTRACTOR_REQUEST:
      return { ...state, loading: true };
    case ContractorTypes.UPDATE_CONTRACTOR_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case ContractorTypes.UPDATE_CONTRACTOR_FAILURE:
      return {
        ...state,
        data: {} as ContractorDataType,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
