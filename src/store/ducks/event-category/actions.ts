import { action } from 'typesafe-actions';
import EventCategory from '../../../model/EventCategory';
import CustomError from '../../../model/CustomError';
import Page from '../../../model/Page';
import { EventCategoryDataType, EventCategoryTypes } from './types';

export const listRequestCategory = (
  page: Page<EventCategory, EventCategory>,
): {
  type: EventCategoryTypes.LIST_EVENT_CATEGORY_REQUEST;
  payload: Page<EventCategory, EventCategory>;
} => action(EventCategoryTypes.LIST_EVENT_CATEGORY_REQUEST, page);

export const listSuccess = (
  data: EventCategoryDataType,
): {
  type: EventCategoryTypes.LIST_EVENT_CATEGORY_SUCCCES;
  payload: { data: EventCategoryDataType };
} => action(EventCategoryTypes.LIST_EVENT_CATEGORY_SUCCCES, { data });

export const listFailure = (
  error: CustomError | undefined,
): {
  type: EventCategoryTypes.LIST_EVENT_CATEGORY_FAILURE;
  payload: { error: CustomError | undefined };
} => action(EventCategoryTypes.LIST_EVENT_CATEGORY_FAILURE, { error });

export const getAllRequest = (): {
  type: EventCategoryTypes.GET_ALL_EVENT_CATEGORY_REQUEST;
} => action(EventCategoryTypes.GET_ALL_EVENT_CATEGORY_REQUEST);

export const getAllSuccess = (
  data: EventCategoryDataType,
): {
  type: EventCategoryTypes.GET_ALL_EVENT_CATEGORY_SUCCCES;
  payload: { data: EventCategoryDataType };
} => action(EventCategoryTypes.GET_ALL_EVENT_CATEGORY_SUCCCES, { data });

export const getAllFailure = (
  error: CustomError | undefined,
): {
  type: EventCategoryTypes.GET_ALL_EVENT_CATEGORY_FAILURE;
  payload: { error: CustomError | undefined };
} => action(EventCategoryTypes.GET_ALL_EVENT_CATEGORY_FAILURE, { error });

export const getRequest = (
  id: string,
): {
  type: EventCategoryTypes.GET_EVENT_CATEGORY_REQUEST;
  payload: string;
} => action(EventCategoryTypes.GET_EVENT_CATEGORY_REQUEST, id);

export const getSuccess = (
  data: EventCategoryDataType,
): {
  type: EventCategoryTypes.GET_EVENT_CATEGORY_SUCCCES;
  payload: { data: EventCategoryDataType };
} => action(EventCategoryTypes.GET_EVENT_CATEGORY_SUCCCES, { data });

export const getFailure = (
  error: CustomError | undefined,
): {
  type: EventCategoryTypes.GET_EVENT_CATEGORY_FAILURE;
  payload: { error: CustomError | undefined };
} => action(EventCategoryTypes.GET_EVENT_CATEGORY_FAILURE, { error });

export const createRequest = (
  eventCategory: EventCategory,
): {
  type: EventCategoryTypes.CREATE_EVENT_CATEGORY_REQUEST;
  payload: EventCategory;
} => action(EventCategoryTypes.CREATE_EVENT_CATEGORY_REQUEST, eventCategory);

export const createSuccess = (
  data: EventCategoryDataType,
): {
  type: EventCategoryTypes.CREATE_EVENT_CATEGORY_SUCCCES;
  payload: { data: EventCategoryDataType };
} => action(EventCategoryTypes.CREATE_EVENT_CATEGORY_SUCCCES, { data });

export const createFailure = (
  error: CustomError | undefined,
): {
  type: EventCategoryTypes.CREATE_EVENT_CATEGORY_FAILURE;
  payload: { error: CustomError | undefined };
} => action(EventCategoryTypes.CREATE_EVENT_CATEGORY_FAILURE, { error });

export const updateRequest = (
  eventCategory: EventCategory,
): {
  type: EventCategoryTypes.UPDATE_EVENT_CATEGORY_REQUEST;
  payload: EventCategory;
} => action(EventCategoryTypes.UPDATE_EVENT_CATEGORY_REQUEST, eventCategory);

export const updateSuccess = (
  data: EventCategoryDataType,
): {
  type: EventCategoryTypes.UPDATE_EVENT_CATEGORY_SUCCCES;
  payload: { data: EventCategoryDataType };
} => action(EventCategoryTypes.UPDATE_EVENT_CATEGORY_SUCCCES, { data });

export const updateFailure = (
  error: CustomError | undefined,
): {
  type: EventCategoryTypes.UPDATE_EVENT_CATEGORY_FAILURE;
  payload: { error: CustomError | undefined };
} => action(EventCategoryTypes.UPDATE_EVENT_CATEGORY_FAILURE, { error });

export const activateRequest = (
  id: string,
): {
  type: EventCategoryTypes.ACTIVATE_EVENT_CATEGORY_REQUEST;
  payload: string;
} => action(EventCategoryTypes.ACTIVATE_EVENT_CATEGORY_REQUEST, id);

export const activateSuccess = (): { type: EventCategoryTypes.ACTIVATE_EVENT_CATEGORY_SUCCCES } =>
  action(EventCategoryTypes.ACTIVATE_EVENT_CATEGORY_SUCCCES);

export const activateFailure = (
  error: CustomError | undefined,
): {
  type: EventCategoryTypes.ACTIVATE_EVENT_CATEGORY_FAILURE;
  payload: { error: CustomError | undefined };
} => action(EventCategoryTypes.ACTIVATE_EVENT_CATEGORY_FAILURE, { error });

export const inactivateRequest = (
  id: string,
): {
  type: EventCategoryTypes.INACTIVATE_EVENT_CATEGORY_REQUEST;
  payload: string;
} => action(EventCategoryTypes.INACTIVATE_EVENT_CATEGORY_REQUEST, id);

export const inactivateSuccess = (): {
  type: EventCategoryTypes.INACTIVATE_EVENT_CATEGORY_SUCCCES;
} => action(EventCategoryTypes.INACTIVATE_EVENT_CATEGORY_SUCCCES);

export const inactivateFailure = (
  error: CustomError | undefined,
): {
  type: EventCategoryTypes.INACTIVATE_EVENT_CATEGORY_FAILURE;
  payload: { error: CustomError | undefined };
} => action(EventCategoryTypes.INACTIVATE_EVENT_CATEGORY_FAILURE, { error });

export const deleteRequest = (
  id: string,
): {
  type: EventCategoryTypes.DELETE_EVENT_CATEGORY_REQUEST;
  payload: string;
} => action(EventCategoryTypes.DELETE_EVENT_CATEGORY_REQUEST, id);

export const deleteSuccess = (): { type: EventCategoryTypes.DELETE_EVENT_CATEGORY_SUCCCES } =>
  action(EventCategoryTypes.DELETE_EVENT_CATEGORY_SUCCCES);

export const deleteFailure = (
  error: CustomError | undefined,
): {
  type: EventCategoryTypes.DELETE_EVENT_CATEGORY_FAILURE;
  payload: { error: CustomError | undefined };
} => action(EventCategoryTypes.DELETE_EVENT_CATEGORY_FAILURE, { error });
