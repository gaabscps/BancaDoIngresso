import CustomError from '../../../model/CustomError';
import Home from '../../../model/Home';
/**
 * Action types
 */

// eslint-disable-next-line no-shadow
export enum HomeTypes {
  GET_HOME_REQUEST = '@home/GET_HOME_REQUEST',
  GET_HOME_SUCCCES = '@home/GET_HOME_SUCCCES',
  GET_HOME_FAILURE = '@home/GET_HOME_FAILURE',
}

/**
 * State type
 */
export interface HomeState {
  readonly data: Home;
  readonly loading: boolean;
  readonly error: CustomError | undefined;
}
