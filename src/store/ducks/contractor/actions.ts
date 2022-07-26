import { action } from 'typesafe-actions';
import Contractor from '../../../entities/Contractor';
import ContractorSave from '../../../entities/ContractorSave';
import ContractorUser from '../../../entities/ContractorUser';
import CustomError from '../../../entities/CustomError';
import Page from '../../../entities/Page';
import { ContractorDataType, ContractorTypes } from './types';

export const activateRequest = (
  id: string,
): {
  type: ContractorTypes.ACTIVATE_CONTRACTOR_REQUEST;
  payload: string;
} => action(ContractorTypes.ACTIVATE_CONTRACTOR_REQUEST, id);

export const activateSuccess = (): { type: ContractorTypes.ACTIVATE_CONTRACTOR_SUCCCES } =>
  action(ContractorTypes.ACTIVATE_CONTRACTOR_SUCCCES);

export const activateFailure = (
  error: CustomError | undefined,
): {
  type: ContractorTypes.ACTIVATE_CONTRACTOR_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ContractorTypes.ACTIVATE_CONTRACTOR_FAILURE, { error });

export const addUserRequest = (
  entity: ContractorUser,
): {
  type: ContractorTypes.ADD_USER_CONTRACTOR_REQUEST;
  payload: ContractorUser;
} => action(ContractorTypes.ADD_USER_CONTRACTOR_REQUEST, entity);

export const addUserSuccess = (): {
  type: ContractorTypes.ADD_USER_CONTRACTOR_SUCCCES;
} => action(ContractorTypes.ADD_USER_CONTRACTOR_SUCCCES);

export const addUserFailure = (
  error: CustomError | undefined,
): {
  type: ContractorTypes.ADD_USER_CONTRACTOR_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ContractorTypes.ADD_USER_CONTRACTOR_FAILURE, { error });

export const createRequest = (
  entity: ContractorSave,
): {
  type: ContractorTypes.CREATE_CONTRACTOR_REQUEST;
  payload: ContractorSave;
} => action(ContractorTypes.CREATE_CONTRACTOR_REQUEST, entity);

export const createSuccess = (
  data: ContractorDataType,
): {
  type: ContractorTypes.CREATE_CONTRACTOR_SUCCCES;
  payload: { data: ContractorDataType };
} => action(ContractorTypes.CREATE_CONTRACTOR_SUCCCES, { data });

export const createFailure = (
  error: CustomError | undefined,
): {
  type: ContractorTypes.CREATE_CONTRACTOR_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ContractorTypes.CREATE_CONTRACTOR_FAILURE, { error });

export const deleteRequest = (
  id: string,
): {
  type: ContractorTypes.DELETE_CONTRACTOR_REQUEST;
  payload: string;
} => action(ContractorTypes.DELETE_CONTRACTOR_REQUEST, id);

export const deleteSuccess = (): { type: ContractorTypes.DELETE_CONTRACTOR_SUCCCES } =>
  action(ContractorTypes.DELETE_CONTRACTOR_SUCCCES);

export const deleteFailure = (
  error: CustomError | undefined,
): {
  type: ContractorTypes.DELETE_CONTRACTOR_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ContractorTypes.DELETE_CONTRACTOR_FAILURE, { error });

export const getAllRequest = (): {
  type: ContractorTypes.GET_ALL_CONTRACTOR_REQUEST;
} => action(ContractorTypes.GET_ALL_CONTRACTOR_REQUEST);

export const getAllSuccess = (
  data: ContractorDataType,
): {
  type: ContractorTypes.GET_ALL_CONTRACTOR_SUCCCES;
  payload: { data: ContractorDataType };
} => action(ContractorTypes.GET_ALL_CONTRACTOR_SUCCCES, { data });

export const getAllFailure = (
  error: CustomError | undefined,
): {
  type: ContractorTypes.GET_ALL_CONTRACTOR_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ContractorTypes.GET_ALL_CONTRACTOR_FAILURE, { error });

export const getRequest = (
  id: string,
): {
  type: ContractorTypes.GET_CONTRACTOR_REQUEST;
  payload: string;
} => action(ContractorTypes.GET_CONTRACTOR_REQUEST, id);

export const getSuccess = (
  data: ContractorDataType,
): {
  type: ContractorTypes.GET_CONTRACTOR_SUCCCES;
  payload: { data: ContractorDataType };
} => action(ContractorTypes.GET_CONTRACTOR_SUCCCES, { data });

export const getFailure = (
  error: CustomError | undefined,
): {
  type: ContractorTypes.GET_CONTRACTOR_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ContractorTypes.GET_CONTRACTOR_FAILURE, { error });

export const inactivateRequest = (
  id: string,
): {
  type: ContractorTypes.INACTIVATE_CONTRACTOR_REQUEST;
  payload: string;
} => action(ContractorTypes.INACTIVATE_CONTRACTOR_REQUEST, id);

export const inactivateSuccess = (): {
  type: ContractorTypes.INACTIVATE_CONTRACTOR_SUCCCES;
} => action(ContractorTypes.INACTIVATE_CONTRACTOR_SUCCCES);

export const inactivateFailure = (
  error: CustomError | undefined,
): {
  type: ContractorTypes.INACTIVATE_CONTRACTOR_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ContractorTypes.INACTIVATE_CONTRACTOR_FAILURE, { error });

export const listRequestContractor = (
  page: Page<Contractor, Contractor>,
): {
  type: ContractorTypes.LIST_CONTRACTOR_REQUEST;
  payload: Page<Contractor, Contractor>;
} => action(ContractorTypes.LIST_CONTRACTOR_REQUEST, page);

export const listSuccess = (
  data: ContractorDataType,
): {
  type: ContractorTypes.LIST_CONTRACTOR_SUCCCES;
  payload: { data: ContractorDataType };
} => action(ContractorTypes.LIST_CONTRACTOR_SUCCCES, { data });

export const listFailure = (
  error: CustomError | undefined,
): {
  type: ContractorTypes.LIST_CONTRACTOR_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ContractorTypes.LIST_CONTRACTOR_FAILURE, { error });

export const updateRequest = (
  entity: ContractorSave,
): {
  type: ContractorTypes.UPDATE_CONTRACTOR_REQUEST;
  payload: ContractorSave;
} => action(ContractorTypes.UPDATE_CONTRACTOR_REQUEST, entity);

export const updateSuccess = (
  data: ContractorDataType,
): {
  type: ContractorTypes.UPDATE_CONTRACTOR_SUCCCES;
  payload: { data: ContractorDataType };
} => action(ContractorTypes.UPDATE_CONTRACTOR_SUCCCES, { data });

export const updateFailure = (
  error: CustomError | undefined,
): {
  type: ContractorTypes.UPDATE_CONTRACTOR_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ContractorTypes.UPDATE_CONTRACTOR_FAILURE, { error });
