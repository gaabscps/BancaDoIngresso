import { TableColumn } from '@/components/Table';
import { DataRow } from '.';

export const columns: TableColumn<DataRow>[] = [
  {
    name: 'Imagem',
    selector: row => row.image,
    width: '100px',
  },
  {
    name: 'Nome do produto',
    selector: row => row.productName,
  },
  {
    name: 'Grupo',
    selector: row => row.group,
  },
  {
    name: 'Subgrupo',
    selector: row => row.subgroup,
  },
  {
    name: 'Ações',
    selector: row => row.actions,
    width: '120px',
  },
];
