import { Reducer } from 'redux';
import { SectionDataType, SectionState, SectionTypes } from './types';

const INITIAL_STATE: SectionState = {
  data: {} as SectionDataType,
  loading: false,
  error: undefined,
};

const reducer: Reducer<SectionState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SectionTypes.ACTIVATE_SECTION_REQUEST:
      return { ...state, loading: true };
    case SectionTypes.ACTIVATE_SECTION_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case SectionTypes.ACTIVATE_SECTION_FAILURE:
      return {
        ...state,
        data: {} as SectionDataType,
        loading: false,
        error: action.payload.error,
      };
    case SectionTypes.CREATE_SECTION_REQUEST:
      return { ...state, loading: true };
    case SectionTypes.CREATE_SECTION_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case SectionTypes.CREATE_SECTION_FAILURE:
      return {
        ...state,
        data: {} as SectionDataType,
        loading: false,
        error: action.payload.error,
      };
    case SectionTypes.DELETE_SECTION_REQUEST:
      return { ...state, loading: true };
    case SectionTypes.DELETE_SECTION_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case SectionTypes.DELETE_SECTION_FAILURE:
      return {
        ...state,
        data: {} as SectionDataType,
        loading: false,
        error: action.payload.error,
      };
    case SectionTypes.GET_ALL_SECTION_REQUEST:
      return { ...state, loading: true };
    case SectionTypes.GET_ALL_SECTION_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case SectionTypes.GET_ALL_SECTION_FAILURE:
      return {
        ...state,
        data: {} as SectionDataType,
        loading: false,
        error: action.payload.error,
      };
    case SectionTypes.GET_SECTION_REQUEST:
      return { ...state, loading: true };
    case SectionTypes.GET_SECTION_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case SectionTypes.GET_SECTION_FAILURE:
      return {
        ...state,
        data: {} as SectionDataType,
        loading: false,
        error: action.payload.error,
      };
    case SectionTypes.INACTIVATE_SECTION_REQUEST:
      return { ...state, loading: true };
    case SectionTypes.INACTIVATE_SECTION_SUCCCES:
      return {
        ...state,
        loading: false,
        error: undefined,
      };
    case SectionTypes.INACTIVATE_SECTION_FAILURE:
      return {
        ...state,
        data: {} as SectionDataType,
        loading: false,
        error: action.payload.error,
      };
    case SectionTypes.LIST_SECTION_REQUEST:
      return { ...state, loading: true, saved: false, deleted: false };
    case SectionTypes.LIST_SECTION_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case SectionTypes.LIST_SECTION_FAILURE:
      return {
        ...state,
        data: {} as SectionDataType,
        loading: false,
        error: action.payload.error,
      };

    case SectionTypes.UPDATE_SECTION_REQUEST:
      return { ...state, loading: true };
    case SectionTypes.UPDATE_SECTION_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: undefined,
      };
    case SectionTypes.UPDATE_SECTION_FAILURE:
      return {
        ...state,
        data: {} as SectionDataType,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
