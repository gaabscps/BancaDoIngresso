import CustomError from '../../../model/CustomError';
import Module from '../../../model/Module';
import Page from '../../../model/Page';

/**
 * Action types
 */

// eslint-disable-next-line no-shadow
export enum ModuleTypes {
  ACTIVATE_MODULE_REQUEST = '@module/ACTIVATE_MODULE_REQUEST',
  ACTIVATE_MODULE_SUCCCES = '@module/ACTIVATE_MODULE_SUCCCES',
  ACTIVATE_MODULE_FAILURE = '@module/ACTIVATE_MODULE_FAILURE',
  CREATE_MODULE_REQUEST = '@module/CREATE_MODULE_REQUEST',
  CREATE_MODULE_SUCCCES = '@module/CREATE_MODULE_SUCCCES',
  CREATE_MODULE_FAILURE = '@module/CREATE_MODULE_FAILURE',
  DELETE_MODULE_REQUEST = '@module/DELETE_MODULE_REQUEST',
  DELETE_MODULE_SUCCCES = '@module/DELETE_MODULE_SUCCCES',
  DELETE_MODULE_FAILURE = '@module/DELETE_MODULE_FAILURE',
  GET_ALL_MODULE_REQUEST = '@module/GET_ALL_MODULE_REQUEST',
  GET_ALL_MODULE_SUCCCES = '@module/GET_MODULE_SUCCCES',
  GET_ALL_MODULE_FAILURE = '@module/GET_MODULE_FAILURE',
  GET_MODULE_REQUEST = '@module/GET_MODULE_REQUEST',
  GET_MODULE_SUCCCES = '@module/GET_MODULE_SUCCCES',
  GET_MODULE_FAILURE = '@module/GET_MODULE_FAILURE',
  INACTIVATE_MODULE_REQUEST = '@module/INACTIVATE_MODULE_REQUEST',
  INACTIVATE_MODULE_SUCCCES = '@module/INACTIVATE_MODULE_SUCCCES',
  INACTIVATE_MODULE_FAILURE = '@module/INACTIVATE_MODULE_FAILURE',
  LIST_MODULE_REQUEST = '@module/LIST_MODULE_REQUEST',
  LIST_MODULE_SUCCCES = '@module/LIST_MODULE_SUCCCES',
  LIST_MODULE_FAILURE = '@module/LIST_MODULE_FAILURE',
  UPDATE_MODULE_REQUEST = '@module/UPDATE_MODULE_REQUEST',
  UPDATE_MODULE_SUCCCES = '@module/UPDATE_MODULE_SUCCCES',
  UPDATE_MODULE_FAILURE = '@module/UPDATE_MODULE_FAILURE',
}

/**
 * Data types
 */

export interface ModuleDataType {
  page: Page<Module, Module>;
  entity: Module;
  list: Module[];
}

/**
 * State type
 */
export interface ModuleState {
  readonly data: ModuleDataType;
  readonly loading: boolean;
  readonly error: CustomError | undefined;
}
