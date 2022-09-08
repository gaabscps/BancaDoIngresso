import Client from '../../../model/Client';
import CustomError from '../../../model/CustomError';
import Page from '../../../model/Page';
/**
 * Action types
 */

// eslint-disable-next-line no-shadow
export enum ClientTypes {
  LIST_CLIENT_REQUEST = '@client/LIST_CLIENT_REQUEST',
  LIST_CLIENT_SUCCCES = '@client/LIST_CLIENT_SUCCCES',
  LIST_CLIENT_FAILURE = '@client/LIST_CLIENT_FAILURE',
  GET_CLIENT_REQUEST = '@client/GET_CLIENT_REQUEST',
  GET_CLIENT_SUCCCES = '@client/GET_CLIENT_SUCCCES',
  GET_CLIENT_FAILURE = '@client/GET_CLIENT_FAILURE',
  UPDATE_CLIENT_REQUEST = '@client/UPDATE_CLIENT_REQUEST',
  UPDATE_CLIENT_SUCCCES = '@client/UPDATE_CLIENT_SUCCCES',
  UPDATE_CLIENT_FAILURE = '@client/UPDATE_CLIENT_FAILURE',
  ACTIVATE_CLIENT_REQUEST = '@client/ACTIVATE_CLIENT_REQUEST',
  ACTIVATE_CLIENT_SUCCCES = '@client/ACTIVATE_CLIENT_SUCCCES',
  ACTIVATE_CLIENT_FAILURE = '@client/ACTIVATE_CLIENT_FAILURE',
  INACTIVATE_CLIENT_REQUEST = '@client/INACTIVATE_CLIENT_REQUEST',
  INACTIVATE_CLIENT_SUCCCES = '@client/INACTIVATE_CLIENT_SUCCCES',
  INACTIVATE_CLIENT_FAILURE = '@client/INACTIVATE_CLIENT_FAILURE',
  DELETE_CLIENT_REQUEST = '@client/DELETE_CLIENT_REQUEST',
  DELETE_CLIENT_SUCCCES = '@client/DELETE_CLIENT_SUCCCES',
  DELETE_CLIENT_FAILURE = '@client/DELETE_CLIENT_FAILURE',
}

/**
 * Data types
 */

export interface ClientDataType {
  page: Page<Client, Client>;
  entity: Client;
  list: Client[];
}

/**
 * State type
 */
export interface ClientState {
  readonly data: ClientDataType;
  readonly loading: boolean;
  readonly error: CustomError | undefined;
}
