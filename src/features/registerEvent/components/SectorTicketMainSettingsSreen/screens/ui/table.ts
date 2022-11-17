import { TableColumn } from '@/components/Table';

interface DataRow {
  startDate: string;
  endDate: string;
  amount: string;
  unitValue: string;
  totalValue: string;
  actions: string;
}

export const columnsBatch: TableColumn<DataRow>[] = [
  {
    name: 'Data início da venda',
    selector: row => row.startDate,
  },
  {
    name: 'Data fim da venda',
    selector: row => row.endDate,
  },
  {
    name: 'Quantidade',
    selector: row => row.amount,
  },
  {
    name: 'Valor unitário',
    selector: row => row.unitValue,
  },
  {
    name: 'Valor total estimado',
    selector: row => row.totalValue,
  },
  {
    name: '',
    selector: row => row.actions,
    width: '105px',
  },
];
