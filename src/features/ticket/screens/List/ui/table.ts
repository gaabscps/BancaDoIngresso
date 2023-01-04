import { TableColumn } from '@/components/Table';
import { DataRow } from '.';

export const columns: TableColumn<DataRow>[] = [
  {
    name: 'Cód',
    selector: row => row.id,
    width: '280px',
  },
  {
    name: 'PDV',
    selector: row => row.pdvName,
    minWidth: '80px',
    maxWidth: '130px',
  },
  {
    name: 'Setor e ingresso',
    selector: row => row.sectionAndTicket,
    minWidth: '160px',
  },
  {
    name: 'CPF',
    selector: row => row.cpf,
    minWidth: '130px',
    maxWidth: '130px',
  },
  {
    name: 'Venda',
    selector: row => row.saleDate,
    minWidth: '100px',
    maxWidth: '150px',
  },
  {
    name: 'Status',
    selector: row => row.paymentStatus,
    minWidth: '150px',
  },
  {
    name: 'Forma de pag',
    selector: row => row.paymentType,
    minWidth: '150px',
  },
  {
    name: 'Valor',
    selector: row => row.saleValue,
    minWidth: '100px',
  },
  {
    name: 'Transação',
    selector: row => row.transaction,
    minWidth: '150px',
  },
  {
    name: 'Ações',
    selector: row => row.actions,
    width: '210px',
  },
];
