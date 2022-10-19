import React from 'react';
import DataTable, { TableProps, TableColumn } from 'react-data-table-component';
import { ColumnStatus, ColumnImage, CustomLoader } from './Components';

import { primaryTheme, secondaryTheme, tertiaryTheme } from './style';

type themeProps = 'primary' | 'secondary' | 'tertiary';

interface TablePropsCustom {
  theme?: themeProps;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface TableCustomProps extends TableProps<TablePropsCustom | any> {
  numberRowsPerPage: number;
  progressPending: boolean;
}

const schemeTheme = {
  primary: primaryTheme,
  secondary: secondaryTheme,
  tertiary: tertiaryTheme,
};

export const CustomTable: React.FC<TableCustomProps> = ({
  theme = 'primary',
  data,
  progressPending,
  numberRowsPerPage,
  columns,
}: TableCustomProps) => (
  <DataTable
    columns={columns}
    data={data}
    noDataComponent={'Sem dados para exibir'}
    progressPending={progressPending}
    progressComponent={<CustomLoader numberRowsPerPage={numberRowsPerPage} />}
    customStyles={schemeTheme[theme as themeProps] ?? schemeTheme.primary}
  />
);

export type { TableColumn };

export { ColumnStatus, ColumnImage };
