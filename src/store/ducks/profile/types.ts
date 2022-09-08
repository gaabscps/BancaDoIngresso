import CustomError from '../../../model/CustomError';
import Page from '../../../model/Page';
import Profile from '../../../model/Profile';

/**
 * Action types
 */

// eslint-disable-next-line no-shadow
export enum ProfileTypes {
  ACTIVATE_PROFILE_REQUEST = '@profile/ACTIVATE_PROFILE_REQUEST',
  ACTIVATE_PROFILE_SUCCCES = '@profile/ACTIVATE_PROFILE_SUCCCES',
  ACTIVATE_PROFILE_FAILURE = '@profile/ACTIVATE_PROFILE_FAILURE',
  ADD_PERMISSION_PROFILE_REQUEST = '@profile/ADD_PERMISSION_PROFILE_REQUEST',
  ADD_PERMISSION_PROFILE_SUCCCES = '@profile/ADD_PERMISSION_PROFILE_SUCCCES',
  ADD_PERMISSION_PROFILE_FAILURE = '@profile/ADD_PERMISSION_PROFILE_FAILURE',
  CREATE_PROFILE_REQUEST = '@profile/CREATE_PROFILE_REQUEST',
  CREATE_PROFILE_SUCCCES = '@profile/CREATE_PROFILE_SUCCCES',
  CREATE_PROFILE_FAILURE = '@profile/CREATE_PROFILE_FAILURE',
  DELETE_PROFILE_REQUEST = '@profile/DELETE_PROFILE_REQUEST',
  DELETE_PROFILE_SUCCCES = '@profile/DELETE_PROFILE_SUCCCES',
  DELETE_PROFILE_FAILURE = '@profile/DELETE_PROFILE_FAILURE',
  GET_ALL_PROFILE_REQUEST = '@profile/GET_ALL_PROFILE_REQUEST',
  GET_ALL_PROFILE_SUCCCES = '@profile/GET_PROFILE_SUCCCES',
  GET_ALL_PROFILE_FAILURE = '@profile/GET_PROFILE_FAILURE',
  GET_PROFILE_REQUEST = '@profile/GET_PROFILE_REQUEST',
  GET_PROFILE_SUCCCES = '@profile/GET_PROFILE_SUCCCES',
  GET_PROFILE_FAILURE = '@profile/GET_PROFILE_FAILURE',
  INACTIVATE_PROFILE_REQUEST = '@profile/INACTIVATE_PROFILE_REQUEST',
  INACTIVATE_PROFILE_SUCCCES = '@profile/INACTIVATE_PROFILE_SUCCCES',
  INACTIVATE_PROFILE_FAILURE = '@profile/INACTIVATE_PROFILE_FAILURE',
  LIST_PROFILE_REQUEST = '@profile/LIST_PROFILE_REQUEST',
  LIST_PROFILE_SUCCCES = '@profile/LIST_PROFILE_SUCCCES',
  LIST_PROFILE_FAILURE = '@profile/LIST_PROFILE_FAILURE',
  UPDATE_PROFILE_REQUEST = '@profile/UPDATE_PROFILE_REQUEST',
  UPDATE_PROFILE_SUCCCES = '@profile/UPDATE_PROFILE_SUCCCES',
  UPDATE_PROFILE_FAILURE = '@profile/UPDATE_PROFILE_FAILURE',
}

/**
 * Data types
 */

export interface ProfileDataType {
  page: Page<Profile, Profile>;
  entity: Profile;
  list: Profile[];
}

/**
 * State type
 */
export interface ProfileState {
  readonly data: ProfileDataType;
  readonly loading: boolean;
  readonly error: CustomError | undefined;
}
