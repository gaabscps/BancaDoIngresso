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
  activateClient,
  deleteClient,
  getClient,
  inactivateClient,
  listClients,
  updateClient,
} from './client/sagas';
import { ClientTypes } from './client/types';
import {
  activateCombo,
  createCombo,
  deleteCombo,
  getAllCombos,
  getCombo,
  inactivateCombo,
  listCombos,
  updateCombo,
} from './combo/sagas';
import { ComboTypes } from './combo/types';
import {
  activateCompany,
  createCompany,
  deleteCompany,
  getAllCompanies,
  getCompany,
  inactivateCompany,
  listCompanies,
  updateCompany,
} from './company/sagas';
import { CompanyTypes } from './company/types';
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

    takeLatest(ClientTypes.ACTIVATE_CLIENT_REQUEST, activateClient),
    takeLatest(ClientTypes.DELETE_CLIENT_REQUEST, deleteClient),
    takeLatest(ClientTypes.GET_CLIENT_REQUEST, getClient),
    takeLatest(ClientTypes.INACTIVATE_CLIENT_REQUEST, inactivateClient),
    takeLatest(ClientTypes.LIST_CLIENT_REQUEST, listClients),
    takeLatest(ClientTypes.UPDATE_CLIENT_REQUEST, updateClient),

    takeLatest(ComboTypes.ACTIVATE_COMBO_REQUEST, activateCombo),
    takeLatest(ComboTypes.CREATE_COMBO_REQUEST, createCombo),
    takeLatest(ComboTypes.DELETE_COMBO_REQUEST, deleteCombo),
    takeLatest(ComboTypes.GET_ALL_COMBO_REQUEST, getAllCombos),
    takeLatest(ComboTypes.GET_COMBO_REQUEST, getCombo),
    takeLatest(ComboTypes.INACTIVATE_COMBO_REQUEST, inactivateCombo),
    takeLatest(ComboTypes.LIST_COMBO_REQUEST, listCombos),
    takeLatest(ComboTypes.UPDATE_COMBO_REQUEST, updateCombo),

    takeLatest(CompanyTypes.ACTIVATE_COMPANY_REQUEST, activateCompany),
    takeLatest(CompanyTypes.CREATE_COMPANY_REQUEST, createCompany),
    takeLatest(CompanyTypes.DELETE_COMPANY_REQUEST, deleteCompany),
    takeLatest(CompanyTypes.GET_ALL_COMPANY_REQUEST, getAllCompanies),
    takeLatest(CompanyTypes.GET_COMPANY_REQUEST, getCompany),
    takeLatest(CompanyTypes.INACTIVATE_COMPANY_REQUEST, inactivateCompany),
    takeLatest(CompanyTypes.LIST_COMPANY_REQUEST, listCompanies),
    takeLatest(CompanyTypes.UPDATE_COMPANY_REQUEST, updateCompany),

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
