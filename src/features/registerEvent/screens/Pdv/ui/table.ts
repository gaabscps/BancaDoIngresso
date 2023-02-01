import { TableColumn } from '@/components/Table';

interface DataRowEventPdv {
  pos: string;
  users: string;
  actions: string;
}

export const columnsEventPdv: TableColumn<DataRowEventPdv>[] = [
  {
    name: 'POS’s inseridas',
    selector: row => row.pos,
    maxWidth: '400px',
  },
  {
    name: 'Usuários inseridos do PDV',
    selector: row => row.users,
    maxWidth: '400px',
  },
  {
    name: '',
    selector: row => row.actions,
    right: true,
    maxWidth: '100%',
  },
];
