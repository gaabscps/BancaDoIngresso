import ChargeSetup from '@/model/ChargeSetup';
import Page from '@/model/Page';

export type ChargeSetupResponse = Page<ChargeSetup, ChargeSetup>;

export type ChargeSetupRequestParams = Pick<
  Page<ChargeSetup, ChargeSetup>,
  'page' | 'pageSize' | 'order' | 'sort' | 'total'
>;
