import Page from '@/model/Page';
import Contractor from '@/model/Contractor';
import PixType from '@/model/PixType';
import Bank from '@/model/Bank';

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

export type BanckAccountForm = {
  id: string;
  name: string;
  agencia: string;
  conta: string;
};

export type PixForm = {
  idInstitution: string;
  nameInstitution: string;
  idType: PixType;
  nameType: string;
  pix: string;
};
