import { FormData, FormErrors, OnChangeFormInput, IsFormValid } from '@/hooks';
import { ShouldShowModal } from '../screens/ui';

export interface formPosProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
  isFormValid: IsFormValid;
}

export interface onShouldShowModalSectorProductProps {
  value: ShouldShowModal;
  newTitleModal: string | React.ReactNode;
  product?: any;
}

export interface modalConfigPosProps {
  title: string | React.ReactNode;
  visible: boolean;
  onChangeTitle: (title: string) => void;
  onToggle: () => void;
  onShouldShowModal: (props: onShouldShowModalSectorProductProps) => void;
  shouldShowModal: ShouldShowModal;
}
