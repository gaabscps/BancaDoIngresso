import React from 'react';
import DataTable, { TableProps, TableColumn } from 'react-data-table-component';
import { ColumnStatus, ColumnImage, CustomLoader } from './Components';

import { primaryTheme, secondaryTheme, tertiaryTheme, primaryThemeWithMargin, secondaryWhithoutBorderTheme } from './style';

type themeProps = 'primary' | 'secondary' | 'tertiary' | 'primaryWithMargin';

interface TablePropsCustom {
  theme?: themeProps;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface TableCustomProps extends TableProps<TablePropsCustom | any> {
  numberRowsPerPage: number;
  progressPending: boolean;
  getRowId?: (row: any) => void;
}

const schemeTheme = {
  primary: primaryTheme,
  secondary: secondaryTheme,
  tertiary: tertiaryTheme,
  primaryWithMargin: primaryThemeWithMargin,
  secondaryWithoutBorder: secondaryWhithoutBorderTheme,
};

export const CustomTable: React.FC<TableCustomProps> = ({
  theme = 'primary',
  data,
  progressPending,
  numberRowsPerPage,
  columns,
  getRowId,
}: TableCustomProps) => (
  <DataTable
    columns={columns}
    data={data}
    noDataComponent={'Sem dados para exibir'}
    progressPending={progressPending}
    progressComponent={<CustomLoader numberRowsPerPage={numberRowsPerPage} />}
    customStyles={schemeTheme[theme as themeProps] ?? schemeTheme.primary}
    onRowClicked={row => {
      // eslint-disable-next-line no-unused-expressions
      getRowId ? getRowId(row) : null;
    }}
  />
);

export type { TableColumn };

export { ColumnStatus, ColumnImage };
