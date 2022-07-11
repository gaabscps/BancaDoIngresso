import { combineReducers } from 'redux';
import auth from './auth';
import chargeSetup from './charge-setup';
import client from './client';
import combo from './combo';
import customizer from './customizer';
import eventCategory from './event-category';

export default combineReducers({
  auth,
  chargeSetup,
  client,
  combo,
  customizer,
  eventCategory,
});
