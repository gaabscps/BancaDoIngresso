import { ShouldShowModal } from '@/features/registerEvent/screens/GeneralInformation/ui';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks/useForm';
import EventCategory from '@/model/EventCategory';
import { Dispatch, SetStateAction } from 'react';

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

export interface formCategoryProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
}

export interface onShouldShowModalProps {
  value: ShouldShowModal;
  newTitleModal: string | React.ReactNode;
  category?: EventCategory;
}

export interface modalConfigProps {
  title: string | React.ReactNode;
  visible: boolean;
  onChangeTitle: (title: string) => void;
  onToggle: () => void;
  onShouldShowModal: (props: onShouldShowModalProps) => void;
  shouldShowModal: ShouldShowModal;
}

export interface categoryStatesProps {
  category: EventCategory | undefined;
  setCategory: React.Dispatch<React.SetStateAction<EventCategory | undefined>>;
  categoryList: EventCategory[];
  setCategoryList: Dispatch<SetStateAction<EventCategory[]>>;
}

export interface categoryActionProps {
  onSaveGroupProduct: () => Promise<void>;
}
