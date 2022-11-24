import { FormData, FormErrors, OnChangeFormInput } from '@/hooks';

export interface formPaymentSettingsProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
}

export interface PaymentSettingsActionsProps {
  onSave: () => Promise<void>;
  onFirstTab: () => void;
  onReturnTab: () => void;
  onNextTap: () => Promise<void>;
}
