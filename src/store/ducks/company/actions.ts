import { action } from 'typesafe-actions';
import Company from '../../../entities/Company';
import CustomError from '../../../entities/CustomError';
import Page from '../../../entities/Page';
import { CompanyDataType, CompanyTypes } from './types';

export const listRequest = (
  page: Page<Company, Company>,
): {
  type: CompanyTypes.LIST_COMPANY_REQUEST;
  payload: Page<Company, Company>;
} => action(CompanyTypes.LIST_COMPANY_REQUEST, page);

export const listSuccess = (
  data: CompanyDataType,
): {
  type: CompanyTypes.LIST_COMPANY_SUCCCES;
  payload: { data: CompanyDataType };
} => action(CompanyTypes.LIST_COMPANY_SUCCCES, { data });

export const listFailure = (
  error: CustomError | undefined,
): {
  type: CompanyTypes.LIST_COMPANY_FAILURE;
  payload: { error: CustomError | undefined };
} => action(CompanyTypes.LIST_COMPANY_FAILURE, { error });

export const getAllRequest = (): {
  type: CompanyTypes.GET_ALL_COMPANY_REQUEST;
} => action(CompanyTypes.GET_ALL_COMPANY_REQUEST);

export const getAllSuccess = (
  data: CompanyDataType,
): {
  type: CompanyTypes.GET_ALL_COMPANY_SUCCCES;
  payload: { data: CompanyDataType };
} => action(CompanyTypes.GET_ALL_COMPANY_SUCCCES, { data });

export const getAllFailure = (
  error: CustomError | undefined,
): {
  type: CompanyTypes.GET_ALL_COMPANY_FAILURE;
  payload: { error: CustomError | undefined };
} => action(CompanyTypes.GET_ALL_COMPANY_FAILURE, { error });

export const getRequest = (
  id: string,
): {
  type: CompanyTypes.GET_COMPANY_REQUEST;
  payload: string;
} => action(CompanyTypes.GET_COMPANY_REQUEST, id);

export const getSuccess = (
  data: CompanyDataType,
): {
  type: CompanyTypes.GET_COMPANY_SUCCCES;
  payload: { data: CompanyDataType };
} => action(CompanyTypes.GET_COMPANY_SUCCCES, { data });

export const getFailure = (
  error: CustomError | undefined,
): {
  type: CompanyTypes.GET_COMPANY_FAILURE;
  payload: { error: CustomError | undefined };
} => action(CompanyTypes.GET_COMPANY_FAILURE, { error });

export const createRequest = (
  entity: Company,
): {
  type: CompanyTypes.CREATE_COMPANY_REQUEST;
  payload: Company;
} => action(CompanyTypes.CREATE_COMPANY_REQUEST, entity);

export const createSuccess = (
  data: CompanyDataType,
): {
  type: CompanyTypes.CREATE_COMPANY_SUCCCES;
  payload: { data: CompanyDataType };
} => action(CompanyTypes.CREATE_COMPANY_SUCCCES, { data });

export const createFailure = (
  error: CustomError | undefined,
): {
  type: CompanyTypes.CREATE_COMPANY_FAILURE;
  payload: { error: CustomError | undefined };
} => action(CompanyTypes.CREATE_COMPANY_FAILURE, { error });

export const updateRequest = (
  entity: Company,
): {
  type: CompanyTypes.UPDATE_COMPANY_REQUEST;
  payload: Company;
} => action(CompanyTypes.UPDATE_COMPANY_REQUEST, entity);

export const updateSuccess = (
  data: CompanyDataType,
): {
  type: CompanyTypes.UPDATE_COMPANY_SUCCCES;
  payload: { data: CompanyDataType };
} => action(CompanyTypes.UPDATE_COMPANY_SUCCCES, { data });

export const updateFailure = (
  error: CustomError | undefined,
): {
  type: CompanyTypes.UPDATE_COMPANY_FAILURE;
  payload: { error: CustomError | undefined };
} => action(CompanyTypes.UPDATE_COMPANY_FAILURE, { error });

export const activateRequest = (
  id: string,
): {
  type: CompanyTypes.ACTIVATE_COMPANY_REQUEST;
  payload: string;
} => action(CompanyTypes.ACTIVATE_COMPANY_REQUEST, id);

export const activateSuccess = (): { type: CompanyTypes.ACTIVATE_COMPANY_SUCCCES } =>
  action(CompanyTypes.ACTIVATE_COMPANY_SUCCCES);

export const activateFailure = (
  error: CustomError | undefined,
): {
  type: CompanyTypes.ACTIVATE_COMPANY_FAILURE;
  payload: { error: CustomError | undefined };
} => action(CompanyTypes.ACTIVATE_COMPANY_FAILURE, { error });

export const inactivateRequest = (
  id: string,
): {
  type: CompanyTypes.INACTIVATE_COMPANY_REQUEST;
  payload: string;
} => action(CompanyTypes.INACTIVATE_COMPANY_REQUEST, id);

export const inactivateSuccess = (): {
  type: CompanyTypes.INACTIVATE_COMPANY_SUCCCES;
} => action(CompanyTypes.INACTIVATE_COMPANY_SUCCCES);

export const inactivateFailure = (
  error: CustomError | undefined,
): {
  type: CompanyTypes.INACTIVATE_COMPANY_FAILURE;
  payload: { error: CustomError | undefined };
} => action(CompanyTypes.INACTIVATE_COMPANY_FAILURE, { error });

export const deleteRequest = (
  id: string,
): {
  type: CompanyTypes.DELETE_COMPANY_REQUEST;
  payload: string;
} => action(CompanyTypes.DELETE_COMPANY_REQUEST, id);

export const deleteSuccess = (): { type: CompanyTypes.DELETE_COMPANY_SUCCCES } =>
  action(CompanyTypes.DELETE_COMPANY_SUCCCES);

export const deleteFailure = (
  error: CustomError | undefined,
): {
  type: CompanyTypes.DELETE_COMPANY_FAILURE;
  payload: { error: CustomError | undefined };
} => action(CompanyTypes.DELETE_COMPANY_FAILURE, { error });
