import CustomError from '../../../model/CustomError';
import Page from '../../../model/Page';
import ChargeSetup from '../../../model/ChargeSetup';
/**
 * Action types
 */

// eslint-disable-next-line no-shadow
export enum ChargeSetupTypes {
  LIST_CHARGE_SETUP_REQUEST = '@charge-setup/LIST_CHARGE_SETUP_REQUEST',
  LIST_CHARGE_SETUP_SUCCCES = '@charge-setup/LIST_CHARGE_SETUP_SUCCCES',
  LIST_CHARGE_SETUP_FAILURE = '@charge-setup/LIST_CHARGE_SETUP_FAILURE',
  GET_ALL_CHARGE_SETUP_REQUEST = '@charge-setup/GET_ALL_CHARGE_SETUP_REQUEST',
  GET_ALL_CHARGE_SETUP_SUCCCES = '@charge-setup/GET_CHARGE_SETUP_SUCCCES',
  GET_ALL_CHARGE_SETUP_FAILURE = '@charge-setup/GET_CHARGE_SETUP_FAILURE',
  GET_CHARGE_SETUP_REQUEST = '@charge-setup/GET_CHARGE_SETUP_REQUEST',
  GET_CHARGE_SETUP_SUCCCES = '@charge-setup/GET_CHARGE_SETUP_SUCCCES',
  GET_CHARGE_SETUP_FAILURE = '@charge-setup/GET_CHARGE_SETUP_FAILURE',
  CREATE_CHARGE_SETUP_REQUEST = '@charge-setup/CREATE_CHARGE_SETUP_REQUEST',
  CREATE_CHARGE_SETUP_SUCCCES = '@charge-setup/CREATE_CHARGE_SETUP_SUCCCES',
  CREATE_CHARGE_SETUP_FAILURE = '@charge-setup/CREATE_CHARGE_SETUP_FAILURE',
  UPDATE_CHARGE_SETUP_REQUEST = '@charge-setup/UPDATE_CHARGE_SETUP_REQUEST',
  UPDATE_CHARGE_SETUP_SUCCCES = '@charge-setup/UPDATE_CHARGE_SETUP_SUCCCES',
  UPDATE_CHARGE_SETUP_FAILURE = '@charge-setup/UPDATE_CHARGE_SETUP_FAILURE',
}

/**
 * Data types
 */

export interface ChargeSetupDataType {
  page: Page<ChargeSetup, ChargeSetup>;
  entity: ChargeSetup;
  list: ChargeSetup[];
}

/**
 * State type
 */
export interface ChargeSetupState {
  readonly data: ChargeSetupDataType;
  readonly loading: boolean;
  readonly error: CustomError | undefined;
}
