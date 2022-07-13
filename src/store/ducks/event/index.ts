import { Reducer } from 'redux';
import { EventDataType, EventState, EventTypes } from './types';

const INITIAL_STATE: EventState = {
  data: {} as EventDataType,
  loading: false,
  error: undefined,
};

const reducer: Reducer<EventState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EventTypes.LIST_EVENT_REQUEST:
      return { ...state, loading: true };
    case EventTypes.LIST_EVENT_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case EventTypes.LIST_EVENT_FAILURE:
      return {
        ...state,
        data: {} as EventDataType,
        loading: false,
        error: action.payload.error,
      };
    case EventTypes.GET_EVENT_REQUEST:
      return { ...state, loading: true };
    case EventTypes.GET_EVENT_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case EventTypes.GET_EVENT_FAILURE:
      return {
        ...state,
        data: {} as EventDataType,
        loading: false,
        error: action.payload.error,
      };
    case EventTypes.GET_ALL_EVENT_REQUEST:
      return { ...state, loading: true };
    case EventTypes.GET_ALL_EVENT_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case EventTypes.GET_ALL_EVENT_FAILURE:
      return {
        ...state,
        data: {} as EventDataType,
        loading: false,
        error: action.payload.error,
      };

    case EventTypes.GENERAL_INFORMATION_EVENT_REQUEST:
      return { ...state, loading: true };
    case EventTypes.GENERAL_INFORMATION_EVENT_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case EventTypes.GENERAL_INFORMATION_EVENT_FAILURE:
      return {
        ...state,
        data: {} as EventDataType,
        loading: false,
        error: action.payload.error,
      };
    case EventTypes.TICKET_MAIN_CONFIGURATION_EVENT_REQUEST:
      return { ...state, loading: true };
    case EventTypes.TICKET_MAIN_CONFIGURATION_EVENT_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case EventTypes.TICKET_MAIN_CONFIGURATION_EVENT_FAILURE:
      return {
        ...state,
        data: {} as EventDataType,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
