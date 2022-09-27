import { TableColumn } from '@/components/Table';
import { DataRow } from '.';

export const columns: TableColumn<DataRow>[] = [
  {
    name: 'Nome da forma de pagamento',
    selector: row => row.name,
  },
  {
    name: 'Gateway de pagamento',
    selector: row => row.paymentGateway,
  },
  {
    name: 'Ações',
    selector: row => row.actions,
    width: '120px',
  },
];
