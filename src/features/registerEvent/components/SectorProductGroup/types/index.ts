import { FormData, FormErrors, OnChangeFormInput } from '@/hooks';

export interface formGroupProps {
  onChangeFormInputGroup: OnChangeFormInput;
  formDataGroup: FormData;
  formErrorsGroup: FormErrors;
}
