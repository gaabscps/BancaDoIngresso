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
import EventProduct from '../../../entities/EventProduct';
import EventProductCombo from '../../../entities/EventProductCombo';
import EventSection from '../../../entities/EventSection';
import EventPos from '../../../entities/EventPos';
import EventPdvMain from '../../../entities/EventPdvMain';
import EventPdvTicket from '../../../entities/EventPdvTicket';
import EventPdvProduct from '../../../entities/EventPdvProduct';
import EventSubPdv from '../../../entities/EventSubPdv';

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

export const eventProductRequest = (
  eventId: string,
  eventProduct: EventProduct,
): {
  type: EventTypes.SECTION_PRODUCT_PRODUCT_EVENT_REQUEST;
  payload: { eventId: string; eventProduct: EventProduct };
} =>
  action(EventTypes.SECTION_PRODUCT_PRODUCT_EVENT_REQUEST, {
    eventId,
    eventProduct,
  });

export const eventProductSuccess = (
  data: EventDataType,
): {
  type: EventTypes.SECTION_PRODUCT_PRODUCT_EVENT_SUCCCES;
  payload: { data: EventDataType };
} => action(EventTypes.SECTION_PRODUCT_PRODUCT_EVENT_SUCCCES, { data });

export const eventProductFailure = (
  error: CustomError | undefined,
): {
  type: EventTypes.SECTION_PRODUCT_PRODUCT_EVENT_FAILURE;
  payload: { error: CustomError | undefined };
} => action(EventTypes.SECTION_PRODUCT_PRODUCT_EVENT_FAILURE, { error });

export const eventProductComboRequest = (
  eventId: string,
  eventProductCombo: EventProductCombo,
): {
  type: EventTypes.SECTION_PRODUCT_COMBO_EVENT_REQUEST;
  payload: { eventId: string; eventProductCombo: EventProductCombo };
} =>
  action(EventTypes.SECTION_PRODUCT_COMBO_EVENT_REQUEST, {
    eventId,
    eventProductCombo,
  });

export const eventProductComboSuccess = (
  data: EventDataType,
): {
  type: EventTypes.SECTION_PRODUCT_COMBO_EVENT_SUCCCES;
  payload: { data: EventDataType };
} => action(EventTypes.SECTION_PRODUCT_COMBO_EVENT_SUCCCES, { data });

export const eventProductComboFailure = (
  error: CustomError | undefined,
): {
  type: EventTypes.SECTION_PRODUCT_COMBO_EVENT_FAILURE;
  payload: { error: CustomError | undefined };
} => action(EventTypes.SECTION_PRODUCT_COMBO_EVENT_FAILURE, { error });

export const eventSectionProductComboRequest = (
  eventId: string,
  eventSection: EventSection,
): {
  type: EventTypes.SECTION_PRODUCT_COMBO_SECTION_EVENT_REQUEST;
  payload: { eventId: string; eventSection: EventSection };
} =>
  action(EventTypes.SECTION_PRODUCT_COMBO_SECTION_EVENT_REQUEST, {
    eventId,
    eventSection,
  });

export const eventSectionProductComboSuccess = (
  data: EventDataType,
): {
  type: EventTypes.SECTION_PRODUCT_COMBO_SECTION_EVENT_SUCCCES;
  payload: { data: EventDataType };
} => action(EventTypes.SECTION_PRODUCT_COMBO_SECTION_EVENT_SUCCCES, { data });

export const eventSectionProductComboFailure = (
  error: CustomError | undefined,
): {
  type: EventTypes.SECTION_PRODUCT_COMBO_SECTION_EVENT_FAILURE;
  payload: { error: CustomError | undefined };
} => action(EventTypes.SECTION_PRODUCT_COMBO_SECTION_EVENT_FAILURE, { error });

export const eventSectionPosRequest = (
  eventId: string,
  eventPos: EventPos,
): {
  type: EventTypes.SECTION_PRODUCT_POS_EVENT_REQUEST;
  payload: { eventId: string; eventPos: EventPos };
} =>
  action(EventTypes.SECTION_PRODUCT_POS_EVENT_REQUEST, {
    eventId,
    eventPos,
  });

export const eventSectionPosSuccess = (
  data: EventDataType,
): {
  type: EventTypes.SECTION_PRODUCT_POS_EVENT_SUCCCES;
  payload: { data: EventDataType };
} => action(EventTypes.SECTION_PRODUCT_POS_EVENT_SUCCCES, { data });

export const eventSectionPosFailure = (
  error: CustomError | undefined,
): {
  type: EventTypes.SECTION_PRODUCT_POS_EVENT_FAILURE;
  payload: { error: CustomError | undefined };
} => action(EventTypes.SECTION_PRODUCT_POS_EVENT_FAILURE, { error });

export const eventPdvMainRequest = (
  eventId: string,
  eventPdvMain: EventPdvMain,
): {
  type: EventTypes.PDV_MAIN_EVENT_REQUEST;
  payload: { eventId: string; eventPdvMain: EventPdvMain };
} =>
  action(EventTypes.PDV_MAIN_EVENT_REQUEST, {
    eventId,
    eventPdvMain,
  });

export const eventPdvMainSuccess = (
  data: EventDataType,
): {
  type: EventTypes.PDV_MAIN_EVENT_SUCCCES;
  payload: { data: EventDataType };
} => action(EventTypes.PDV_MAIN_EVENT_SUCCCES, { data });

export const eventPdvMainFailure = (
  error: CustomError | undefined,
): {
  type: EventTypes.PDV_MAIN_EVENT_FAILURE;
  payload: { error: CustomError | undefined };
} => action(EventTypes.PDV_MAIN_EVENT_FAILURE, { error });

export const eventPdvTicketRequest = (
  eventId: string,
  eventPdvTicket: EventPdvTicket,
): {
  type: EventTypes.PDV_TICKET_EVENT_REQUEST;
  payload: { eventId: string; eventPdvTicket: EventPdvTicket };
} =>
  action(EventTypes.PDV_TICKET_EVENT_REQUEST, {
    eventId,
    eventPdvTicket,
  });

export const eventPdvTicketSuccess = (
  data: EventDataType,
): {
  type: EventTypes.PDV_TICKET_EVENT_SUCCCES;
  payload: { data: EventDataType };
} => action(EventTypes.PDV_TICKET_EVENT_SUCCCES, { data });

export const eventPdvTicketFailure = (
  error: CustomError | undefined,
): {
  type: EventTypes.PDV_TICKET_EVENT_FAILURE;
  payload: { error: CustomError | undefined };
} => action(EventTypes.PDV_TICKET_EVENT_FAILURE, { error });

export const eventPdvProductRequest = (
  eventId: string,
  eventPdvProduct: EventPdvProduct,
): {
  type: EventTypes.PDV_PRODUCT_EVENT_REQUEST;
  payload: { eventId: string; eventPdvProduct: EventPdvProduct };
} =>
  action(EventTypes.PDV_PRODUCT_EVENT_REQUEST, {
    eventId,
    eventPdvProduct,
  });

export const eventPdvProductSuccess = (
  data: EventDataType,
): {
  type: EventTypes.PDV_PRODUCT_EVENT_SUCCCES;
  payload: { data: EventDataType };
} => action(EventTypes.PDV_PRODUCT_EVENT_SUCCCES, { data });

export const eventPdvProductFailure = (
  error: CustomError | undefined,
): {
  type: EventTypes.PDV_PRODUCT_EVENT_FAILURE;
  payload: { error: CustomError | undefined };
} => action(EventTypes.PDV_PRODUCT_EVENT_FAILURE, { error });

export const eventSubPdvRequest = (
  eventId: string,
  eventSubPdv: EventSubPdv,
): {
  type: EventTypes.PDV_SUBPDV_EVENT_REQUEST;
  payload: { eventId: string; eventSubPdv: EventSubPdv };
} =>
  action(EventTypes.PDV_SUBPDV_EVENT_REQUEST, {
    eventId,
    eventSubPdv,
  });

export const eventSubPdvSuccess = (
  data: EventDataType,
): {
  type: EventTypes.PDV_SUBPDV_EVENT_SUCCCES;
  payload: { data: EventDataType };
} => action(EventTypes.PDV_SUBPDV_EVENT_SUCCCES, { data });

export const eventSubPdvFailure = (
  error: CustomError | undefined,
): {
  type: EventTypes.PDV_SUBPDV_EVENT_FAILURE;
  payload: { error: CustomError | undefined };
} => action(EventTypes.PDV_SUBPDV_EVENT_FAILURE, { error });
