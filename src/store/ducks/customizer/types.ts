import {
  ConfigDbData,
  ConfigDbDataColor,
  ConfigDbDataSettingsSidebar,
} from '../../../data/customizer/config';

/**
 * Action types
 */

// eslint-disable-next-line no-shadow
export enum CustomizerTypes {
  ADD_CUSTOMIZER = '@customizer/ADD_CUSTOMIZER',
  ADD_LAYOUT = '@customizer/ADD_LAYOUT',
  ADD_SIDEBAR_TYPES = '@customizer/ADD_SIDEBAR_TYPES',
  ADD_SIDEBAR_SETTINGS = '@customizer/ADD_SIDEBAR_SETTINGS',
  ADD_COLOR = '@customizer/ADD_COLOR',
  ADD_MIX_BACKGROUND_LAYOUT = '@customizer/ADD_MIX_BACKGROUND_LAYOUT',
  ROUTER_ANIMATION = '@customizer/ROUTER_ANIMATION',
}

export interface CustomizerDataType {
  loading: boolean;
  customizer: ConfigDbData;
  layout: string;
  sidebar_types: ConfigDbDataSettingsSidebar;
  settings: string;
  color: ConfigDbDataColor;
  mix_background_layout: string;
  animation: string;
}

/**
 * State type
 */
export interface CustomizerState {
  readonly data: CustomizerDataType;
}
