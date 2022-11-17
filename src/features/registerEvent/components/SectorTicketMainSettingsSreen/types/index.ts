import { NameFiles } from '@/features/registerEvent/types';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks';
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
  sector?: any;
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
  onGet: (batch: any) => Promise<void>;
  onEdit: (batch: any) => Promise<void>;
  onCancelEdit: () => Promise<void>;
  onDelete: (batch: any) => Promise<void>;
}

export interface sectorStatesProps {
  sector: any | undefined;
  setSector: React.Dispatch<React.SetStateAction<any | undefined>>;
  sectorList: any[];
  setSectorList: React.Dispatch<React.SetStateAction<any[]>>;
}

export interface batchStatesProps {
  batch: any | undefined;
  setBatch: React.Dispatch<React.SetStateAction<any | undefined>>;
  batchList: any[];
  setBatchList: React.Dispatch<React.SetStateAction<any[]>>;
}

export interface printerStatesProps {
  printerList: any[];
  setPrinterList: React.Dispatch<React.SetStateAction<any[]>>;
}
