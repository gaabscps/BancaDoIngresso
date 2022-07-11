import { all, takeLatest } from 'redux-saga/effects';
import { authChangePassword, authLogin, authRecoverPassword, authRefreshToken } from './auth/sagas';
import { AuthTypes } from './auth/types';
import {
  createChargeSetup,
  getAllChargeSetups,
  getChargeSetup,
  listChargeSetup,
  updateChargeSetup,
} from './charge-setup/sagas';
import { ChargeSetupTypes } from './charge-setup/types';
import {
  activateEventCategory,
  createEventCategory,
  deleteEventCategory,
  getAllEventCategories,
  getEventCategory,
  inactivateEventCategory,
  listEventCategory,
  updateEventCategory,
} from './event-category/sagas';
import { EventCategoryTypes } from './event-category/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function* rootSaga(): any {
  return yield all([
    takeLatest(AuthTypes.CHANGE_PASSWORD_AUTH_REQUEST, authChangePassword),
    takeLatest(AuthTypes.LOGIN_AUTH_REQUEST, authLogin),
    takeLatest(AuthTypes.RECOVER_PASSWORD_AUTH_REQUEST, authRecoverPassword),
    takeLatest(AuthTypes.REFRESH_TOKEN_AUTH_REQUEST, authRefreshToken),

    takeLatest(ChargeSetupTypes.CREATE_CHARGE_SETUP_REQUEST, createChargeSetup),
    takeLatest(ChargeSetupTypes.GET_ALL_CHARGE_SETUP_REQUEST, getAllChargeSetups),
    takeLatest(ChargeSetupTypes.GET_CHARGE_SETUP_REQUEST, getChargeSetup),
    takeLatest(ChargeSetupTypes.LIST_CHARGE_SETUP_REQUEST, listChargeSetup),
    takeLatest(ChargeSetupTypes.UPDATE_CHARGE_SETUP_REQUEST, updateChargeSetup),

    takeLatest(EventCategoryTypes.ACTIVATE_EVENT_CATEGORY_REQUEST, activateEventCategory),
    takeLatest(EventCategoryTypes.CREATE_EVENT_CATEGORY_REQUEST, createEventCategory),
    takeLatest(EventCategoryTypes.DELETE_EVENT_CATEGORY_REQUEST, deleteEventCategory),
    takeLatest(EventCategoryTypes.GET_ALL_EVENT_CATEGORY_REQUEST, getAllEventCategories),
    takeLatest(EventCategoryTypes.GET_EVENT_CATEGORY_REQUEST, getEventCategory),
    takeLatest(EventCategoryTypes.INACTIVATE_EVENT_CATEGORY_REQUEST, inactivateEventCategory),
    takeLatest(EventCategoryTypes.LIST_EVENT_CATEGORY_REQUEST, listEventCategory),
    takeLatest(EventCategoryTypes.UPDATE_EVENT_CATEGORY_REQUEST, updateEventCategory),
  ]);
}
