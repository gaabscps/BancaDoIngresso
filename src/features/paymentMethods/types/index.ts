import Page from '@/model/Page';
import PaymentMethods from '@/model/PaymentMethods';

export type PaymentMethodsResponse = Page<PaymentMethods, PaymentMethods>;

export type PaymentMethodsRequestParams = Pick<
  Page<PaymentMethods, PaymentMethods>,
  'page' | 'pageSize' | 'order' | 'sort' | 'total'
>;
