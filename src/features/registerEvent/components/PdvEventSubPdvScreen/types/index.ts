import { FormData, FormErrors, OnChangeFormInput, IsFormValid } from '@/hooks';
import Pdv from '@/model/Pdv';
import SubPdv from '@/model/SubPdv';
import User from '@/model/User';
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
}

export interface subPdvActionsProps {
  // onSave: () => Promise<void>;
  onGet: (subPdvSelected: SubPdv) => void;
  onGetSubPdv: (pdvSelected: Pdv) => void;
  onCancelEdit: () => void;
  onFirstTab: () => void;
  onReturnTap: () => void;
  onInsertSubPdv: () => void;
}

export interface onShouldShowSubPdvSettingsProps {
  value: ShouldShowModal;
  newTitleModal: string | React.ReactNode;
  subPdv: SubPdv;
}

export interface modalConfigSubPdvSettingsProps {
  title: string | React.ReactNode;
  visible: boolean;
  onChangeTitle: (title: string) => void;
  onToggle: () => void;
  onShouldShowModal: (props: onShouldShowSubPdvSettingsProps) => void;
  shouldShowModal: ShouldShowModal;
  onShowModalDelete: (subPdvsector: SubPdv) => void;
}

export type ContractorControllerUser = {
  listUsers: User[];
  usersSelected: User[];
  handleAddUser(userId: string): void;
  handleRemoveUser(user: User): void;
  handleGetUsers: () => Promise<void>;
};
