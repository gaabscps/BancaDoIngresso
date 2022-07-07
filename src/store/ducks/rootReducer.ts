import { combineReducers } from 'redux';
import auth from './auth';
import customizer from './customizer';
import eventCategory from './event-category';

export default combineReducers({
  auth,
  customizer,
  eventCategory,
});
