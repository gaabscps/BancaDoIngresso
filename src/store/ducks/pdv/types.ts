import CustomError from '../../../model/CustomError';
import Page from '../../../model/Page';
import Pdv from '../../../model/Pdv';
/**
 * Action types
 */

// eslint-disable-next-line no-shadow
export enum PdvTypes {
  ACTIVATE_PDV_REQUEST = '@pdv/ACTIVATE_PDV_REQUEST',
  ACTIVATE_PDV_SUCCCES = '@pdv/ACTIVATE_PDV_SUCCCES',
  ACTIVATE_PDV_FAILURE = '@pdv/ACTIVATE_PDV_FAILURE',
  ADD_USER_PDV_REQUEST = '@pdv/ADD_USER_PDV_REQUEST',
  ADD_USER_PDV_SUCCCES = '@pdv/ADD_USER_PDV_SUCCCES',
  ADD_USER_PDV_FAILURE = '@pdv/ADD_USER_PDV_FAILURE',
  CREATE_PDV_REQUEST = '@pdv/CREATE_PDV_REQUEST',
  CREATE_PDV_SUCCCES = '@pdv/CREATE_PDV_SUCCCES',
  CREATE_PDV_FAILURE = '@pdv/CREATE_PDV_FAILURE',
  DELETE_PDV_REQUEST = '@pdv/DELETE_PDV_REQUEST',
  DELETE_PDV_SUCCCES = '@pdv/DELETE_PDV_SUCCCES',
  DELETE_PDV_FAILURE = '@pdv/DELETE_PDV_FAILURE',
  GET_ALL_PDV_REQUEST = '@pdv/GET_ALL_PDV_REQUEST',
  GET_ALL_PDV_SUCCCES = '@pdv/GET_PDV_SUCCCES',
  GET_ALL_PDV_FAILURE = '@pdv/GET_PDV_FAILURE',
  GET_PDV_REQUEST = '@pdv/GET_PDV_REQUEST',
  GET_PDV_SUCCCES = '@pdv/GET_PDV_SUCCCES',
  GET_PDV_FAILURE = '@pdv/GET_PDV_FAILURE',
  INACTIVATE_PDV_REQUEST = '@pdv/INACTIVATE_PDV_REQUEST',
  INACTIVATE_PDV_SUCCCES = '@pdv/INACTIVATE_PDV_SUCCCES',
  INACTIVATE_PDV_FAILURE = '@pdv/INACTIVATE_PDV_FAILURE',
  LIST_PDV_REQUEST = '@pdv/LIST_PDV_REQUEST',
  LIST_PDV_SUCCCES = '@pdv/LIST_PDV_SUCCCES',
  LIST_PDV_FAILURE = '@pdv/LIST_PDV_FAILURE',
  UPDATE_PDV_REQUEST = '@pdv/UPDATE_PDV_REQUEST',
  UPDATE_PDV_SUCCCES = '@pdv/UPDATE_PDV_SUCCCES',
  UPDATE_PDV_FAILURE = '@pdv/UPDATE_PDV_FAILURE',
}

/**
 * Data types
 */

export interface PdvDataType {
  page: Page<Pdv, Pdv>;
  entity: Pdv;
  list: Pdv[];
}

/**
 * State type
 */
export interface PdvState {
  readonly data: PdvDataType;
  readonly loading: boolean;
  readonly error: CustomError | undefined;
}
