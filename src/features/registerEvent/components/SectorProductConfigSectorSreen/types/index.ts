import { NameFiles } from '@/features/events/types';
import { FormData, FormErrors, OnChangeFormInput, IsFormValid } from '@/hooks';
import Section from '@/model/Section';
import { ShouldShowModal } from '../screens/ui';

export interface formConfigSectorProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
  isFormValid: IsFormValid;
  onChangeFormFileInput: (inputName: string) => (file: File | undefined) => void;
  formNameFiles: NameFiles;
}

export interface onShouldShowModalSectorSettingsProps {
  value: ShouldShowModal;
  newTitleModal: string | React.ReactNode;
  sector?: any;
}

export interface modalConfigSectorSettingsProps {
  title: string | React.ReactNode;
  visible: boolean;
  onChangeTitle: (title: string) => void;
  onToggle: () => void;
  onShouldShowModal: (props: onShouldShowModalSectorSettingsProps) => void;
  shouldShowModal: ShouldShowModal;
  onShowModalDelete: (sector: any) => void;
}

export interface configSectorActions {
  onGetAllSector: () => Promise<void>;
  onGet: (SectorSelected: any) => void;
  onCancelEdit: () => void;
  onSave: () => Promise<void>;
  onReturnTab: () => void;
  onNextTab: () => Promise<void>;
}

export interface sectorStatesProps {
  sector: any | undefined;
  setSector: React.Dispatch<React.SetStateAction<any | undefined>>;
  sectorList: Section[];
  setSectorList: React.Dispatch<React.SetStateAction<Section[]>>;
  sectorDropdown: Section[];
  setSectorDropdown: React.Dispatch<React.SetStateAction<Section[]>>;
  sectorTableList: any[];
}
export interface dataConfigStatesProps {
  form: any | undefined;
  setForm: React.Dispatch<React.SetStateAction<any | undefined>>;
  configList: any[];
}
