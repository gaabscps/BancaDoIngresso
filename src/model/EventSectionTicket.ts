import Section from './Section';
import Tickets from './Tickets';

export default interface EventSectionTicket {
  section: Section;
  tickets: Tickets[];
}
