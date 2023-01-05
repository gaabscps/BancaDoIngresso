import Page from '@/model/Page';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks';
import OrderTicket from '@/model/OrderTicket';
import OrderItemComment from '@/model/OrderItemComment';

export type TicketResponse = Page<OrderTicket, OrderTicket>;

export type TicketRequestParams = Pick<
  Page<OrderTicket, OrderTicket>,
  'page' | 'pageSize' | 'entity' | 'total'
>;

export type TicketCommentController = {
  orderTicket?: OrderTicket;
  comments: OrderItemComment[];
  formData: FormData;
  formErrors: FormErrors;
  onChange: OnChangeFormInput;
  onAdd: () => Promise<void>;
};
