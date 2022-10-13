import Page from '@/model/Page';
import Contractor from '@/model/Contractor';
import PixType from '@/model/PixType';
import Bank from '@/model/Bank';
import User from '@/model/User';

export type ContractorResponse = Page<Contractor, Contractor>;
export type BankResponse = Page<Bank, Bank>;

export type ContractorRequestParams = Pick<
  Page<Contractor, Contractor>,
  'page' | 'pageSize' | 'order' | 'sort' | 'total'
>;

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
