import { TableColumn } from '@/components/Table';

export interface DataRowGeneralColletion {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  amountTickets: string;
  totalValue: string;
  actions: string;
}
export interface columnsGeneralColletionDetails {
  id: number;
  name: string;
  grossAmount: string;
  amount: string;
  averageTicket: string;
}

export interface columnsIncomeDetails {
  id: number;
  item: string;
  description: string;
  value: string;
  actions: string;
}

export const columnsGeneralColletion: TableColumn<DataRowGeneralColletion>[] = [
  {
    name: 'Nome do evento',
    selector: row => row.name,
  },
  {
    name: 'Data início',
    selector: row => row.startDate,
  },
  {
    name: 'Data fim',
    selector: row => row.endDate,
  },
  {
    name: 'Ingresso vendidos',
    selector: row => row.amountTickets,
  },
  {
    name: 'Valor total',
    selector: row => row.totalValue,
  },
  {
    name: '',
    selector: row => row.actions,
  },
];

export const columnsGeneralColletionDetails: TableColumn<columnsGeneralColletionDetails>[] = [
  {
    name: 'Nome do lote',
    selector: row => row.name,
  },
  {
    name: 'Receita total',
    selector: row => row.grossAmount,
  },
  {
    name: 'Quantidade',
    selector: row => row.amount,
  },
  {
    name: 'Ticket médio',
    selector: row => row.averageTicket,
  },
];

export const columnsIncomeDetails: TableColumn<columnsIncomeDetails>[] = [
  {
    name: 'Item',
    selector: row => row.item,
  },
  {
    name: 'Descrição',
    selector: row => row.description,
  },
  {
    name: 'Valor',
    selector: row => row.value,
  },
  {
    name: 'Ações',
    selector: row => row.actions,
    allowOverflow: true,
    maxWidth: '220px',
  },
];
