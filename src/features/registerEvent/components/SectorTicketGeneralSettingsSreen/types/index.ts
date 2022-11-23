import { FormData, FormErrors, OnChangeFormInput } from '@/hooks';
import Section from '@/model/Section';
import Ticket from '@/model/Ticket';
import { ShouldShowModal } from '../screens/ui';

export interface formGeneralSettingsProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
}

export interface onShouldShowModalTicketGeneralSettingsProps {
  value: ShouldShowModal;
  newTitleModal: string | React.ReactNode;
  sector?: Section;
}

export interface generalSettingsProps {
  onSave: () => Promise<void>;
  onReturnTap: () => void;
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
