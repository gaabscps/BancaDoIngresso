import OrderPayment from './OrderPayment';
import StatusType from './StatusType';

export default interface OrderTicket {
  orderId: string;
  orderItemId: string;
  pdvName: string;
  sectionName: string;
  isHalfPrice: boolean;
  clientCPF: string;
  saleDate: Date;
  paymentStatus: StatusType;
  saleValue: number;
  payments: OrderPayment[];
  ticketId?: string;
  productId?: string;
  comboId?: string;
}
