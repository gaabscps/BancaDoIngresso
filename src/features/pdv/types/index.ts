import Page from '@/model/Page';
import Pdv from '@/model/Pdv';

export type PdvResponse = Page<Pdv, Pdv>;

export type PdvRequestParams = Pick<
  Page<Pdv, Pdv>,
  'page' | 'pageSize' | 'order' | 'sort' | 'total'
>;

export interface NameFiles {
  [key: string]: string;
}
