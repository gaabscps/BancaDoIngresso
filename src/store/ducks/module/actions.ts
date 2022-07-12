import { action } from 'typesafe-actions';
import CustomError from '../../../entities/CustomError';
import Module from '../../../entities/Module';
import Page from '../../../entities/Page';
import { ModuleDataType, ModuleTypes } from './types';

export const activateRequest = (
  id: string,
): {
  type: ModuleTypes.ACTIVATE_MODULE_REQUEST;
  payload: string;
} => action(ModuleTypes.ACTIVATE_MODULE_REQUEST, id);

export const activateSuccess = (): { type: ModuleTypes.ACTIVATE_MODULE_SUCCCES } =>
  action(ModuleTypes.ACTIVATE_MODULE_SUCCCES);

export const activateFailure = (
  error: CustomError | undefined,
): {
  type: ModuleTypes.ACTIVATE_MODULE_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ModuleTypes.ACTIVATE_MODULE_FAILURE, { error });

export const createRequest = (
  entity: Module,
): {
  type: ModuleTypes.CREATE_MODULE_REQUEST;
  payload: Module;
} => action(ModuleTypes.CREATE_MODULE_REQUEST, entity);

export const createSuccess = (
  data: ModuleDataType,
): {
  type: ModuleTypes.CREATE_MODULE_SUCCCES;
  payload: { data: ModuleDataType };
} => action(ModuleTypes.CREATE_MODULE_SUCCCES, { data });

export const createFailure = (
  error: CustomError | undefined,
): {
  type: ModuleTypes.CREATE_MODULE_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ModuleTypes.CREATE_MODULE_FAILURE, { error });

export const deleteRequest = (
  id: string,
): {
  type: ModuleTypes.DELETE_MODULE_REQUEST;
  payload: string;
} => action(ModuleTypes.DELETE_MODULE_REQUEST, id);

export const deleteSuccess = (): { type: ModuleTypes.DELETE_MODULE_SUCCCES } =>
  action(ModuleTypes.DELETE_MODULE_SUCCCES);

export const deleteFailure = (
  error: CustomError | undefined,
): {
  type: ModuleTypes.DELETE_MODULE_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ModuleTypes.DELETE_MODULE_FAILURE, { error });

export const getAllRequest = (): {
  type: ModuleTypes.GET_ALL_MODULE_REQUEST;
} => action(ModuleTypes.GET_ALL_MODULE_REQUEST);

export const getAllSuccess = (
  data: ModuleDataType,
): {
  type: ModuleTypes.GET_ALL_MODULE_SUCCCES;
  payload: { data: ModuleDataType };
} => action(ModuleTypes.GET_ALL_MODULE_SUCCCES, { data });

export const getAllFailure = (
  error: CustomError | undefined,
): {
  type: ModuleTypes.GET_ALL_MODULE_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ModuleTypes.GET_ALL_MODULE_FAILURE, { error });

export const getRequest = (
  id: string,
): {
  type: ModuleTypes.GET_MODULE_REQUEST;
  payload: string;
} => action(ModuleTypes.GET_MODULE_REQUEST, id);

export const getSuccess = (
  data: ModuleDataType,
): {
  type: ModuleTypes.GET_MODULE_SUCCCES;
  payload: { data: ModuleDataType };
} => action(ModuleTypes.GET_MODULE_SUCCCES, { data });

export const getFailure = (
  error: CustomError | undefined,
): {
  type: ModuleTypes.GET_MODULE_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ModuleTypes.GET_MODULE_FAILURE, { error });

export const inactivateRequest = (
  id: string,
): {
  type: ModuleTypes.INACTIVATE_MODULE_REQUEST;
  payload: string;
} => action(ModuleTypes.INACTIVATE_MODULE_REQUEST, id);

export const inactivateSuccess = (): {
  type: ModuleTypes.INACTIVATE_MODULE_SUCCCES;
} => action(ModuleTypes.INACTIVATE_MODULE_SUCCCES);

export const inactivateFailure = (
  error: CustomError | undefined,
): {
  type: ModuleTypes.INACTIVATE_MODULE_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ModuleTypes.INACTIVATE_MODULE_FAILURE, { error });

export const listRequest = (
  page: Page<Module, Module>,
): {
  type: ModuleTypes.LIST_MODULE_REQUEST;
  payload: Page<Module, Module>;
} => action(ModuleTypes.LIST_MODULE_REQUEST, page);

export const listSuccess = (
  data: ModuleDataType,
): {
  type: ModuleTypes.LIST_MODULE_SUCCCES;
  payload: { data: ModuleDataType };
} => action(ModuleTypes.LIST_MODULE_SUCCCES, { data });

export const listFailure = (
  error: CustomError | undefined,
): {
  type: ModuleTypes.LIST_MODULE_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ModuleTypes.LIST_MODULE_FAILURE, { error });

export const updateRequest = (
  entity: Module,
): {
  type: ModuleTypes.UPDATE_MODULE_REQUEST;
  payload: Module;
} => action(ModuleTypes.UPDATE_MODULE_REQUEST, entity);

export const updateSuccess = (
  data: ModuleDataType,
): {
  type: ModuleTypes.UPDATE_MODULE_SUCCCES;
  payload: { data: ModuleDataType };
} => action(ModuleTypes.UPDATE_MODULE_SUCCCES, { data });

export const updateFailure = (
  error: CustomError | undefined,
): {
  type: ModuleTypes.UPDATE_MODULE_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ModuleTypes.UPDATE_MODULE_FAILURE, { error });
