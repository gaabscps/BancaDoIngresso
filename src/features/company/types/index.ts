import Page from '@/model/Page';
import Company from '@/model/Company';
import { ChangeEvent } from 'react';

export type CompanyResponse = Page<Company, Company>;

export type CompanyRequestParams = Pick<
  Page<Company, Company>,
  'page' | 'pageSize' | 'order' | 'sort' | 'total'
>;

export type CompanyControllerBankAccount = {
  controllerInputAppendBankAccount: {
    handleAddBanckAccount(): void;
    handleChangeBanckAccount(
      inputName: string,
      index: number,
      event: ChangeEvent<HTMLInputElement>,
    ): void;
    handleRemoveBanckAccount(index: number): void;
    bankAccount: any[];
    setBankAccount: React.Dispatch<React.SetStateAction<any[]>>;
  };
}