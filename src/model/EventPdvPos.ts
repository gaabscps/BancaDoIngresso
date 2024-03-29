import CardFees from './CardFees';
import Pdv from './Pdv';
import Pos from './Pos';

export default interface EventPdvPos {
  pdv: Pdv;
  pos: Pos;
  waiter: number;
  cardFees: CardFees;
  bindingDate: Date;
}
