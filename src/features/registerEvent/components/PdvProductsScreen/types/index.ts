import { FormData, FormErrors, OnChangeFormInput, IsFormValid } from '@/hooks';

export interface formPdvProductProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
  isFormValid: IsFormValid;
}
