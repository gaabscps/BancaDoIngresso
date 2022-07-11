import { combineReducers } from 'redux';
import auth from './auth';
import chargeSetup from './charge-setup';
import customizer from './customizer';
import eventCategory from './event-category';

export default combineReducers({
  auth,
  chargeSetup,
  customizer,
  eventCategory,
});
