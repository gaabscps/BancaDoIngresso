import CustomError from '../../../model/CustomError';

/**
 * Action types
 */

// eslint-disable-next-line no-shadow
export enum CheckUserTypes {
  CHECK_USER_LOGGED_CALL = '@check-user/CHECK_USER_LOGGED_CALL',
  CHECK_USER_LOGGED_REQUEST = '@check-user/CHECK_USER_LOGGED_REQUEST',
  CHECK_USER_LOGGED_SUCCCES = '@check-user/CHECK_USER_LOGGED_SUCCCES',
  CHECK_USER_LOGGED_FAILURE = '@check-user/CHECK_USER_LOGGED_FAILURE',
}

/**
 * State type
 */
export interface CheckUserState {
  readonly call: boolean;
  readonly logged: boolean;
  readonly loading: boolean;
  readonly error: CustomError | undefined;
}
