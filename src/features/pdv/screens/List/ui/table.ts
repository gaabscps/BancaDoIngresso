import { TableColumn } from '@/components/Table';
import { DataRow } from '.';

export const columns: TableColumn<DataRow>[] = [
  {
    name: 'Imagem',
    selector: row => row.imageBase64,
    width: '100px',
  },
  {
    name: 'Nome do PDV',
    selector: row => row.name,
  },
  {
    name: 'Endereço',
    selector: row => row.street,
  },
  {
    name: 'Cidade',
    selector: row => row.city,
  },
  {
    name: 'Estado',
    selector: row => row.state,
  },
  {
    name: 'Ações',
    selector: row => row.actions,
    width: '160px',
  },
];
