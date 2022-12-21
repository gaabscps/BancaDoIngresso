import Ticket from './Ticket';

export default interface EventTicket {
  eventId: string;
  tickets?: Ticket[];
}
