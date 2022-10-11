import { TableColumn } from '@/components/Table';
import { formatToCPFOrCNPJ, formatToPhone } from 'brazilian-values';
import { DataRowBankAccount, DataRowCompany, DataRowPix } from '.';

export const columnsCompany: TableColumn<DataRowCompany>[] = [
  {
    name: 'Nome da empresa',
    selector: row => row.name,
    minWidth: '35%',
  },
  {
    name: 'CPF/CNPJ',
    selector: row => formatToCPFOrCNPJ(row.document),
    minWidth: '15%',
  },
  {
    name: 'Telefone',
    selector: row => formatToPhone(row.telephone),
    minWidth: '20%',
  },
  {
    name: 'Tipo da empresa',
    selector: row => row.companyType,
    minWidth: '20%',
  },
  {
    name: 'Ações',
    selector: row => row.actions,
    width: '120px',
  },
];

export const columnsBankAccount: TableColumn<DataRowBankAccount>[] = [
  {
    name: 'Instituição',
    selector: row => row.name,
    minWidth: '35%',
  },
  {
    name: 'Agência',
    selector: row => row.agencia,
    minWidth: '10%',
  },
  {
    name: 'Conta',
    selector: row => row.conta,
    minWidth: '10%',
  },
  {
    name: '',
    selector: row => row.actions,
    minWidth: '10%',
  },
];

export const columnsPix: TableColumn<DataRowPix>[] = [
  {
    name: 'Instituição',
    selector: row => row.name,
    minWidth: '35%',
  },
  {
    name: 'Tipo',
    selector: row => row.type,
    minWidth: '10%',
  },
  {
    name: 'Chave Pix',
    selector: row => row.pix,
    minWidth: '5%',
  },
  {
    name: '',
    selector: row => row.actions,
    minWidth: '15%',
  },
];
