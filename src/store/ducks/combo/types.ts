import Combo from '../../../model/Combo';
import CustomError from '../../../model/CustomError';
import Page from '../../../model/Page';
/**
 * Action types
 */

// eslint-disable-next-line no-shadow
export enum ComboTypes {
  LIST_COMBO_REQUEST = '@combo/LIST_COMBO_REQUEST',
  LIST_COMBO_SUCCCES = '@combo/LIST_COMBO_SUCCCES',
  LIST_COMBO_FAILURE = '@combo/LIST_COMBO_FAILURE',
  GET_ALL_COMBO_REQUEST = '@combo/GET_ALL_COMBO_REQUEST',
  GET_ALL_COMBO_SUCCCES = '@combo/GET_COMBO_SUCCCES',
  GET_ALL_COMBO_FAILURE = '@combo/GET_COMBO_FAILURE',
  GET_COMBO_REQUEST = '@combo/GET_COMBO_REQUEST',
  GET_COMBO_SUCCCES = '@combo/GET_COMBO_SUCCCES',
  GET_COMBO_FAILURE = '@combo/GET_COMBO_FAILURE',
  CREATE_COMBO_REQUEST = '@combo/CREATE_COMBO_REQUEST',
  CREATE_COMBO_SUCCCES = '@combo/CREATE_COMBO_SUCCCES',
  CREATE_COMBO_FAILURE = '@combo/CREATE_COMBO_FAILURE',
  UPDATE_COMBO_REQUEST = '@combo/UPDATE_COMBO_REQUEST',
  UPDATE_COMBO_SUCCCES = '@combo/UPDATE_COMBO_SUCCCES',
  UPDATE_COMBO_FAILURE = '@combo/UPDATE_COMBO_FAILURE',
  ACTIVATE_COMBO_REQUEST = '@combo/ACTIVATE_COMBO_REQUEST',
  ACTIVATE_COMBO_SUCCCES = '@combo/ACTIVATE_COMBO_SUCCCES',
  ACTIVATE_COMBO_FAILURE = '@combo/ACTIVATE_COMBO_FAILURE',
  INACTIVATE_COMBO_REQUEST = '@combo/INACTIVATE_COMBO_REQUEST',
  INACTIVATE_COMBO_SUCCCES = '@combo/INACTIVATE_COMBO_SUCCCES',
  INACTIVATE_COMBO_FAILURE = '@combo/INACTIVATE_COMBO_FAILURE',
  DELETE_COMBO_REQUEST = '@combo/DELETE_COMBO_REQUEST',
  DELETE_COMBO_SUCCCES = '@combo/DELETE_COMBO_SUCCCES',
  DELETE_COMBO_FAILURE = '@combo/DELETE_COMBO_FAILURE',
}

/**
 * Data types
 */

export interface ComboDataType {
  page: Page<Combo, Combo>;
  entity: Combo;
  list: Combo[];
}

/**
 * State type
 */
export interface ComboState {
  readonly data: ComboDataType;
  readonly loading: boolean;
  readonly error: CustomError | undefined;
}
