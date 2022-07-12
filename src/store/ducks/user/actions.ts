import { action } from 'typesafe-actions';
import CustomError from '../../../entities/CustomError';
import Page from '../../../entities/Page';
import User from '../../../entities/User';
import { UserDataType, UserTypes } from './types';

export const activateRequest = (
  id: string,
): {
  type: UserTypes.ACTIVATE_USER_REQUEST;
  payload: string;
} => action(UserTypes.ACTIVATE_USER_REQUEST, id);

export const activateSuccess = (): { type: UserTypes.ACTIVATE_USER_SUCCCES } =>
  action(UserTypes.ACTIVATE_USER_SUCCCES);

export const activateFailure = (
  error: CustomError | undefined,
): {
  type: UserTypes.ACTIVATE_USER_FAILURE;
  payload: { error: CustomError | undefined };
} => action(UserTypes.ACTIVATE_USER_FAILURE, { error });

export const createRequest = (
  entity: User,
): {
  type: UserTypes.CREATE_USER_REQUEST;
  payload: User;
} => action(UserTypes.CREATE_USER_REQUEST, entity);

export const createSuccess = (
  data: UserDataType,
): {
  type: UserTypes.CREATE_USER_SUCCCES;
  payload: { data: UserDataType };
} => action(UserTypes.CREATE_USER_SUCCCES, { data });

export const createFailure = (
  error: CustomError | undefined,
): {
  type: UserTypes.CREATE_USER_FAILURE;
  payload: { error: CustomError | undefined };
} => action(UserTypes.CREATE_USER_FAILURE, { error });

export const deleteRequest = (
  id: string,
): {
  type: UserTypes.DELETE_USER_REQUEST;
  payload: string;
} => action(UserTypes.DELETE_USER_REQUEST, id);

export const deleteSuccess = (): { type: UserTypes.DELETE_USER_SUCCCES } =>
  action(UserTypes.DELETE_USER_SUCCCES);

export const deleteFailure = (
  error: CustomError | undefined,
): {
  type: UserTypes.DELETE_USER_FAILURE;
  payload: { error: CustomError | undefined };
} => action(UserTypes.DELETE_USER_FAILURE, { error });

export const getAllRequest = (): {
  type: UserTypes.GET_ALL_USER_REQUEST;
} => action(UserTypes.GET_ALL_USER_REQUEST);

export const getAllSuccess = (
  data: UserDataType,
): {
  type: UserTypes.GET_ALL_USER_SUCCCES;
  payload: { data: UserDataType };
} => action(UserTypes.GET_ALL_USER_SUCCCES, { data });

export const getAllFailure = (
  error: CustomError | undefined,
): {
  type: UserTypes.GET_ALL_USER_FAILURE;
  payload: { error: CustomError | undefined };
} => action(UserTypes.GET_ALL_USER_FAILURE, { error });

export const getRequest = (
  id: string,
): {
  type: UserTypes.GET_USER_REQUEST;
  payload: string;
} => action(UserTypes.GET_USER_REQUEST, id);

export const getSuccess = (
  data: UserDataType,
): {
  type: UserTypes.GET_USER_SUCCCES;
  payload: { data: UserDataType };
} => action(UserTypes.GET_USER_SUCCCES, { data });

export const getFailure = (
  error: CustomError | undefined,
): {
  type: UserTypes.GET_USER_FAILURE;
  payload: { error: CustomError | undefined };
} => action(UserTypes.GET_USER_FAILURE, { error });

export const inactivateRequest = (
  id: string,
): {
  type: UserTypes.INACTIVATE_USER_REQUEST;
  payload: string;
} => action(UserTypes.INACTIVATE_USER_REQUEST, id);

export const inactivateSuccess = (): {
  type: UserTypes.INACTIVATE_USER_SUCCCES;
} => action(UserTypes.INACTIVATE_USER_SUCCCES);

export const inactivateFailure = (
  error: CustomError | undefined,
): {
  type: UserTypes.INACTIVATE_USER_FAILURE;
  payload: { error: CustomError | undefined };
} => action(UserTypes.INACTIVATE_USER_FAILURE, { error });

export const listRequest = (
  page: Page<User, User>,
): {
  type: UserTypes.LIST_USER_REQUEST;
  payload: Page<User, User>;
} => action(UserTypes.LIST_USER_REQUEST, page);

export const listSuccess = (
  data: UserDataType,
): {
  type: UserTypes.LIST_USER_SUCCCES;
  payload: { data: UserDataType };
} => action(UserTypes.LIST_USER_SUCCCES, { data });

export const listFailure = (
  error: CustomError | undefined,
): {
  type: UserTypes.LIST_USER_FAILURE;
  payload: { error: CustomError | undefined };
} => action(UserTypes.LIST_USER_FAILURE, { error });

export const updateRequest = (
  entity: User,
): {
  type: UserTypes.UPDATE_USER_REQUEST;
  payload: User;
} => action(UserTypes.UPDATE_USER_REQUEST, entity);

export const updateSuccess = (
  data: UserDataType,
): {
  type: UserTypes.UPDATE_USER_SUCCCES;
  payload: { data: UserDataType };
} => action(UserTypes.UPDATE_USER_SUCCCES, { data });

export const updateFailure = (
  error: CustomError | undefined,
): {
  type: UserTypes.UPDATE_USER_FAILURE;
  payload: { error: CustomError | undefined };
} => action(UserTypes.UPDATE_USER_FAILURE, { error });
