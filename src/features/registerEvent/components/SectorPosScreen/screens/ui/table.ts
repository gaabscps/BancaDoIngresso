import { TableColumn } from '@/components/Table';

interface DataRowPos {
  serialNumber: string;
  date: string;
  waiter: string;
  commission: string;
  actions: string;
}

export const columnsPos: TableColumn<DataRowPos>[] = [
  {
    name: 'Nº de série',
    selector: row => row.serialNumber,
  },
  {
    name: 'Data do vínculo',
    selector: row => row.date,
  },
  {
    name: '% do garçom',
    selector: row => row.waiter,
  },
  {
    name: '% de comissão',
    selector: row => row.commission,
  },
  {
    name: '',
    selector: row => row.actions,
    right: true,
  },
];
