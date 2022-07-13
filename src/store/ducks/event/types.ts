import CustomError from '../../../entities/CustomError';
import Page from '../../../entities/Page';
import Event from '../../../entities/Event';
import EventFind from '../../../entities/EventFind';
import EventGeneralInformation from '../../../entities/EventGeneralInformation';
import EventTicketMainConfiguration from '../../../entities/EventTicketMainConfiguration';
import TicketPayment from '../../../entities/TicketPayment';
import EventTicketGeneralSettings from '../../../entities/EventTicketGeneralSettings';
import EventProduct from '../../../entities/EventProduct';
import EventProductCombo from '../../../entities/EventProductCombo';
import EventSection from '../../../entities/EventSection';
import EventPos from '../../../entities/EventPos';

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
  TICKET_MAIN_CONFIGURATION_EVENT_REQUEST = '@event/TICKET_MAIN_CONFIGURATION_EVENT_REQUEST',
  TICKET_MAIN_CONFIGURATION_EVENT_SUCCCES = '@event/TICKET_MAIN_CONFIGURATION_EVENT_SUCCCES',
  TICKET_MAIN_CONFIGURATION_EVENT_FAILURE = '@event/TICKET_MAIN_CONFIGURATION_EVENT_FAILURE',
  TICKET_PAYMENT_EVENT_REQUEST = '@event/TICKET_PAYMENT_EVENT_REQUEST',
  TICKET_PAYMENT_EVENT_SUCCCES = '@event/TICKET_PAYMENT_EVENT_SUCCCES',
  TICKET_PAYMENT_EVENT_FAILURE = '@event/TICKET_PAYMENT_EVENT_FAILURE',
  TICKET_GENERAL_SETTINGS_EVENT_REQUEST = '@event/TICKET_GENERAL_SETTINGS_EVENT_REQUEST',
  TICKET_GENERAL_SETTINGS_EVENT_SUCCCES = '@event/TICKET_GENERAL_SETTINGS_EVENT_SUCCCES',
  TICKET_GENERAL_SETTINGS_EVENT_FAILURE = '@event/TICKET_GENERAL_SETTINGS_EVENT_FAILURE',
  SECTION_PRODUCT_PRODUCT_EVENT_REQUEST = '@event/SECTION_PRODUCT_PRODUCT_EVENT_REQUEST',
  SECTION_PRODUCT_PRODUCT_EVENT_SUCCCES = '@event/SECTION_PRODUCT_PRODUCT_EVENT_SUCCCES',
  SECTION_PRODUCT_PRODUCT_EVENT_FAILURE = '@event/SECTION_PRODUCT_PRODUCT_EVENT_FAILURE',
  SECTION_PRODUCT_COMBO_EVENT_REQUEST = '@event/SECTION_PRODUCT_COMBO_EVENT_REQUEST',
  SECTION_PRODUCT_COMBO_EVENT_SUCCCES = '@event/SECTION_PRODUCT_COMBO_EVENT_SUCCCES',
  SECTION_PRODUCT_COMBO_EVENT_FAILURE = '@event/SECTION_PRODUCT_COMBO_EVENT_FAILURE',
  SECTION_PRODUCT_COMBO_SECTION_EVENT_REQUEST = '@event/SECTION_PRODUCT_COMBO_SECTION_EVENT_REQUEST',
  SECTION_PRODUCT_COMBO_SECTION_EVENT_SUCCCES = '@event/SECTION_PRODUCT_COMBO_SECTION_EVENT_SUCCCES',
  SECTION_PRODUCT_COMBO_SECTION_EVENT_FAILURE = '@event/SECTION_PRODUCT_COMBO_SECTION_EVENT_FAILURE',
  SECTION_PRODUCT_POS_EVENT_REQUEST = '@event/SECTION_PRODUCT_POS_EVENT_REQUEST',
  SECTION_PRODUCT_POS_EVENT_SUCCCES = '@event/SECTION_PRODUCT_POS_EVENT_SUCCCES',
  SECTION_PRODUCT_POS_EVENT_FAILURE = '@event/SECTION_PRODUCT_POS_EVENT_FAILURE',
}

/**
 * Data types
 */

export interface EventDataType {
  page: Page<EventFind, Event>;
  eventGeneralInformation: EventGeneralInformation;
  ticketMainConfigurations: EventTicketMainConfiguration[];
  ticketPayments: TicketPayment[];
  ticketGeneralSettings: EventTicketGeneralSettings[];
  products: EventProduct[];
  combos: EventProductCombo[];
  sectionproductsAndCombos: EventSection[];
  poss: EventPos[];
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
