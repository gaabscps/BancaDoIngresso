import CustomError from '../../../entities/CustomError';
import Page from '../../../entities/Page';
import Event from '../../../entities/Event';
import EventFind from '../../../entities/EventFind';
import EventGeneralInformation from '../../../entities/EventGeneralInformation';

/**
 * Action types
 */

// eslint-disable-next-line no-shadow
export enum EventTypes {
  LIST_EVENT_REQUEST = '@event/LIST_EVENT_REQUEST',
  LIST_EVENT_SUCCCES = '@event/LIST_EVENT_SUCCCES',
  LIST_EVENT_FAILURE = '@event/LIST_EVENT_FAILURE',
  GET_EVENT_REQUEST = '@event/GET_EVENT_REQUEST',
  GET_EVENT_SUCCCES = '@event/GET_EVENT_SUCCCES',
  GET_EVENT_FAILURE = '@event/GET_EVENT_FAILURE',
  GET_ALL_EVENT_REQUEST = '@event/GET_ALL_EVENT_REQUEST',
  GET_ALL_EVENT_SUCCCES = '@event/GET_EVENT_SUCCCES',
  GET_ALL_EVENT_FAILURE = '@event/GET_EVENT_FAILURE',
  GENERAL_INFORMATION_EVENT_REQUEST = '@event/GENERAL_INFORMATION_EVENT_REQUEST',
  GENERAL_INFORMATION_EVENT_SUCCCES = '@event/GENERAL_INFORMATION_EVENT_SUCCCES',
  GENERAL_INFORMATION_EVENT_FAILURE = '@event/GENERAL_INFORMATION_EVENT_FAILURE',
}

/**
 * Data types
 */

export interface EventDataType {
  page: Page<EventFind, Event>;
  eventGeneralInformation: EventGeneralInformation;
  list: Event[];
}

/**
 * State type
 */
export interface EventState {
  readonly data: EventDataType;
  readonly loading: boolean;
  readonly error: CustomError | undefined;
}
