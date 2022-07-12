import CustomError from '../../../entities/CustomError';
import Page from '../../../entities/Page';
import Permission from '../../../entities/Permission';
/**
 * Action types
 */

// eslint-disable-next-line no-shadow
export enum PermissionTypes {
  ACTIVATE_PERMISSION_REQUEST = '@permission/ACTIVATE_PERMISSION_REQUEST',
  ACTIVATE_PERMISSION_SUCCCES = '@permission/ACTIVATE_PERMISSION_SUCCCES',
  ACTIVATE_PERMISSION_FAILURE = '@permission/ACTIVATE_PERMISSION_FAILURE',
  CREATE_PERMISSION_REQUEST = '@permission/CREATE_PERMISSION_REQUEST',
  CREATE_PERMISSION_SUCCCES = '@permission/CREATE_PERMISSION_SUCCCES',
  CREATE_PERMISSION_FAILURE = '@permission/CREATE_PERMISSION_FAILURE',
  DELETE_PERMISSION_REQUEST = '@permission/DELETE_PERMISSION_REQUEST',
  DELETE_PERMISSION_SUCCCES = '@permission/DELETE_PERMISSION_SUCCCES',
  DELETE_PERMISSION_FAILURE = '@permission/DELETE_PERMISSION_FAILURE',
  GET_ALL_PERMISSION_REQUEST = '@permission/GET_ALL_PERMISSION_REQUEST',
  GET_ALL_PERMISSION_SUCCCES = '@permission/GET_PERMISSION_SUCCCES',
  GET_ALL_PERMISSION_FAILURE = '@permission/GET_PERMISSION_FAILURE',
  GET_PERMISSION_REQUEST = '@permission/GET_PERMISSION_REQUEST',
  GET_PERMISSION_SUCCCES = '@permission/GET_PERMISSION_SUCCCES',
  GET_PERMISSION_FAILURE = '@permission/GET_PERMISSION_FAILURE',
  INACTIVATE_PERMISSION_REQUEST = '@permission/INACTIVATE_PERMISSION_REQUEST',
  INACTIVATE_PERMISSION_SUCCCES = '@permission/INACTIVATE_PERMISSION_SUCCCES',
  INACTIVATE_PERMISSION_FAILURE = '@permission/INACTIVATE_PERMISSION_FAILURE',
  LIST_PERMISSION_REQUEST = '@permission/LIST_PERMISSION_REQUEST',
  LIST_PERMISSION_SUCCCES = '@permission/LIST_PERMISSION_SUCCCES',
  LIST_PERMISSION_FAILURE = '@permission/LIST_PERMISSION_FAILURE',
  UPDATE_PERMISSION_REQUEST = '@permission/UPDATE_PERMISSION_REQUEST',
  UPDATE_PERMISSION_SUCCCES = '@permission/UPDATE_PERMISSION_SUCCCES',
  UPDATE_PERMISSION_FAILURE = '@permission/UPDATE_PERMISSION_FAILURE',
}

/**
 * Data types
 */

export interface PermissionDataType {
  page: Page<Permission, Permission>;
  entity: Permission;
  list: Permission[];
}

/**
 * State type
 */
export interface PermissionState {
  readonly data: PermissionDataType;
  readonly loading: boolean;
  readonly error: CustomError | undefined;
}
