import { TableColumn } from '@/components/Table';

interface DataRowPosEvent {
  numberSubPdv: string;
  expirationDate: string;
  partialPayment: string;
  actions: string;
}

export const columnsSubPdvEvent: TableColumn<DataRowPosEvent>[] = [
  {
    name: 'Nº de série',
    selector: row => row.numberSubPdv,
  },
  {
    name: 'Data do vínculo',
    selector: row => row.expirationDate,
  },
  {
    name: 'Porcentagem do Garçom',
    selector: row => row.partialPayment,
    right: true,
  },
  {
    name: '',
    selector: row => row.actions,
    right: true,
  },
];
