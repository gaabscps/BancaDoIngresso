/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { call, put, select } from 'redux-saga/effects';
import { AxiosResponse, AxiosError } from 'axios';
import { ApplicationState } from '../..';
import {
  listSuccess,
  listFailure,
  generalInformationFailure,
  generalInformationSuccess,
  getAllSuccess,
  getAllFailure,
  getSuccess,
  getFailure,
  ticketMainConfigurationFailure,
  ticketMainConfigurationSuccess,
  ticketPaymentFailure,
  ticketPaymentSuccess,
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

    const { eventGeneralInformation, eventTicketMainConfigurations, ticketPayments, list } =
      stateData.event.data;

    const dataType: EventDataType = {
      page: pageResponse,
      eventGeneralInformation,
      eventTicketMainConfigurations,
      ticketPayments,
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
    const eventTicketMainConfigurations = parseTicketMainConfigurations(
      event.tickets,
    ) as EventTicketMainConfiguration[];
    const ticketPayments = parseTicketPayments(event.tickets) as TicketPayment[];
    const { page, list } = stateData.event.data;
    const dataType: EventDataType = {
      page,
      eventGeneralInformation,
      eventTicketMainConfigurations,
      ticketPayments,
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
    const { eventGeneralInformation, eventTicketMainConfigurations, ticketPayments, page } =
      stateData.event.data;
    const dataType: EventDataType = {
      page,
      eventGeneralInformation,
      eventTicketMainConfigurations,
      ticketPayments,
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
    const stateData: ApplicationState = yield select((state: ApplicationState) => ({
      event: state.event,
    }));
    const { page, eventTicketMainConfigurations, ticketPayments, list } = stateData.event.data;
    const dataType: EventDataType = {
      page,
      eventGeneralInformation: response.data,
      eventTicketMainConfigurations,
      ticketPayments,
      list,
    };
    yield put(generalInformationSuccess(dataType));
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status === 401) {
      yield put(checkUserCall());
    }
    yield put(generalInformationFailure(parse(error)));
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
    const { page, eventGeneralInformation, eventTicketMainConfigurations, ticketPayments, list } =
      stateData.event.data;
    const tickets: EventTicketMainConfiguration[] = [];
    if (eventTicketMainConfigurations && eventTicketMainConfigurations.length > 0) {
      eventTicketMainConfigurations.forEach(ticket => {
        tickets.push(ticket);
      });
    }
    tickets.push(response.data);
    const dataType: EventDataType = {
      page,
      eventGeneralInformation,
      eventTicketMainConfigurations: tickets,
      ticketPayments,
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
    const { page, eventGeneralInformation, eventTicketMainConfigurations, ticketPayments, list } =
      stateData.event.data;
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
      eventTicketMainConfigurations,
      ticketPayments: tickets,
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
