import { Reducer } from 'redux';
import { CheckUserState, CheckUserTypes } from './types';

const INITIAL_STATE: CheckUserState = {
  call: false,
  logged: true,
  loading: false,
  error: undefined,
};

const reducer: Reducer<CheckUserState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CheckUserTypes.CHECK_USER_LOGGED_CALL:
      return { call: true, logged: false, loading: false, error: undefined };
    case CheckUserTypes.CHECK_USER_LOGGED_REQUEST:
      return { call: true, logged: false, loading: true, error: undefined };
    case CheckUserTypes.CHECK_USER_LOGGED_SUCCCES:
      return {
        call: false,
        logged: true,
        loading: false,
        error: undefined,
      };
    case CheckUserTypes.CHECK_USER_LOGGED_FAILURE:
      return {
        call: false,
        logged: false,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
