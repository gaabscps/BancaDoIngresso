import Address from './Address';
import Contractor from './Contractor';
import Event from './Event';

export default interface EventClose {
  childs?: Event[];
  contractor: Contractor;
  startDate: Date;
  endDate: Date;
  address: Address;
}
