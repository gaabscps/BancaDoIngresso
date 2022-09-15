import Section from './Section';
import Ticket from './Ticket';

export default interface EventSectionTicket {
  section: Section;
  tickets: Ticket[];
}
