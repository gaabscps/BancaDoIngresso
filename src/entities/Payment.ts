import CardFees from './CardFees';
import DiscountCoupon from './DiscountCoupon';
import PaymentGateway from './PaymentGateway';

export default interface Payment {
  id: string;
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
