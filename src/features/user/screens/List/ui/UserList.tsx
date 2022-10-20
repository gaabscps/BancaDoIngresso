import { CustomTable, TableColumn } from '@/components/Table';
import User from '@/model/User';
import UserType from '@/model/UserType';
import React, { ChangeEvent } from 'react';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { ReactComponent as Trash } from '@/assets/images/svg/lixeira.svg';
import { Input } from 'reactstrap';
import Profile from '@/model/Profile';
import { DropdonwFlags } from '@/components';
import { ShouldShowModal } from '..';

interface DataTable {
  checkbox: string;
  name: string;
  cpf: string;
  userType: UserType;
  profiles: string;
  status: string;
  actions: string;
}

interface DataColumn {
  id: string;
  name: string;
}

interface StateProps {
  users: User[];
}
interface DispatchProps {
  checkAll(e: ChangeEvent<HTMLInputElement>): void;
  change(user: User): void;
  toUserType(userType: UserType): string;
  openModal(value: ShouldShowModal, modalTitle: string, user?: User, group?: Profile): void;
  showDelete(user: User): void;
}

type Props = StateProps & DispatchProps;

export const UserList: React.FC<Props> = (props: Props): JSX.Element => {
  const checkBoxAll = (): React.ReactNode => (
    <div className="checkFieldSpacing">
      <Input type="checkbox" onChange={e => props.checkAll(e)} />
    </div>
  );

  const checkBox = (user: User): React.ReactNode => (
    <div className="checkFieldSpacing">
      <Input type="checkbox" onChange={() => props.change(user)} />
    </div>
  );

  const dataTable = props.users?.map(user => {
    const dataColumnProfiles: DataColumn[] = [];
    if (user.profiles && user.profiles.length > 0) {
      user.profiles.forEach(data => {
        dataColumnProfiles.push({
          id: data.id,
          name: data.name,
        });
      });
    }
    return {
      checkbox: checkBox(user),
      name: user.name,
      cpf: user.cpf,
      userType: user.userType,
      profiles:
        // eslint-disable-next-line no-nested-ternary
        user.profiles && user.profiles.length > 1 ? (
          <DropdonwFlags pointerClass={true} dataColumn={dataColumnProfiles} />
        ) : user.profiles && user.profiles.length === 1 ? (
          user.profiles[0].name
        ) : (
          ''
        ),
      status: 'Ativo',
      actions: (
        <div className="d-flex">
          <Pen
            onClick={(): void => props.openModal(ShouldShowModal.user, 'Editar usuário', user)}
            className="mr-2 svg-icon action-icon"
          />
          <Trash
            onClick={(): void => props.showDelete(user)}
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
      name: 'CPF',
      selector: row => row.cpf,
    },
    {
      name: 'Tipo do usuário',
      selector: row => props.toUserType(row.userType),
    },
    {
      name: 'Grupo',
      selector: row => row.profiles,
      cell: row => row.profiles,
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
      numberRowsPerPage={props.users.length}
      progressPending={false}
    />
  );
};
