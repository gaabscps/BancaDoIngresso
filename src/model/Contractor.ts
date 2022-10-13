import Address from './Address';
import BankAccount from './BankAccount';
import Pix from './Pix';
import User from './User';

export default interface Contractor {
  id: string;
  name: string;
  document: string;
  telephone: string;
  email: string;
  imageBase64?: string;
  address: Address;
  contractorType: {
    id: string;
    name: string;
  };
  bankAccount: BankAccount[];
  pixKey: Pix[];
  users: User[];
}
