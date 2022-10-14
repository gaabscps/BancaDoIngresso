import { TableColumn } from '@/components/Table';
import { formatToCPFOrCNPJ, formatToPhone } from 'brazilian-values';
import { DataRowBankAccount, DataRowContractor, DataRowPix, DataRowUser } from '.';

export const columnsContractor: TableColumn<DataRowContractor>[] = [
  {
    name: 'Nome da empresa',
    selector: row => row.name,
  },
  {
    name: 'CPF/CNPJ',
    selector: row => formatToCPFOrCNPJ(row.document),
  },
  {
    name: 'Telefone',
    selector: row => formatToPhone(row.telephone),
  },
  {
    name: 'Tipo da empresa',
    selector: row => row.companyType,
  },
  {
    name: 'Ações',
    selector: row => row.actions,
  },
];

export const columnsBankAccount: TableColumn<DataRowBankAccount>[] = [
  {
    name: 'Instituição',
    selector: row => row.name,
  },
  {
    name: 'Agência',
    selector: row => row.agencia,
  },
  {
    name: 'Conta',
    selector: row => row.conta,
  },
  {
    name: '',
    selector: row => row.actions,
  },
];

export const columnsPix: TableColumn<DataRowPix>[] = [
  {
    name: 'Instituição',
    selector: row => row.name,
  },
  {
    name: 'Tipo',
    selector: row => row.type,
  },
  {
    name: 'Chave Pix',
    selector: row => row.pix,
  },
  {
    name: '',
    selector: row => row.actions,
  },
];

export const columnsUser: TableColumn<DataRowUser>[] = [
  {
    name: 'Nome do usuário',
    selector: row => row.name,
  },
  {
    name: 'Login',
    selector: row => row.login,
  },
  {
    name: '',
    selector: row => row.actions,
  },
];
