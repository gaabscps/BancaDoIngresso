import { Reducer } from 'redux';
import { EventCategoryDataType, EventCategoryState, EventCategoryTypes } from './types';

const INITIAL_STATE: EventCategoryState = {
  data: {} as EventCategoryDataType,
  loading: false,
  error: undefined,
};

const reducer: Reducer<EventCategoryState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EventCategoryTypes.LIST_EVENT_CATEGORY_REQUEST:
      return { ...state, loading: true, saved: false, deleted: false };
    case EventCategoryTypes.LIST_EVENT_CATEGORY_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case EventCategoryTypes.LIST_EVENT_CATEGORY_FAILURE:
      return {
        ...state,
        data: {} as EventCategoryDataType,
        loading: false,
        error: action.payload.error,
      };
    case EventCategoryTypes.GET_ALL_EVENT_CATEGORY_REQUEST:
      return { ...state, loading: true };
    case EventCategoryTypes.GET_ALL_EVENT_CATEGORY_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case EventCategoryTypes.GET_ALL_EVENT_CATEGORY_FAILURE:
      return {
        ...state,
        data: {} as EventCategoryDataType,
        loading: false,
        error: action.payload.error,
      };
    case EventCategoryTypes.GET_EVENT_CATEGORY_REQUEST:
      return { ...state, loading: true };
    case EventCategoryTypes.GET_EVENT_CATEGORY_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case EventCategoryTypes.GET_EVENT_CATEGORY_FAILURE:
      return {
        ...state,
        data: {} as EventCategoryDataType,
        loading: false,
        error: action.payload.error,
      };
    case EventCategoryTypes.CREATE_EVENT_CATEGORY_REQUEST:
      return { ...state, loading: true };
    case EventCategoryTypes.CREATE_EVENT_CATEGORY_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case EventCategoryTypes.CREATE_EVENT_CATEGORY_FAILURE:
      return {
        ...state,
        data: {} as EventCategoryDataType,
        loading: false,
        error: action.payload.error,
      };
    case EventCategoryTypes.UPDATE_EVENT_CATEGORY_REQUEST:
      return { ...state, loading: true };
    case EventCategoryTypes.UPDATE_EVENT_CATEGORY_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case EventCategoryTypes.UPDATE_EVENT_CATEGORY_FAILURE:
      return {
        ...state,
        data: {} as EventCategoryDataType,
        loading: false,
        error: action.payload.error,
      };
    case EventCategoryTypes.ACTIVATE_EVENT_CATEGORY_REQUEST:
      return { ...state, loading: true };
    case EventCategoryTypes.ACTIVATE_EVENT_CATEGORY_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case EventCategoryTypes.ACTIVATE_EVENT_CATEGORY_FAILURE:
      return {
        ...state,
        data: {} as EventCategoryDataType,
        loading: false,
        error: action.payload.error,
      };
    case EventCategoryTypes.INACTIVATE_EVENT_CATEGORY_REQUEST:
      return { ...state, loading: true };
    case EventCategoryTypes.INACTIVATE_EVENT_CATEGORY_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case EventCategoryTypes.INACTIVATE_EVENT_CATEGORY_FAILURE:
      return {
        ...state,
        data: {} as EventCategoryDataType,
        loading: false,
        error: action.payload.error,
      };
    case EventCategoryTypes.DELETE_EVENT_CATEGORY_REQUEST:
      return { ...state, loading: true };
    case EventCategoryTypes.DELETE_EVENT_CATEGORY_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case EventCategoryTypes.DELETE_EVENT_CATEGORY_FAILURE:
      return {
        ...state,
        data: {} as EventCategoryDataType,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
