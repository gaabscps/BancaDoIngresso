import Page from '@/model/Page';
import GroupProduct from '@/model/GroupProduct';
import SubgruopProduct from '@/model/SubgruopProduct';

export type GroupProductResponse = Page<GroupProduct, GroupProduct>;
export type GroupProductRequestParams = Page<SubgruopProduct, SubgruopProduct>;

export type SubGroupProductResponse = Pick<
  Page<GroupProduct, GroupProduct>,
  'page' | 'pageSize' | 'order' | 'sort' | 'total'
>;
export type SubGroupProductRequestParams = Pick<
  Page<GroupProduct, GroupProduct>,
  'page' | 'pageSize' | 'order' | 'sort' | 'total'
>;
