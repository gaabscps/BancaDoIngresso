import Page from '@/model/Page';
import PaymentGateway from '@/model/PaymentGateway';

export type PaymentMethodsResponse = Page<PaymentGateway, PaymentGateway>;

export type PaymentMethodsRequestParams = Pick<
  Page<PaymentGateway, PaymentGateway>,
  'page' | 'pageSize' | 'order' | 'sort' | 'total'
>;
