import SubgroupProduct from '@/model/SubgroupProduct';
import GroupProduct from '@/model/GroupProduct';
import Page from '@/model/Page';

export type GroupProductResponse = Page<GroupProduct, GroupProduct>;

export type SubGroupProductResponse = SubgroupProduct[];
export type SubGroupProductRequestParams = SubgroupProduct[];

export type GroupProductRequestParams = Page<GroupProduct, GroupProduct>;
