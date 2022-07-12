import { action } from 'typesafe-actions';
import CustomError from '../../../entities/CustomError';
import Page from '../../../entities/Page';
import Permission from '../../../entities/Permission';
import { PermissionDataType, PermissionTypes } from './types';

export const activateRequest = (
  id: string,
): {
  type: PermissionTypes.ACTIVATE_PERMISSION_REQUEST;
  payload: string;
} => action(PermissionTypes.ACTIVATE_PERMISSION_REQUEST, id);

export const activateSuccess = (): { type: PermissionTypes.ACTIVATE_PERMISSION_SUCCCES } =>
  action(PermissionTypes.ACTIVATE_PERMISSION_SUCCCES);

export const activateFailure = (
  error: CustomError | undefined,
): {
  type: PermissionTypes.ACTIVATE_PERMISSION_FAILURE;
  payload: { error: CustomError | undefined };
} => action(PermissionTypes.ACTIVATE_PERMISSION_FAILURE, { error });

export const createRequest = (
  entity: Permission,
): {
  type: PermissionTypes.CREATE_PERMISSION_REQUEST;
  payload: Permission;
} => action(PermissionTypes.CREATE_PERMISSION_REQUEST, entity);

export const createSuccess = (
  data: PermissionDataType,
): {
  type: PermissionTypes.CREATE_PERMISSION_SUCCCES;
  payload: { data: PermissionDataType };
} => action(PermissionTypes.CREATE_PERMISSION_SUCCCES, { data });

export const createFailure = (
  error: CustomError | undefined,
): {
  type: PermissionTypes.CREATE_PERMISSION_FAILURE;
  payload: { error: CustomError | undefined };
} => action(PermissionTypes.CREATE_PERMISSION_FAILURE, { error });

export const deleteRequest = (
  id: string,
): {
  type: PermissionTypes.DELETE_PERMISSION_REQUEST;
  payload: string;
} => action(PermissionTypes.DELETE_PERMISSION_REQUEST, id);

export const deleteSuccess = (): { type: PermissionTypes.DELETE_PERMISSION_SUCCCES } =>
  action(PermissionTypes.DELETE_PERMISSION_SUCCCES);

export const deleteFailure = (
  error: CustomError | undefined,
): {
  type: PermissionTypes.DELETE_PERMISSION_FAILURE;
  payload: { error: CustomError | undefined };
} => action(PermissionTypes.DELETE_PERMISSION_FAILURE, { error });

export const getAllRequest = (): {
  type: PermissionTypes.GET_ALL_PERMISSION_REQUEST;
} => action(PermissionTypes.GET_ALL_PERMISSION_REQUEST);

export const getAllSuccess = (
  data: PermissionDataType,
): {
  type: PermissionTypes.GET_ALL_PERMISSION_SUCCCES;
  payload: { data: PermissionDataType };
} => action(PermissionTypes.GET_ALL_PERMISSION_SUCCCES, { data });

export const getAllFailure = (
  error: CustomError | undefined,
): {
  type: PermissionTypes.GET_ALL_PERMISSION_FAILURE;
  payload: { error: CustomError | undefined };
} => action(PermissionTypes.GET_ALL_PERMISSION_FAILURE, { error });

export const getRequest = (
  id: string,
): {
  type: PermissionTypes.GET_PERMISSION_REQUEST;
  payload: string;
} => action(PermissionTypes.GET_PERMISSION_REQUEST, id);

export const getSuccess = (
  data: PermissionDataType,
): {
  type: PermissionTypes.GET_PERMISSION_SUCCCES;
  payload: { data: PermissionDataType };
} => action(PermissionTypes.GET_PERMISSION_SUCCCES, { data });

export const getFailure = (
  error: CustomError | undefined,
): {
  type: PermissionTypes.GET_PERMISSION_FAILURE;
  payload: { error: CustomError | undefined };
} => action(PermissionTypes.GET_PERMISSION_FAILURE, { error });

export const inactivateRequest = (
  id: string,
): {
  type: PermissionTypes.INACTIVATE_PERMISSION_REQUEST;
  payload: string;
} => action(PermissionTypes.INACTIVATE_PERMISSION_REQUEST, id);

export const inactivateSuccess = (): {
  type: PermissionTypes.INACTIVATE_PERMISSION_SUCCCES;
} => action(PermissionTypes.INACTIVATE_PERMISSION_SUCCCES);

export const inactivateFailure = (
  error: CustomError | undefined,
): {
  type: PermissionTypes.INACTIVATE_PERMISSION_FAILURE;
  payload: { error: CustomError | undefined };
} => action(PermissionTypes.INACTIVATE_PERMISSION_FAILURE, { error });

export const listRequest = (
  page: Page<Permission, Permission>,
): {
  type: PermissionTypes.LIST_PERMISSION_REQUEST;
  payload: Page<Permission, Permission>;
} => action(PermissionTypes.LIST_PERMISSION_REQUEST, page);

export const listSuccess = (
  data: PermissionDataType,
): {
  type: PermissionTypes.LIST_PERMISSION_SUCCCES;
  payload: { data: PermissionDataType };
} => action(PermissionTypes.LIST_PERMISSION_SUCCCES, { data });

export const listFailure = (
  error: CustomError | undefined,
): {
  type: PermissionTypes.LIST_PERMISSION_FAILURE;
  payload: { error: CustomError | undefined };
} => action(PermissionTypes.LIST_PERMISSION_FAILURE, { error });

export const updateRequest = (
  entity: Permission,
): {
  type: PermissionTypes.UPDATE_PERMISSION_REQUEST;
  payload: Permission;
} => action(PermissionTypes.UPDATE_PERMISSION_REQUEST, entity);

export const updateSuccess = (
  data: PermissionDataType,
): {
  type: PermissionTypes.UPDATE_PERMISSION_SUCCCES;
  payload: { data: PermissionDataType };
} => action(PermissionTypes.UPDATE_PERMISSION_SUCCCES, { data });

export const updateFailure = (
  error: CustomError | undefined,
): {
  type: PermissionTypes.UPDATE_PERMISSION_FAILURE;
  payload: { error: CustomError | undefined };
} => action(PermissionTypes.UPDATE_PERMISSION_FAILURE, { error });
