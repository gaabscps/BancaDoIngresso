import DiscountType from './DiscountType';

export default interface DiscountCoupon {
  id: string;
  name: string;
  code: string;
  amount: number | null;
  discountType: DiscountType;
  discount: number | null;
}
