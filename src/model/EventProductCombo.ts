import CardFees from './CardFees';
import ComboProduct from './ComboProduct';
import DiscountCoupon from './DiscountCoupon';
import FormPrinting from './FormPrinting';
import ProductGroup from './ProductGroup';
import ProductSubgroup from './ProductSubgroup';

export default interface EventProductCombo {
  id: string;
  group: ProductGroup;
  subgroup: ProductSubgroup;
  name: string;
  amount: number;
  totalValue: number;
  imageBase64: string;
  products: ComboProduct[];
  formPrinting: FormPrinting;
  hasCourtesy: boolean;
  physicalSale: CardFees;
  websiteSale: CardFees;
  waiter: number;
  partialPayment: boolean;
  allowDiscountCoupon: boolean;
  discounts: DiscountCoupon[];
}
