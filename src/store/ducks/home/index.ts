import { Reducer } from 'redux';
import Home from '../../../model/Home';
import { HomeState, HomeTypes } from './types';

const INITIAL_STATE: HomeState = {
  data: {} as Home,
  loading: false,
  error: undefined,
};

const reducer: Reducer<HomeState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HomeTypes.GET_HOME_REQUEST:
      return { ...state, loading: true };
    case HomeTypes.GET_HOME_SUCCCES:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: undefined,
      };
    case HomeTypes.GET_HOME_FAILURE:
      return {
        ...state,
        data: {} as Home,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
