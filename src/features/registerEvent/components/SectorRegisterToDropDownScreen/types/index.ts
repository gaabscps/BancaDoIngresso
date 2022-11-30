import { FormData, FormErrors, OnChangeFormInput } from '@/hooks';
import Section from '@/model/Section';
import { ShouldShowModal } from '../screens/ui';


export interface formSectorProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
}

export interface onShouldShowModalSectorProps {
  value: ShouldShowModal;
  newTitleModal: string | React.ReactNode;
  sector?: Section;
}

export interface modalConfigProps {
  title: string | React.ReactNode;
  visible: boolean;
  onChangeTitle: (title: string) => void;
  onToggle: () => void;
  onShouldShowModal: (props: onShouldShowModalSectorProps) => void;
  shouldShowModal: ShouldShowModal;
}

export interface sectorActionsProps {
  onSave: () => Promise<void>;
}

export interface sectorStatesProps {
  sector: Section | undefined;
  setSector: React.Dispatch<React.SetStateAction<Section | undefined>>;
  sectorList: Section[];
  setSectorList: React.Dispatch<React.SetStateAction<Section[]>>;
}
