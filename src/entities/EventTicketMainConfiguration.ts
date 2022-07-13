import Printer from './Printer';
import Section from './Section';
import Ticket from './Ticket';
import TicketBatch from './TicketBatch';

export default interface EventTicketMainConfiguration {
  id: string;
  eventSection: Section;
  name: string;
  hasHalfPrice: boolean;
  percentageHalfPrice: number;
  amountHalfPrice: number;
  hasCourtesy: boolean;
  amountCourtesy: number;
  numberTickets: boolean;
  printLayoutBase64: string;
  printImageBase64: string;
  printer: Printer;
  copies: number;
  reprint: boolean;
  printBatchNumber: boolean;
  observation: string;
  batchs: TicketBatch[];
}

export const parseTicketMainConfigurations = (
  tickets: Ticket[] | undefined,
): EventTicketMainConfiguration[] | undefined => {
  if (tickets && tickets.length > 0) {
    const list: EventTicketMainConfiguration[] = [];
    tickets.forEach(data => {
      const entity: EventTicketMainConfiguration = {
        id: data.id,
        eventSection: data.eventSection,
        name: data.name,
        hasHalfPrice: data.hasHalfPrice,
        percentageHalfPrice: data.percentageHalfPrice,
        amountHalfPrice: data.amountHalfPrice,
        hasCourtesy: data.hasCourtesy,
        amountCourtesy: data.amountCourtesy,
        numberTickets: data.numberTickets,
        printLayoutBase64: data.printLayoutBase64,
        printImageBase64: data.printImageBase64,
        printer: data.printer,
        copies: data.copies,
        reprint: data.reprint,
        printBatchNumber: data.printBatchNumber,
        observation: data.observation,
        batchs: data.batchs,
      };
      list.push(entity);
    });
    return list;
  }
  return undefined;
};
