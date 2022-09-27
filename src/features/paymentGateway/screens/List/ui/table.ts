import { TableColumn } from '@/components/Table';
import { DataRow } from '.';

export const columns: TableColumn<DataRow>[] = [
  {
    name: 'Nome do gateway de pagamento',
    selector: row => row.name,
    width: '35%',
  },
  {
    name: 'Tipo',
    selector: row => row.id,
  },
  {
    name: 'Porta',
    selector: row => row.date,
  },
  {
    name: 'IP de Destino',
    selector: row => row.currentPdv,
  },
  {
    name: 'Ações',
    selector: row => row.actions,
    width: '120px',
  },
];
