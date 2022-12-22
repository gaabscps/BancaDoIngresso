import { FormData, FormErrors, IsFormValid, OnChangeFormInput } from '@/hooks';
import Ticket from '@/model/Ticket';

export interface formSectorTicketProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
  isFormValid: IsFormValid;
}

export interface ticketStepProps {
  ticketState: Ticket | undefined;
  setTicketState: (ticketStep: Ticket) => void;
}
