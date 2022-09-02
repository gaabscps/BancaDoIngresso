import React from 'react';
import DataTable, { TableProps, TableColumn } from 'react-data-table-component';
import { CollumnStatus, CollumnImage, CustomLoader } from './Components';

import { primaryTheme, secundaryTheme } from './style';

type themeProps = 'primary' | 'secundary';

interface TableCustomProps extends TableProps<any> {
  theme: themeProps;
  numberRowsPerPage?: number;
}

const schemeTheme = {
  primary: primaryTheme,
  secundary: secundaryTheme,
};

export const CustomTable: React.FC<TableCustomProps> = (props: TableCustomProps) => (
  <DataTable
    {...props}
    columns={props.columns}
    data={props.data}
    noDataComponent="Nenhum dado encontrado"
    progressPending={props.progressPending}
    progressComponent={<CustomLoader numberRowsPerPage={props.numberRowsPerPage} />}
    customStyles={schemeTheme[props.theme as themeProps] ?? schemeTheme.primary}
  />
);

export type { TableColumn };
export { CollumnStatus, CollumnImage };
