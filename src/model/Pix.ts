import Bank from './Bank';
import PixType from './PixType';

export default interface Pix {
  id: string;
  contractorId: string;
  key: string;
  pixKeyType: PixType;
  bank: Bank;
}
