import { NameFiles } from '@/features/registerEvent/types';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks';
import Printer from '@/model/Printer';
import Section from '@/model/Section';
import Ticket from '@/model/Ticket';
import TicketBatch from '@/model/TicketBatch';
import { ShouldShowModal } from '../screens/ui';

export interface formMainSettingsProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
  onChangeFormFileInput: (inputName: string) => (file: File | undefined) => void;
  formNameFiles: NameFiles;
}

export interface formBatchsProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
  onChangeFormFileInput: (inputName: string) => (file: File | undefined) => void;
  formNameFiles: NameFiles;
}

export interface formSectorProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
}

export interface onShouldShowModalTicketMainSettingsProps {
  value: ShouldShowModal;
  newTitleModal: string | React.ReactNode;
  sector?: Section;
}

export interface modalConfigTicketMainSettingsProps {
  title: string | React.ReactNode;
  visible: boolean;
  onChangeTitle: (title: string) => void;
  onToggle: () => void;
  onShouldShowModal: (props: onShouldShowModalTicketMainSettingsProps) => void;
  shouldShowModal: ShouldShowModal;
}

export interface mainSettingsProps {
  onSave: () => Promise<void>;
}

export interface sectorActionsProps {
  onSave: () => Promise<void>;
}

export interface batchActionsProps {
  onAdd: () => Promise<void>;
  onGet: (batch: TicketBatch) => Promise<void>;
  onEdit: (batch: TicketBatch) => Promise<void>;
  onCancelEdit: () => Promise<void>;
  onDelete: (batch: TicketBatch) => Promise<void>;
}

export interface ticketActionsProps {
  onGet: (ticketSelected: Ticket) => void;
  onCancelEdit: () => void;
  onShowDelete: (ticketSelected: Ticket) => void;
}

export interface sectorStatesProps {
  sector: Section | undefined;
  setSector: React.Dispatch<React.SetStateAction<Section | undefined>>;
  sectorList: Section[];
  setSectorList: React.Dispatch<React.SetStateAction<Section[]>>;
}

export interface batchStatesProps {
  batch: TicketBatch | undefined;
  setBatch: React.Dispatch<React.SetStateAction<TicketBatch | undefined>>;
  batchList: TicketBatch[];
  setBatchList: React.Dispatch<React.SetStateAction<TicketBatch[]>>;
}

export interface printerStatesProps {
  printerList: Printer[];
  setPrinterList: React.Dispatch<React.SetStateAction<Printer[]>>;
}

export interface ticketStatesProps {
  ticket: Ticket | undefined;
  ticketList: Ticket[];
}
