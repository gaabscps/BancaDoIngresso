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
import { checkUser } from './check-user/sagas';
import { CheckUserTypes } from './check-user/types';
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
  activateContractor,
  addContractorUsers,
  createContractor,
  deleteContractor,
  getAllContractors,
  getContractor,
  inactivateContractor,
  listContractors,
  updateContractor,
} from './contractor/sagas';
import { ContractorTypes } from './contractor/types';
import {
  generalInformationEvent,
  getAllEvents,
  getEvent,
  listEvents,
  ticketMainConfigurationEvent,
  ticketPaymentEvent,
} from './event/sagas';
import { EventTypes } from './event/types';
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
import {
  activateModule,
  createModule,
  deleteModule,
  getAllModules,
  getModule,
  inactivateModule,
  listModules,
  updateModule,
} from './module/sagas';
import { ModuleTypes } from './module/types';
import {
  activatePaymentGateway,
  createPaymentGateway,
  deletePaymentGateway,
  getAllPaymentGateways,
  getPaymentGateway,
  inactivatePaymentGateway,
  listPaymentGateways,
  updatePaymentGateway,
} from './payment-gateway/sagas';
import { PaymentGatewayTypes } from './payment-gateway/types';
import {
  activatePermission,
  createPermission,
  deletePermission,
  getAllPermissions,
  getPermission,
  inactivatePermission,
  listPermissions,
  updatePermission,
} from './permission/sagas';
import { PermissionTypes } from './permission/types';
import {
  activatePrinter,
  createPrinter,
  deletePrinter,
  getAllPrinters,
  getPrinter,
  inactivatePrinter,
  listPrinters,
  updatePrinter,
} from './printer/sagas';
import { PrinterTypes } from './printer/types';
import {
  activateProfile,
  addProfilePermissions,
  createProfile,
  deleteProfile,
  getAllProfiles,
  getProfile,
  inactivateProfile,
  listProfiles,
  updateProfile,
} from './profile/sagas';
import { ProfileTypes } from './profile/types';
import {
  activateSection,
  createSection,
  deleteSection,
  getAllSections,
  getSection,
  inactivateSection,
  listSections,
  updateSection,
} from './section/sagas';
import { SectionTypes } from './section/types';
import {
  activateUser,
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  inactivateUser,
  listUsers,
  updateUser,
} from './user/sagas';
import { UserTypes } from './user/types';

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

    takeLatest(CheckUserTypes.CHECK_USER_LOGGED_REQUEST, checkUser),

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

    takeLatest(ContractorTypes.ACTIVATE_CONTRACTOR_REQUEST, activateContractor),
    takeLatest(ContractorTypes.ADD_USER_CONTRACTOR_REQUEST, addContractorUsers),
    takeLatest(ContractorTypes.CREATE_CONTRACTOR_REQUEST, createContractor),
    takeLatest(ContractorTypes.DELETE_CONTRACTOR_REQUEST, deleteContractor),
    takeLatest(ContractorTypes.GET_ALL_CONTRACTOR_REQUEST, getAllContractors),
    takeLatest(ContractorTypes.GET_CONTRACTOR_REQUEST, getContractor),
    takeLatest(ContractorTypes.INACTIVATE_CONTRACTOR_REQUEST, inactivateContractor),
    takeLatest(ContractorTypes.LIST_CONTRACTOR_REQUEST, listContractors),
    takeLatest(ContractorTypes.UPDATE_CONTRACTOR_REQUEST, updateContractor),

    takeLatest(EventTypes.LIST_EVENT_REQUEST, listEvents),
    takeLatest(EventTypes.GET_EVENT_REQUEST, getEvent),
    takeLatest(EventTypes.GET_ALL_EVENT_REQUEST, getAllEvents),
    takeLatest(EventTypes.GENERAL_INFORMATION_EVENT_REQUEST, generalInformationEvent),
    takeLatest(EventTypes.TICKET_MAIN_CONFIGURATION_EVENT_REQUEST, ticketMainConfigurationEvent),
    takeLatest(EventTypes.TICKET_PAYMENT_EVENT_REQUEST, ticketPaymentEvent),

    takeLatest(EventCategoryTypes.ACTIVATE_EVENT_CATEGORY_REQUEST, activateEventCategory),
    takeLatest(EventCategoryTypes.CREATE_EVENT_CATEGORY_REQUEST, createEventCategory),
    takeLatest(EventCategoryTypes.DELETE_EVENT_CATEGORY_REQUEST, deleteEventCategory),
    takeLatest(EventCategoryTypes.GET_ALL_EVENT_CATEGORY_REQUEST, getAllEventCategories),
    takeLatest(EventCategoryTypes.GET_EVENT_CATEGORY_REQUEST, getEventCategory),
    takeLatest(EventCategoryTypes.INACTIVATE_EVENT_CATEGORY_REQUEST, inactivateEventCategory),
    takeLatest(EventCategoryTypes.LIST_EVENT_CATEGORY_REQUEST, listEventCategory),
    takeLatest(EventCategoryTypes.UPDATE_EVENT_CATEGORY_REQUEST, updateEventCategory),

    takeLatest(ModuleTypes.ACTIVATE_MODULE_REQUEST, activateModule),
    takeLatest(ModuleTypes.CREATE_MODULE_REQUEST, createModule),
    takeLatest(ModuleTypes.DELETE_MODULE_REQUEST, deleteModule),
    takeLatest(ModuleTypes.GET_ALL_MODULE_REQUEST, getAllModules),
    takeLatest(ModuleTypes.GET_MODULE_REQUEST, getModule),
    takeLatest(ModuleTypes.INACTIVATE_MODULE_REQUEST, inactivateModule),
    takeLatest(ModuleTypes.LIST_MODULE_REQUEST, listModules),
    takeLatest(ModuleTypes.UPDATE_MODULE_REQUEST, updateModule),

    takeLatest(PaymentGatewayTypes.ACTIVATE_PAYMENT_GATEWAY_REQUEST, activatePaymentGateway),
    takeLatest(PaymentGatewayTypes.CREATE_PAYMENT_GATEWAY_REQUEST, createPaymentGateway),
    takeLatest(PaymentGatewayTypes.DELETE_PAYMENT_GATEWAY_REQUEST, deletePaymentGateway),
    takeLatest(PaymentGatewayTypes.GET_ALL_PAYMENT_GATEWAY_REQUEST, getAllPaymentGateways),
    takeLatest(PaymentGatewayTypes.GET_PAYMENT_GATEWAY_REQUEST, getPaymentGateway),
    takeLatest(PaymentGatewayTypes.INACTIVATE_PAYMENT_GATEWAY_REQUEST, inactivatePaymentGateway),
    takeLatest(PaymentGatewayTypes.LIST_PAYMENT_GATEWAY_REQUEST, listPaymentGateways),
    takeLatest(PaymentGatewayTypes.UPDATE_PAYMENT_GATEWAY_REQUEST, updatePaymentGateway),

    takeLatest(PermissionTypes.ACTIVATE_PERMISSION_REQUEST, activatePermission),
    takeLatest(PermissionTypes.CREATE_PERMISSION_REQUEST, createPermission),
    takeLatest(PermissionTypes.DELETE_PERMISSION_REQUEST, deletePermission),
    takeLatest(PermissionTypes.GET_ALL_PERMISSION_REQUEST, getAllPermissions),
    takeLatest(PermissionTypes.GET_PERMISSION_REQUEST, getPermission),
    takeLatest(PermissionTypes.INACTIVATE_PERMISSION_REQUEST, inactivatePermission),
    takeLatest(PermissionTypes.LIST_PERMISSION_REQUEST, listPermissions),
    takeLatest(PermissionTypes.UPDATE_PERMISSION_REQUEST, updatePermission),

    takeLatest(PrinterTypes.ACTIVATE_PRINTER_REQUEST, activatePrinter),
    takeLatest(PrinterTypes.CREATE_PRINTER_REQUEST, createPrinter),
    takeLatest(PrinterTypes.DELETE_PRINTER_REQUEST, deletePrinter),
    takeLatest(PrinterTypes.GET_ALL_PRINTER_REQUEST, getAllPrinters),
    takeLatest(PrinterTypes.GET_PRINTER_REQUEST, getPrinter),
    takeLatest(PrinterTypes.INACTIVATE_PRINTER_REQUEST, inactivatePrinter),
    takeLatest(PrinterTypes.LIST_PRINTER_REQUEST, listPrinters),
    takeLatest(PrinterTypes.UPDATE_PRINTER_REQUEST, updatePrinter),

    takeLatest(ProfileTypes.ACTIVATE_PROFILE_REQUEST, activateProfile),
    takeLatest(ProfileTypes.ADD_PERMISSION_PROFILE_REQUEST, addProfilePermissions),
    takeLatest(ProfileTypes.CREATE_PROFILE_REQUEST, createProfile),
    takeLatest(ProfileTypes.DELETE_PROFILE_REQUEST, deleteProfile),
    takeLatest(ProfileTypes.GET_ALL_PROFILE_REQUEST, getAllProfiles),
    takeLatest(ProfileTypes.GET_PROFILE_REQUEST, getProfile),
    takeLatest(ProfileTypes.INACTIVATE_PROFILE_REQUEST, inactivateProfile),
    takeLatest(ProfileTypes.LIST_PROFILE_REQUEST, listProfiles),
    takeLatest(ProfileTypes.UPDATE_PROFILE_REQUEST, updateProfile),

    takeLatest(SectionTypes.ACTIVATE_SECTION_REQUEST, activateSection),
    takeLatest(SectionTypes.CREATE_SECTION_REQUEST, createSection),
    takeLatest(SectionTypes.DELETE_SECTION_REQUEST, deleteSection),
    takeLatest(SectionTypes.GET_ALL_SECTION_REQUEST, getAllSections),
    takeLatest(SectionTypes.GET_SECTION_REQUEST, getSection),
    takeLatest(SectionTypes.INACTIVATE_SECTION_REQUEST, inactivateSection),
    takeLatest(SectionTypes.LIST_SECTION_REQUEST, listSections),
    takeLatest(SectionTypes.UPDATE_SECTION_REQUEST, updateSection),

    takeLatest(UserTypes.ACTIVATE_USER_REQUEST, activateUser),
    takeLatest(UserTypes.CREATE_USER_REQUEST, createUser),
    takeLatest(UserTypes.DELETE_USER_REQUEST, deleteUser),
    takeLatest(UserTypes.GET_ALL_USER_REQUEST, getAllUsers),
    takeLatest(UserTypes.GET_USER_REQUEST, getUser),
    takeLatest(UserTypes.INACTIVATE_USER_REQUEST, inactivateUser),
    takeLatest(UserTypes.LIST_USER_REQUEST, listUsers),
    takeLatest(UserTypes.UPDATE_USER_REQUEST, updateUser),
  ]);
}
