import { FormData, FormErrors, OnChangeFormInput } from '@/hooks';
import Ticket from '@/model/Ticket';

export interface formSectorTicketProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
}

export interface ticketStepProps {
  ticketState: Ticket | undefined;
  setTicketState: (ticketStep: Ticket) => void;
}
