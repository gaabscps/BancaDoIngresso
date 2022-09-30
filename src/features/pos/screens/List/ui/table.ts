import { TableColumn } from '@/components/Table';
import { DataRow } from '.';

export const columns: TableColumn<DataRow>[] = [
  {
    name: 'Nome da POS',
    selector: row => row.name,
    minWidth: '35%',
  },
  {
    name: 'Nº de série',
    selector: row => row.serial,
    minWidth: '15%',
  },
  {
    name: 'Data de Validade',
    selector: row => row.date,
    minWidth: '20%',
  },
  {
    name: 'PDV atual',
    selector: row => row.currentPdv,
    minWidth: '20%',
  },
  {
    name: 'Ações',
    selector: row => row.actions,
    width: '120px',
  },
];
