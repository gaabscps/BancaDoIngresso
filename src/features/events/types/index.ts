import Page from '@/model/Page';
import Event from '@/model/Event';

export type EventResponse = Page<Event, Event>;

export type EventRequestParams = Pick<
  Page<Event, Event>,
  'page' | 'pageSize' | 'order' | 'sort' | 'total'
>;

export interface NameFiles {
  [key: string]: string;
}
