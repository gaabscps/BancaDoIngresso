import CustomError from '../../../entities/CustomError';
import Page from '../../../entities/Page';
import PaymentGateway from '../../../entities/PaymentGateway';
/**
 * Action types
 */

// eslint-disable-next-line no-shadow
export enum PaymentGatewayTypes {
  ACTIVATE_PAYMENT_GATEWAY_REQUEST = '@payment-gateway/ACTIVATE_PAYMENT_GATEWAY_REQUEST',
  ACTIVATE_PAYMENT_GATEWAY_SUCCCES = '@payment-gateway/ACTIVATE_PAYMENT_GATEWAY_SUCCCES',
  ACTIVATE_PAYMENT_GATEWAY_FAILURE = '@payment-gateway/ACTIVATE_PAYMENT_GATEWAY_FAILURE',
  CREATE_PAYMENT_GATEWAY_REQUEST = '@payment-gateway/CREATE_PAYMENT_GATEWAY_REQUEST',
  CREATE_PAYMENT_GATEWAY_SUCCCES = '@payment-gateway/CREATE_PAYMENT_GATEWAY_SUCCCES',
  CREATE_PAYMENT_GATEWAY_FAILURE = '@payment-gateway/CREATE_PAYMENT_GATEWAY_FAILURE',
  DELETE_PAYMENT_GATEWAY_REQUEST = '@payment-gateway/DELETE_PAYMENT_GATEWAY_REQUEST',
  DELETE_PAYMENT_GATEWAY_SUCCCES = '@payment-gateway/DELETE_PAYMENT_GATEWAY_SUCCCES',
  DELETE_PAYMENT_GATEWAY_FAILURE = '@payment-gateway/DELETE_PAYMENT_GATEWAY_FAILURE',
  GET_ALL_PAYMENT_GATEWAY_REQUEST = '@payment-gateway/GET_ALL_PAYMENT_GATEWAY_REQUEST',
  GET_ALL_PAYMENT_GATEWAY_SUCCCES = '@payment-gateway/GET_PAYMENT_GATEWAY_SUCCCES',
  GET_ALL_PAYMENT_GATEWAY_FAILURE = '@payment-gateway/GET_PAYMENT_GATEWAY_FAILURE',
  GET_PAYMENT_GATEWAY_REQUEST = '@payment-gateway/GET_PAYMENT_GATEWAY_REQUEST',
  GET_PAYMENT_GATEWAY_SUCCCES = '@payment-gateway/GET_PAYMENT_GATEWAY_SUCCCES',
  GET_PAYMENT_GATEWAY_FAILURE = '@payment-gateway/GET_PAYMENT_GATEWAY_FAILURE',
  INACTIVATE_PAYMENT_GATEWAY_REQUEST = '@payment-gateway/INACTIVATE_PAYMENT_GATEWAY_REQUEST',
  INACTIVATE_PAYMENT_GATEWAY_SUCCCES = '@payment-gateway/INACTIVATE_PAYMENT_GATEWAY_SUCCCES',
  INACTIVATE_PAYMENT_GATEWAY_FAILURE = '@payment-gateway/INACTIVATE_PAYMENT_GATEWAY_FAILURE',
  LIST_PAYMENT_GATEWAY_REQUEST = '@payment-gateway/LIST_PAYMENT_GATEWAY_REQUEST',
  LIST_PAYMENT_GATEWAY_SUCCCES = '@payment-gateway/LIST_PAYMENT_GATEWAY_SUCCCES',
  LIST_PAYMENT_GATEWAY_FAILURE = '@payment-gateway/LIST_PAYMENT_GATEWAY_FAILURE',
  UPDATE_PAYMENT_GATEWAY_REQUEST = '@payment-gateway/UPDATE_PAYMENT_GATEWAY_REQUEST',
  UPDATE_PAYMENT_GATEWAY_SUCCCES = '@payment-gateway/UPDATE_PAYMENT_GATEWAY_SUCCCES',
  UPDATE_PAYMENT_GATEWAY_FAILURE = '@payment-gateway/UPDATE_PAYMENT_GATEWAY_FAILURE',
}

/**
 * Data types
 */

export interface PaymentGatewayDataType {
  page: Page<PaymentGateway, PaymentGateway>;
  entity: PaymentGateway;
  list: PaymentGateway[];
}

/**
 * State type
 */
export interface PaymentGatewayState {
  readonly data: PaymentGatewayDataType;
  readonly loading: boolean;
  readonly error: CustomError | undefined;
}
