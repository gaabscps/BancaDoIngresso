import { action } from 'typesafe-actions';
import { EventDataType, EventTypes } from './types';
import Event from '../../../entities/Event';
import EventFind from '../../../entities/EventFind';
import EventGeneralInformation from '../../../entities/EventGeneralInformation';
import CustomError from '../../../entities/CustomError';
import Page from '../../../entities/Page';
import EventTicketMainConfiguration from '../../../entities/EventTicketMainConfiguration';
import TicketPayment from '../../../entities/TicketPayment';
import EventTicketGeneralSettings from '../../../entities/EventTicketGeneralSettings';

export const listRequest = (
  page: Page<EventFind, Event>,
): {
  type: EventTypes.LIST_EVENT_REQUEST;
  payload: Page<EventFind, Event>;
} => action(EventTypes.LIST_EVENT_REQUEST, page);

export const listSuccess = (
  data: EventDataType,
): {
  type: EventTypes.LIST_EVENT_SUCCCES;
  payload: { data: EventDataType };
} => action(EventTypes.LIST_EVENT_SUCCCES, { data });

export const listFailure = (
  error: CustomError | undefined,
): {
  type: EventTypes.LIST_EVENT_FAILURE;
  payload: { error: CustomError | undefined };
} => action(EventTypes.LIST_EVENT_FAILURE, { error });

export const getRequest = (
  id: string,
): {
  type: EventTypes.GET_EVENT_REQUEST;
  payload: string;
} => action(EventTypes.GET_EVENT_REQUEST, id);

export const getSuccess = (
  data: EventDataType,
): {
  type: EventTypes.GET_EVENT_SUCCCES;
  payload: { data: EventDataType };
} => action(EventTypes.GET_EVENT_SUCCCES, { data });

export const getFailure = (
  error: CustomError | undefined,
): {
  type: EventTypes.GET_EVENT_FAILURE;
  payload: { error: CustomError | undefined };
} => action(EventTypes.GET_EVENT_FAILURE, { error });

export const getAllRequest = (): {
  type: EventTypes.GET_ALL_EVENT_REQUEST;
} => action(EventTypes.GET_ALL_EVENT_REQUEST);

export const getAllSuccess = (
  data: EventDataType,
): {
  type: EventTypes.GET_ALL_EVENT_SUCCCES;
  payload: { data: EventDataType };
} => action(EventTypes.GET_ALL_EVENT_SUCCCES, { data });

export const getAllFailure = (
  error: CustomError | undefined,
): {
  type: EventTypes.GET_ALL_EVENT_FAILURE;
  payload: { error: CustomError | undefined };
} => action(EventTypes.GET_ALL_EVENT_FAILURE, { error });

export const generalInformationRequest = (
  eventGeneralInformation: EventGeneralInformation,
): {
  type: EventTypes.GENERAL_INFORMATION_EVENT_REQUEST;
  payload: EventGeneralInformation;
} => action(EventTypes.GENERAL_INFORMATION_EVENT_REQUEST, eventGeneralInformation);

export const generalInformationSuccess = (
  data: EventDataType,
): {
  type: EventTypes.GENERAL_INFORMATION_EVENT_SUCCCES;
  payload: { data: EventDataType };
} => action(EventTypes.GENERAL_INFORMATION_EVENT_SUCCCES, { data });

export const generalInformationFailure = (
  error: CustomError | undefined,
): {
  type: EventTypes.GENERAL_INFORMATION_EVENT_FAILURE;
  payload: { error: CustomError | undefined };
} => action(EventTypes.GENERAL_INFORMATION_EVENT_FAILURE, { error });

export const ticketMainConfigurationRequest = (
  eventId: string,
  eventTicketMainConfiguration: EventTicketMainConfiguration,
): {
  type: EventTypes.TICKET_MAIN_CONFIGURATION_EVENT_REQUEST;
  payload: { eventId: string; eventTicketMainConfiguration: EventTicketMainConfiguration };
} =>
  action(EventTypes.TICKET_MAIN_CONFIGURATION_EVENT_REQUEST, {
    eventId,
    eventTicketMainConfiguration,
  });

export const ticketMainConfigurationSuccess = (
  data: EventDataType,
): {
  type: EventTypes.TICKET_MAIN_CONFIGURATION_EVENT_SUCCCES;
  payload: { data: EventDataType };
} => action(EventTypes.TICKET_MAIN_CONFIGURATION_EVENT_SUCCCES, { data });

export const ticketMainConfigurationFailure = (
  error: CustomError | undefined,
): {
  type: EventTypes.TICKET_MAIN_CONFIGURATION_EVENT_FAILURE;
  payload: { error: CustomError | undefined };
} => action(EventTypes.TICKET_MAIN_CONFIGURATION_EVENT_FAILURE, { error });

export const ticketPaymentRequest = (
  eventId: string,
  ticketPayment: TicketPayment,
): {
  type: EventTypes.TICKET_PAYMENT_EVENT_REQUEST;
  payload: { eventId: string; ticketPayment: TicketPayment };
} =>
  action(EventTypes.TICKET_PAYMENT_EVENT_REQUEST, {
    eventId,
    ticketPayment,
  });

export const ticketPaymentSuccess = (
  data: EventDataType,
): {
  type: EventTypes.TICKET_PAYMENT_EVENT_SUCCCES;
  payload: { data: EventDataType };
} => action(EventTypes.TICKET_PAYMENT_EVENT_SUCCCES, { data });

export const ticketPaymentFailure = (
  error: CustomError | undefined,
): {
  type: EventTypes.TICKET_PAYMENT_EVENT_FAILURE;
  payload: { error: CustomError | undefined };
} => action(EventTypes.TICKET_PAYMENT_EVENT_FAILURE, { error });

export const ticketGeneralSettingsRequest = (
  eventId: string,
  eventTicketGeneralSettings: EventTicketGeneralSettings,
): {
  type: EventTypes.TICKET_GENERAL_SETTINGS_EVENT_REQUEST;
  payload: { eventId: string; eventTicketGeneralSettings: EventTicketGeneralSettings };
} =>
  action(EventTypes.TICKET_GENERAL_SETTINGS_EVENT_REQUEST, {
    eventId,
    eventTicketGeneralSettings,
  });

export const ticketGeneralSettingsSuccess = (
  data: EventDataType,
): {
  type: EventTypes.TICKET_GENERAL_SETTINGS_EVENT_SUCCCES;
  payload: { data: EventDataType };
} => action(EventTypes.TICKET_GENERAL_SETTINGS_EVENT_SUCCCES, { data });

export const ticketGeneralSettingsFailure = (
  error: CustomError | undefined,
): {
  type: EventTypes.TICKET_GENERAL_SETTINGS_EVENT_FAILURE;
  payload: { error: CustomError | undefined };
} => action(EventTypes.TICKET_GENERAL_SETTINGS_EVENT_FAILURE, { error });
