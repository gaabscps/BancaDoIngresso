import CustomError from '../../../entities/CustomError';
import Auth from '../../../entities/Auth';
import RecoverEmail from '../../../entities/RecoverEmail';
import RecoverLogin from '../../../entities/RecoverLogin';

/**
 * Action types
 */

// eslint-disable-next-line no-shadow
export enum AuthTypes {
  LOGIN_AUTH_REQUEST = '@auth/LOGIN_AUTH_REQUEST',
  LOGIN_AUTH_SUCCCES = '@auth/LOGIN_AUTH_SUCCCES',
  LOGIN_AUTH_FAILURE = '@auth/LOGIN_AUTH_FAILURE',
  RECOVER_PASSWORD_AUTH_REQUEST = '@auth/RECOVER_PASSWORD_AUTH_REQUEST',
  RECOVER_PASSWORD_AUTH_SUCCCES = '@auth/RECOVER_PASSWORD_AUTH_SUCCCES',
  RECOVER_PASSWORD_AUTH_FAILURE = '@auth/RECOVER_PASSWORD_AUTH_FAILURE',
  CHANGE_PASSWORD_AUTH_REQUEST = '@auth/CHANGE_PASSWORD_AUTH_REQUEST',
  CHANGE_PASSWORD_AUTH_SUCCCES = '@auth/CHANGE_PASSWORD_AUTH_SUCCCES',
  CHANGE_PASSWORD_AUTH_FAILURE = '@auth/CHANGE_PASSWORD_AUTH_FAILURE',
  REFRESH_TOKEN_AUTH_REQUEST = '@auth/REFRESH_TOKEN_AUTH_REQUEST',
  REFRESH_TOKEN_AUTH_SUCCCES = '@auth/REFRESH_TOKEN_AUTH_SUCCCES',
  REFRESH_TOKEN_AUTH_FAILURE = '@auth/REFRESH_TOKEN_AUTH_FAILURE',
}

/**
 * Data types
 */

export interface AuthDataType {
  login: Auth;
  recoverPassword: RecoverEmail;
  changePassword: RecoverLogin;
  refreshToken: Auth;
}

/**
 * State type
 */
export interface AuthState {
  readonly data: AuthDataType;
  readonly loading: boolean;
  readonly error: CustomError | undefined;
}
