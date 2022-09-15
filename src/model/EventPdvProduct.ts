import EventSection from './EventSection';
import Pdv from './Pdv';

export default interface EventPdvProduct {
  pdv: Pdv;
  eventSections: EventSection[];
}
