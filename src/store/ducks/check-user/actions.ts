import { action } from 'typesafe-actions';
import CustomError from '../../../entities/CustomError';
import { CheckUserTypes } from './types';

export const checkUserCall = (): {
  type: CheckUserTypes.CHECK_USER_LOGGED_CALL;
} => action(CheckUserTypes.CHECK_USER_LOGGED_CALL);

export const checkUserRequest = (): {
  type: CheckUserTypes.CHECK_USER_LOGGED_REQUEST;
} => action(CheckUserTypes.CHECK_USER_LOGGED_REQUEST);

export const checkUserSuccess = (): {
  type: CheckUserTypes.CHECK_USER_LOGGED_SUCCCES;
} => action(CheckUserTypes.CHECK_USER_LOGGED_SUCCCES);

export const checkUserFailure = (
  error: CustomError | undefined,
): {
  type: CheckUserTypes.CHECK_USER_LOGGED_FAILURE;
  payload: { error: CustomError | undefined };
} => action(CheckUserTypes.CHECK_USER_LOGGED_FAILURE, { error });
