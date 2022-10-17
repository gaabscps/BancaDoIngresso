import { TableColumn } from '@/components/Table';
import { formatToCPFOrCNPJ, formatToPhone } from 'brazilian-values';
import { DataRowBankAccount, DataRowContractor, DataRowPix, DataRowUser } from '.';

export const columnsContractor: TableColumn<DataRowContractor>[] = [
  {
    name: 'Nome da empresa',
    selector: row => row.name,
    minWidth: '200px',
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
    maxWidth: '120px',
  },
];

export const columnsBankAccount: TableColumn<DataRowBankAccount>[] = [
  {
    name: 'Instituição',
    selector: row => row.name,
    maxWidth: '325px',
  },
  {
    name: 'Agência',
    selector: row => row.agencia,
    maxWidth: '100px',
  },
  {
    name: 'Conta',
    selector: row => row.conta,
    maxWidth: '170px',
  },
  {
    name: '',
    selector: row => row.actions,
    maxWidth: '120px',
  },
];

export const columnsPix: TableColumn<DataRowPix>[] = [
  {
    name: 'Instituição',
    selector: row => row.name,
    maxWidth: '325px',
  },
  {
    name: 'Tipo',
    selector: row => row.type,
    maxWidth: '100px',
  },
  {
    name: 'Chave Pix',
    selector: row => row.pix,
    maxWidth: '170px',
  },
  {
    name: '',
    selector: row => row.actions,
    maxWidth: '120px',
  },
];

export const columnsUser: TableColumn<DataRowUser>[] = [
  {
    name: 'Nome do usuário',
    selector: row => row.name,
    maxWidth: '325px',
  },
  {
    name: 'Login',
    selector: row => row.login,
    maxWidth: '140px',
  },
  {
    name: '',
    selector: row => row.actions,
    maxWidth: '85px',
  },
];
