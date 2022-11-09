import { TableColumn } from '@/components/Table';
import { DataRow } from '.';

export const columns: TableColumn<DataRow>[] = [
  {
    name: 'Descrição do voucher',
    selector: row => row.description,
    minWidth: '200px',
  },
  {
    name: 'Usuário',
    selector: row => row.user,
    minWidth: '100px',
  },
  {
    name: 'Valor',
    selector: row => row.value,
  },
  {
    name: 'Codigo',
    selector: row => row.code,
  },
  {
    name: '',
    selector: row => row.actions,
    width: '60px',
  },
];
