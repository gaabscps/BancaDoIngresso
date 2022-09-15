import { action } from 'typesafe-actions';
import { PosDataType, PosTypes } from './types';
import CustomError from '../../../model/CustomError';
import Page from '../../../model/Page';
import Pos from '../../../model/Pos';

export const createRequest = (
  entity: Pos,
): {
  type: PosTypes.CREATE_POS_REQUEST;
  payload: Pos;
} => action(PosTypes.CREATE_POS_REQUEST, entity);

export const createSuccess = (
  data: PosDataType,
): {
  type: PosTypes.CREATE_POS_SUCCCES;
  payload: { data: PosDataType };
} => action(PosTypes.CREATE_POS_SUCCCES, { data });

export const createFailure = (
  error: CustomError | undefined,
): {
  type: PosTypes.CREATE_POS_FAILURE;
  payload: { error: CustomError | undefined };
} => action(PosTypes.CREATE_POS_FAILURE, { error });

export const deleteRequest = (
  id: string,
): {
  type: PosTypes.DELETE_POS_REQUEST;
  payload: string;
} => action(PosTypes.DELETE_POS_REQUEST, id);

export const deleteSuccess = (): { type: PosTypes.DELETE_POS_SUCCCES } =>
  action(PosTypes.DELETE_POS_SUCCCES);

export const deleteFailure = (
  error: CustomError | undefined,
): {
  type: PosTypes.DELETE_POS_FAILURE;
  payload: { error: CustomError | undefined };
} => action(PosTypes.DELETE_POS_FAILURE, { error });

export const getAllRequest = (): {
  type: PosTypes.GET_ALL_POS_REQUEST;
} => action(PosTypes.GET_ALL_POS_REQUEST);

export const getAllSuccess = (
  data: PosDataType,
): {
  type: PosTypes.GET_ALL_POS_SUCCCES;
  payload: { data: PosDataType };
} => action(PosTypes.GET_ALL_POS_SUCCCES, { data });

export const getAllFailure = (
  error: CustomError | undefined,
): {
  type: PosTypes.GET_ALL_POS_FAILURE;
  payload: { error: CustomError | undefined };
} => action(PosTypes.GET_ALL_POS_FAILURE, { error });

export const getRequest = (
  id: string,
): {
  type: PosTypes.GET_POS_REQUEST;
  payload: string;
} => action(PosTypes.GET_POS_REQUEST, id);

export const getSuccess = (
  data: PosDataType,
): {
  type: PosTypes.GET_POS_SUCCCES;
  payload: { data: PosDataType };
} => action(PosTypes.GET_POS_SUCCCES, { data });

export const getFailure = (
  error: CustomError | undefined,
): {
  type: PosTypes.GET_POS_FAILURE;
  payload: { error: CustomError | undefined };
} => action(PosTypes.GET_POS_FAILURE, { error });

export const listRequest = (
  page: Page<Pos, Pos>,
): {
  type: PosTypes.LIST_POS_REQUEST;
  payload: Page<Pos, Pos>;
} => action(PosTypes.LIST_POS_REQUEST, page);

export const listSuccess = (
  data: PosDataType,
): {
  type: PosTypes.LIST_POS_SUCCCES;
  payload: { data: PosDataType };
} => action(PosTypes.LIST_POS_SUCCCES, { data });

export const listFailure = (
  error: CustomError | undefined,
): {
  type: PosTypes.LIST_POS_FAILURE;
  payload: { error: CustomError | undefined };
} => action(PosTypes.LIST_POS_FAILURE, { error });

export const updateRequest = (
  entity: Pos,
): {
  type: PosTypes.UPDATE_POS_REQUEST;
  payload: Pos;
} => action(PosTypes.UPDATE_POS_REQUEST, entity);

export const updateSuccess = (
  data: PosDataType,
): {
  type: PosTypes.UPDATE_POS_SUCCCES;
  payload: { data: PosDataType };
} => action(PosTypes.UPDATE_POS_SUCCCES, { data });

export const updateFailure = (
  error: CustomError | undefined,
): {
  type: PosTypes.UPDATE_POS_FAILURE;
  payload: { error: CustomError | undefined };
} => action(PosTypes.UPDATE_POS_FAILURE, { error });
