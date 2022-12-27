import { FormData, FormErrors, OnChangeFormInput, IsFormValid } from '@/hooks';
import Section from '@/model/Section';
import Tickets from '@/model/Tickets';
import { ShouldShowModal } from '../screens/ui';

export interface formGeneralSettingsProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
  isFormValid: IsFormValid;
}

export interface onShouldShowModalTicketGeneralSettingsProps {
  value: ShouldShowModal;
  newTitleModal: string | React.ReactNode;
  sector?: Section;
}

export interface generalSettingsProps {
  onSave: () => Promise<void>;
  onReturnTab: () => void;
  onNextTab: () => Promise<void>;
}

export interface ticketActionsProps {
  onGet: (ticketSelected: Tickets) => void;
  onCancelEdit: () => void;
  onShowDelete: (ticketSelected: Tickets) => void;
}

export interface ticketStatesProps {
  ticket: Tickets | undefined;
  ticketList: Tickets[];
}
