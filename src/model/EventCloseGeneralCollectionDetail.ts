import EventCloseTicket from './EventCloseTicket';
import Section from './Section';

export default interface EventCloseGeneralCollectionDetail {
  section: Section;
  tickets: EventCloseTicket[];
}
