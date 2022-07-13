import CustomError from '../../../entities/CustomError';
import Page from '../../../entities/Page';
import Printer from '../../../entities/Printer';
/**
 * Action types
 */

// eslint-disable-next-line no-shadow
export enum PrinterTypes {
  ACTIVATE_PRINTER_REQUEST = '@printer/ACTIVATE_PRINTER_REQUEST',
  ACTIVATE_PRINTER_SUCCCES = '@printer/ACTIVATE_PRINTER_SUCCCES',
  ACTIVATE_PRINTER_FAILURE = '@printer/ACTIVATE_PRINTER_FAILURE',
  CREATE_PRINTER_REQUEST = '@printer/CREATE_PRINTER_REQUEST',
  CREATE_PRINTER_SUCCCES = '@printer/CREATE_PRINTER_SUCCCES',
  CREATE_PRINTER_FAILURE = '@printer/CREATE_PRINTER_FAILURE',
  DELETE_PRINTER_REQUEST = '@printer/DELETE_PRINTER_REQUEST',
  DELETE_PRINTER_SUCCCES = '@printer/DELETE_PRINTER_SUCCCES',
  DELETE_PRINTER_FAILURE = '@printer/DELETE_PRINTER_FAILURE',
  GET_ALL_PRINTER_REQUEST = '@printer/GET_ALL_PRINTER_REQUEST',
  GET_ALL_PRINTER_SUCCCES = '@printer/GET_PRINTER_SUCCCES',
  GET_ALL_PRINTER_FAILURE = '@printer/GET_PRINTER_FAILURE',
  GET_PRINTER_REQUEST = '@printer/GET_PRINTER_REQUEST',
  GET_PRINTER_SUCCCES = '@printer/GET_PRINTER_SUCCCES',
  GET_PRINTER_FAILURE = '@printer/GET_PRINTER_FAILURE',
  INACTIVATE_PRINTER_REQUEST = '@printer/INACTIVATE_PRINTER_REQUEST',
  INACTIVATE_PRINTER_SUCCCES = '@printer/INACTIVATE_PRINTER_SUCCCES',
  INACTIVATE_PRINTER_FAILURE = '@printer/INACTIVATE_PRINTER_FAILURE',
  LIST_PRINTER_REQUEST = '@printer/LIST_PRINTER_REQUEST',
  LIST_PRINTER_SUCCCES = '@printer/LIST_PRINTER_SUCCCES',
  LIST_PRINTER_FAILURE = '@printer/LIST_PRINTER_FAILURE',
  UPDATE_PRINTER_REQUEST = '@printer/UPDATE_PRINTER_REQUEST',
  UPDATE_PRINTER_SUCCCES = '@printer/UPDATE_PRINTER_SUCCCES',
  UPDATE_PRINTER_FAILURE = '@printer/UPDATE_PRINTER_FAILURE',
}

/**
 * Data types
 */

export interface PrinterDataType {
  page: Page<Printer, Printer>;
  entity: Printer;
  list: Printer[];
}

/**
 * State type
 */
export interface PrinterState {
  readonly data: PrinterDataType;
  readonly loading: boolean;
  readonly error: CustomError | undefined;
}
