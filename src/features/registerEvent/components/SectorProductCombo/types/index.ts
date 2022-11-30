import { FormData, FormErrors, OnChangeFormInput } from '@/hooks';

export interface formComboProps {
  onChangeFormInputCombo: OnChangeFormInput;
  formDataCombo: FormData;
  formErrorsCombo: FormErrors;
}
export interface formComboConfigProps {
  onChangeFormInputComboConfig: OnChangeFormInput;
  formDataComboConfig: FormData;
  formErrorsComboConfig: FormErrors;
}
export interface comboActionsProps {
  onFirstTab: () => void;
  onReturnTab: () => void;
  onNextTab: () => Promise<void>;
}
