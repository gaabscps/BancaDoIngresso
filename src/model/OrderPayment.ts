import PaymentStatus from './PaymentStatus';
import PaymentType from './PaymentType';

export default interface OrderPayment {
  transaction: string;
  paymentType: PaymentType;
  paymentStatus: PaymentStatus;
  paymentValue: number;
  paymentDate: Date;
  installments: number;
  clientCardNumber: string;
  creditCardBrand: string;
}
