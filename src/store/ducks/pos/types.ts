import CustomError from '../../../entities/CustomError';
import Page from '../../../entities/Page';
import Pos from '../../../entities/Pos';
/**
 * Action types
 */

// eslint-disable-next-line no-shadow
export enum PosTypes {
  CREATE_POS_REQUEST = '@pos/CREATE_POS_REQUEST',
  CREATE_POS_SUCCCES = '@pos/CREATE_POS_SUCCCES',
  CREATE_POS_FAILURE = '@pos/CREATE_POS_FAILURE',
  DELETE_POS_REQUEST = '@pos/DELETE_POS_REQUEST',
  DELETE_POS_SUCCCES = '@pos/DELETE_POS_SUCCCES',
  DELETE_POS_FAILURE = '@pos/DELETE_POS_FAILURE',
  GET_ALL_POS_REQUEST = '@pos/GET_ALL_POS_REQUEST',
  GET_ALL_POS_SUCCCES = '@pos/GET_POS_SUCCCES',
  GET_ALL_POS_FAILURE = '@pos/GET_POS_FAILURE',
  GET_POS_REQUEST = '@pos/GET_POS_REQUEST',
  GET_POS_SUCCCES = '@pos/GET_POS_SUCCCES',
  GET_POS_FAILURE = '@pos/GET_POS_FAILURE',
  LIST_POS_REQUEST = '@pos/LIST_POS_REQUEST',
  LIST_POS_SUCCCES = '@pos/LIST_POS_SUCCCES',
  LIST_POS_FAILURE = '@pos/LIST_POS_FAILURE',
  UPDATE_POS_REQUEST = '@pos/UPDATE_POS_REQUEST',
  UPDATE_POS_SUCCCES = '@pos/UPDATE_POS_SUCCCES',
  UPDATE_POS_FAILURE = '@pos/UPDATE_POS_FAILURE',
}

/**
 * Data types
 */

export interface PosDataType {
  page: Page<Pos, Pos>;
  entity: Pos;
  list: Pos[];
}

/**
 * State type
 */
export interface PosState {
  readonly data: PosDataType;
  readonly loading: boolean;
  readonly error: CustomError | undefined;
}
