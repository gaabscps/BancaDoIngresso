import Permission from './Permission';

export default interface Profile {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
}
