import Page from '@/model/Page';
import Product from '@/model/Product';

export type ProductResponse = Page<Product, Product>;

export type ProductRequestParams = Pick<
  Page<Product, Product>,
  'page' | 'pageSize' | 'order' | 'sort' | 'total'
>;

export interface NameFiles {
  [key: string]: string;
}
