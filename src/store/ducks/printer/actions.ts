import { action } from 'typesafe-actions';
import CustomError from '../../../model/CustomError';
import Page from '../../../model/Page';
import Printer from '../../../model/Printer';
import { PrinterDataType, PrinterTypes } from './types';

export const activateRequest = (
  id: string,
): {
  type: PrinterTypes.ACTIVATE_PRINTER_REQUEST;
  payload: string;
} => action(PrinterTypes.ACTIVATE_PRINTER_REQUEST, id);

export const activateSuccess = (): { type: PrinterTypes.ACTIVATE_PRINTER_SUCCCES } =>
  action(PrinterTypes.ACTIVATE_PRINTER_SUCCCES);

export const activateFailure = (
  error: CustomError | undefined,
): {
  type: PrinterTypes.ACTIVATE_PRINTER_FAILURE;
  payload: { error: CustomError | undefined };
} => action(PrinterTypes.ACTIVATE_PRINTER_FAILURE, { error });

export const createRequest = (
  entity: Printer,
): {
  type: PrinterTypes.CREATE_PRINTER_REQUEST;
  payload: Printer;
} => action(PrinterTypes.CREATE_PRINTER_REQUEST, entity);

export const createSuccess = (
  data: PrinterDataType,
): {
  type: PrinterTypes.CREATE_PRINTER_SUCCCES;
  payload: { data: PrinterDataType };
} => action(PrinterTypes.CREATE_PRINTER_SUCCCES, { data });

export const createFailure = (
  error: CustomError | undefined,
): {
  type: PrinterTypes.CREATE_PRINTER_FAILURE;
  payload: { error: CustomError | undefined };
} => action(PrinterTypes.CREATE_PRINTER_FAILURE, { error });

export const deleteRequest = (
  id: string,
): {
  type: PrinterTypes.DELETE_PRINTER_REQUEST;
  payload: string;
} => action(PrinterTypes.DELETE_PRINTER_REQUEST, id);

export const deleteSuccess = (): { type: PrinterTypes.DELETE_PRINTER_SUCCCES } =>
  action(PrinterTypes.DELETE_PRINTER_SUCCCES);

export const deleteFailure = (
  error: CustomError | undefined,
): {
  type: PrinterTypes.DELETE_PRINTER_FAILURE;
  payload: { error: CustomError | undefined };
} => action(PrinterTypes.DELETE_PRINTER_FAILURE, { error });

export const getAllRequest = (): {
  type: PrinterTypes.GET_ALL_PRINTER_REQUEST;
} => action(PrinterTypes.GET_ALL_PRINTER_REQUEST);

export const getAllSuccess = (
  data: PrinterDataType,
): {
  type: PrinterTypes.GET_ALL_PRINTER_SUCCCES;
  payload: { data: PrinterDataType };
} => action(PrinterTypes.GET_ALL_PRINTER_SUCCCES, { data });

export const getAllFailure = (
  error: CustomError | undefined,
): {
  type: PrinterTypes.GET_ALL_PRINTER_FAILURE;
  payload: { error: CustomError | undefined };
} => action(PrinterTypes.GET_ALL_PRINTER_FAILURE, { error });

export const getRequest = (
  id: string,
): {
  type: PrinterTypes.GET_PRINTER_REQUEST;
  payload: string;
} => action(PrinterTypes.GET_PRINTER_REQUEST, id);

export const getSuccess = (
  data: PrinterDataType,
): {
  type: PrinterTypes.GET_PRINTER_SUCCCES;
  payload: { data: PrinterDataType };
} => action(PrinterTypes.GET_PRINTER_SUCCCES, { data });

export const getFailure = (
  error: CustomError | undefined,
): {
  type: PrinterTypes.GET_PRINTER_FAILURE;
  payload: { error: CustomError | undefined };
} => action(PrinterTypes.GET_PRINTER_FAILURE, { error });

export const inactivateRequest = (
  id: string,
): {
  type: PrinterTypes.INACTIVATE_PRINTER_REQUEST;
  payload: string;
} => action(PrinterTypes.INACTIVATE_PRINTER_REQUEST, id);

export const inactivateSuccess = (): {
  type: PrinterTypes.INACTIVATE_PRINTER_SUCCCES;
} => action(PrinterTypes.INACTIVATE_PRINTER_SUCCCES);

export const inactivateFailure = (
  error: CustomError | undefined,
): {
  type: PrinterTypes.INACTIVATE_PRINTER_FAILURE;
  payload: { error: CustomError | undefined };
} => action(PrinterTypes.INACTIVATE_PRINTER_FAILURE, { error });

export const listRequest = (
  page: Page<Printer, Printer>,
): {
  type: PrinterTypes.LIST_PRINTER_REQUEST;
  payload: Page<Printer, Printer>;
} => action(PrinterTypes.LIST_PRINTER_REQUEST, page);

export const listSuccess = (
  data: PrinterDataType,
): {
  type: PrinterTypes.LIST_PRINTER_SUCCCES;
  payload: { data: PrinterDataType };
} => action(PrinterTypes.LIST_PRINTER_SUCCCES, { data });

export const listFailure = (
  error: CustomError | undefined,
): {
  type: PrinterTypes.LIST_PRINTER_FAILURE;
  payload: { error: CustomError | undefined };
} => action(PrinterTypes.LIST_PRINTER_FAILURE, { error });

export const updateRequest = (
  entity: Printer,
): {
  type: PrinterTypes.UPDATE_PRINTER_REQUEST;
  payload: Printer;
} => action(PrinterTypes.UPDATE_PRINTER_REQUEST, entity);

export const updateSuccess = (
  data: PrinterDataType,
): {
  type: PrinterTypes.UPDATE_PRINTER_SUCCCES;
  payload: { data: PrinterDataType };
} => action(PrinterTypes.UPDATE_PRINTER_SUCCCES, { data });

export const updateFailure = (
  error: CustomError | undefined,
): {
  type: PrinterTypes.UPDATE_PRINTER_FAILURE;
  payload: { error: CustomError | undefined };
} => action(PrinterTypes.UPDATE_PRINTER_FAILURE, { error });
