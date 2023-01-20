import { FormData, FormErrors, IsFormValid, OnChangeFormInput } from '@/hooks';

export interface formSectorProductProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
  isFormValidSectorProduct: IsFormValid;
}
