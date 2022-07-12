import { createStore, applyMiddleware, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { AuthState } from './ducks/auth/types';
import { ChargeSetupState } from './ducks/charge-setup/types';
import { ClientState } from './ducks/client/types';
import { ComboState } from './ducks/combo/types';
import { CompanyState } from './ducks/company/types';
import { ContractorState } from './ducks/contractor/types';
import { CustomizerState } from './ducks/customizer/types';
import { EventCategoryState } from './ducks/event-category/types';
import { ProfileState } from './ducks/profile/types';
import { UserState } from './ducks/user/types';
import rootReducer from './ducks/rootReducer';
import rootSaga from './ducks/rootSaga';

export interface ApplicationState {
  auth: AuthState;
  chargeSetup: ChargeSetupState;
  client: ClientState;
  combo: ComboState;
  company: CompanyState;
  contractor: ContractorState;
  customizer: CustomizerState;
  eventCategory: EventCategoryState;
  profile: ProfileState;
  user: UserState;
}
const sagaMiddleware = createSagaMiddleware();

const store: Store<ApplicationState> = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
