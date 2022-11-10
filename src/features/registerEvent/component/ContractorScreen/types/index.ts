import Page from '@/model/Page';
import Contractor from '@/model/Contractor';
import Bank from '@/model/Bank';
import User from '@/model/User';
import { ShouldShowModal } from '@/features/registerEvent/component/ContractorScreen/ui';
import ContractorType from '@/model/ContractorType';
import { contractorActionProps } from '@/features/registerEvent/types';

export type ContractorTypeResponse = Page<ContractorType, ContractorType>;
export type BankResponse = Bank;

export type ContractorControllerBankAccount = {
  listBank: Bank[];
  handleAddBanckAccount(): void;
  handleChangeBanckAccount(inputName: string, index: number, event: string): void;
  handleRemoveBanckAccount(index: number): void;
  bankAccount: any[];
  setBankAccount: React.Dispatch<React.SetStateAction<any[]>>;
};

export type ContractorControllerPix = {
  listBank: Bank[];
  handleAddPix(): void;
  handleChangePix(inputName: string, index: number, event: string): void;
  handleRemovePix(index: number): void;
  pix: any[];
  pixTypes: any[];
  setPix: React.Dispatch<React.SetStateAction<any[]>>;
};

export type ContractorControllerUser = {
  listUsers: User[];
  usersSelected: User[];
  handleAddUser(userId: string): void;
  handleRemoveUser(index: number): void;
};

export type BanckAccountForm = {
  id: string;
  name: string;
  agencia: string;
  conta: string;
};

export type PixForm = {
  idInstitution: string;
  nameInstitution: string;
  idType: string;
  nameType: string;
  pix: string;
};

export type ContractorSelectedProps = {
  contractorSelected: Contractor | undefined;
  contractorActions: contractorActionProps;
};

export interface onShouldShowModalProps {
  value: ShouldShowModal;
  newTitleModal: string | React.ReactNode;
  contractor?: Contractor;
  isEdit?: boolean;
};