import { TableColumn } from '@/components/Table';

export interface columnsMachinesReportDetails {
  id: number;
  machineId: string;
  machine: string;
  situation: string;
  pdv: string;
  section: string;
  serial: string;
  daysofuse: string;
  value: string;
  difference: string;
  debit: string;
  credit: string;
  deductmoney: string;
  pix: string;
  totalValue: string;
}

export const columnsMachinesReportDetails: TableColumn<columnsMachinesReportDetails>[] = [
  {
    name: 'ID',
    selector: row => row.machineId,
  },
  {
    name: 'Máquina',
    selector: row => row.machine,
  },
  {
    name: 'Situação',
    selector: row => row.situation,
  },
  {
    name: 'PDV',
    selector: row => row.pdv,
  },
  {
    name: 'Setor',
    selector: row => row.section,
  },
  {
    name: 'Serial',
    selector: row => row.serial,
  },
  {
    name: 'Dias uso',
    selector: row => row.daysofuse,
  },
  {
    name: 'Valor',
    selector: row => row.value,
  },
  {
    name: 'Diferença',
    selector: row => row.difference,
  },
  {
    name: 'Débito',
    selector: row => row.debit,
  },
  {
    name: 'Crédito',
    selector: row => row.credit,
  },
  {
    name: 'Dinheiro',
    selector: row => row.deductmoney,
  },
  {
    name: 'PIX',
    selector: row => row.pix,
  },
  {
    name: 'Valor Total',
    selector: row => row.totalValue,
  },
];
