import { CustomTable, TableColumn } from '@/components/Table';
import React, { ChangeEvent } from 'react';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { ReactComponent as Trash } from '@/assets/images/svg/lixeira.svg';
import { Input } from 'reactstrap';
import Profile from '@/model/Profile';

interface DataTable {
  checkbox: string;
  name: string;
  permission: string;
  status: string;
  actions: string;
}

interface StateProps {
  groups: Profile[];
}
interface DispatchProps {
  checkAll(e: ChangeEvent<HTMLInputElement>): void;
  change(group: Profile): void;
}

type Props = StateProps & DispatchProps;

export const GroupList: React.FC<Props> = (props: Props): JSX.Element => {
  const checkBoxAll = (): React.ReactNode => (
    <div className="checkFieldSpacing">
      <Input type="checkbox" onChange={e => props.checkAll(e)} />
    </div>
  );

  const checkBox = (profile: Profile): React.ReactNode => (
    <div className="checkFieldSpacing">
      <Input type="checkbox" onChange={() => props.change(profile)} />
    </div>
  );

  const dataTable = props.groups?.map(group => ({
    checkbox: checkBox(group),
    name: group.name,
    permission: group.permissions ? group.permissions[0] : '',
    status: 'Ativo',
    actions: (
      <div className="d-flex">
        <Pen onClick={(): void => console.log('asdfa')} className="mr-2 svg-icon action-icon" />
        <Trash onClick={(): void => console.log('asdfa')} className="mr-2 svg-icon action-icon" />
      </div>
    ),
  }));

  const columns: TableColumn<DataTable>[] = [
    {
      name: checkBoxAll(),
      selector: row => row.checkbox,
      width: '50px',
    },
    {
      name: 'Nome',
      selector: row => row.name,
    },
    {
      name: 'Permissão',
      selector: row => row.permission,
    },
    {
      name: 'Situação',
      selector: row => row.status,
    },
    {
      name: 'Ações',
      selector: row => row.actions,
      width: '115px',
    },
  ];

  return (
    <CustomTable
      columns={columns}
      data={dataTable}
      numberRowsPerPage={props.groups.length}
      progressPending={false}
    />
  );
};
