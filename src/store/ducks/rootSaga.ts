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
  ticketGeneralSettingsEvent,
  productEvent,
  productComboEvent,
  sectionProductComboEvent,
  posEvent,
  pdvMainEvent,
  pdvTicketEvent,
  pdvProductEvent,
  pdvSubPdvEvent,
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
import { getHome } from './home/sagas';
import { HomeTypes } from './home/types';
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
  activatePdv,
  addPdvUsers,
  createPdv,
  deletePdv,
  getAllPdvs,
  getPdv,
  inactivatePdv,
  listPdvs,
  updatePdv,
} from './pdv/sagas';
import { PdvTypes } from './pdv/types';
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
  activatePos,
  createPos,
  deletePos,
  getAllPoss,
  getPos,
  inactivatePos,
  listPoss,
  updatePos,
} from './pos/sagas';
import { PosTypes } from './pos/types';
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
  activateProduct,
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  inactivateProduct,
  listProducts,
  updateProduct,
} from './product/sagas';
import { ProductTypes } from './product/types';
import {
  activateProductGroup,
  createProductGroup,
  deleteProductGroup,
  getAllProductGroups,
  getProductGroup,
  inactivateProductGroup,
  listProductGroups,
  updateProductGroup,
} from './product-group/sagas';
import { ProductGroupTypes } from './product-group/types';
import {
  activateProductSubgroup,
  createProductSubgroup,
  deleteProductSubgroup,
  getAllProductSubgroups,
  getProductSubgroup,
  inactivateProductSubgroup,
  listProductSubgroups,
  updateProductSubgroup,
} from './product-subgroup/sagas';
import { ProductSubgroupTypes } from './product-subgroup/types';
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
  activateSubPdv,
  addSubPdvUsers,
  createSubPdv,
  deleteSubPdv,
  getAllSubPdvs,
  getSubPdv,
  inactivateSubPdv,
  listSubPdvs,
  updateSubPdv,
} from './sub-pdv/sagas';
import { SubPdvTypes } from './sub-pdv/types';
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
    takeLatest(EventTypes.TICKET_GENERAL_SETTINGS_EVENT_REQUEST, ticketGeneralSettingsEvent),
    takeLatest(EventTypes.SECTION_PRODUCT_PRODUCT_EVENT_REQUEST, productEvent),
    takeLatest(EventTypes.SECTION_PRODUCT_COMBO_EVENT_REQUEST, productComboEvent),
    takeLatest(EventTypes.SECTION_PRODUCT_COMBO_SECTION_EVENT_REQUEST, sectionProductComboEvent),
    takeLatest(EventTypes.SECTION_PRODUCT_POS_EVENT_REQUEST, posEvent),

    takeLatest(EventTypes.PDV_MAIN_EVENT_REQUEST, pdvMainEvent),
    takeLatest(EventTypes.PDV_TICKET_EVENT_REQUEST, pdvTicketEvent),
    takeLatest(EventTypes.PDV_PRODUCT_EVENT_REQUEST, pdvProductEvent),
    takeLatest(EventTypes.PDV_SUBPDV_EVENT_REQUEST, pdvSubPdvEvent),

    takeLatest(EventCategoryTypes.ACTIVATE_EVENT_CATEGORY_REQUEST, activateEventCategory),
    takeLatest(EventCategoryTypes.CREATE_EVENT_CATEGORY_REQUEST, createEventCategory),
    takeLatest(EventCategoryTypes.DELETE_EVENT_CATEGORY_REQUEST, deleteEventCategory),
    takeLatest(EventCategoryTypes.GET_ALL_EVENT_CATEGORY_REQUEST, getAllEventCategories),
    takeLatest(EventCategoryTypes.GET_EVENT_CATEGORY_REQUEST, getEventCategory),
    takeLatest(EventCategoryTypes.INACTIVATE_EVENT_CATEGORY_REQUEST, inactivateEventCategory),
    takeLatest(EventCategoryTypes.LIST_EVENT_CATEGORY_REQUEST, listEventCategory),
    takeLatest(EventCategoryTypes.UPDATE_EVENT_CATEGORY_REQUEST, updateEventCategory),

    takeLatest(HomeTypes.GET_HOME_REQUEST, getHome),

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

    takeLatest(PdvTypes.ACTIVATE_PDV_REQUEST, activatePdv),
    takeLatest(PdvTypes.ADD_USER_PDV_REQUEST, addPdvUsers),
    takeLatest(PdvTypes.CREATE_PDV_REQUEST, createPdv),
    takeLatest(PdvTypes.DELETE_PDV_REQUEST, deletePdv),
    takeLatest(PdvTypes.GET_ALL_PDV_REQUEST, getAllPdvs),
    takeLatest(PdvTypes.GET_PDV_REQUEST, getPdv),
    takeLatest(PdvTypes.INACTIVATE_PDV_REQUEST, inactivatePdv),
    takeLatest(PdvTypes.LIST_PDV_REQUEST, listPdvs),
    takeLatest(PdvTypes.UPDATE_PDV_REQUEST, updatePdv),

    takeLatest(PermissionTypes.ACTIVATE_PERMISSION_REQUEST, activatePermission),
    takeLatest(PermissionTypes.CREATE_PERMISSION_REQUEST, createPermission),
    takeLatest(PermissionTypes.DELETE_PERMISSION_REQUEST, deletePermission),
    takeLatest(PermissionTypes.GET_ALL_PERMISSION_REQUEST, getAllPermissions),
    takeLatest(PermissionTypes.GET_PERMISSION_REQUEST, getPermission),
    takeLatest(PermissionTypes.INACTIVATE_PERMISSION_REQUEST, inactivatePermission),
    takeLatest(PermissionTypes.LIST_PERMISSION_REQUEST, listPermissions),
    takeLatest(PermissionTypes.UPDATE_PERMISSION_REQUEST, updatePermission),

    takeLatest(PosTypes.ACTIVATE_POS_REQUEST, activatePos),
    takeLatest(PosTypes.CREATE_POS_REQUEST, createPos),
    takeLatest(PosTypes.DELETE_POS_REQUEST, deletePos),
    takeLatest(PosTypes.GET_ALL_POS_REQUEST, getAllPoss),
    takeLatest(PosTypes.GET_POS_REQUEST, getPos),
    takeLatest(PosTypes.INACTIVATE_POS_REQUEST, inactivatePos),
    takeLatest(PosTypes.LIST_POS_REQUEST, listPoss),
    takeLatest(PosTypes.UPDATE_POS_REQUEST, updatePos),

    takeLatest(PrinterTypes.ACTIVATE_PRINTER_REQUEST, activatePrinter),
    takeLatest(PrinterTypes.CREATE_PRINTER_REQUEST, createPrinter),
    takeLatest(PrinterTypes.DELETE_PRINTER_REQUEST, deletePrinter),
    takeLatest(PrinterTypes.GET_ALL_PRINTER_REQUEST, getAllPrinters),
    takeLatest(PrinterTypes.GET_PRINTER_REQUEST, getPrinter),
    takeLatest(PrinterTypes.INACTIVATE_PRINTER_REQUEST, inactivatePrinter),
    takeLatest(PrinterTypes.LIST_PRINTER_REQUEST, listPrinters),
    takeLatest(PrinterTypes.UPDATE_PRINTER_REQUEST, updatePrinter),

    takeLatest(ProductTypes.ACTIVATE_PRODUCT_REQUEST, activateProduct),
    takeLatest(ProductTypes.CREATE_PRODUCT_REQUEST, createProduct),
    takeLatest(ProductTypes.DELETE_PRODUCT_REQUEST, deleteProduct),
    takeLatest(ProductTypes.GET_ALL_PRODUCT_REQUEST, getAllProducts),
    takeLatest(ProductTypes.GET_PRODUCT_REQUEST, getProduct),
    takeLatest(ProductTypes.INACTIVATE_PRODUCT_REQUEST, inactivateProduct),
    takeLatest(ProductTypes.LIST_PRODUCT_REQUEST, listProducts),
    takeLatest(ProductTypes.UPDATE_PRODUCT_REQUEST, updateProduct),

    takeLatest(ProductGroupTypes.ACTIVATE_PRODUCT_GROUP_REQUEST, activateProductGroup),
    takeLatest(ProductGroupTypes.CREATE_PRODUCT_GROUP_REQUEST, createProductGroup),
    takeLatest(ProductGroupTypes.DELETE_PRODUCT_GROUP_REQUEST, deleteProductGroup),
    takeLatest(ProductGroupTypes.GET_ALL_PRODUCT_GROUP_REQUEST, getAllProductGroups),
    takeLatest(ProductGroupTypes.GET_PRODUCT_GROUP_REQUEST, getProductGroup),
    takeLatest(ProductGroupTypes.INACTIVATE_PRODUCT_GROUP_REQUEST, inactivateProductGroup),
    takeLatest(ProductGroupTypes.LIST_PRODUCT_GROUP_REQUEST, listProductGroups),
    takeLatest(ProductGroupTypes.UPDATE_PRODUCT_GROUP_REQUEST, updateProductGroup),

    takeLatest(ProductSubgroupTypes.ACTIVATE_PRODUCT_SUBGROUP_REQUEST, activateProductSubgroup),
    takeLatest(ProductSubgroupTypes.CREATE_PRODUCT_SUBGROUP_REQUEST, createProductSubgroup),
    takeLatest(ProductSubgroupTypes.DELETE_PRODUCT_SUBGROUP_REQUEST, deleteProductSubgroup),
    takeLatest(ProductSubgroupTypes.GET_ALL_PRODUCT_SUBGROUP_REQUEST, getAllProductSubgroups),
    takeLatest(ProductSubgroupTypes.GET_PRODUCT_SUBGROUP_REQUEST, getProductSubgroup),
    takeLatest(ProductSubgroupTypes.INACTIVATE_PRODUCT_SUBGROUP_REQUEST, inactivateProductSubgroup),
    takeLatest(ProductSubgroupTypes.LIST_PRODUCT_SUBGROUP_REQUEST, listProductSubgroups),
    takeLatest(ProductSubgroupTypes.UPDATE_PRODUCT_SUBGROUP_REQUEST, updateProductSubgroup),

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

    takeLatest(SubPdvTypes.ACTIVATE_SUB_PDV_REQUEST, activateSubPdv),
    takeLatest(SubPdvTypes.ADD_USER_SUB_PDV_REQUEST, addSubPdvUsers),
    takeLatest(SubPdvTypes.CREATE_SUB_PDV_REQUEST, createSubPdv),
    takeLatest(SubPdvTypes.DELETE_SUB_PDV_REQUEST, deleteSubPdv),
    takeLatest(SubPdvTypes.GET_ALL_SUB_PDV_REQUEST, getAllSubPdvs),
    takeLatest(SubPdvTypes.GET_SUB_PDV_REQUEST, getSubPdv),
    takeLatest(SubPdvTypes.INACTIVATE_SUB_PDV_REQUEST, inactivateSubPdv),
    takeLatest(SubPdvTypes.LIST_SUB_PDV_REQUEST, listSubPdvs),
    takeLatest(SubPdvTypes.UPDATE_SUB_PDV_REQUEST, updateSubPdv),

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
