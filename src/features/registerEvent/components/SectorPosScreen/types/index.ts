import { FormData, FormErrors, OnChangeFormInput, IsFormValid } from '@/hooks';
import { ShouldShowModal } from '../screens/ui';

export interface formPosProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
  isFormValid: IsFormValid;
}

export interface onShouldShowModalSectorPosProps {
  value: ShouldShowModal;
  newTitleModal: string | React.ReactNode;
  pos?: any;
}

export interface modalConfigPosProps {
  title: string | React.ReactNode;
  visible: boolean;
  onChangeTitle: (title: string) => void;
  onToggle: () => void;
  onShouldShowModal: (props: onShouldShowModalSectorPosProps) => void;
  shouldShowModal: ShouldShowModal;
}

export interface dataConfigStatesProps {
  form: any | undefined;
  setForm: React.Dispatch<React.SetStateAction<any | undefined>>;
  configList: any[];
}
