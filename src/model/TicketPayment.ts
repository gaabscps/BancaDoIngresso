import CardFees from './CardFees';
import DiscountCoupon from './DiscountCoupon';
import EventTicketSimple from './EventTicketSimple';
import PaymentGateway from './PaymentGateway';
import Tickets from './Tickets';

export default interface TicketPayment {
  id: string;
  eventTickets: EventTicketSimple[];
  posGateway: PaymentGateway;
  websiteGateway: PaymentGateway;
  websiteInstallmentLimit: number;
  posInstallmentLimit: number;
  allowFractionalPayment: boolean;
  allowVariableRate: boolean;
  allowVariableValue: boolean;
  allowPaymentBankSlip: boolean;
  allowPaymentPIX: boolean;
  allowContactlessPayment: boolean;
  allowSellingWebsite: boolean;
  allowSellingPos: boolean;
  printReceipt: boolean;
  physicalSale: CardFees;
  websiteSale: CardFees;
  allowDiscount: boolean;
  allowDiscountCoupon: boolean;
  discountCoupons: DiscountCoupon[];
}

export const parseTicketPayments = (
  tickets: Tickets[] | undefined,
): TicketPayment[] | undefined => {
  if (tickets && tickets.length > 0) {
    const list: TicketPayment[] = [];
    tickets.forEach(data => {
      let found = false;
      const eventTicket: EventTicketSimple = {
        id: data.id,
        name: data.name,
      };
      if (data.payment && data.payment.id && data.payment.id.trim().length > 0) {
        const paymentId = data.payment.id;
        list.forEach(payment => {
          if (payment.id === paymentId) {
            payment.eventTickets.push(eventTicket);
            found = true;
          }
        });

        if (!found) {
          const ticketPayment: TicketPayment = {
            id: paymentId,
            eventTickets: [],
            posGateway: data.payment.posGateway,
            websiteGateway: data.payment.websiteGateway,
            websiteInstallmentLimit: data.payment.websiteInstallmentLimit,
            posInstallmentLimit: data.payment.posInstallmentLimit,
            allowFractionalPayment: data.payment.allowFractionalPayment,
            allowVariableRate: data.payment.allowVariableRate,
            allowVariableValue: data.payment.allowVariableValue,
            allowPaymentBankSlip: data.payment.allowPaymentBankSlip,
            allowPaymentPIX: data.payment.allowPaymentPIX,
            allowContactlessPayment: data.payment.allowContactlessPayment,
            allowSellingWebsite: data.payment.allowSellingWebsite,
            allowSellingPos: data.payment.allowSellingPos,
            printReceipt: data.payment.printReceipt,
            physicalSale: data.payment.physicalSale,
            websiteSale: data.payment.websiteSale,
            allowDiscount: data.payment.allowDiscount,
            allowDiscountCoupon: data.payment.allowDiscountCoupon,
            discountCoupons: data.payment.discountCoupons,
          };
          ticketPayment.eventTickets.push(eventTicket);
          list.push(ticketPayment);
        }
      }
    });
    return list;
  }
  return undefined;
};
