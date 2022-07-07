import { action } from 'typesafe-actions';
import { ConfigDbDataColor } from '../../../data/customizer/config';
import { CustomizerTypes } from './types';

export const addCustomizer = (): {
  type: CustomizerTypes.ADD_CUSTOMIZER;
} => action(CustomizerTypes.ADD_CUSTOMIZER);

export const addLayout = (
  data: string,
): {
  type: CustomizerTypes.ADD_LAYOUT;
  payload: string;
} => action(CustomizerTypes.ADD_LAYOUT, data);

export const addSidebarTypes = (
  data: string,
): {
  type: CustomizerTypes.ADD_SIDEBAR_TYPES;
  payload: string;
} => action(CustomizerTypes.ADD_SIDEBAR_TYPES, data);

export const addSidebarSettings = (
  data: string,
): {
  type: CustomizerTypes.ADD_SIDEBAR_SETTINGS;
  payload: string;
} => action(CustomizerTypes.ADD_SIDEBAR_SETTINGS, data);

export const addColor = (
  data: ConfigDbDataColor,
): {
  type: CustomizerTypes.ADD_COLOR;
  payload: ConfigDbDataColor;
} => action(CustomizerTypes.ADD_COLOR, data);

export const addMixBackgroundLayout = (
  data: string,
): {
  type: CustomizerTypes.ADD_MIX_BACKGROUND_LAYOUT;
  payload: string;
} => action(CustomizerTypes.ADD_MIX_BACKGROUND_LAYOUT, data);

export const routerAnimation = (
  data: string,
): {
  type: CustomizerTypes.ROUTER_ANIMATION;
  payload: string;
} => action(CustomizerTypes.ROUTER_ANIMATION, data);
