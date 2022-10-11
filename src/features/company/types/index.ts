import Page from '@/model/Page';
import Company from '@/model/Company';
import { ChangeEvent } from 'react';

export type CompanyResponse = Page<Company, Company>;

export type CompanyRequestParams = Pick<
  Page<Company, Company>,
  'page' | 'pageSize' | 'order' | 'sort' | 'total'
>;

export type CompanyControllerBankAccount = {
  handleAddBanckAccount(): void;
  handleChangeBanckAccount(inputName: string, index: number, event: string): void;
  handleRemoveBanckAccount(index: number): void;
  bankAccount: any[];
  setBankAccount: React.Dispatch<React.SetStateAction<any[]>>;
};

export type CompanyControllerPix = {
  handleAddPix(): void;
  handleChangePix(inputName: string, index: number, event: string): void;
  handleRemovePix(index: number): void;
  pix: any[];
  setPix: React.Dispatch<React.SetStateAction<any[]>>;
};
