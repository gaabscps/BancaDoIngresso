import { action } from 'typesafe-actions';
import CustomError from '../../../entities/CustomError';
import Page from '../../../entities/Page';
import Profile from '../../../entities/Profile';
import ProfilePermission from '../../../entities/ProfilePermission';
import { ProfileDataType, ProfileTypes } from './types';

export const activateRequest = (
  id: string,
): {
  type: ProfileTypes.ACTIVATE_PROFILE_REQUEST;
  payload: string;
} => action(ProfileTypes.ACTIVATE_PROFILE_REQUEST, id);

export const activateSuccess = (): { type: ProfileTypes.ACTIVATE_PROFILE_SUCCCES } =>
  action(ProfileTypes.ACTIVATE_PROFILE_SUCCCES);

export const activateFailure = (
  error: CustomError | undefined,
): {
  type: ProfileTypes.ACTIVATE_PROFILE_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ProfileTypes.ACTIVATE_PROFILE_FAILURE, { error });

export const addPermissionsRequest = (
  entity: ProfilePermission,
): {
  type: ProfileTypes.ADD_PERMISSION_PROFILE_REQUEST;
  payload: ProfilePermission;
} => action(ProfileTypes.ADD_PERMISSION_PROFILE_REQUEST, entity);

export const addPermissionsSuccess = (): {
  type: ProfileTypes.ADD_PERMISSION_PROFILE_SUCCCES;
} => action(ProfileTypes.ADD_PERMISSION_PROFILE_SUCCCES);

export const addPermissionsFailure = (
  error: CustomError | undefined,
): {
  type: ProfileTypes.ADD_PERMISSION_PROFILE_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ProfileTypes.ADD_PERMISSION_PROFILE_FAILURE, { error });

export const createRequest = (
  entity: Profile,
): {
  type: ProfileTypes.CREATE_PROFILE_REQUEST;
  payload: Profile;
} => action(ProfileTypes.CREATE_PROFILE_REQUEST, entity);

export const createSuccess = (
  data: ProfileDataType,
): {
  type: ProfileTypes.CREATE_PROFILE_SUCCCES;
  payload: { data: ProfileDataType };
} => action(ProfileTypes.CREATE_PROFILE_SUCCCES, { data });

export const createFailure = (
  error: CustomError | undefined,
): {
  type: ProfileTypes.CREATE_PROFILE_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ProfileTypes.CREATE_PROFILE_FAILURE, { error });

export const deleteRequest = (
  id: string,
): {
  type: ProfileTypes.DELETE_PROFILE_REQUEST;
  payload: string;
} => action(ProfileTypes.DELETE_PROFILE_REQUEST, id);

export const deleteSuccess = (): { type: ProfileTypes.DELETE_PROFILE_SUCCCES } =>
  action(ProfileTypes.DELETE_PROFILE_SUCCCES);

export const deleteFailure = (
  error: CustomError | undefined,
): {
  type: ProfileTypes.DELETE_PROFILE_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ProfileTypes.DELETE_PROFILE_FAILURE, { error });

export const getAllRequest = (): {
  type: ProfileTypes.GET_ALL_PROFILE_REQUEST;
} => action(ProfileTypes.GET_ALL_PROFILE_REQUEST);

export const getAllSuccess = (
  data: ProfileDataType,
): {
  type: ProfileTypes.GET_ALL_PROFILE_SUCCCES;
  payload: { data: ProfileDataType };
} => action(ProfileTypes.GET_ALL_PROFILE_SUCCCES, { data });

export const getAllFailure = (
  error: CustomError | undefined,
): {
  type: ProfileTypes.GET_ALL_PROFILE_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ProfileTypes.GET_ALL_PROFILE_FAILURE, { error });

export const getRequest = (
  id: string,
): {
  type: ProfileTypes.GET_PROFILE_REQUEST;
  payload: string;
} => action(ProfileTypes.GET_PROFILE_REQUEST, id);

export const getSuccess = (
  data: ProfileDataType,
): {
  type: ProfileTypes.GET_PROFILE_SUCCCES;
  payload: { data: ProfileDataType };
} => action(ProfileTypes.GET_PROFILE_SUCCCES, { data });

export const getFailure = (
  error: CustomError | undefined,
): {
  type: ProfileTypes.GET_PROFILE_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ProfileTypes.GET_PROFILE_FAILURE, { error });

export const inactivateRequest = (
  id: string,
): {
  type: ProfileTypes.INACTIVATE_PROFILE_REQUEST;
  payload: string;
} => action(ProfileTypes.INACTIVATE_PROFILE_REQUEST, id);

export const inactivateSuccess = (): {
  type: ProfileTypes.INACTIVATE_PROFILE_SUCCCES;
} => action(ProfileTypes.INACTIVATE_PROFILE_SUCCCES);

export const inactivateFailure = (
  error: CustomError | undefined,
): {
  type: ProfileTypes.INACTIVATE_PROFILE_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ProfileTypes.INACTIVATE_PROFILE_FAILURE, { error });

export const listRequest = (
  page: Page<Profile, Profile>,
): {
  type: ProfileTypes.LIST_PROFILE_REQUEST;
  payload: Page<Profile, Profile>;
} => action(ProfileTypes.LIST_PROFILE_REQUEST, page);

export const listSuccess = (
  data: ProfileDataType,
): {
  type: ProfileTypes.LIST_PROFILE_SUCCCES;
  payload: { data: ProfileDataType };
} => action(ProfileTypes.LIST_PROFILE_SUCCCES, { data });

export const listFailure = (
  error: CustomError | undefined,
): {
  type: ProfileTypes.LIST_PROFILE_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ProfileTypes.LIST_PROFILE_FAILURE, { error });

export const updateRequest = (
  entity: Profile,
): {
  type: ProfileTypes.UPDATE_PROFILE_REQUEST;
  payload: Profile;
} => action(ProfileTypes.UPDATE_PROFILE_REQUEST, entity);

export const updateSuccess = (
  data: ProfileDataType,
): {
  type: ProfileTypes.UPDATE_PROFILE_SUCCCES;
  payload: { data: ProfileDataType };
} => action(ProfileTypes.UPDATE_PROFILE_SUCCCES, { data });

export const updateFailure = (
  error: CustomError | undefined,
): {
  type: ProfileTypes.UPDATE_PROFILE_FAILURE;
  payload: { error: CustomError | undefined };
} => action(ProfileTypes.UPDATE_PROFILE_FAILURE, { error });
