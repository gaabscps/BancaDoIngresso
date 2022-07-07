/* eslint-disable no-case-declarations */
import { Reducer } from 'redux';
import ConfigDB, {
  ConfigDbDataColor,
  ConfigDbDataSettingsSidebar,
} from '../../../data/customizer/config';
import { CustomizerState, CustomizerTypes } from './types';

const INITIAL_STATE: CustomizerState = {
  data: {
    loading: false,
    customizer: ConfigDB.data,
    layout: 'ltr',
    sidebar_types: {} as ConfigDbDataSettingsSidebar,
    settings: '',
    color: {} as ConfigDbDataColor,
    mix_background_layout: '',
    animation: '',
  },
};

const reducer: Reducer<CustomizerState> = (state = INITIAL_STATE, action) => {
  const stateData = state.data;
  switch (action.type) {
    case CustomizerTypes.ADD_CUSTOMIZER:
      stateData.customizer = ConfigDB.data;
      return {
        ...state,
        loading: false,
        customizer: stateData.customizer,
      };
    case CustomizerTypes.ADD_LAYOUT:
      stateData.customizer.settings.layout_type = action.payload;
      return {
        ...state,
        loading: true,
        customizer: stateData.customizer,
        layout: stateData.customizer.settings.layout_type,
      };
    case CustomizerTypes.ADD_SIDEBAR_TYPES:
      stateData.customizer.settings.sidebar.type = action.payload;
      return {
        ...state,
        loading: true,
        customizer: stateData.customizer,
        sidebar_types: stateData.customizer.settings.sidebar,
      };
    case CustomizerTypes.ADD_SIDEBAR_SETTINGS:
      stateData.customizer.settings.sidebar_setting = action.payload;
      return {
        ...state,
        loading: true,
        customizer: stateData.customizer,
        settings: stateData.customizer.settings.sidebar_setting,
      };
    case CustomizerTypes.ADD_COLOR:
      const colors = action.payload;
      stateData.customizer.color.primary_color = colors.primary_color;
      stateData.customizer.color.secondary_color = colors.secondary_color;
      return {
        ...state,
        loading: true,
        customizer: stateData.customizer,
        color: stateData.customizer.color,
      };
    case CustomizerTypes.ADD_MIX_BACKGROUND_LAYOUT:
      stateData.customizer.color.mix_background_layout = action.payload;
      return {
        ...state,
        loading: true,
        customizer: stateData.customizer,
        mix_background_layout: stateData.customizer.color.mix_background_layout,
      };
    case CustomizerTypes.ROUTER_ANIMATION:
      stateData.customizer.router_animation = action.payload;
      return {
        ...state,
        loading: true,
        customizer: stateData.customizer,
        animation: stateData.customizer.router_animation,
      };
    default:
      return state;
  }
};

export default reducer;
