import { FormData, FormErrors, IsFormValid, OnChangeFormInput } from '@/hooks';
import EventPdv from '@/model/EventPdv';
import Page from '@/model/Page';
import Pdv from '@/model/Pdv';
import User from '@/model/User';

export type PdvResponse = Page<Pdv, Pdv>;

export type PdvRequestParams = Pick<
  Page<Pdv, Pdv>,
  'page' | 'pageSize' | 'order' | 'sort' | 'total'
>;

export interface NameFiles {
  [key: string]: string;
}

export type ContractorControllerUser = {
  listUsers: User[];
  usersSelected: User[];
  handleAddUser(userId: string): void;
  handleRemoveUser(index: number): void;
};

export type PdvSelectedProps = {
  pdvSelected: Pdv | undefined;
  pdvActions: any;
};

export interface formMainPdvProductProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
  isFormValid: IsFormValid;
}

export interface formPdvProductProps {
  formData: FormData;
  formErrors: FormErrors;
  onChangeFormInput: OnChangeFormInput;
  isFormValid: IsFormValid;
}

export interface mainPdvStatesProps {
  mainPdv: Pdv | undefined;
  setMainPdv: React.Dispatch<React.SetStateAction<Pdv | undefined>>;
  mainPdvList: Pdv[];
  setMainPdvList: React.Dispatch<React.SetStateAction<Pdv[]>>;
  eventPDVs: EventPdv[];
}

export interface mainPdvActionsProps {
  onGetList: () => void;
  onGet: (pdvSelected: Pdv) => void;
  onCancelEdit: () => void;
  onShowModalDelete: (pdvSelected: Pdv) => void;
}
