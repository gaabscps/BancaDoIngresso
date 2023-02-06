import { FormData, FormErrors, IsFormValid, OnChangeFormInput } from '@/hooks';
import Ticket from '@/model/Ticket';
import EventPhaseCompletion from '@/model/EventPhaseCompletion';

export interface formSectorTicketProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
  isFormValid: IsFormValid;
}

export interface ticketStepProps {
  ticketState: Ticket | undefined;
  setTicketState: (ticketStep: Ticket) => void;
  phaseCompletion: EventPhaseCompletion | undefined;
}

export interface controllerEventProps {
  eventState: any;
  onChangeEvent: any;
  lastStep: any;
  groupOptions: any;
  handleGetGroupList: any;
  sectionList: any;
  handleGetPosSectionList: any;
  sectorConfig: any;
  handleGetSectorConfigList: any;
}
