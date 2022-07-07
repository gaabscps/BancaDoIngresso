export interface ConfigDbDataSettingsSidebar {
  type: string;
  body_type: string;
}

export interface ConfigDbDataSettings {
  layout_type: string;
  sidebar: ConfigDbDataSettingsSidebar;
  sidebar_setting: string;
}

export interface ConfigDbDataColor {
  layout_version: string;
  color: string;
  primary_color: string;
  secondary_color: string;
  mix_background_layout: string;
}

export interface ConfigDbData {
  settings: ConfigDbDataSettings;
  color: ConfigDbDataColor;
  router_animation: string;
}

export class ConfigDB {
  static data: ConfigDbData = {
    settings: {
      layout_type: 'ltr',
      sidebar: {
        type: 'compact-wrapper',
        body_type: 'sidebar-icon',
      },
      sidebar_setting: 'default-sidebar',
    },
    color: {
      layout_version: 'light',
      color: 'color-1',
      primary_color: '#D8413A',
      secondary_color: '#D8231B',
      mix_background_layout: 'light-only',
    },
    router_animation: 'fadeIn',
  };
}
export default ConfigDB;
