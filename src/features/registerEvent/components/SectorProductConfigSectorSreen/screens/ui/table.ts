import { TableColumn } from '@/components/Table';

interface DataRowProducts {
  products: string;
  combos: string;
  actions: string;
}

export const columnsSectors: TableColumn<DataRowProducts>[] = [
  {
    name: 'Quantidade de produtos',
    selector: row => row.products,
  },
  {
    name: 'Quantidade de combos',
    selector: row => row.combos,
  },
  {
    name: '',
    selector: row => row.actions,
    right: true,
  },
];
