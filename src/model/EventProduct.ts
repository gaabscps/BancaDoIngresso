import CardFees from './CardFees';
import DiscountCoupon from './DiscountCoupon';
import ProductGroup from './ProductGroup';
import ProductSubgroup from './ProductSubgroup';

export default interface EventProduct {
  id: string;
  group: ProductGroup;
  subgroup: ProductSubgroup;
  name: string;
  amount: number;
  unitValue: number;
  totalValue: number;
  imageBase64: string;
  physicalSale: CardFees;
  websiteSale: CardFees;
  waiter: number;
  partialPayment: boolean;
  allowDiscountCoupon: boolean;
  discountCoupons: DiscountCoupon[];
  allowSellingWebsite: boolean;
  unitMeasurement: any;
}
