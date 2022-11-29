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
  },
  {
    name: 'Usuários inseridos do PDV',
    selector: row => row.users,
  },
  {
    name: '',
    selector: row => row.actions,
    right: true,
  },
];
