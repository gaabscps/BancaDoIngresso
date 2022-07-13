import { Reducer } from 'redux';
import { PrinterDataType, PrinterState, PrinterTypes } from './types';

const INITIAL_STATE: PrinterState = {
  data: {} as PrinterDataType,
  loading: false,
  error: undefined,
};

const reducer: Reducer<PrinterState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PrinterTypes.ACTIVATE_PRINTER_REQUEST:
      return { ...state, loading: true };
    case PrinterTypes.ACTIVATE_PRINTER_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case PrinterTypes.ACTIVATE_PRINTER_FAILURE:
      return {
        ...state,
        data: {} as PrinterDataType,
        loading: false,
        error: action.payload.error,
      };
    case PrinterTypes.CREATE_PRINTER_REQUEST:
      return { ...state, loading: true };
    case PrinterTypes.CREATE_PRINTER_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case PrinterTypes.CREATE_PRINTER_FAILURE:
      return {
        ...state,
        data: {} as PrinterDataType,
        loading: false,
        error: action.payload.error,
      };
    case PrinterTypes.DELETE_PRINTER_REQUEST:
      return { ...state, loading: true };
    case PrinterTypes.DELETE_PRINTER_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case PrinterTypes.DELETE_PRINTER_FAILURE:
      return {
        ...state,
        data: {} as PrinterDataType,
        loading: false,
        error: action.payload.error,
      };
    case PrinterTypes.GET_ALL_PRINTER_REQUEST:
      return { ...state, loading: true };
    case PrinterTypes.GET_ALL_PRINTER_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case PrinterTypes.GET_ALL_PRINTER_FAILURE:
      return {
        ...state,
        data: {} as PrinterDataType,
        loading: false,
        error: action.payload.error,
      };
    case PrinterTypes.GET_PRINTER_REQUEST:
      return { ...state, loading: true };
    case PrinterTypes.GET_PRINTER_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case PrinterTypes.GET_PRINTER_FAILURE:
      return {
        ...state,
        data: {} as PrinterDataType,
        loading: false,
        error: action.payload.error,
      };
    case PrinterTypes.INACTIVATE_PRINTER_REQUEST:
      return { ...state, loading: true };
    case PrinterTypes.INACTIVATE_PRINTER_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case PrinterTypes.INACTIVATE_PRINTER_FAILURE:
      return {
        ...state,
        data: {} as PrinterDataType,
        loading: false,
        error: action.payload.error,
      };
    case PrinterTypes.LIST_PRINTER_REQUEST:
      return { ...state, loading: true, saved: false, deleted: false };
    case PrinterTypes.LIST_PRINTER_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case PrinterTypes.LIST_PRINTER_FAILURE:
      return {
        ...state,
        data: {} as PrinterDataType,
        loading: false,
        error: action.payload.error,
      };

    case PrinterTypes.UPDATE_PRINTER_REQUEST:
      return { ...state, loading: true };
    case PrinterTypes.UPDATE_PRINTER_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case PrinterTypes.UPDATE_PRINTER_FAILURE:
      return {
        ...state,
        data: {} as PrinterDataType,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
