import { CustomTable, TableColumn } from '@/components/Table';
import React, { ChangeEvent } from 'react';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { ReactComponent as Trash } from '@/assets/images/svg/lixeira.svg';
import { Input } from 'reactstrap';
import Profile from '@/model/Profile';
import { DropdonwFlags } from '@/components';
import User from '@/model/User';
import { CheckBoxGroup, ShouldShowModal } from '..';

interface DataTable {
  checkbox: string;
  name: string;
  permissions: string;
  status: string;
  actions: string;
}

interface DataColumn {
  id: string;
  name: string;
}

interface StateProps {
  groups: CheckBoxGroup[];
  count: number;
}

interface DispatchProps {
  checkAll(e: ChangeEvent<HTMLInputElement>): void;
  change(e: React.ChangeEvent<HTMLInputElement>, group: CheckBoxGroup): void;
  openModal(value: ShouldShowModal, modalTitle: string, user?: User, group?: Profile): void;
  showDelete(group: Profile): void;
}

type Props = StateProps & DispatchProps;

export const GroupList: React.FC<Props> = (props: Props): JSX.Element => {
  const checkBoxAll = (): React.ReactNode => (
    <div className="checkFieldSpacing">
      <Input
        type="checkbox"
        checked={props.count === props.groups.length}
        onChange={e => props.checkAll(e)}
      />
    </div>
  );

  const checkBox = (profile: CheckBoxGroup): React.ReactNode => (
    <div className="checkFieldSpacing">
      <Input
        type="checkbox"
        value={profile.check}
        checked={profile.check === 'true'}
        onChange={e => props.change(e, profile)}
      />
    </div>
  );

  const dataTable = props.groups?.map(group => {
    const dataColumnProfiles: DataColumn[] = [];
    if (group.permissions && group.permissions.length > 0) {
      group.permissions.forEach(data => {
        dataColumnProfiles.push({
          id: data.id,
          name: data.name,
        });
      });
    }
    return {
      checkbox: checkBox(group),
      name: group.name,
      permissions:
        // eslint-disable-next-line no-nested-ternary
        group.permissions && group.permissions.length > 1 ? (
          <DropdonwFlags pointerClass={true} dataColumn={dataColumnProfiles} />
        ) : group.permissions && group.permissions.length === 1 ? (
          group.permissions[0].name
        ) : (
          ''
        ),
      status: group.actived ? 'Ativo' : 'Inativo',
      actions: (
        <div className="d-flex">
          <Pen
            onClick={(): void =>
              props.openModal(
                ShouldShowModal.group,
                'Editar grupo',
                undefined as unknown as User,
                group,
              )
            }
            className="mr-2 svg-icon action-icon"
          />
          <Trash
            onClick={(): void => props.showDelete(group)}
            className="mr-2 svg-icon action-icon"
          />
        </div>
      ),
    };
  });

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
      selector: row => row.permissions,
      cell: row => row.permissions,
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
