import { TableColumn } from '@/components/Table';

interface DataRowProducts {
  products: string;
  amount: string;
  unitValue: string;
  totalValue: string;
  actions: string;
}

export const columnsProducts: TableColumn<DataRowProducts>[] = [
  {
    name: 'Produtos',
    selector: row => row.products,
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
    width: '300px',
    right: true,
  },
];
