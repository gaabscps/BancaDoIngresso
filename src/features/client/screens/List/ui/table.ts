import { TableColumn } from '@/components/Table';
import { DataRow } from '.';

export const columns: TableColumn<DataRow>[] = [
  {
    name: 'Nome do cliente',
    selector: row => row.name,
    width: '250px',
  },
  {
    name: 'CPF',
    selector: row => row.cpf,
    minWidth: '150px',
  },
  {
    name: 'Celular',
    selector: row => row.cellPhone,
    minWidth: '150px',
  },
  {
    name: 'E-mail',
    selector: row => row.email,
    minWidth: '200px',
  },
  {
    name: 'Ações',
    selector: row => row.actions,
    width: '121px',
  },
];
