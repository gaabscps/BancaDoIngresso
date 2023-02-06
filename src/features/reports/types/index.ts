import { FormErrors, FormData, OnChangeFormInput } from '@/hooks';
import { ShouldShowModal } from '../screens/ui/index';

export interface ControllerModalProps {
  visible: boolean;
  onToggle: () => void;
  onChangeTitle: (title: string) => void;
  title: string | React.ReactNode;
  shouldShowModal: ShouldShowModal;
}

export interface ControllerFormProps {
  clearFilter: () => Promise<void>;
  formDataFilter: FormData;
  formErrorsFilter: FormErrors;
  onChangeFormInputFilter: OnChangeFormInput;
  OnFilter: () => void;
  resetFormFilter: () => void;
}
