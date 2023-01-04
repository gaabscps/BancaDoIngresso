import Page from '@/model/Page';
import Client from '@/model/Client';
import ClientComment from '@/model/ClientComment';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks';

export type ClientResponse = Page<Client, Client>;

export type ClientRequestParams = Pick<
  Page<Client, Client>,
  'page' | 'pageSize' | 'order' | 'entity' | 'sort' | 'total'
>;

export type ClientCommentController = {
  client?: Client;
  comments: ClientComment[];
  formData: FormData;
  formErrors: FormErrors;
  onChange: OnChangeFormInput;
  onAdd: () => Promise<void>;
};
