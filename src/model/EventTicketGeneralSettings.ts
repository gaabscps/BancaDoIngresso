import CodeType from './CodeType';
import EventTicketSimple from './EventTicketSimple';
import PrintType from './PrintType';
import Tickets from './Tickets';

export default interface EventTicketGeneralSettings {
  eventTickets: EventTicketSimple[];
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

export const parseTicketGeneralSettings = (
  tickets: Tickets[] | undefined,
): EventTicketGeneralSettings[] | undefined => {
  if (tickets && tickets.length > 0) {
    const list: EventTicketGeneralSettings[] = [];
    tickets.forEach(data => {
      let found = false;
      const eventTicket: EventTicketSimple = {
        id: data.id,
        name: data.name,
      };
      if (data.generalSettings && data.generalSettings) {
        const {
          sendTicketWhatsApp,
          codeType,
          printType,
          entranceGate,
          nameBeforePurchase,
          printNameTicket,
          requestCpf,
          printCpfTicket,
          validateCpf,
          purchaseLimitCpf,
        } = data.generalSettings;

        list.forEach(generalSettings => {
          if (
            sendTicketWhatsApp === generalSettings.sendTicketWhatsApp &&
            codeType === generalSettings.codeType &&
            printType === generalSettings.printType &&
            entranceGate === generalSettings.entranceGate &&
            nameBeforePurchase === generalSettings.nameBeforePurchase &&
            printNameTicket === generalSettings.printNameTicket &&
            requestCpf === generalSettings.requestCpf &&
            printCpfTicket === generalSettings.printCpfTicket &&
            validateCpf === generalSettings.validateCpf &&
            purchaseLimitCpf === generalSettings.purchaseLimitCpf
          ) {
            generalSettings.eventTickets.push(eventTicket);
            found = true;
          }
        });

        if (!found) {
          const eventTicketGeneralSettings: EventTicketGeneralSettings = {
            eventTickets: [],
            sendTicketWhatsApp,
            codeType,
            printType,
            entranceGate,
            nameBeforePurchase,
            printNameTicket,
            requestCpf,
            printCpfTicket,
            validateCpf,
            purchaseLimitCpf,
          };
          eventTicketGeneralSettings.eventTickets.push(eventTicket);
          list.push(eventTicketGeneralSettings);
        }
      }
    });
    return list;
  }
  return undefined;
};
