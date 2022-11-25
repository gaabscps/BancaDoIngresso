import { FormData, FormErrors, OnChangeFormInput, IsFormValid } from '@/hooks';
import Section from '@/model/Section';
import Ticket from '@/model/Ticket';
import { ShouldShowModal } from '../screens/ui';

export interface formProductProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
  isFormValid: IsFormValid;
}

export interface onShouldShowModalTicketProductProps {
  value: ShouldShowModal;
  newTitleModal: string | React.ReactNode;
  sector?: Section;
}

export interface productProps {
  onSave: () => Promise<void>;
  onFirstTab: () => void;
  onReturnTap: () => void;
  onNextTap: () => Promise<void>;
}

export interface ticketActionsProps {
  onGet: (ticketSelected: Ticket) => void;
  onCancelEdit: () => void;
  onShowDelete: (ticketSelected: Ticket) => void;
}

export interface ticketStatesProps {
  ticket: Ticket | undefined;
  ticketList: Ticket[];
}
