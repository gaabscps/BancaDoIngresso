import Menu from './Menu';
import Module from './Module';
import Permission from './Permission';

export default interface SubMenu {
  id: string;
  name: string;
  menu: Menu;
  module: Module;
  permission: Permission;
  icon: string;
  link: string;
  position: number;
  actived: boolean;
}
