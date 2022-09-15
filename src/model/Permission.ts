import Module from './Module';

export default interface Permission {
  id: string;
  name: string;
  description: string;
  module: Module;
  identifier: string;
}
