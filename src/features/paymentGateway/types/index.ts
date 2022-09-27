import Page from '@/model/Page';
import PaymentGateway from '@/model/PaymentGateway';

export type PaymentGatewayResponse = Page<PaymentGateway, PaymentGateway>;

export type PaymentGatewayRequestParams = Pick<
  Page<PaymentGateway, PaymentGateway>,
  'page' | 'pageSize' | 'order' | 'sort' | 'total'
>;
