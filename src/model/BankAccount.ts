import Bank from './Bank';

export default interface BankAccount {
  id: string;
  contractorId: string;
  agency: string;
  account: string;
  digit: string;
  bank: Bank;
}
