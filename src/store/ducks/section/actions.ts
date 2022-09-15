import { action } from 'typesafe-actions';
import CustomError from '../../../model/CustomError';
import Page from '../../../model/Page';
import Section from '../../../model/Section';
import { SectionDataType, SectionTypes } from './types';

export const activateRequest = (
  id: string,
): {
  type: SectionTypes.ACTIVATE_SECTION_REQUEST;
  payload: string;
} => action(SectionTypes.ACTIVATE_SECTION_REQUEST, id);

export const activateSuccess = (): { type: SectionTypes.ACTIVATE_SECTION_SUCCCES } =>
  action(SectionTypes.ACTIVATE_SECTION_SUCCCES);

export const activateFailure = (
  error: CustomError | undefined,
): {
  type: SectionTypes.ACTIVATE_SECTION_FAILURE;
  payload: { error: CustomError | undefined };
} => action(SectionTypes.ACTIVATE_SECTION_FAILURE, { error });

export const createRequest = (
  entity: Section,
): {
  type: SectionTypes.CREATE_SECTION_REQUEST;
  payload: Section;
} => action(SectionTypes.CREATE_SECTION_REQUEST, entity);

export const createSuccess = (
  data: SectionDataType,
): {
  type: SectionTypes.CREATE_SECTION_SUCCCES;
  payload: { data: SectionDataType };
} => action(SectionTypes.CREATE_SECTION_SUCCCES, { data });

export const createFailure = (
  error: CustomError | undefined,
): {
  type: SectionTypes.CREATE_SECTION_FAILURE;
  payload: { error: CustomError | undefined };
} => action(SectionTypes.CREATE_SECTION_FAILURE, { error });

export const deleteRequest = (
  id: string,
): {
  type: SectionTypes.DELETE_SECTION_REQUEST;
  payload: string;
} => action(SectionTypes.DELETE_SECTION_REQUEST, id);

export const deleteSuccess = (): { type: SectionTypes.DELETE_SECTION_SUCCCES } =>
  action(SectionTypes.DELETE_SECTION_SUCCCES);

export const deleteFailure = (
  error: CustomError | undefined,
): {
  type: SectionTypes.DELETE_SECTION_FAILURE;
  payload: { error: CustomError | undefined };
} => action(SectionTypes.DELETE_SECTION_FAILURE, { error });

export const getAllRequest = (): {
  type: SectionTypes.GET_ALL_SECTION_REQUEST;
} => action(SectionTypes.GET_ALL_SECTION_REQUEST);

export const getAllSuccess = (
  data: SectionDataType,
): {
  type: SectionTypes.GET_ALL_SECTION_SUCCCES;
  payload: { data: SectionDataType };
} => action(SectionTypes.GET_ALL_SECTION_SUCCCES, { data });

export const getAllFailure = (
  error: CustomError | undefined,
): {
  type: SectionTypes.GET_ALL_SECTION_FAILURE;
  payload: { error: CustomError | undefined };
} => action(SectionTypes.GET_ALL_SECTION_FAILURE, { error });

export const getRequest = (
  id: string,
): {
  type: SectionTypes.GET_SECTION_REQUEST;
  payload: string;
} => action(SectionTypes.GET_SECTION_REQUEST, id);

export const getSuccess = (
  data: SectionDataType,
): {
  type: SectionTypes.GET_SECTION_SUCCCES;
  payload: { data: SectionDataType };
} => action(SectionTypes.GET_SECTION_SUCCCES, { data });

export const getFailure = (
  error: CustomError | undefined,
): {
  type: SectionTypes.GET_SECTION_FAILURE;
  payload: { error: CustomError | undefined };
} => action(SectionTypes.GET_SECTION_FAILURE, { error });

export const inactivateRequest = (
  id: string,
): {
  type: SectionTypes.INACTIVATE_SECTION_REQUEST;
  payload: string;
} => action(SectionTypes.INACTIVATE_SECTION_REQUEST, id);

export const inactivateSuccess = (): {
  type: SectionTypes.INACTIVATE_SECTION_SUCCCES;
} => action(SectionTypes.INACTIVATE_SECTION_SUCCCES);

export const inactivateFailure = (
  error: CustomError | undefined,
): {
  type: SectionTypes.INACTIVATE_SECTION_FAILURE;
  payload: { error: CustomError | undefined };
} => action(SectionTypes.INACTIVATE_SECTION_FAILURE, { error });

export const listRequest = (
  page: Page<Section, Section>,
): {
  type: SectionTypes.LIST_SECTION_REQUEST;
  payload: Page<Section, Section>;
} => action(SectionTypes.LIST_SECTION_REQUEST, page);

export const listSuccess = (
  data: SectionDataType,
): {
  type: SectionTypes.LIST_SECTION_SUCCCES;
  payload: { data: SectionDataType };
} => action(SectionTypes.LIST_SECTION_SUCCCES, { data });

export const listFailure = (
  error: CustomError | undefined,
): {
  type: SectionTypes.LIST_SECTION_FAILURE;
  payload: { error: CustomError | undefined };
} => action(SectionTypes.LIST_SECTION_FAILURE, { error });

export const updateRequest = (
  entity: Section,
): {
  type: SectionTypes.UPDATE_SECTION_REQUEST;
  payload: Section;
} => action(SectionTypes.UPDATE_SECTION_REQUEST, entity);

export const updateSuccess = (
  data: SectionDataType,
): {
  type: SectionTypes.UPDATE_SECTION_SUCCCES;
  payload: { data: SectionDataType };
} => action(SectionTypes.UPDATE_SECTION_SUCCCES, { data });

export const updateFailure = (
  error: CustomError | undefined,
): {
  type: SectionTypes.UPDATE_SECTION_FAILURE;
  payload: { error: CustomError | undefined };
} => action(SectionTypes.UPDATE_SECTION_FAILURE, { error });
