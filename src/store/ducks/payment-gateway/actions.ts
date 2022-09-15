import { action } from 'typesafe-actions';
import CustomError from '../../../model/CustomError';
import Page from '../../../model/Page';
import PaymentGateway from '../../../model/PaymentGateway';
import { PaymentGatewayDataType, PaymentGatewayTypes } from './types';

export const activateRequest = (
  id: string,
): {
  type: PaymentGatewayTypes.ACTIVATE_PAYMENT_GATEWAY_REQUEST;
  payload: string;
} => action(PaymentGatewayTypes.ACTIVATE_PAYMENT_GATEWAY_REQUEST, id);

export const activateSuccess = (): { type: PaymentGatewayTypes.ACTIVATE_PAYMENT_GATEWAY_SUCCCES } =>
  action(PaymentGatewayTypes.ACTIVATE_PAYMENT_GATEWAY_SUCCCES);

export const activateFailure = (
  error: CustomError | undefined,
): {
  type: PaymentGatewayTypes.ACTIVATE_PAYMENT_GATEWAY_FAILURE;
  payload: { error: CustomError | undefined };
} => action(PaymentGatewayTypes.ACTIVATE_PAYMENT_GATEWAY_FAILURE, { error });

export const createRequest = (
  entity: PaymentGateway,
): {
  type: PaymentGatewayTypes.CREATE_PAYMENT_GATEWAY_REQUEST;
  payload: PaymentGateway;
} => action(PaymentGatewayTypes.CREATE_PAYMENT_GATEWAY_REQUEST, entity);

export const createSuccess = (
  data: PaymentGatewayDataType,
): {
  type: PaymentGatewayTypes.CREATE_PAYMENT_GATEWAY_SUCCCES;
  payload: { data: PaymentGatewayDataType };
} => action(PaymentGatewayTypes.CREATE_PAYMENT_GATEWAY_SUCCCES, { data });

export const createFailure = (
  error: CustomError | undefined,
): {
  type: PaymentGatewayTypes.CREATE_PAYMENT_GATEWAY_FAILURE;
  payload: { error: CustomError | undefined };
} => action(PaymentGatewayTypes.CREATE_PAYMENT_GATEWAY_FAILURE, { error });

export const deleteRequest = (
  id: string,
): {
  type: PaymentGatewayTypes.DELETE_PAYMENT_GATEWAY_REQUEST;
  payload: string;
} => action(PaymentGatewayTypes.DELETE_PAYMENT_GATEWAY_REQUEST, id);

export const deleteSuccess = (): { type: PaymentGatewayTypes.DELETE_PAYMENT_GATEWAY_SUCCCES } =>
  action(PaymentGatewayTypes.DELETE_PAYMENT_GATEWAY_SUCCCES);

export const deleteFailure = (
  error: CustomError | undefined,
): {
  type: PaymentGatewayTypes.DELETE_PAYMENT_GATEWAY_FAILURE;
  payload: { error: CustomError | undefined };
} => action(PaymentGatewayTypes.DELETE_PAYMENT_GATEWAY_FAILURE, { error });

export const getAllRequest = (): {
  type: PaymentGatewayTypes.GET_ALL_PAYMENT_GATEWAY_REQUEST;
} => action(PaymentGatewayTypes.GET_ALL_PAYMENT_GATEWAY_REQUEST);

export const getAllSuccess = (
  data: PaymentGatewayDataType,
): {
  type: PaymentGatewayTypes.GET_ALL_PAYMENT_GATEWAY_SUCCCES;
  payload: { data: PaymentGatewayDataType };
} => action(PaymentGatewayTypes.GET_ALL_PAYMENT_GATEWAY_SUCCCES, { data });

export const getAllFailure = (
  error: CustomError | undefined,
): {
  type: PaymentGatewayTypes.GET_ALL_PAYMENT_GATEWAY_FAILURE;
  payload: { error: CustomError | undefined };
} => action(PaymentGatewayTypes.GET_ALL_PAYMENT_GATEWAY_FAILURE, { error });

export const getRequest = (
  id: string,
): {
  type: PaymentGatewayTypes.GET_PAYMENT_GATEWAY_REQUEST;
  payload: string;
} => action(PaymentGatewayTypes.GET_PAYMENT_GATEWAY_REQUEST, id);

export const getSuccess = (
  data: PaymentGatewayDataType,
): {
  type: PaymentGatewayTypes.GET_PAYMENT_GATEWAY_SUCCCES;
  payload: { data: PaymentGatewayDataType };
} => action(PaymentGatewayTypes.GET_PAYMENT_GATEWAY_SUCCCES, { data });

export const getFailure = (
  error: CustomError | undefined,
): {
  type: PaymentGatewayTypes.GET_PAYMENT_GATEWAY_FAILURE;
  payload: { error: CustomError | undefined };
} => action(PaymentGatewayTypes.GET_PAYMENT_GATEWAY_FAILURE, { error });

export const inactivateRequest = (
  id: string,
): {
  type: PaymentGatewayTypes.INACTIVATE_PAYMENT_GATEWAY_REQUEST;
  payload: string;
} => action(PaymentGatewayTypes.INACTIVATE_PAYMENT_GATEWAY_REQUEST, id);

export const inactivateSuccess = (): {
  type: PaymentGatewayTypes.INACTIVATE_PAYMENT_GATEWAY_SUCCCES;
} => action(PaymentGatewayTypes.INACTIVATE_PAYMENT_GATEWAY_SUCCCES);

export const inactivateFailure = (
  error: CustomError | undefined,
): {
  type: PaymentGatewayTypes.INACTIVATE_PAYMENT_GATEWAY_FAILURE;
  payload: { error: CustomError | undefined };
} => action(PaymentGatewayTypes.INACTIVATE_PAYMENT_GATEWAY_FAILURE, { error });

export const listRequest = (
  page: Page<PaymentGateway, PaymentGateway>,
): {
  type: PaymentGatewayTypes.LIST_PAYMENT_GATEWAY_REQUEST;
  payload: Page<PaymentGateway, PaymentGateway>;
} => action(PaymentGatewayTypes.LIST_PAYMENT_GATEWAY_REQUEST, page);

export const listSuccess = (
  data: PaymentGatewayDataType,
): {
  type: PaymentGatewayTypes.LIST_PAYMENT_GATEWAY_SUCCCES;
  payload: { data: PaymentGatewayDataType };
} => action(PaymentGatewayTypes.LIST_PAYMENT_GATEWAY_SUCCCES, { data });

export const listFailure = (
  error: CustomError | undefined,
): {
  type: PaymentGatewayTypes.LIST_PAYMENT_GATEWAY_FAILURE;
  payload: { error: CustomError | undefined };
} => action(PaymentGatewayTypes.LIST_PAYMENT_GATEWAY_FAILURE, { error });

export const updateRequest = (
  entity: PaymentGateway,
): {
  type: PaymentGatewayTypes.UPDATE_PAYMENT_GATEWAY_REQUEST;
  payload: PaymentGateway;
} => action(PaymentGatewayTypes.UPDATE_PAYMENT_GATEWAY_REQUEST, entity);

export const updateSuccess = (
  data: PaymentGatewayDataType,
): {
  type: PaymentGatewayTypes.UPDATE_PAYMENT_GATEWAY_SUCCCES;
  payload: { data: PaymentGatewayDataType };
} => action(PaymentGatewayTypes.UPDATE_PAYMENT_GATEWAY_SUCCCES, { data });

export const updateFailure = (
  error: CustomError | undefined,
): {
  type: PaymentGatewayTypes.UPDATE_PAYMENT_GATEWAY_FAILURE;
  payload: { error: CustomError | undefined };
} => action(PaymentGatewayTypes.UPDATE_PAYMENT_GATEWAY_FAILURE, { error });
