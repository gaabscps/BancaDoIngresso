import Module from './Module';
import Permission from './Permission';
import SubMenu from './SubMenu';

export default interface Menu {
  id: string;
  name: string;
  module: Module;
  permission: Permission;
  icon: string;
  link: string;
  position: number;
  subMenus: SubMenu[];
  actived: boolean;
}
