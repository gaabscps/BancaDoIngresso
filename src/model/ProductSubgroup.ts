import ProductGroup from './ProductGroup';

export default interface ProductSubgroup {
  id: string;
  name: string;
  categoryGroup: ProductGroup;
  imageBase64: string;
}
