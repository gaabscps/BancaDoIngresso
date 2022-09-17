import React from 'react';
import DataTable, { TableProps, TableColumn } from 'react-data-table-component';
import { ColumnStatus, ColumnImage, CustomLoader } from './Components';

import { primaryTheme, secondaryTheme } from './style';

type themeProps = 'primary' | 'secondary';

interface TablePropsCustom {
  theme?: themeProps;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface TableCustomProps extends TableProps<TablePropsCustom | any> {
  numberRowsPerPage?: number;
}

const schemeTheme = {
  primary: primaryTheme,
  secondary: secondaryTheme,
};

export const initialTable = [
  {
    id: 'id',
    name: 'name',
  },
];

export const CustomTable: React.FC<TableCustomProps> = ({
  theme = 'primary',
  data,
  progressPending,
  numberRowsPerPage,
  columns,
}: TableCustomProps) => (
  <DataTable
    columns={columns}
    data={data ?? initialTable}
    noDataComponent={<CustomLoader />}
    progressPending={progressPending}
    progressComponent={<CustomLoader numberRowsPerPage={numberRowsPerPage} />}
    customStyles={schemeTheme[theme as themeProps] ?? schemeTheme.primary}
  />
);

export type { TableColumn };

export { ColumnStatus, ColumnImage };
