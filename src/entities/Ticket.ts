import Payment from './Payment';
import Printer from './Printer';
import Section from './Section';
import TicketBatch from './TicketBatch';
import TicketGeneralSettings from './TicketGeneralSettings';

export default interface Ticket {
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
  payment?: Payment;
  generalSettings?: TicketGeneralSettings;
}
