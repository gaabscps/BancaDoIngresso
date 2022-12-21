import { FormData, FormErrors, OnChangeFormInput, IsFormValid } from '@/hooks';
import EventPdvPos from '@/model/EventPdvPos';
import Pos from '@/model/Pos';
import { ShouldShowModal } from '../screens/ui';

export interface formPosProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
  onInsertPos: () => void;
  isFormValid: IsFormValid;
}

export interface formPosRegisterProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
  isFormValid: IsFormValid;
}

export interface formPosConfigProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
  isFormValid: IsFormValid;
}

export interface posStatesProps {
  pos: Pos | undefined;
  setPos: React.Dispatch<React.SetStateAction<Pos | undefined>>;
  posList: EventPdvPos[];
  setPosList: React.Dispatch<React.SetStateAction<Pos[]>>;
  posOptions: Pos[];
  setPosOptions: React.Dispatch<React.SetStateAction<Pos[]>>;
}

export interface posActionsProps {
  // onSave: () => Promise<void>;
  onGet: (posSelected: Pos) => void;
  onCancelEdit: () => void;
  onReturnTap: () => void;
  onNextTap: () => Promise<void>;
}

export interface onShouldShowPosSettingsProps {
  value: ShouldShowModal;
  newTitleModal: string | React.ReactNode;
  pos?: Pos;
}

export interface modalConfigPosSettingsProps {
  title: string | React.ReactNode;
  visible: boolean;
  onChangeTitle: (title: string) => void;
  onToggle: () => void;
  onShouldShowModal: (props: onShouldShowPosSettingsProps) => void;
  shouldShowModal: ShouldShowModal;
  onShowModalDelete: (sector: Pos) => void;
}
