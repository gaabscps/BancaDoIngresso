import { FormData, FormErrors, OnChangeFormInput } from '@/hooks';
import EventGroupSubgroup from '@/model/EventGroupSubgroup';
import ProductGroup from '@/model/ProductGroup';
import ProductSubgroup from '@/model/ProductSubgroup';
import GroupProduct from '@/model/SubgruopProduct';
import { NameFiles } from '../screens';

export interface formGroupProps {
  onChangeFormInputGroup: OnChangeFormInput;
  onChangeFileInput: (inputName: string) => (file: File | undefined) => void;
  formDataGroup: FormData;
  formErrorsGroup: FormErrors;
  nameFiles: NameFiles;
  setErrorsGroup: (errors: FormErrors) => void;
}

export interface appendFormProps {
  addSubGroup: (index: string) => void;
  removeSubGroup: (index: number) => void;
  onChangeSubGroup: (name: string, index: number, value: string | undefined) => void;
  onChangeAppendFileInput: (inputName: string, index: number) => (file: File | undefined) => void;
  onResetAppendFileInput: (inputName: string, index: number) => void;
  nameFilesSub: NameFiles;
}

export interface requestProps {
  onSaveGroup: () => Promise<void>;
  onGetProductSubGroupList: (id: string) => Promise<void>;
  onGetGroup(groupSelected: any): Promise<void>;
  onCancelEdit: () => void;
}

export interface groupStateProps {
  groupOptions: ProductGroup[];
  subGroupOptions: ProductSubgroup[];
  subGroup: GroupProduct[];
  listGroupSubGroup: EventGroupSubgroup[];
  groupsState: ProductGroup;
}
