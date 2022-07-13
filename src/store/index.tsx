import { createStore, applyMiddleware, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { AuthState } from './ducks/auth/types';
import { ChargeSetupState } from './ducks/charge-setup/types';
import { CheckUserState } from './ducks/check-user/types';
import { ClientState } from './ducks/client/types';
import { ComboState } from './ducks/combo/types';
import { CompanyState } from './ducks/company/types';
import { ContractorState } from './ducks/contractor/types';
import { CustomizerState } from './ducks/customizer/types';
import { EventCategoryState } from './ducks/event-category/types';
import { EventState } from './ducks/event/types';
import { ModuleState } from './ducks/module/types';
import { PaymentGatewayState } from './ducks/payment-gateway/types';
import { PermissionState } from './ducks/permission/types';
import { PosState } from './ducks/pos/types';
import { PrinterState } from './ducks/printer/types';
import { ProductState } from './ducks/product/types';
import { ProductGroupState } from './ducks/product-group/types';
import { ProductSubgroupState } from './ducks/product-subgroup/types';
import { ProfileState } from './ducks/profile/types';
import { SectionState } from './ducks/section/types';
import { UserState } from './ducks/user/types';
import rootReducer from './ducks/rootReducer';
import rootSaga from './ducks/rootSaga';

export interface ApplicationState {
  auth: AuthState;
  chargeSetup: ChargeSetupState;
  checkUser: CheckUserState;
  client: ClientState;
  combo: ComboState;
  company: CompanyState;
  contractor: ContractorState;
  customizer: CustomizerState;
  event: EventState;
  eventCategory: EventCategoryState;
  module: ModuleState;
  paymentGateway: PaymentGatewayState;
  permission: PermissionState;
  pos: PosState;
  printer: PrinterState;
  product: ProductState;
  productGroup: ProductGroupState;
  productSubgroup: ProductSubgroupState;
  profile: ProfileState;
  section: SectionState;
  user: UserState;
}
const sagaMiddleware = createSagaMiddleware();

const store: Store<ApplicationState> = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
