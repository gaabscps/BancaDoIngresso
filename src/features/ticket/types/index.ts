import Page from '@/model/Page';
import ClientComment from '@/model/ClientComment';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks';
import OrderTicket from '@/model/OrderTicket';

export type TicketResponse = Page<OrderTicket, OrderTicket>;

export type TicketRequestParams = Pick<
  Page<OrderTicket, OrderTicket>,
  'page' | 'pageSize' | 'entity' | 'total'
>;

export type TicketCommentController = {
  orderTicket?: OrderTicket;
  comments: ClientComment[];
  formData: FormData;
  formErrors: FormErrors;
  onChange: OnChangeFormInput;
  onAdd: () => Promise<void>;
};
