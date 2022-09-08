export default interface CardFees {
  id: string;
  allowCreditCardPayment: boolean;
  debit: number;
  credit: number;
  bankSlip: number;
  pix: number;
  administrateTax: number;
  installments: number;
  fee: number;
}
