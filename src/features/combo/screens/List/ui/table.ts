import { TableColumn } from '@/components/Table';
import { DataRow } from '.';

export const columns: TableColumn<DataRow>[] = [
  {
    name: 'Imagem',
    selector: row => row.image,
    width: '100px',
  },
  {
    name: 'Nome do combo',
    selector: row => row.comboName,
  },
  {
    name: 'Produtos do combo',
    selector: row => row.comboProducts,
    cell: row => row.comboProducts,
  },
  {
    name: 'Grupo e Subgrupo',
    selector: row => row.gruposubgroup,
  },
  {
    name: 'Ações',
    selector: row => row.actions,
    width: '120px',
  },
];
