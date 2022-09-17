import { TableColumn } from '@/components/Table';
import { DataRow } from '.';

export const columns: TableColumn<DataRow>[] = [
  {
    name: 'Nome da POS',
    selector: row => row.name,
  },
  {
    name: 'Nº de série',
    selector: row => row.serial,
  },
  {
    name: 'Data do vínculo',
    selector: row => row.date,
  },
  {
    name: 'PDV atual',
    selector: row => row.currentPdv,
  },
  {
    name: 'Ações',
    selector: row => row.actions,
    width: '120px',
  },
];
