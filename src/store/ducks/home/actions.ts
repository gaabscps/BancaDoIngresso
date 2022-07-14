import { action } from 'typesafe-actions';
import { HomeTypes } from './types';
import CustomError from '../../../entities/CustomError';
import Home from '../../../entities/Home';

export const getRequest = (): {
  type: HomeTypes.GET_HOME_REQUEST;
} => action(HomeTypes.GET_HOME_REQUEST);

export const getSuccess = (
  data: Home,
): {
  type: HomeTypes.GET_HOME_SUCCCES;
  payload: Home;
} => action(HomeTypes.GET_HOME_SUCCCES, data);

export const getFailure = (
  error: CustomError | undefined,
): {
  type: HomeTypes.GET_HOME_FAILURE;
  payload: { error: CustomError | undefined };
} => action(HomeTypes.GET_HOME_FAILURE, { error });
