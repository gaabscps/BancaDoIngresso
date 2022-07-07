import { all, takeLatest } from 'redux-saga/effects';
import { authLogin, authRecoverPassword, authChangePassword, authRefreshToken } from './auth/sagas';
import { AuthTypes } from './auth/types';
import {
  getEventCategory,
  listEventCategory,
  createEventCategory,
  updateEventCategory,
  activateEventCategory,
  inactivateEventCategory,
  deleteEventCategory,
  getAllEventCategories,
} from './event-category/sagas';
import { EventCategoryTypes } from './event-category/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function* rootSaga(): any {
  return yield all([
    takeLatest(AuthTypes.LOGIN_AUTH_REQUEST, authLogin),
    takeLatest(AuthTypes.RECOVER_PASSWORD_AUTH_REQUEST, authRecoverPassword),
    takeLatest(AuthTypes.CHANGE_PASSWORD_AUTH_REQUEST, authChangePassword),
    takeLatest(AuthTypes.REFRESH_TOKEN_AUTH_REQUEST, authRefreshToken),
    takeLatest(EventCategoryTypes.LIST_EVENT_CATEGORY_REQUEST, listEventCategory),
    takeLatest(EventCategoryTypes.GET_ALL_EVENT_CATEGORY_REQUEST, getAllEventCategories),
    takeLatest(EventCategoryTypes.GET_EVENT_CATEGORY_REQUEST, getEventCategory),
    takeLatest(EventCategoryTypes.CREATE_EVENT_CATEGORY_REQUEST, createEventCategory),
    takeLatest(EventCategoryTypes.UPDATE_EVENT_CATEGORY_REQUEST, updateEventCategory),
    takeLatest(EventCategoryTypes.ACTIVATE_EVENT_CATEGORY_REQUEST, activateEventCategory),
    takeLatest(EventCategoryTypes.INACTIVATE_EVENT_CATEGORY_REQUEST, inactivateEventCategory),
    takeLatest(EventCategoryTypes.DELETE_EVENT_CATEGORY_REQUEST, deleteEventCategory),
  ]);
}
