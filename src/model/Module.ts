import Permission from './Permission';

export default interface Module {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
}
