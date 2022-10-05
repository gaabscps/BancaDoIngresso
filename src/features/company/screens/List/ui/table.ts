import { TableColumn } from '@/components/Table';
import { DataRowBankAccount, DataRowCompany } from '.';

export const columnsCompany: TableColumn<DataRowCompany>[] = [
  {
    name: 'Nome da empresa',
    selector: row => row.name,
    minWidth: '35%',
  },
  {
    name: 'CPF/CNPJ',
    selector: row => row.document,
    minWidth: '15%',
  },
  {
    name: 'Telefone',
    selector: row => row.telephone,
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
    name: 'Nome da Empresa',
    selector: row => row.name,
    minWidth: '35%',
  },
  {
    name: 'CPF/CNPJ',
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
