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
    minWidth: '150px',
    style: {
      marginLeft: '50px',
    },
  },
  {
    name: 'Produtos do combo',
    selector: row => row.comboProducts,
    cell: row => row.comboProducts,
    minWidth: '250px',
  },
  {
    name: 'Grupo e Subgrupo',
    selector: row => row.gruposubgroup,
    minWidth: '250px',
  },
  {
    name: 'Ações',
    selector: row => row.actions,
    width: '121px',
  },
];
