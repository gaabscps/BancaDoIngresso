import { TableColumn } from '@/components/Table';

interface DataRowPosEvent {
  numberPos: string;
  expirationDate: string;
  partialPayment: string;
  actions: string;
}

export const columnsPosEvent: TableColumn<DataRowPosEvent>[] = [
  {
    name: 'Nº de série',
    selector: row => row.numberPos,
  },
  {
    name: 'Data do vínculo',
    selector: row => row.expirationDate,
  },
  {
    name: 'Porcentagem do Garçom',
    selector: row => row.partialPayment,
  },
  {
    name: '',
    selector: row => row.actions,
    right: true,
  },
];
