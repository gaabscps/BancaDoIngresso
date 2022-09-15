import ProductGroup from './ProductGroup';

export default interface ProductSubgroup {
  id: string;
  name: string;
  productGroup: ProductGroup;
  imageBase64: string;
}
