import Company from '../../../model/Company';
import CustomError from '../../../model/CustomError';
import Page from '../../../model/Page';
/**
 * Action types
 */

// eslint-disable-next-line no-shadow
export enum CompanyTypes {
  LIST_COMPANY_REQUEST = '@company/LIST_COMPANY_REQUEST',
  LIST_COMPANY_SUCCCES = '@company/LIST_COMPANY_SUCCCES',
  LIST_COMPANY_FAILURE = '@company/LIST_COMPANY_FAILURE',
  GET_ALL_COMPANY_REQUEST = '@company/GET_ALL_COMPANY_REQUEST',
  GET_ALL_COMPANY_SUCCCES = '@company/GET_COMPANY_SUCCCES',
  GET_ALL_COMPANY_FAILURE = '@company/GET_COMPANY_FAILURE',
  GET_COMPANY_REQUEST = '@company/GET_COMPANY_REQUEST',
  GET_COMPANY_SUCCCES = '@company/GET_COMPANY_SUCCCES',
  GET_COMPANY_FAILURE = '@company/GET_COMPANY_FAILURE',
  CREATE_COMPANY_REQUEST = '@company/CREATE_COMPANY_REQUEST',
  CREATE_COMPANY_SUCCCES = '@company/CREATE_COMPANY_SUCCCES',
  CREATE_COMPANY_FAILURE = '@company/CREATE_COMPANY_FAILURE',
  UPDATE_COMPANY_REQUEST = '@company/UPDATE_COMPANY_REQUEST',
  UPDATE_COMPANY_SUCCCES = '@company/UPDATE_COMPANY_SUCCCES',
  UPDATE_COMPANY_FAILURE = '@company/UPDATE_COMPANY_FAILURE',
  ACTIVATE_COMPANY_REQUEST = '@company/ACTIVATE_COMPANY_REQUEST',
  ACTIVATE_COMPANY_SUCCCES = '@company/ACTIVATE_COMPANY_SUCCCES',
  ACTIVATE_COMPANY_FAILURE = '@company/ACTIVATE_COMPANY_FAILURE',
  INACTIVATE_COMPANY_REQUEST = '@company/INACTIVATE_COMPANY_REQUEST',
  INACTIVATE_COMPANY_SUCCCES = '@company/INACTIVATE_COMPANY_SUCCCES',
  INACTIVATE_COMPANY_FAILURE = '@company/INACTIVATE_COMPANY_FAILURE',
  DELETE_COMPANY_REQUEST = '@company/DELETE_COMPANY_REQUEST',
  DELETE_COMPANY_SUCCCES = '@company/DELETE_COMPANY_SUCCCES',
  DELETE_COMPANY_FAILURE = '@company/DELETE_COMPANY_FAILURE',
}

/**
 * Data types
 */

export interface CompanyDataType {
  page: Page<Company, Company>;
  entity: Company;
  list: Company[];
}

/**
 * State type
 */
export interface CompanyState {
  readonly data: CompanyDataType;
  readonly loading: boolean;
  readonly error: CustomError | undefined;
}
