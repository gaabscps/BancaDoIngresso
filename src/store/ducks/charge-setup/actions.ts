import { action } from 'typesafe-actions';
import ChargeSetup from '../../../model/ChargeSetup';
import CustomError from '../../../model/CustomError';
import Page from '../../../model/Page';
import { ChargeSetupDataType, ChargeSetupTypes } from './types';

export const listRequest = (
  page: Page<ChargeSetup, ChargeSetup>,
): {
  type: ChargeSetupTypes.LIST_CHARGE_SETUP_REQUEST;
  payload: Page<ChargeSetup, ChargeSetup>;
} => action(ChargeSetupTypes.LIST_CHARGE_SETUP_REQUEST, page);

export const listSuccess = (
  data: ChargeSetupDataType,
): {
  type: ChargeSetupTypes.LIST_CHARGE_SETUP_SUCCCES;
  payload: { data: ChargeSetupDataType };
} => action(ChargeSetupTypes.LIST_CHARGE_SETUP_SUCCCES, { data });

export const listFailure = (
  error: CustomError | undefined,
): {
  type: ChargeSetupTypes.LIST_CHARGE_SETUP_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ChargeSetupTypes.LIST_CHARGE_SETUP_FAILURE, { error });

export const getAllRequest = (): {
  type: ChargeSetupTypes.GET_ALL_CHARGE_SETUP_REQUEST;
} => action(ChargeSetupTypes.GET_ALL_CHARGE_SETUP_REQUEST);

export const getAllSuccess = (
  data: ChargeSetupDataType,
): {
  type: ChargeSetupTypes.GET_ALL_CHARGE_SETUP_SUCCCES;
  payload: { data: ChargeSetupDataType };
} => action(ChargeSetupTypes.GET_ALL_CHARGE_SETUP_SUCCCES, { data });

export const getAllFailure = (
  error: CustomError | undefined,
): {
  type: ChargeSetupTypes.GET_ALL_CHARGE_SETUP_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ChargeSetupTypes.GET_ALL_CHARGE_SETUP_FAILURE, { error });

export const getRequest = (
  id: string,
): {
  type: ChargeSetupTypes.GET_CHARGE_SETUP_REQUEST;
  payload: string;
} => action(ChargeSetupTypes.GET_CHARGE_SETUP_REQUEST, id);

export const getSuccess = (
  data: ChargeSetupDataType,
): {
  type: ChargeSetupTypes.GET_CHARGE_SETUP_SUCCCES;
  payload: { data: ChargeSetupDataType };
} => action(ChargeSetupTypes.GET_CHARGE_SETUP_SUCCCES, { data });

export const getFailure = (
  error: CustomError | undefined,
): {
  type: ChargeSetupTypes.GET_CHARGE_SETUP_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ChargeSetupTypes.GET_CHARGE_SETUP_FAILURE, { error });

export const createRequest = (
  chargeSetup: ChargeSetup,
): {
  type: ChargeSetupTypes.CREATE_CHARGE_SETUP_REQUEST;
  payload: ChargeSetup;
} => action(ChargeSetupTypes.CREATE_CHARGE_SETUP_REQUEST, chargeSetup);

export const createSuccess = (
  data: ChargeSetupDataType,
): {
  type: ChargeSetupTypes.CREATE_CHARGE_SETUP_SUCCCES;
  payload: { data: ChargeSetupDataType };
} => action(ChargeSetupTypes.CREATE_CHARGE_SETUP_SUCCCES, { data });

export const createFailure = (
  error: CustomError | undefined,
): {
  type: ChargeSetupTypes.CREATE_CHARGE_SETUP_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ChargeSetupTypes.CREATE_CHARGE_SETUP_FAILURE, { error });

export const updateRequest = (
  chargeSetup: ChargeSetup,
): {
  type: ChargeSetupTypes.UPDATE_CHARGE_SETUP_REQUEST;
  payload: ChargeSetup;
} => action(ChargeSetupTypes.UPDATE_CHARGE_SETUP_REQUEST, chargeSetup);

export const updateSuccess = (
  data: ChargeSetupDataType,
): {
  type: ChargeSetupTypes.UPDATE_CHARGE_SETUP_SUCCCES;
  payload: { data: ChargeSetupDataType };
} => action(ChargeSetupTypes.UPDATE_CHARGE_SETUP_SUCCCES, { data });

export const updateFailure = (
  error: CustomError | undefined,
): {
  type: ChargeSetupTypes.UPDATE_CHARGE_SETUP_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ChargeSetupTypes.UPDATE_CHARGE_SETUP_FAILURE, { error });
