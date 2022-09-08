import { action } from 'typesafe-actions';
import Client from '../../../model/Client';
import ClientUpdate from '../../../model/ClientUpdate';
import CustomError from '../../../model/CustomError';
import Page from '../../../model/Page';
import { ClientDataType, ClientTypes } from './types';

export const listRequest = (
  page: Page<Client, Client>,
): {
  type: ClientTypes.LIST_CLIENT_REQUEST;
  payload: Page<Client, Client>;
} => action(ClientTypes.LIST_CLIENT_REQUEST, page);

export const listSuccess = (
  data: ClientDataType,
): {
  type: ClientTypes.LIST_CLIENT_SUCCCES;
  payload: { data: ClientDataType };
} => action(ClientTypes.LIST_CLIENT_SUCCCES, { data });

export const listFailure = (
  error: CustomError | undefined,
): {
  type: ClientTypes.LIST_CLIENT_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ClientTypes.LIST_CLIENT_FAILURE, { error });

export const getRequest = (
  id: string,
): {
  type: ClientTypes.GET_CLIENT_REQUEST;
  payload: string;
} => action(ClientTypes.GET_CLIENT_REQUEST, id);

export const getSuccess = (
  data: ClientDataType,
): {
  type: ClientTypes.GET_CLIENT_SUCCCES;
  payload: { data: ClientDataType };
} => action(ClientTypes.GET_CLIENT_SUCCCES, { data });

export const getFailure = (
  error: CustomError | undefined,
): {
  type: ClientTypes.GET_CLIENT_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ClientTypes.GET_CLIENT_FAILURE, { error });

export const updateRequest = (
  entity: ClientUpdate,
): {
  type: ClientTypes.UPDATE_CLIENT_REQUEST;
  payload: ClientUpdate;
} => action(ClientTypes.UPDATE_CLIENT_REQUEST, entity);

export const updateSuccess = (
  data: ClientDataType,
): {
  type: ClientTypes.UPDATE_CLIENT_SUCCCES;
  payload: { data: ClientDataType };
} => action(ClientTypes.UPDATE_CLIENT_SUCCCES, { data });

export const updateFailure = (
  error: CustomError | undefined,
): {
  type: ClientTypes.UPDATE_CLIENT_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ClientTypes.UPDATE_CLIENT_FAILURE, { error });

export const activateRequest = (
  id: string,
): {
  type: ClientTypes.ACTIVATE_CLIENT_REQUEST;
  payload: string;
} => action(ClientTypes.ACTIVATE_CLIENT_REQUEST, id);

export const activateSuccess = (): { type: ClientTypes.ACTIVATE_CLIENT_SUCCCES } =>
  action(ClientTypes.ACTIVATE_CLIENT_SUCCCES);

export const activateFailure = (
  error: CustomError | undefined,
): {
  type: ClientTypes.ACTIVATE_CLIENT_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ClientTypes.ACTIVATE_CLIENT_FAILURE, { error });

export const inactivateRequest = (
  id: string,
): {
  type: ClientTypes.INACTIVATE_CLIENT_REQUEST;
  payload: string;
} => action(ClientTypes.INACTIVATE_CLIENT_REQUEST, id);

export const inactivateSuccess = (): {
  type: ClientTypes.INACTIVATE_CLIENT_SUCCCES;
} => action(ClientTypes.INACTIVATE_CLIENT_SUCCCES);

export const inactivateFailure = (
  error: CustomError | undefined,
): {
  type: ClientTypes.INACTIVATE_CLIENT_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ClientTypes.INACTIVATE_CLIENT_FAILURE, { error });

export const deleteRequest = (
  id: string,
): {
  type: ClientTypes.DELETE_CLIENT_REQUEST;
  payload: string;
} => action(ClientTypes.DELETE_CLIENT_REQUEST, id);

export const deleteSuccess = (): { type: ClientTypes.DELETE_CLIENT_SUCCCES } =>
  action(ClientTypes.DELETE_CLIENT_SUCCCES);

export const deleteFailure = (
  error: CustomError | undefined,
): {
  type: ClientTypes.DELETE_CLIENT_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ClientTypes.DELETE_CLIENT_FAILURE, { error });
