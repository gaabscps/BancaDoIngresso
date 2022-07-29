/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { call, put, select } from 'redux-saga/effects';
import { AxiosResponse, AxiosError } from 'axios';
import { ApplicationState } from '../..';
import {
  listSuccess,
  listFailure,
  // generalInformationFailure,
  generalInformationSuccess,
  getAllSuccess,
  getAllFailure,
  getSuccess,
  getFailure,
  ticketMainConfigurationFailure,
  ticketMainConfigurationSuccess,
  ticketPaymentFailure,
  ticketPaymentSuccess,
  eventProductFailure,
  eventProductSuccess,
  eventProductComboFailure,
  eventProductComboSuccess,
  eventSectionProductComboFailure,
  eventSectionProductComboSuccess,
  eventSectionPosFailure,
  eventSectionPosSuccess,
  eventPdvMainFailure,
  eventPdvMainSuccess,
  eventPdvTicketFailure,
  eventPdvTicketSuccess,
  eventPdvProductFailure,
  eventPdvProductSuccess,
  eventSubPdvFailure,
  eventSubPdvSuccess,
} from './actions';
import { checkUserCall } from '../check-user/actions';
import { EventDataType } from './types';
import { parse } from '../../../entities/CustomError';
import Event from '../../../entities/Event';
import EventFind from '../../../entities/EventFind';
import EventGeneralInformation, {
  parseGeneralInformation,
} from '../../../entities/EventGeneralInformation';
import Page from '../../../entities/Page';
import api from '../../../services/api';
import EventTicketMainConfiguration, {
  parseTicketMainConfigurations,
} from '../../../entities/EventTicketMainConfiguration';
import TicketPayment, { parseTicketPayments } from '../../../entities/TicketPayment';
import EventTicketGeneralSettings, {
  parseTicketGeneralSettings,
} from '../../../entities/EventTicketGeneralSettings';
import EventProduct from '../../../entities/EventProduct';
import EventProductCombo from '../../../entities/EventProductCombo';
import EventSection, { parseEventSectionGet } from '../../../entities/EventSection';
import EventSectionGet from '../../../entities/EventSectionGet';
import EventPos from '../../../entities/EventPos';
import EventPdv from '../../../entities/EventPdv';

export function* listEvents(page: any) {
  try {
    const response: AxiosResponse<Page<EventFind, Event>> = yield call(
      api.post,
      '/event/page',
      page.payload,
    );
    const pageResponse = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      event: state.event,
    }));

    const {
      eventGeneralInformation,
      ticketMainConfigurations,
      ticketPayments,
      ticketGeneralSettings,
      products,
      combos,
      sectionproductsAndCombos,
      poss,
      pdvs,
      list,
    } = stateData.event.data;

    const dataType: EventDataType = {
      page: pageResponse,
      eventGeneralInformation,
      ticketMainConfigurations,
      ticketPayments,
      ticketGeneralSettings,
      products,
      combos,
      sectionproductsAndCombos,
      poss,
      pdvs,
      list,
    };
    yield put(listSuccess(dataType));
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      yield put(checkUserCall());
    }
    yield put(listFailure(parse(error)));
  }
}

export function* getEvent(data: any) {
  try {
    const response: AxiosResponse<Event> = yield call(api.get, `/event/${data.payload}`);
    const event = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      event: state.event,
    }));
    const eventGeneralInformation = parseGeneralInformation(event);
    const ticketMainConfigurations = parseTicketMainConfigurations(
      event.tickets,
    ) as EventTicketMainConfiguration[];
    const ticketPayments = parseTicketPayments(event.tickets) as TicketPayment[];
    const ticketGeneralSettings = parseTicketGeneralSettings(
      event.tickets,
    ) as EventTicketGeneralSettings[];
    const sectionproductsAndCombos = parseEventSectionGet(
      event.sectionproductsAndCombos,
    ) as EventSectionGet[];
    const { page, products, combos, poss, pdvs, list } = stateData.event.data;
    const dataType: EventDataType = {
      page,
      eventGeneralInformation,
      ticketMainConfigurations,
      ticketPayments,
      ticketGeneralSettings,
      products,
      combos,
      sectionproductsAndCombos,
      poss,
      pdvs,
      list,
    };
    yield put(getSuccess(dataType));
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      yield put(checkUserCall());
    }
    yield put(getFailure(parse(error)));
  }
}

export function* getAllEvents() {
  try {
    const response: AxiosResponse<Event[]> = yield call(api.get, `/event/find`);
    const list = response.data;
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      event: state.event,
    }));
    const {
      eventGeneralInformation,
      ticketMainConfigurations,
      ticketPayments,
      ticketGeneralSettings,
      products,
      combos,
      sectionproductsAndCombos,
      poss,
      pdvs,
      page,
    } = stateData.event.data;
    const dataType: EventDataType = {
      page,
      eventGeneralInformation,
      ticketMainConfigurations,
      ticketGeneralSettings,
      ticketPayments,
      products,
      combos,
      sectionproductsAndCombos,
      poss,
      pdvs,
      list,
    };
    yield put(getAllSuccess(dataType));
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      yield put(checkUserCall());
    }
    yield put(getAllFailure(parse(error)));
  }
}

export function* generalInformationEvent(data: any) {
  try {
    const response: AxiosResponse<EventGeneralInformation> = yield call(
      api.post,
      '/event/general-information',
      data.payload,
    );
    console.log('Response', response);
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      event: state.event,
    }));
    const {
      page,
      ticketMainConfigurations,
      ticketPayments,
      ticketGeneralSettings,
      products,
      combos,
      sectionproductsAndCombos,
      poss,
      pdvs,
      list,
    } = stateData.event.data;
    const dataType: EventDataType = {
      page,
      eventGeneralInformation: response.data,
      ticketMainConfigurations,
      ticketPayments,
      ticketGeneralSettings,
      products,
      combos,
      sectionproductsAndCombos,
      poss,
      pdvs,
      list,
    };
    yield put(generalInformationSuccess(dataType));
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      yield put(checkUserCall());
    }
    // yield put(generalInformationFailure(parse(error)));
  }
}

export function* ticketMainConfigurationEvent(data: any) {
  const { eventId, eventTicketMainConfiguration } = data.payload;
  try {
    const response: AxiosResponse<EventTicketMainConfiguration> = yield call(
      api.post,
      `/event/ticket/${eventId}/main-settings`,
      eventTicketMainConfiguration,
    );
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      event: state.event,
    }));
    const {
      page,
      eventGeneralInformation,
      ticketMainConfigurations,
      ticketPayments,
      ticketGeneralSettings,
      products,
      combos,
      sectionproductsAndCombos,
      poss,
      pdvs,
      list,
    } = stateData.event.data;
    const tickets: EventTicketMainConfiguration[] = [];
    if (ticketMainConfigurations && ticketMainConfigurations.length > 0) {
      ticketMainConfigurations.forEach(ticket => {
        tickets.push(ticket);
      });
    }
    tickets.push(response.data);
    const dataType: EventDataType = {
      page,
      eventGeneralInformation,
      ticketMainConfigurations: tickets,
      ticketPayments,
      ticketGeneralSettings,
      products,
      combos,
      sectionproductsAndCombos,
      poss,
      pdvs,
      list,
    };
    yield put(ticketMainConfigurationSuccess(dataType));
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      yield put(checkUserCall());
    }
    yield put(ticketMainConfigurationFailure(parse(error)));
  }
}

export function* ticketPaymentEvent(data: any) {
  const { eventId, ticketPayment } = data.payload;
  try {
    const response: AxiosResponse<TicketPayment> = yield call(
      api.post,
      `/event/ticket/${eventId}/payment`,
      ticketPayment,
    );
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      event: state.event,
    }));
    const {
      page,
      eventGeneralInformation,
      ticketMainConfigurations,
      ticketPayments,
      ticketGeneralSettings,
      products,
      combos,
      sectionproductsAndCombos,
      poss,
      pdvs,
      list,
    } = stateData.event.data;
    const tickets: TicketPayment[] = [];
    if (ticketPayments && ticketPayments.length > 0) {
      ticketPayments.forEach(ticket => {
        tickets.push(ticket);
      });
    }
    tickets.push(response.data);
    const dataType: EventDataType = {
      page,
      eventGeneralInformation,
      ticketMainConfigurations,
      ticketPayments: tickets,
      ticketGeneralSettings,
      products,
      combos,
      sectionproductsAndCombos,
      poss,
      pdvs,
      list,
    };
    yield put(ticketPaymentSuccess(dataType));
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      yield put(checkUserCall());
    }
    yield put(ticketPaymentFailure(parse(error)));
  }
}

export function* ticketGeneralSettingsEvent(data: any) {
  const { eventId, eventTicketGeneralSettings } = data.payload;
  try {
    const response: AxiosResponse<EventTicketGeneralSettings> = yield call(
      api.post,
      `/event/ticket/${eventId}/general-settings`,
      eventTicketGeneralSettings,
    );
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      event: state.event,
    }));
    const {
      page,
      eventGeneralInformation,
      ticketMainConfigurations,
      ticketPayments,
      ticketGeneralSettings,
      products,
      combos,
      sectionproductsAndCombos,
      poss,
      pdvs,
      list,
    } = stateData.event.data;
    const tickets: EventTicketGeneralSettings[] = [];
    if (ticketGeneralSettings && ticketGeneralSettings.length > 0) {
      ticketGeneralSettings.forEach(ticket => {
        tickets.push(ticket);
      });
    }
    tickets.push(response.data);
    const dataType: EventDataType = {
      page,
      eventGeneralInformation,
      ticketMainConfigurations,
      ticketPayments,
      ticketGeneralSettings: tickets,
      products,
      combos,
      sectionproductsAndCombos,
      poss,
      pdvs,
      list,
    };
    yield put(ticketPaymentSuccess(dataType));
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      yield put(checkUserCall());
    }
    yield put(ticketPaymentFailure(parse(error)));
  }
}

export function* productEvent(data: any) {
  const { eventId, eventProduct } = data.payload;
  try {
    const response: AxiosResponse<EventProduct> = yield call(
      api.post,
      `/event/section-product/${eventId}/product`,
      eventProduct,
    );
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      event: state.event,
    }));
    const {
      page,
      eventGeneralInformation,
      ticketMainConfigurations,
      ticketPayments,
      ticketGeneralSettings,
      products,
      combos,
      sectionproductsAndCombos,
      poss,
      pdvs,
      list,
    } = stateData.event.data;

    const eventProducts: EventProduct[] = [];
    if (products && products.length > 0) {
      products.forEach(prod => {
        eventProducts.push(prod);
      });
    }
    eventProducts.push(response.data);
    const dataType: EventDataType = {
      page,
      eventGeneralInformation,
      ticketMainConfigurations,
      ticketPayments,
      ticketGeneralSettings,
      products: eventProducts,
      combos,
      sectionproductsAndCombos,
      poss,
      pdvs,
      list,
    };
    yield put(eventProductSuccess(dataType));
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      yield put(checkUserCall());
    }
    yield put(eventProductFailure(parse(error)));
  }
}

export function* productComboEvent(data: any) {
  const { eventId, eventProductCombo } = data.payload;
  try {
    const response: AxiosResponse<EventProductCombo> = yield call(
      api.post,
      `/event/section-product/${eventId}/combo`,
      eventProductCombo,
    );
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      event: state.event,
    }));
    const {
      page,
      eventGeneralInformation,
      ticketMainConfigurations,
      ticketPayments,
      ticketGeneralSettings,
      products,
      combos,
      sectionproductsAndCombos,
      poss,
      pdvs,
      list,
    } = stateData.event.data;

    const eventProductCombos: EventProductCombo[] = [];
    if (combos && combos.length > 0) {
      combos.forEach(combo => {
        eventProductCombos.push(combo);
      });
    }
    eventProductCombos.push(response.data);
    const dataType: EventDataType = {
      page,
      eventGeneralInformation,
      ticketMainConfigurations,
      ticketPayments,
      ticketGeneralSettings,
      products,
      combos: eventProductCombos,
      sectionproductsAndCombos,
      poss,
      pdvs,
      list,
    };
    yield put(eventProductComboSuccess(dataType));
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      yield put(checkUserCall());
    }
    yield put(eventProductComboFailure(parse(error)));
  }
}

export function* sectionProductComboEvent(data: any) {
  const { eventId, eventSection } = data.payload;
  try {
    const response: AxiosResponse<EventSection> = yield call(
      api.post,
      `/event/section-product/${eventId}/section`,
      eventSection,
    );
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      event: state.event,
    }));
    const {
      page,
      eventGeneralInformation,
      ticketMainConfigurations,
      ticketPayments,
      ticketGeneralSettings,
      products,
      combos,
      sectionproductsAndCombos,
      poss,
      pdvs,
      list,
    } = stateData.event.data;

    const sections: EventSection[] = [];
    if (sectionproductsAndCombos && sectionproductsAndCombos.length > 0) {
      sectionproductsAndCombos.forEach(s => {
        if (s.section.id === response.data.section.id) {
          sections.push(response.data);
        } else {
          sections.push(s);
        }
      });
    }
    const dataType: EventDataType = {
      page,
      eventGeneralInformation,
      ticketMainConfigurations,
      ticketPayments,
      ticketGeneralSettings,
      products,
      combos,
      sectionproductsAndCombos: sections,
      poss,
      pdvs,
      list,
    };
    yield put(eventSectionProductComboSuccess(dataType));
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      yield put(checkUserCall());
    }
    yield put(eventSectionProductComboFailure(parse(error)));
  }
}

export function* posEvent(data: any) {
  const { eventId, eventPos } = data.payload;
  try {
    const response: AxiosResponse<EventPos> = yield call(
      api.post,
      `/event/section-product/${eventId}/pos`,
      eventPos,
    );
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      event: state.event,
    }));
    const {
      page,
      eventGeneralInformation,
      ticketMainConfigurations,
      ticketPayments,
      ticketGeneralSettings,
      products,
      combos,
      sectionproductsAndCombos,
      poss,
      pdvs,
      list,
    } = stateData.event.data;

    const eventPoss: EventPos[] = [];
    if (poss && poss.length > 0) {
      poss.forEach(pos => {
        eventPoss.push(pos);
      });
    }
    eventPoss.push(response.data);
    const dataType: EventDataType = {
      page,
      eventGeneralInformation,
      ticketMainConfigurations,
      ticketPayments,
      ticketGeneralSettings,
      products,
      combos,
      sectionproductsAndCombos,
      poss: eventPoss,
      pdvs,
      list,
    };
    yield put(eventSectionPosSuccess(dataType));
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      yield put(checkUserCall());
    }
    yield put(eventSectionPosFailure(parse(error)));
  }
}

export function* pdvMainEvent(data: any) {
  const { eventId, eventPdvMain } = data.payload;
  try {
    const response: AxiosResponse<EventPdv> = yield call(
      api.post,
      `/event/pdv/${eventId}/main`,
      eventPdvMain,
    );
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      event: state.event,
    }));
    const {
      page,
      eventGeneralInformation,
      ticketMainConfigurations,
      ticketPayments,
      ticketGeneralSettings,
      products,
      combos,
      sectionproductsAndCombos,
      poss,
      pdvs,
      list,
    } = stateData.event.data;

    const eventPdvs: EventPdv[] = [];
    let found = false;
    if (pdvs && pdvs.length > 0) {
      pdvs.forEach(pdv => {
        if (pdv.pdv.id === response.data.pdv.id) {
          eventPdvs.push(response.data);
          found = true;
        } else {
          eventPdvs.push(pdv);
        }
      });
    }
    if (!found) {
      eventPdvs.push(response.data);
    }
    const dataType: EventDataType = {
      page,
      eventGeneralInformation,
      ticketMainConfigurations,
      ticketPayments,
      ticketGeneralSettings,
      products,
      combos,
      sectionproductsAndCombos,
      poss,
      pdvs: eventPdvs,
      list,
    };
    yield put(eventPdvMainSuccess(dataType));
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      yield put(checkUserCall());
    }
    yield put(eventPdvMainFailure(parse(error)));
  }
}

export function* pdvTicketEvent(data: any) {
  const { eventId, eventPdvTicket } = data.payload;
  try {
    const response: AxiosResponse<EventPdv> = yield call(
      api.post,
      `/event/pdv/${eventId}/ticket`,
      eventPdvTicket,
    );
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      event: state.event,
    }));
    const {
      page,
      eventGeneralInformation,
      ticketMainConfigurations,
      ticketPayments,
      ticketGeneralSettings,
      products,
      combos,
      sectionproductsAndCombos,
      poss,
      pdvs,
      list,
    } = stateData.event.data;

    const eventPdvs: EventPdv[] = [];
    let found = false;
    if (pdvs && pdvs.length > 0) {
      pdvs.forEach(pdv => {
        if (pdv.pdv.id === response.data.pdv.id) {
          eventPdvs.push(response.data);
          found = true;
        } else {
          eventPdvs.push(pdv);
        }
      });
    }
    if (!found) {
      eventPdvs.push(response.data);
    }
    const dataType: EventDataType = {
      page,
      eventGeneralInformation,
      ticketMainConfigurations,
      ticketPayments,
      ticketGeneralSettings,
      products,
      combos,
      sectionproductsAndCombos,
      poss,
      pdvs: eventPdvs,
      list,
    };
    yield put(eventPdvTicketSuccess(dataType));
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      yield put(checkUserCall());
    }
    yield put(eventPdvTicketFailure(parse(error)));
  }
}

export function* pdvProductEvent(data: any) {
  const { eventId, eventPdvProduct } = data.payload;
  try {
    const response: AxiosResponse<EventPdv> = yield call(
      api.post,
      `/event/pdv/${eventId}/product`,
      eventPdvProduct,
    );
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      event: state.event,
    }));
    const {
      page,
      eventGeneralInformation,
      ticketMainConfigurations,
      ticketPayments,
      ticketGeneralSettings,
      products,
      combos,
      sectionproductsAndCombos,
      poss,
      pdvs,
      list,
    } = stateData.event.data;

    const eventPdvs: EventPdv[] = [];
    let found = false;
    if (pdvs && pdvs.length > 0) {
      pdvs.forEach(pdv => {
        if (pdv.pdv.id === response.data.pdv.id) {
          eventPdvs.push(response.data);
          found = true;
        } else {
          eventPdvs.push(pdv);
        }
      });
    }
    if (!found) {
      eventPdvs.push(response.data);
    }
    const dataType: EventDataType = {
      page,
      eventGeneralInformation,
      ticketMainConfigurations,
      ticketPayments,
      ticketGeneralSettings,
      products,
      combos,
      sectionproductsAndCombos,
      poss,
      pdvs: eventPdvs,
      list,
    };
    yield put(eventPdvProductSuccess(dataType));
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      yield put(checkUserCall());
    }
    yield put(eventPdvProductFailure(parse(error)));
  }
}

export function* pdvSubPdvEvent(data: any) {
  const { eventId, eventSubPdv } = data.payload;
  try {
    const response: AxiosResponse<EventPdv> = yield call(
      api.post,
      `/event/pdv/${eventId}/sub-pdv`,
      eventSubPdv,
    );
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      event: state.event,
    }));
    const {
      page,
      eventGeneralInformation,
      ticketMainConfigurations,
      ticketPayments,
      ticketGeneralSettings,
      products,
      combos,
      sectionproductsAndCombos,
      poss,
      pdvs,
      list,
    } = stateData.event.data;

    const eventPdvs: EventPdv[] = [];
    let found = false;
    if (pdvs && pdvs.length > 0) {
      pdvs.forEach(pdv => {
        if (pdv.pdv.id === response.data.pdv.id) {
          eventPdvs.push(response.data);
          found = true;
        } else {
          eventPdvs.push(pdv);
        }
      });
    }
    if (!found) {
      eventPdvs.push(response.data);
    }
    const dataType: EventDataType = {
      page,
      eventGeneralInformation,
      ticketMainConfigurations,
      ticketPayments,
      ticketGeneralSettings,
      products,
      combos,
      sectionproductsAndCombos,
      poss,
      pdvs: eventPdvs,
      list,
    };
    yield put(eventSubPdvSuccess(dataType));
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      yield put(checkUserCall());
    }
    yield put(eventSubPdvFailure(parse(error)));
  }
}
