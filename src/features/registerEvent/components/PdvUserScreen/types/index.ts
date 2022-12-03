import { FormData, FormErrors, OnChangeFormInput, IsFormValid } from '@/hooks';
import { ShouldShowModal } from '../screens/ui';

export interface formPdvUserProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
  isFormValid: IsFormValid;
}

export interface onShouldShowModalSectorProductUserProps {
  value: ShouldShowModal;
  newTitleModal: string | React.ReactNode;
  user?: any;
}
