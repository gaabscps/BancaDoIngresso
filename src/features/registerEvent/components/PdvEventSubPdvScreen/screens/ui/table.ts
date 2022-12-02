import { TableColumn } from '@/components/Table';
import { formatToCPFOrCNPJ } from 'brazilian-values';

interface DataRowSubPdvEvent {
  name: string;
  users: string;
  link: string;
  actions: string;
}

export interface DataRowUser {
  id: number;
  name: string;
  login: string;
  actions: string;
}

export const columnsSubPdvEvent: TableColumn<DataRowSubPdvEvent>[] = [
  {
    name: 'Usuário',
    selector: row => row.users,
  },
  {
    name: 'Link de venda',
    selector: row => row.link,
  },
  {
    name: '',
    selector: row => row.actions,
    right: true,
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
