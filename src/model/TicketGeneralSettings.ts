import CodeType from './CodeType';
import PrintType from './PrintType';

export default interface TicketGeneralSettings {
  sendTicketWhatsApp: boolean;
  codeType: CodeType;
  printType: PrintType;
  entranceGate: string;
  nameBeforePurchase: boolean;
  printNameTicket: boolean;
  requestCpf: boolean;
  printCpfTicket: boolean;
  validateCpf: boolean;
  purchaseLimitCpf: number;
}
