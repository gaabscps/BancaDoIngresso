import { FormData, FormErrors, OnChangeFormInput, IsFormValid } from '@/hooks';
import SubPdv from '@/model/SubPdv';
import Section from '@/model/Section';
import Ticket from '@/model/Ticket';
import { ShouldShowModal } from '../screens/ui';

export interface formSubPdvProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
  isFormValid: IsFormValid;
}

export interface formSubPdvRegisterProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
  isFormValid: IsFormValid;
}

export interface formSubPdvConfigProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
  isFormValid: IsFormValid;
}

export interface subPdvStatesProps {
  subPdv: SubPdv | undefined;
  setSubPdv: React.Dispatch<React.SetStateAction<SubPdv | undefined>>;
  subPdvList: SubPdv[];
  setSubPdvList: React.Dispatch<React.SetStateAction<SubPdv[]>>;
  subPdvOptions: SubPdv[];
  setSubPdvOptions: React.Dispatch<React.SetStateAction<SubPdv[]>>;
}

export interface subPdvActionsProps {
  // onSave: () => Promise<void>;
  onGet: (subPdvSelected: SubPdv) => void;
  onCancelEdit: () => void;
  onFirstTab: () => void;
  onReturnTap: () => void;
  onNextTap: () => Promise<void>;
}

export interface onShouldShowSubPdvSettingsProps {
  value: ShouldShowModal;
  newTitleModal: string | React.ReactNode;
  subPdv?: any;
}

export interface modalConfigSubPdvSettingsProps {
  title: string | React.ReactNode;
  visible: boolean;
  onChangeTitle: (title: string) => void;
  onToggle: () => void;
  onShouldShowModal: (props: onShouldShowSubPdvSettingsProps) => void;
  shouldShowModal: ShouldShowModal;
  onShowModalDelete: (subPdvsector: any) => void;
}
