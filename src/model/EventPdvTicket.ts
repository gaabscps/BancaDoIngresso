import EventSectionTicket from './EventSectionTicket';
import Pdv from './Pdv';

export default interface EventPdvTicket {
  pdv: Pdv;
  sectionTickets: EventSectionTicket[];
  link?: string;
}
