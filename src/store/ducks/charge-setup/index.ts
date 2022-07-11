import { Reducer } from 'redux';
import { ChargeSetupDataType, ChargeSetupState, ChargeSetupTypes } from './types';

const INITIAL_STATE: ChargeSetupState = {
  data: {} as ChargeSetupDataType,
  loading: false,
  error: undefined,
};

const reducer: Reducer<ChargeSetupState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ChargeSetupTypes.LIST_CHARGE_SETUP_REQUEST:
      return { ...state, loading: true, saved: false, deleted: false };
    case ChargeSetupTypes.LIST_CHARGE_SETUP_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case ChargeSetupTypes.LIST_CHARGE_SETUP_FAILURE:
      return {
        ...state,
        data: {} as ChargeSetupDataType,
        loading: false,
        error: action.payload.error,
      };
    case ChargeSetupTypes.GET_ALL_CHARGE_SETUP_REQUEST:
      return { ...state, loading: true };
    case ChargeSetupTypes.GET_ALL_CHARGE_SETUP_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case ChargeSetupTypes.GET_ALL_CHARGE_SETUP_FAILURE:
      return {
        ...state,
        data: {} as ChargeSetupDataType,
        loading: false,
        error: action.payload.error,
      };
    case ChargeSetupTypes.GET_CHARGE_SETUP_REQUEST:
      return { ...state, loading: true };
    case ChargeSetupTypes.GET_CHARGE_SETUP_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case ChargeSetupTypes.GET_CHARGE_SETUP_FAILURE:
      return {
        ...state,
        data: {} as ChargeSetupDataType,
        loading: false,
        error: action.payload.error,
      };
    case ChargeSetupTypes.CREATE_CHARGE_SETUP_REQUEST:
      return { ...state, loading: true };
    case ChargeSetupTypes.CREATE_CHARGE_SETUP_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case ChargeSetupTypes.CREATE_CHARGE_SETUP_FAILURE:
      return {
        ...state,
        data: {} as ChargeSetupDataType,
        loading: false,
        error: action.payload.error,
      };
    case ChargeSetupTypes.UPDATE_CHARGE_SETUP_REQUEST:
      return { ...state, loading: true };
    case ChargeSetupTypes.UPDATE_CHARGE_SETUP_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case ChargeSetupTypes.UPDATE_CHARGE_SETUP_FAILURE:
      return {
        ...state,
        data: {} as ChargeSetupDataType,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
