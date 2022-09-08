import { action } from 'typesafe-actions';
import { SubPdvDataType, SubPdvTypes } from './types';
import CustomError from '../../../model/CustomError';
import Page from '../../../model/Page';
import SubPdv from '../../../model/SubPdv';
import SubPdvSave from '../../../model/SubPdvSave';
import SubPdvUser from '../../../model/SubPdvUser';

export const activateRequest = (
  id: string,
): {
  type: SubPdvTypes.ACTIVATE_SUB_PDV_REQUEST;
  payload: string;
} => action(SubPdvTypes.ACTIVATE_SUB_PDV_REQUEST, id);

export const activateSuccess = (): { type: SubPdvTypes.ACTIVATE_SUB_PDV_SUCCCES } =>
  action(SubPdvTypes.ACTIVATE_SUB_PDV_SUCCCES);

export const activateFailure = (
  error: CustomError | undefined,
): {
  type: SubPdvTypes.ACTIVATE_SUB_PDV_FAILURE;
  payload: { error: CustomError | undefined };
} => action(SubPdvTypes.ACTIVATE_SUB_PDV_FAILURE, { error });

export const addUserRequest = (
  entity: SubPdvUser,
): {
  type: SubPdvTypes.ADD_USER_SUB_PDV_REQUEST;
  payload: SubPdvUser;
} => action(SubPdvTypes.ADD_USER_SUB_PDV_REQUEST, entity);

export const addUserSuccess = (): {
  type: SubPdvTypes.ADD_USER_SUB_PDV_SUCCCES;
} => action(SubPdvTypes.ADD_USER_SUB_PDV_SUCCCES);

export const addUserFailure = (
  error: CustomError | undefined,
): {
  type: SubPdvTypes.ADD_USER_SUB_PDV_FAILURE;
  payload: { error: CustomError | undefined };
} => action(SubPdvTypes.ADD_USER_SUB_PDV_FAILURE, { error });

export const createRequest = (
  entity: SubPdvSave,
): {
  type: SubPdvTypes.CREATE_SUB_PDV_REQUEST;
  payload: SubPdvSave;
} => action(SubPdvTypes.CREATE_SUB_PDV_REQUEST, entity);

export const createSuccess = (
  data: SubPdvDataType,
): {
  type: SubPdvTypes.CREATE_SUB_PDV_SUCCCES;
  payload: { data: SubPdvDataType };
} => action(SubPdvTypes.CREATE_SUB_PDV_SUCCCES, { data });

export const createFailure = (
  error: CustomError | undefined,
): {
  type: SubPdvTypes.CREATE_SUB_PDV_FAILURE;
  payload: { error: CustomError | undefined };
} => action(SubPdvTypes.CREATE_SUB_PDV_FAILURE, { error });

export const deleteRequest = (
  id: string,
): {
  type: SubPdvTypes.DELETE_SUB_PDV_REQUEST;
  payload: string;
} => action(SubPdvTypes.DELETE_SUB_PDV_REQUEST, id);

export const deleteSuccess = (): { type: SubPdvTypes.DELETE_SUB_PDV_SUCCCES } =>
  action(SubPdvTypes.DELETE_SUB_PDV_SUCCCES);

export const deleteFailure = (
  error: CustomError | undefined,
): {
  type: SubPdvTypes.DELETE_SUB_PDV_FAILURE;
  payload: { error: CustomError | undefined };
} => action(SubPdvTypes.DELETE_SUB_PDV_FAILURE, { error });

export const getAllRequest = (): {
  type: SubPdvTypes.GET_ALL_SUB_PDV_REQUEST;
} => action(SubPdvTypes.GET_ALL_SUB_PDV_REQUEST);

export const getAllSuccess = (
  data: SubPdvDataType,
): {
  type: SubPdvTypes.GET_ALL_SUB_PDV_SUCCCES;
  payload: { data: SubPdvDataType };
} => action(SubPdvTypes.GET_ALL_SUB_PDV_SUCCCES, { data });

export const getAllFailure = (
  error: CustomError | undefined,
): {
  type: SubPdvTypes.GET_ALL_SUB_PDV_FAILURE;
  payload: { error: CustomError | undefined };
} => action(SubPdvTypes.GET_ALL_SUB_PDV_FAILURE, { error });

export const getRequest = (
  id: string,
): {
  type: SubPdvTypes.GET_SUB_PDV_REQUEST;
  payload: string;
} => action(SubPdvTypes.GET_SUB_PDV_REQUEST, id);

export const getSuccess = (
  data: SubPdvDataType,
): {
  type: SubPdvTypes.GET_SUB_PDV_SUCCCES;
  payload: { data: SubPdvDataType };
} => action(SubPdvTypes.GET_SUB_PDV_SUCCCES, { data });

export const getFailure = (
  error: CustomError | undefined,
): {
  type: SubPdvTypes.GET_SUB_PDV_FAILURE;
  payload: { error: CustomError | undefined };
} => action(SubPdvTypes.GET_SUB_PDV_FAILURE, { error });

export const inactivateRequest = (
  id: string,
): {
  type: SubPdvTypes.INACTIVATE_SUB_PDV_REQUEST;
  payload: string;
} => action(SubPdvTypes.INACTIVATE_SUB_PDV_REQUEST, id);

export const inactivateSuccess = (): {
  type: SubPdvTypes.INACTIVATE_SUB_PDV_SUCCCES;
} => action(SubPdvTypes.INACTIVATE_SUB_PDV_SUCCCES);

export const inactivateFailure = (
  error: CustomError | undefined,
): {
  type: SubPdvTypes.INACTIVATE_SUB_PDV_FAILURE;
  payload: { error: CustomError | undefined };
} => action(SubPdvTypes.INACTIVATE_SUB_PDV_FAILURE, { error });

export const listRequest = (
  page: Page<SubPdv, SubPdv>,
): {
  type: SubPdvTypes.LIST_SUB_PDV_REQUEST;
  payload: Page<SubPdv, SubPdv>;
} => action(SubPdvTypes.LIST_SUB_PDV_REQUEST, page);

export const listSuccess = (
  data: SubPdvDataType,
): {
  type: SubPdvTypes.LIST_SUB_PDV_SUCCCES;
  payload: { data: SubPdvDataType };
} => action(SubPdvTypes.LIST_SUB_PDV_SUCCCES, { data });

export const listFailure = (
  error: CustomError | undefined,
): {
  type: SubPdvTypes.LIST_SUB_PDV_FAILURE;
  payload: { error: CustomError | undefined };
} => action(SubPdvTypes.LIST_SUB_PDV_FAILURE, { error });

export const updateRequest = (
  entity: SubPdvSave,
): {
  type: SubPdvTypes.UPDATE_SUB_PDV_REQUEST;
  payload: SubPdvSave;
} => action(SubPdvTypes.UPDATE_SUB_PDV_REQUEST, entity);

export const updateSuccess = (
  data: SubPdvDataType,
): {
  type: SubPdvTypes.UPDATE_SUB_PDV_SUCCCES;
  payload: { data: SubPdvDataType };
} => action(SubPdvTypes.UPDATE_SUB_PDV_SUCCCES, { data });

export const updateFailure = (
  error: CustomError | undefined,
): {
  type: SubPdvTypes.UPDATE_SUB_PDV_FAILURE;
  payload: { error: CustomError | undefined };
} => action(SubPdvTypes.UPDATE_SUB_PDV_FAILURE, { error });
