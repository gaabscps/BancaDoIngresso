import { FormData, FormErrors, OnChangeFormInput, IsFormValid } from '@/hooks';

export interface formPdvUserProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
  isFormValid: IsFormValid;
}
