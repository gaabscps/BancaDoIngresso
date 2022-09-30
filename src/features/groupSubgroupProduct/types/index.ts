import Page from '@/model/Page';
import GroupSubgroupProduct from '@/model/GroupSubgroupProduct';

export type GroupSubgroupProductResponse = Page<GroupSubgroupProduct, GroupSubgroupProduct>;

export type GroupSubgroupProductRequestParams = Pick<
  Page<GroupSubgroupProduct, GroupSubgroupProduct>,
  'page' | 'pageSize' | 'order' | 'sort' | 'total'
>;
