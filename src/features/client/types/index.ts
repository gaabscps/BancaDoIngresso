import Page from '@/model/Page';
import Client from '@/model/Client';

export type ClientResponse = Page<Client, Client>;

export type ClientRequestParams = Pick<
  Page<Client, Client>,
  'page' | 'pageSize' | 'order' | 'entity' | 'sort' | 'total'
>;
