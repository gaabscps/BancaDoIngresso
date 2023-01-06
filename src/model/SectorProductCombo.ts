import SectorProductComboProduct from './SectorProductComboProduct';
import StatusType from './StatusType';

export default interface SectorProductCombo {
  id?: string;
  group: {
    id?: string;
    name: string;
    imageBase64?: string;
  };
  subgroup: {
    id?: string;
    name: string;
    categoryGroup?: {
      id: string;
      name: string;
      imageBase64: string;
    };
    imageBase64?: string;
  };
  name: string;
  amount: number;
  totalValue: number;
  imageBase64: string;
  products: SectorProductComboProduct[];
  formPrinting: number;
  hasCourtesy: boolean;
  physicalSale: {
    id?: string;
    allowCreditCardPayment: boolean;
    debit: number;
    credit: number;
    bankSlip: number;
    pix: number;
    administrateTax: number;
    installments: number;
    fee: number;
  };
  allowSellingWebsite: boolean;
  websiteSale: {
    id?: string;
    allowCreditCardPayment: boolean;
    debit: number;
    credit: number;
    bankSlip: number;
    pix: number;
    administrateTax: number;
    installments: number;
    fee: number;
  };
  waiter: number;
  partialPayment: true;
  allowDiscountCoupon: true;
  discounts: [
    {
      id?: string;
      name: string;
      code: string;
      amount: number;
      discountType: number;
      discount: number;
    },
  ];
  status: StatusType;
  wasConfig?: boolean;
}
