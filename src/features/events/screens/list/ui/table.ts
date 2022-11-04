import { TableColumn } from '@/components/Table';
import { DataRow } from '.';

export const columns: TableColumn<DataRow>[] = [
  {
    name: 'Imagem',
    selector: row => row.image,
    width: '100px',
  },
  {
    name: 'Nome do evento',
    selector: row => row.name,
    minWidth: '280px',
  },
  {
    name: 'Cidade',
    selector: row => row.city,
    minWidth: '200px',
  },
  {
    name: 'Inicio evento',
    selector: row => row.startDate,
    minWidth: '200px',
  },
  {
    name: 'Fim evento',
    selector: row => row.endDate,
    minWidth: '200px',
  },
  {
    name: '',
    selector: row => row.actions,
    width: '70px',
  },
];
