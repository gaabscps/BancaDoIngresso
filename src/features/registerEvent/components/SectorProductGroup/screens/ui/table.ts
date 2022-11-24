import { TableColumn } from '@/components/Table';
import { DataRowDiscountCoupon } from '.';

export const columnsDiscountCoupon: TableColumn<DataRowDiscountCoupon>[] = [
  {
    name: 'Grupo',
    selector: row => row.group,
  },
  {
    name: 'Subgrupo',
    selector: row => row.subgroup,
  },
];
