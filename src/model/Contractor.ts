import Address from './Address';
import BankAccount from './BankAccount';
import ContractorType from './ContractorType';
import Pix from './Pix';
import StatusType from './StatusType';
import User from './User';

export default interface Contractor {
  id: string;
  status: StatusType;
  name: string;
  document: string;
  telephone: string;
  email: string;
  imageBase64?: string;
  address: Address;
  contractorType: ContractorType;
  bankAccount: BankAccount[];
  pixKey: Pix[];
  users: User[];
}
