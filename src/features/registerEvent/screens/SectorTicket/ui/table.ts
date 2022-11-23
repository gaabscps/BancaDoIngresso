import { TableColumn } from '@/components/Table';

interface DataRowTickets {
  name: string;
  batch: string;
  unitValue: string;
  commission: string;
  amount: string;
  totalValue: string;
}

export const columnsTickets: TableColumn<DataRowTickets>[] = [
  {
    name: 'Nome do ingresso',
    selector: row => row.name,
  },
  {
    name: 'Lote',
    selector: row => row.batch,
  },
  {
    name: 'Valor do lote #1',
    selector: row => row.unitValue,
  },
  {
    name: '% de comissão',
    selector: row => row.commission,
  },
  {
    name: 'Qtd de Ingresso',
    selector: row => row.amount,
  },
  {
    name: 'Total de ingressos',
    selector: row => row.totalValue,
    width: '160px',
  },
];
