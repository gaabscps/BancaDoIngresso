import { action } from 'typesafe-actions';
import Combo from '../../../entities/Combo';
import CustomError from '../../../entities/CustomError';
import Page from '../../../entities/Page';
import { ComboDataType, ComboTypes } from './types';

export const listRequest = (
  page: Page<Combo, Combo>,
): {
  type: ComboTypes.LIST_COMBO_REQUEST;
  payload: Page<Combo, Combo>;
} => action(ComboTypes.LIST_COMBO_REQUEST, page);

export const listSuccess = (
  data: ComboDataType,
): {
  type: ComboTypes.LIST_COMBO_SUCCCES;
  payload: { data: ComboDataType };
} => action(ComboTypes.LIST_COMBO_SUCCCES, { data });

export const listFailure = (
  error: CustomError | undefined,
): {
  type: ComboTypes.LIST_COMBO_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ComboTypes.LIST_COMBO_FAILURE, { error });

export const getAllRequest = (): {
  type: ComboTypes.GET_ALL_COMBO_REQUEST;
} => action(ComboTypes.GET_ALL_COMBO_REQUEST);

export const getAllSuccess = (
  data: ComboDataType,
): {
  type: ComboTypes.GET_ALL_COMBO_SUCCCES;
  payload: { data: ComboDataType };
} => action(ComboTypes.GET_ALL_COMBO_SUCCCES, { data });

export const getAllFailure = (
  error: CustomError | undefined,
): {
  type: ComboTypes.GET_ALL_COMBO_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ComboTypes.GET_ALL_COMBO_FAILURE, { error });

export const getRequest = (
  id: string,
): {
  type: ComboTypes.GET_COMBO_REQUEST;
  payload: string;
} => action(ComboTypes.GET_COMBO_REQUEST, id);

export const getSuccess = (
  data: ComboDataType,
): {
  type: ComboTypes.GET_COMBO_SUCCCES;
  payload: { data: ComboDataType };
} => action(ComboTypes.GET_COMBO_SUCCCES, { data });

export const getFailure = (
  error: CustomError | undefined,
): {
  type: ComboTypes.GET_COMBO_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ComboTypes.GET_COMBO_FAILURE, { error });

export const createRequest = (
  entity: Combo,
): {
  type: ComboTypes.CREATE_COMBO_REQUEST;
  payload: Combo;
} => action(ComboTypes.CREATE_COMBO_REQUEST, entity);

export const createSuccess = (
  data: ComboDataType,
): {
  type: ComboTypes.CREATE_COMBO_SUCCCES;
  payload: { data: ComboDataType };
} => action(ComboTypes.CREATE_COMBO_SUCCCES, { data });

export const createFailure = (
  error: CustomError | undefined,
): {
  type: ComboTypes.CREATE_COMBO_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ComboTypes.CREATE_COMBO_FAILURE, { error });

export const updateRequest = (
  entity: Combo,
): {
  type: ComboTypes.UPDATE_COMBO_REQUEST;
  payload: Combo;
} => action(ComboTypes.UPDATE_COMBO_REQUEST, entity);

export const updateSuccess = (
  data: ComboDataType,
): {
  type: ComboTypes.UPDATE_COMBO_SUCCCES;
  payload: { data: ComboDataType };
} => action(ComboTypes.UPDATE_COMBO_SUCCCES, { data });

export const updateFailure = (
  error: CustomError | undefined,
): {
  type: ComboTypes.UPDATE_COMBO_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ComboTypes.UPDATE_COMBO_FAILURE, { error });

export const activateRequest = (
  id: string,
): {
  type: ComboTypes.ACTIVATE_COMBO_REQUEST;
  payload: string;
} => action(ComboTypes.ACTIVATE_COMBO_REQUEST, id);

export const activateSuccess = (): { type: ComboTypes.ACTIVATE_COMBO_SUCCCES } =>
  action(ComboTypes.ACTIVATE_COMBO_SUCCCES);

export const activateFailure = (
  error: CustomError | undefined,
): {
  type: ComboTypes.ACTIVATE_COMBO_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ComboTypes.ACTIVATE_COMBO_FAILURE, { error });

export const inactivateRequest = (
  id: string,
): {
  type: ComboTypes.INACTIVATE_COMBO_REQUEST;
  payload: string;
} => action(ComboTypes.INACTIVATE_COMBO_REQUEST, id);

export const inactivateSuccess = (): {
  type: ComboTypes.INACTIVATE_COMBO_SUCCCES;
} => action(ComboTypes.INACTIVATE_COMBO_SUCCCES);

export const inactivateFailure = (
  error: CustomError | undefined,
): {
  type: ComboTypes.INACTIVATE_COMBO_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ComboTypes.INACTIVATE_COMBO_FAILURE, { error });

export const deleteRequest = (
  id: string,
): {
  type: ComboTypes.DELETE_COMBO_REQUEST;
  payload: string;
} => action(ComboTypes.DELETE_COMBO_REQUEST, id);

export const deleteSuccess = (): { type: ComboTypes.DELETE_COMBO_SUCCCES } =>
  action(ComboTypes.DELETE_COMBO_SUCCCES);

export const deleteFailure = (
  error: CustomError | undefined,
): {
  type: ComboTypes.DELETE_COMBO_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ComboTypes.DELETE_COMBO_FAILURE, { error });
