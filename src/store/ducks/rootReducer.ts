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
import pdv from './pdv';
import permission from './permission';
import pos from './pos';
import printer from './printer';
import product from './product';
import productGroup from './product-group';
import productSubgroup from './product-subgroup';
import profile from './profile';
import section from './section';
import subPdv from './sub-pdv';
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
  pdv,
  permission,
  pos,
  printer,
  product,
  productGroup,
  productSubgroup,
  profile,
  section,
  subPdv,
  user,
});
