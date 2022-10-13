import Bank from './Bank';

export default interface Pix {
  id: string;
  contractorId: string;
  key: string;
  pixKeyType: number;
  bank: Bank;
}
