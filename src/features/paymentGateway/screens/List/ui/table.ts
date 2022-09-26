import { TableColumn } from '@/components/Table';
import { DataRow } from '.';

export const columns: TableColumn<DataRow>[] = [
  {
    name: 'Nome do gateway de pagamento',
    selector: row => row.name,
    width: '35%',
  },
  {
    name: 'URL',
    selector: row => row.url,
  },
  {
    name: 'Ações',
    selector: row => row.actions,
    width: '120px',
  },
];
