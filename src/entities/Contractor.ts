import Address from './Address';
import User from './User';

export default interface Contractor {
  id: any;
  name: string;
  document: string;
  telephone: string;
  email: string;
  imageBase64: string;
  address: Address;
  users: User[];
}
