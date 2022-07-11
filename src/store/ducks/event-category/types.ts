import EventCategory from '../../../entities/EventCategory';
import CustomError from '../../../entities/CustomError';
import Page from '../../../entities/Page';
/**
 * Action types
 */

// eslint-disable-next-line no-shadow
export enum EventCategoryTypes {
  LIST_EVENT_CATEGORY_REQUEST = '@event-category/LIST_EVENT_CATEGORY_REQUEST',
  LIST_EVENT_CATEGORY_SUCCCES = '@event-category/LIST_EVENT_CATEGORY_SUCCCES',
  LIST_EVENT_CATEGORY_FAILURE = '@event-category/LIST_EVENT_CATEGORY_FAILURE',
  GET_ALL_EVENT_CATEGORY_REQUEST = '@event-category/GET_ALL_EVENT_CATEGORY_REQUEST',
  GET_ALL_EVENT_CATEGORY_SUCCCES = '@event-category/GET_EVENT_CATEGORY_SUCCCES',
  GET_ALL_EVENT_CATEGORY_FAILURE = '@event-category/GET_EVENT_CATEGORY_FAILURE',
  GET_EVENT_CATEGORY_REQUEST = '@event-category/GET_EVENT_CATEGORY_REQUEST',
  GET_EVENT_CATEGORY_SUCCCES = '@event-category/GET_EVENT_CATEGORY_SUCCCES',
  GET_EVENT_CATEGORY_FAILURE = '@event-category/GET_EVENT_CATEGORY_FAILURE',
  CREATE_EVENT_CATEGORY_REQUEST = '@event-category/CREATE_EVENT_CATEGORY_REQUEST',
  CREATE_EVENT_CATEGORY_SUCCCES = '@event-category/CREATE_EVENT_CATEGORY_SUCCCES',
  CREATE_EVENT_CATEGORY_FAILURE = '@event-category/CREATE_EVENT_CATEGORY_FAILURE',
  UPDATE_EVENT_CATEGORY_REQUEST = '@event-category/UPDATE_EVENT_CATEGORY_REQUEST',
  UPDATE_EVENT_CATEGORY_SUCCCES = '@event-category/UPDATE_EVENT_CATEGORY_SUCCCES',
  UPDATE_EVENT_CATEGORY_FAILURE = '@event-category/UPDATE_EVENT_CATEGORY_FAILURE',
  ACTIVATE_EVENT_CATEGORY_REQUEST = '@event-category/ACTIVATE_EVENT_CATEGORY_REQUEST',
  ACTIVATE_EVENT_CATEGORY_SUCCCES = '@event-category/ACTIVATE_EVENT_CATEGORY_SUCCCES',
  ACTIVATE_EVENT_CATEGORY_FAILURE = '@event-category/ACTIVATE_EVENT_CATEGORY_FAILURE',
  INACTIVATE_EVENT_CATEGORY_REQUEST = '@event-category/INACTIVATE_EVENT_CATEGORY_REQUEST',
  INACTIVATE_EVENT_CATEGORY_SUCCCES = '@event-category/INACTIVATE_EVENT_CATEGORY_SUCCCES',
  INACTIVATE_EVENT_CATEGORY_FAILURE = '@event-category/INACTIVATE_EVENT_CATEGORY_FAILURE',
  DELETE_EVENT_CATEGORY_REQUEST = '@event-category/DELETE_EVENT_CATEGORY_REQUEST',
  DELETE_EVENT_CATEGORY_SUCCCES = '@event-category/DELETE_EVENT_CATEGORY_SUCCCES',
  DELETE_EVENT_CATEGORY_FAILURE = '@event-category/DELETE_EVENT_CATEGORY_FAILURE',
}

/**
 * Data types
 */

export interface EventCategoryDataType {
  page: Page<EventCategory, EventCategory>;
  entity: EventCategory;
  list: EventCategory[];
}

/**
 * State type
 */
export interface EventCategoryState {
  readonly data: EventCategoryDataType;
  readonly loading: boolean;
  readonly error: CustomError | undefined;
}
