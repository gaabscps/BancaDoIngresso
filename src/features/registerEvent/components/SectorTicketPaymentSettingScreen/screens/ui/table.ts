import { TableColumn } from '@/components/Table';
import { DataRowDiscountCoupon } from '.';

export const columnsDiscountCoupon: TableColumn<DataRowDiscountCoupon>[] = [
  {
    name: 'Código do cupom',
    selector: row => row.code,
  },
  {
    name: 'Quantidade de cupons',
    selector: row => row.amount,
  },
  {
    name: 'Porcentagem de desconto(%)',
    selector: row => row.discount,
  },
  {
    name: '',
    selector: row => row.actions,
    right: true,
  },
];
