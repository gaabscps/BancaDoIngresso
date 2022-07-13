import { Reducer } from 'redux';
import { PaymentGatewayDataType, PaymentGatewayState, PaymentGatewayTypes } from './types';

const INITIAL_STATE: PaymentGatewayState = {
  data: {} as PaymentGatewayDataType,
  loading: false,
  error: undefined,
};

const reducer: Reducer<PaymentGatewayState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PaymentGatewayTypes.ACTIVATE_PAYMENT_GATEWAY_REQUEST:
      return { ...state, loading: true };
    case PaymentGatewayTypes.ACTIVATE_PAYMENT_GATEWAY_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case PaymentGatewayTypes.ACTIVATE_PAYMENT_GATEWAY_FAILURE:
      return {
        ...state,
        data: {} as PaymentGatewayDataType,
        loading: false,
        error: action.payload.error,
      };
    case PaymentGatewayTypes.CREATE_PAYMENT_GATEWAY_REQUEST:
      return { ...state, loading: true };
    case PaymentGatewayTypes.CREATE_PAYMENT_GATEWAY_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case PaymentGatewayTypes.CREATE_PAYMENT_GATEWAY_FAILURE:
      return {
        ...state,
        data: {} as PaymentGatewayDataType,
        loading: false,
        error: action.payload.error,
      };
    case PaymentGatewayTypes.DELETE_PAYMENT_GATEWAY_REQUEST:
      return { ...state, loading: true };
    case PaymentGatewayTypes.DELETE_PAYMENT_GATEWAY_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case PaymentGatewayTypes.DELETE_PAYMENT_GATEWAY_FAILURE:
      return {
        ...state,
        data: {} as PaymentGatewayDataType,
        loading: false,
        error: action.payload.error,
      };
    case PaymentGatewayTypes.GET_ALL_PAYMENT_GATEWAY_REQUEST:
      return { ...state, loading: true };
    case PaymentGatewayTypes.GET_ALL_PAYMENT_GATEWAY_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case PaymentGatewayTypes.GET_ALL_PAYMENT_GATEWAY_FAILURE:
      return {
        ...state,
        data: {} as PaymentGatewayDataType,
        loading: false,
        error: action.payload.error,
      };
    case PaymentGatewayTypes.GET_PAYMENT_GATEWAY_REQUEST:
      return { ...state, loading: true };
    case PaymentGatewayTypes.GET_PAYMENT_GATEWAY_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case PaymentGatewayTypes.GET_PAYMENT_GATEWAY_FAILURE:
      return {
        ...state,
        data: {} as PaymentGatewayDataType,
        loading: false,
        error: action.payload.error,
      };
    case PaymentGatewayTypes.INACTIVATE_PAYMENT_GATEWAY_REQUEST:
      return { ...state, loading: true };
    case PaymentGatewayTypes.INACTIVATE_PAYMENT_GATEWAY_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case PaymentGatewayTypes.INACTIVATE_PAYMENT_GATEWAY_FAILURE:
      return {
        ...state,
        data: {} as PaymentGatewayDataType,
        loading: false,
        error: action.payload.error,
      };
    case PaymentGatewayTypes.LIST_PAYMENT_GATEWAY_REQUEST:
      return { ...state, loading: true, saved: false, deleted: false };
    case PaymentGatewayTypes.LIST_PAYMENT_GATEWAY_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case PaymentGatewayTypes.LIST_PAYMENT_GATEWAY_FAILURE:
      return {
        ...state,
        data: {} as PaymentGatewayDataType,
        loading: false,
        error: action.payload.error,
      };

    case PaymentGatewayTypes.UPDATE_PAYMENT_GATEWAY_REQUEST:
      return { ...state, loading: true };
    case PaymentGatewayTypes.UPDATE_PAYMENT_GATEWAY_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case PaymentGatewayTypes.UPDATE_PAYMENT_GATEWAY_FAILURE:
      return {
        ...state,
        data: {} as PaymentGatewayDataType,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
