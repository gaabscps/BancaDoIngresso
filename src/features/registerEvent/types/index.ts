import { FormData, FormErrors, OnChangeFormInput } from '@/hooks/useForm';

export interface NameFiles {
  [key: string]: string;
}

export interface formGeneralInformationProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
  onChanfeFormFileInput: (inputName: string) => (file: File | undefined) => void;
  formNameFiles: NameFiles;
}
