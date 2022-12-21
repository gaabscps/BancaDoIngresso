export default interface ProductSectionEvent {
  sectionId: string;
  sectionNome: string;
  sectionImage: string;
  sectionGroup: sectionGroupProps[];
}

export type ProductProps = {
  id: string;
  group: {
    id: string;
    name: string;
    imageBase64: string;
  };
  subgroup: {
    id: string;
    name: string;
    categoryGroup: {
      id: string;
      name: string;
      imageBase64: string;
    };
    imageBase64: string;
  };
  name: string;
  amount: number;
  unitValue: number;
  unitMeasurement: string;
  totalValue: number;
  imageBase64: string;
  physicalSale: {
    id: string;
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
    id: string;
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
  partialPayment: boolean;
  allowDiscountCoupon: boolean;
  discountCoupons: discountProps[];
};

export type ComboProps = {
  id: string;
  group: {
    id: string;
    name: string;
    imageBase64: string;
  };
  subgroup: {
    id: string;
    name: string;
    categoryGroup: {
      id: string;
      name: string;
      imageBase64: string;
    };
    imageBase64: string;
  };
  name: string;
  amount: number;
  totalValue: number;
  imageBase64: string;
  products: [
    {
      id: string;
      name: string;
      amount: number;
    },
  ];
  formPrinting: number;
  hasCourtesy: boolean;
  physicalSale: {
    id: string;
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
    id: string;
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
  partialPayment: boolean;
  allowDiscountCoupon: boolean;
  discounts: discountProps[];
  status: number;
};

export type subGroupsProps = {
  categorySubGroupId: string;
  categorySubGroupName: string;
  products: ProductProps[];
  combos: ComboProps[];
};
export type discountProps = {
  id: string;
  name: string;
  code: string;
  amount: number;
  discountType: number;
  discount: number;
  amountSold: number;
};

export type sectionGroupProps = {
  categoryGroupId: string;
  categoryGroupName: string;
  subGroups: subGroupsProps[];
};
