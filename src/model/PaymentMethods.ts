import PaymentGateway from './PaymentGateway';

export default interface PaymentMethods {
  id?: string;
  name: string;
  paymentGateway: PaymentGateway;
}
