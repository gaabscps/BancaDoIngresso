import EventSection from './EventSection';
import Pos from './Pos';

export default interface EventPos {
  pos: Pos;
  waiter: number;
  commission: number;
  allowDiscount: boolean;
  eventSections: EventSection[];
}
