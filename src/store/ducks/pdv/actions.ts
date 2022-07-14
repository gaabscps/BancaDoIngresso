import { action } from 'typesafe-actions';
import { PdvDataType, PdvTypes } from './types';
import CustomError from '../../../entities/CustomError';
import Page from '../../../entities/Page';
import Pdv from '../../../entities/Pdv';
import PdvSave from '../../../entities/PdvSave';
import PdvUser from '../../../entities/PdvUser';

export const activateRequest = (
  id: string,
): {
  type: PdvTypes.ACTIVATE_PDV_REQUEST;
  payload: string;
} => action(PdvTypes.ACTIVATE_PDV_REQUEST, id);

export const activateSuccess = (): { type: PdvTypes.ACTIVATE_PDV_SUCCCES } =>
  action(PdvTypes.ACTIVATE_PDV_SUCCCES);

export const activateFailure = (
  error: CustomError | undefined,
): {
  type: PdvTypes.ACTIVATE_PDV_FAILURE;
  payload: { error: CustomError | undefined };
} => action(PdvTypes.ACTIVATE_PDV_FAILURE, { error });

export const addUserRequest = (
  entity: PdvUser,
): {
  type: PdvTypes.ADD_USER_PDV_REQUEST;
  payload: PdvUser;
} => action(PdvTypes.ADD_USER_PDV_REQUEST, entity);

export const addUserSuccess = (): {
  type: PdvTypes.ADD_USER_PDV_SUCCCES;
} => action(PdvTypes.ADD_USER_PDV_SUCCCES);

export const addUserFailure = (
  error: CustomError | undefined,
): {
  type: PdvTypes.ADD_USER_PDV_FAILURE;
  payload: { error: CustomError | undefined };
} => action(PdvTypes.ADD_USER_PDV_FAILURE, { error });

export const createRequest = (
  entity: PdvSave,
): {
  type: PdvTypes.CREATE_PDV_REQUEST;
  payload: PdvSave;
} => action(PdvTypes.CREATE_PDV_REQUEST, entity);

export const createSuccess = (
  data: PdvDataType,
): {
  type: PdvTypes.CREATE_PDV_SUCCCES;
  payload: { data: PdvDataType };
} => action(PdvTypes.CREATE_PDV_SUCCCES, { data });

export const createFailure = (
  error: CustomError | undefined,
): {
  type: PdvTypes.CREATE_PDV_FAILURE;
  payload: { error: CustomError | undefined };
} => action(PdvTypes.CREATE_PDV_FAILURE, { error });

export const deleteRequest = (
  id: string,
): {
  type: PdvTypes.DELETE_PDV_REQUEST;
  payload: string;
} => action(PdvTypes.DELETE_PDV_REQUEST, id);

export const deleteSuccess = (): { type: PdvTypes.DELETE_PDV_SUCCCES } =>
  action(PdvTypes.DELETE_PDV_SUCCCES);

export const deleteFailure = (
  error: CustomError | undefined,
): {
  type: PdvTypes.DELETE_PDV_FAILURE;
  payload: { error: CustomError | undefined };
} => action(PdvTypes.DELETE_PDV_FAILURE, { error });

export const getAllRequest = (): {
  type: PdvTypes.GET_ALL_PDV_REQUEST;
} => action(PdvTypes.GET_ALL_PDV_REQUEST);

export const getAllSuccess = (
  data: PdvDataType,
): {
  type: PdvTypes.GET_ALL_PDV_SUCCCES;
  payload: { data: PdvDataType };
} => action(PdvTypes.GET_ALL_PDV_SUCCCES, { data });

export const getAllFailure = (
  error: CustomError | undefined,
): {
  type: PdvTypes.GET_ALL_PDV_FAILURE;
  payload: { error: CustomError | undefined };
} => action(PdvTypes.GET_ALL_PDV_FAILURE, { error });

export const getRequest = (
  id: string,
): {
  type: PdvTypes.GET_PDV_REQUEST;
  payload: string;
} => action(PdvTypes.GET_PDV_REQUEST, id);

export const getSuccess = (
  data: PdvDataType,
): {
  type: PdvTypes.GET_PDV_SUCCCES;
  payload: { data: PdvDataType };
} => action(PdvTypes.GET_PDV_SUCCCES, { data });

export const getFailure = (
  error: CustomError | undefined,
): {
  type: PdvTypes.GET_PDV_FAILURE;
  payload: { error: CustomError | undefined };
} => action(PdvTypes.GET_PDV_FAILURE, { error });

export const inactivateRequest = (
  id: string,
): {
  type: PdvTypes.INACTIVATE_PDV_REQUEST;
  payload: string;
} => action(PdvTypes.INACTIVATE_PDV_REQUEST, id);

export const inactivateSuccess = (): {
  type: PdvTypes.INACTIVATE_PDV_SUCCCES;
} => action(PdvTypes.INACTIVATE_PDV_SUCCCES);

export const inactivateFailure = (
  error: CustomError | undefined,
): {
  type: PdvTypes.INACTIVATE_PDV_FAILURE;
  payload: { error: CustomError | undefined };
} => action(PdvTypes.INACTIVATE_PDV_FAILURE, { error });

export const listRequest = (
  page: Page<Pdv, Pdv>,
): {
  type: PdvTypes.LIST_PDV_REQUEST;
  payload: Page<Pdv, Pdv>;
} => action(PdvTypes.LIST_PDV_REQUEST, page);

export const listSuccess = (
  data: PdvDataType,
): {
  type: PdvTypes.LIST_PDV_SUCCCES;
  payload: { data: PdvDataType };
} => action(PdvTypes.LIST_PDV_SUCCCES, { data });

export const listFailure = (
  error: CustomError | undefined,
): {
  type: PdvTypes.LIST_PDV_FAILURE;
  payload: { error: CustomError | undefined };
} => action(PdvTypes.LIST_PDV_FAILURE, { error });

export const updateRequest = (
  entity: PdvSave,
): {
  type: PdvTypes.UPDATE_PDV_REQUEST;
  payload: PdvSave;
} => action(PdvTypes.UPDATE_PDV_REQUEST, entity);

export const updateSuccess = (
  data: PdvDataType,
): {
  type: PdvTypes.UPDATE_PDV_SUCCCES;
  payload: { data: PdvDataType };
} => action(PdvTypes.UPDATE_PDV_SUCCCES, { data });

export const updateFailure = (
  error: CustomError | undefined,
): {
  type: PdvTypes.UPDATE_PDV_FAILURE;
  payload: { error: CustomError | undefined };
} => action(PdvTypes.UPDATE_PDV_FAILURE, { error });
