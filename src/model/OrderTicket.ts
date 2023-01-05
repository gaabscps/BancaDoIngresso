import OrderItemComment from './OrderItemComment';
import OrderPayment from './OrderPayment';
import PaymentStatus from './PaymentStatus';
import StatusType from './StatusType';

export default interface OrderTicket {
  orderId: string;
  orderItemId: string;
  pdvName: string;
  sectionName: string;
  isHalfPrice: boolean;
  clientCPF: string;
  saleDate: Date;
  orderPaymentStatus: PaymentStatus;
  ticketStatus: StatusType;
  saleValue: number;
  payments: OrderPayment[];
  comments: OrderItemComment[];
  reverseDate: Date;
  cancelDate: Date;
  ticketId?: string;
  productId?: string;
  comboId?: string;
}
