import { action } from 'typesafe-actions';
import CustomError from '../../../entities/CustomError';
import { AuthDataType, AuthTypes } from './types';
import ChangePassword from '../../../entities/ChangePassword';

interface LoginRequest {
  userName: string;
  password: string;
}

export const loginRequest = (
  userName: string,
  password: string,
): {
  type: AuthTypes.LOGIN_AUTH_REQUEST;
  payload: LoginRequest;
} => action(AuthTypes.LOGIN_AUTH_REQUEST, { userName, password });

export const loginSuccess = (
  data: AuthDataType,
): {
  type: AuthTypes.LOGIN_AUTH_SUCCCES;
  payload: { data: AuthDataType };
} => action(AuthTypes.LOGIN_AUTH_SUCCCES, { data });

export const loginFailure = (
  error: CustomError | undefined,
): {
  type: AuthTypes.LOGIN_AUTH_FAILURE;
  payload: { error: CustomError | undefined };
} => action(AuthTypes.LOGIN_AUTH_FAILURE, { error });

export const recoverPasswordRequest = (
  data: string,
): {
  type: AuthTypes.RECOVER_PASSWORD_AUTH_REQUEST;
  payload: string;
} => action(AuthTypes.RECOVER_PASSWORD_AUTH_REQUEST, data);

export const recoverPasswordSuccess = (
  data: AuthDataType,
): {
  type: AuthTypes.RECOVER_PASSWORD_AUTH_SUCCCES;
  payload: { data: AuthDataType };
} => action(AuthTypes.RECOVER_PASSWORD_AUTH_SUCCCES, { data });

export const recoverPasswordFailure = (
  error: CustomError | undefined,
): {
  type: AuthTypes.RECOVER_PASSWORD_AUTH_FAILURE;
  payload: { error: CustomError | undefined };
} => action(AuthTypes.RECOVER_PASSWORD_AUTH_FAILURE, { error });

export const changePasswordRequest = (
  data: ChangePassword,
): {
  type: AuthTypes.CHANGE_PASSWORD_AUTH_REQUEST;
  payload: ChangePassword;
} => action(AuthTypes.CHANGE_PASSWORD_AUTH_REQUEST, data);

export const changePasswordSuccess = (
  data: AuthDataType,
): {
  type: AuthTypes.CHANGE_PASSWORD_AUTH_SUCCCES;
  payload: { data: AuthDataType };
} => action(AuthTypes.CHANGE_PASSWORD_AUTH_SUCCCES, { data });

export const changePasswordFailure = (
  error: CustomError | undefined,
): {
  type: AuthTypes.CHANGE_PASSWORD_AUTH_FAILURE;
  payload: { error: CustomError | undefined };
} => action(AuthTypes.CHANGE_PASSWORD_AUTH_FAILURE, { error });

export const refreshTokenRequest = (): {
  type: AuthTypes.REFRESH_TOKEN_AUTH_REQUEST;
} => action(AuthTypes.REFRESH_TOKEN_AUTH_REQUEST);

export const refreshTokenSuccess = (
  data: AuthDataType,
): {
  type: AuthTypes.REFRESH_TOKEN_AUTH_SUCCCES;
  payload: { data: AuthDataType };
} => action(AuthTypes.REFRESH_TOKEN_AUTH_SUCCCES, { data });

export const refreshTokenFailure = (
  error: CustomError | undefined,
): {
  type: AuthTypes.REFRESH_TOKEN_AUTH_FAILURE;
  payload: { error: CustomError | undefined };
} => action(AuthTypes.REFRESH_TOKEN_AUTH_FAILURE, { error });
