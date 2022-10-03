import Page from '@/model/Page';
import Combo from '@/model/Combo';

export type ComboResponse = Page<Combo, Combo>;

export type ComboRequestParams = Pick<
  Page<Combo, Combo>,
  'page' | 'pageSize' | 'order' | 'sort' | 'total'
>;

export interface NameFiles {
  [key: string]: string;
}
