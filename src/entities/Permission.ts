import Module from './Module';

export default interface PermissionDTO {
  id: string;
  name: string;
  description: string;
  module: Module;
  identifier: string;
}
