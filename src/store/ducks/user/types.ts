import User from '../../../model/User';
import CustomError from '../../../model/CustomError';
import Page from '../../../model/Page';
/**
 * Action types
 */

// eslint-disable-next-line no-shadow
export enum UserTypes {
  ACTIVATE_USER_REQUEST = '@user/ACTIVATE_USER_REQUEST',
  ACTIVATE_USER_SUCCCES = '@user/ACTIVATE_USER_SUCCCES',
  ACTIVATE_USER_FAILURE = '@user/ACTIVATE_USER_FAILURE',
  CREATE_USER_REQUEST = '@user/CREATE_USER_REQUEST',
  CREATE_USER_SUCCCES = '@user/CREATE_USER_SUCCCES',
  CREATE_USER_FAILURE = '@user/CREATE_USER_FAILURE',
  DELETE_USER_REQUEST = '@user/DELETE_USER_REQUEST',
  DELETE_USER_SUCCCES = '@user/DELETE_USER_SUCCCES',
  DELETE_USER_FAILURE = '@user/DELETE_USER_FAILURE',
  GET_ALL_USER_REQUEST = '@user/GET_ALL_USER_REQUEST',
  GET_ALL_USER_SUCCCES = '@user/GET_USER_SUCCCES',
  GET_ALL_USER_FAILURE = '@user/GET_USER_FAILURE',
  GET_USER_REQUEST = '@user/GET_USER_REQUEST',
  GET_USER_SUCCCES = '@user/GET_USER_SUCCCES',
  GET_USER_FAILURE = '@user/GET_USER_FAILURE',
  INACTIVATE_USER_REQUEST = '@user/INACTIVATE_USER_REQUEST',
  INACTIVATE_USER_SUCCCES = '@user/INACTIVATE_USER_SUCCCES',
  INACTIVATE_USER_FAILURE = '@user/INACTIVATE_USER_FAILURE',
  LIST_USER_REQUEST = '@user/LIST_USER_REQUEST',
  LIST_USER_SUCCCES = '@user/LIST_USER_SUCCCES',
  LIST_USER_FAILURE = '@user/LIST_USER_FAILURE',
  UPDATE_USER_REQUEST = '@user/UPDATE_USER_REQUEST',
  UPDATE_USER_SUCCCES = '@user/UPDATE_USER_SUCCCES',
  UPDATE_USER_FAILURE = '@user/UPDATE_USER_FAILURE',
}

/**
 * Data types
 */

export interface UserDataType {
  page: Page<User, User>;
  entity: User;
  list: User[];
}

/**
 * State type
 */
export interface UserState {
  readonly data: UserDataType;
  readonly loading: boolean;
  readonly error: CustomError | undefined;
}
