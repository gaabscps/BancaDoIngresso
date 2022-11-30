import { FormData, FormErrors, OnChangeFormInput, IsFormValid } from '@/hooks';

export interface formPosProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
  isFormValid: IsFormValid;
}
