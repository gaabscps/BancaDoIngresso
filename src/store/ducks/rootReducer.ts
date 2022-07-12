import { combineReducers } from 'redux';
import auth from './auth';
import chargeSetup from './charge-setup';
import client from './client';
import combo from './combo';
import company from './company';
import contractor from './contractor';
import customizer from './customizer';
import eventCategory from './event-category';
import profile from './profile';
import user from './user';

export default combineReducers({
  auth,
  chargeSetup,
  client,
  combo,
  company,
  contractor,
  customizer,
  eventCategory,
  profile,
  user,
});
