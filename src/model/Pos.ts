import Pdv from './Pdv';
import PosStatus from './PosStatus';

export default interface Pos {
  id?: string;
  name: string;
  serialNumber: string;
  status: PosStatus;
  pdv: Pdv;
  model: string;
  telephoneOperator: string;
  cardOperator: string;
  expirationDate: Date;
}
