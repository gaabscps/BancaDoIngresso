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

export interface sectorActionsProps {
  onSave: () => Promise<void>;
}

export interface sectorStatesProps {
  sector: any | undefined;
  setSector: React.Dispatch<React.SetStateAction<any | undefined>>;
  sectorList: any[];
  setSectorList: React.Dispatch<React.SetStateAction<any[]>>;
}
