import { createStore, applyMiddleware, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { AuthState } from './ducks/auth/types';
import { ChargeSetupState } from './ducks/charge-setup/types';
import { CustomizerState } from './ducks/customizer/types';
import { EventCategoryState } from './ducks/event-category/types';
import rootReducer from './ducks/rootReducer';
import rootSaga from './ducks/rootSaga';

export interface ApplicationState {
  auth: AuthState;
  chargeSetup: ChargeSetupState;
  customizer: CustomizerState;
  eventCategory: EventCategoryState;
}
const sagaMiddleware = createSagaMiddleware();

const store: Store<ApplicationState> = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
