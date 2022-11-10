import { TableColumn } from '@/components/Table';
import { DataRow } from '.';

export const columns: TableColumn<DataRow>[] = [
  {
    name: 'Descrição do voucher',
    selector: row => row.description,
    width: '300px',
    style: {
      fontSize: '16px',
      paddingTop: '15px',
      paddingBottom: '15px',
      borderBottom: '1.5px solid #E6E6E6',
    },
  },
  {
    name: 'Usuário (CPF)',
    selector: row => row.user,
    width: '200px',
    style: {
      fontSize: '16px',
      paddingTop: '15px',
      paddingBottom: '15px',
      borderBottom: '1.5px solid #E6E6E6',
    },
  },
  {
    name: 'Valor',
    selector: row => row.value,
    width: '150px',
    style: {
      fontSize: '16px',
      paddingTop: '15px',
      paddingBottom: '15px',
      borderBottom: '1.5px solid #E6E6E6',
    },
  },
  {
    name: 'Código',
    selector: row => row.code,
    width: '150px',
    style: {
      fontSize: '16px',
      paddingTop: '15px',
      paddingBottom: '15px',
      borderBottom: '1.5px solid #E6E6E6',
    },
  },
  {
    name: '',
    selector: row => row.actions,
    maxWidth: '100px',
    style: {
      fontSize: '16px',
      paddingTop: '15px',
      paddingBottom: '15px',
      borderBottom: '1.5px solid #E6E6E6',
    },
  },
];
