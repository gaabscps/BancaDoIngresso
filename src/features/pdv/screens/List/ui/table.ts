import { TableColumn } from '@/components/Table';
import { DataRowUser } from '@/features/contractor/screens/List/ui';
import { formatToCPFOrCNPJ } from 'brazilian-values';
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

export const columnsUser: TableColumn<DataRowUser>[] = [
  {
    name: 'Nome do usuário',
    selector: row => row.name,
    maxWidth: '325px',
  },
  {
    name: 'Login',
    selector: row => formatToCPFOrCNPJ(row.login),
    maxWidth: '140px',
  },
  {
    name: '',
    selector: row => row.actions,
    maxWidth: '85px',
  },
];
