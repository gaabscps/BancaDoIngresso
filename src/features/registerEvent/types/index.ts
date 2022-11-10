import { ShouldShowModal } from '@/features/registerEvent/screens/GeneralInformation/ui';
import { FormData, FormErrors, OnChangeFormInput, SetFormErrors } from '@/hooks/useForm';
import Contractor from '@/model/Contractor';
import EventCategory from '@/model/EventCategory';
import { Dispatch, SetStateAction } from 'react';

export interface NameFiles {
  [key: string]: string;
}

export interface formGeneralInformationProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
  setFormErrors: SetFormErrors;
  onChangeFormFileInput: (inputName: string) => (file: File | undefined) => void;
  formNameFiles: NameFiles;
}

export interface formCategoryProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
}

export interface formFatherEventProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
}

export interface onShouldShowModalProps {
  value: ShouldShowModal;
  newTitleModal: string | React.ReactNode;
  category?: EventCategory;
  eventFather?: any;
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

export interface fatherEventStatesProps {
  fatherEvent: any | undefined;
  setFatherEvent: React.Dispatch<React.SetStateAction<any | undefined>>;
  fatherEventList: any[];
  setFatherEventList: Dispatch<SetStateAction<any[]>>;
}

export interface contractorStatesProps {
  contractorList: Contractor[];
  setContractorList: Dispatch<SetStateAction<Contractor[]>>;
}

export interface GeneralInformaitionActionProps {
  onSave: () => Promise<void>;
}

export interface categoryActionProps {
  onSave: () => Promise<void>;
}

export interface fatherEventActionProps {
  onSave: () => Promise<void>;
}

export interface contractorActionProps {
  onGetList: () => Promise<void>;
}
