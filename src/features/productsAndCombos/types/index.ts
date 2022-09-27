import Page from '@/model/Page';
import Pos from '@/model/Pos';

export type PosResponse = Page<Pos, Pos>;

export type PosRequestParams = Pick<
  Page<Pos, Pos>,
  'page' | 'pageSize' | 'order' | 'sort' | 'total'
>;
