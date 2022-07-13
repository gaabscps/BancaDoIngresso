import CustomError from '../../../entities/CustomError';
import Page from '../../../entities/Page';
import Section from '../../../entities/Section';
/**
 * Action types
 */

// eslint-disable-next-line no-shadow
export enum SectionTypes {
  ACTIVATE_SECTION_REQUEST = '@section/ACTIVATE_SECTION_REQUEST',
  ACTIVATE_SECTION_SUCCCES = '@section/ACTIVATE_SECTION_SUCCCES',
  ACTIVATE_SECTION_FAILURE = '@section/ACTIVATE_SECTION_FAILURE',
  CREATE_SECTION_REQUEST = '@section/CREATE_SECTION_REQUEST',
  CREATE_SECTION_SUCCCES = '@section/CREATE_SECTION_SUCCCES',
  CREATE_SECTION_FAILURE = '@section/CREATE_SECTION_FAILURE',
  DELETE_SECTION_REQUEST = '@section/DELETE_SECTION_REQUEST',
  DELETE_SECTION_SUCCCES = '@section/DELETE_SECTION_SUCCCES',
  DELETE_SECTION_FAILURE = '@section/DELETE_SECTION_FAILURE',
  GET_ALL_SECTION_REQUEST = '@section/GET_ALL_SECTION_REQUEST',
  GET_ALL_SECTION_SUCCCES = '@section/GET_SECTION_SUCCCES',
  GET_ALL_SECTION_FAILURE = '@section/GET_SECTION_FAILURE',
  GET_SECTION_REQUEST = '@section/GET_SECTION_REQUEST',
  GET_SECTION_SUCCCES = '@section/GET_SECTION_SUCCCES',
  GET_SECTION_FAILURE = '@section/GET_SECTION_FAILURE',
  INACTIVATE_SECTION_REQUEST = '@section/INACTIVATE_SECTION_REQUEST',
  INACTIVATE_SECTION_SUCCCES = '@section/INACTIVATE_SECTION_SUCCCES',
  INACTIVATE_SECTION_FAILURE = '@section/INACTIVATE_SECTION_FAILURE',
  LIST_SECTION_REQUEST = '@section/LIST_SECTION_REQUEST',
  LIST_SECTION_SUCCCES = '@section/LIST_SECTION_SUCCCES',
  LIST_SECTION_FAILURE = '@section/LIST_SECTION_FAILURE',
  UPDATE_SECTION_REQUEST = '@section/UPDATE_SECTION_REQUEST',
  UPDATE_SECTION_SUCCCES = '@section/UPDATE_SECTION_SUCCCES',
  UPDATE_SECTION_FAILURE = '@section/UPDATE_SECTION_FAILURE',
}

/**
 * Data types
 */

export interface SectionDataType {
  page: Page<Section, Section>;
  entity: Section;
  list: Section[];
}

/**
 * State type
 */
export interface SectionState {
  readonly data: SectionDataType;
  readonly loading: boolean;
  readonly error: CustomError | undefined;
}
