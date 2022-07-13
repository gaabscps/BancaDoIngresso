import { combineReducers } from 'redux';
import auth from './auth';
import chargeSetup from './charge-setup';
import checkUser from './check-user';
import client from './client';
import combo from './combo';
import company from './company';
import contractor from './contractor';
import customizer from './customizer';
import event from './event';
import eventCategory from './event-category';
import module from './module';
import paymentGateway from './payment-gateway';
import permission from './permission';
import printer from './printer';
import profile from './profile';
import section from './section';
import user from './user';

export default combineReducers({
  auth,
  chargeSetup,
  checkUser,
  client,
  combo,
  company,
  contractor,
  customizer,
  event,
  eventCategory,
  module,
  paymentGateway,
  permission,
  printer,
  profile,
  section,
  user,
});
