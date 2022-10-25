import FilterVector from '@/assets/images/svg/FilterVector';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { ReactComponent as Trash } from '@/assets/images/svg/lixeira.svg';
import { Button, Dialog, Loading } from '@/components';
import { CustomTable, TableColumn } from '@/components/Table';
import { ActionProps } from '@/components/Dialog';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks';
import React from 'react';
import { Container, Label } from 'reactstrap';
import Pagination from '@/components/Utils/Pagination';
import Page from '@/model/Page';
import Permission from '@/model/Permission';
import Module from '@/model/Module';
import { ShouldShowModal, States } from '..';
import { FilterPermission } from './FilterPermission';
import { SavePermission } from './SavePermission';

interface DataTable {
  name: string;
  description: string;
  module: string;
  identifier: string;
  actions: string;
}

interface StateProps {
  state: States;
  modalTitle: string | React.ReactNode;
  visible: boolean;
  shouldShowModal: ShouldShowModal;
  renderActionDialogToClearFilter: ActionProps;
  renderModalActionProps: ActionProps;
  permission?: Permission;
  formDataFilter: FormData;
  formErrorsFilter: FormErrors;
  formDataPermission: FormData;
  formErrorsPermission: FormErrors;
  modules: Module[];
  title: string;
  permissions: Page<Permission, Permission>;
}

interface DispatchProps {
  onToggle(): void;
  onFilter(): Promise<void>;
  save(): Promise<void>;
  changeFormInputFilter: OnChangeFormInput;
  changeFormInputPermission: OnChangeFormInput;
  openModal(value: ShouldShowModal, modalTitle: string, permission?: Permission): void;
  showDelete(permission: Permission): void;
  paginationChange(page: number): void;
}

type Props = StateProps & DispatchProps;

export const ListPermission: React.FC<Props> = (props: Props): JSX.Element => {
  const dataTable = props.permissions.list?.map(data => ({
    name: data.name,
    description: data.description,
    module: data.module.description,
    identifier: data.identifier,
    actions: (
      <div className="d-flex">
        <Pen
          onClick={(): void =>
            props.openModal(ShouldShowModal.permission, 'Editar permissão', data)
          }
          className="mr-4 svg-icon action-icon"
        />
        <Trash
          onClick={(): void => props.showDelete(data)}
          className="mr-2 svg-icon action-icon svg-icon-trash"
        />
      </div>
    ),
  }));

  const columns: TableColumn<DataTable>[] = [
    {
      name: 'Nome',
      selector: row => row.name,
    },
    {
      name: 'Descrição',
      selector: row => row.description,
    },
    {
      name: 'Módulo',
      selector: row => row.module,
    },
    {
      name: 'Identificador',
      selector: row => row.identifier,
    },
    {
      name: 'Ações',
      selector: row => row.actions,
      width: '115px',
    },
  ];
  return (
    <React.Fragment>
      <Loading isVisible={props.state === States.loading} />
      <Dialog
        title={props.modalTitle}
        visible={props.visible}
        onClose={props.onToggle}
        position="center"
        isContentWithCard={props.shouldShowModal !== ShouldShowModal.permission}
        actions={[
          {
            [ShouldShowModal.filter]: props.renderActionDialogToClearFilter,
            [ShouldShowModal.permission]: props.renderModalActionProps,
          }[props.shouldShowModal],
          {
            [ShouldShowModal.filter]: {
              title: 'Aplicar',
              onClick: (): Promise<void> => props.onFilter(),
            },
            [ShouldShowModal.permission]: {
              title: props.permission?.id ? 'Editar permissão' : 'Cadastrar permissão',
              onClick: (): Promise<void> => props.save(),
            },
          }[props.shouldShowModal],
        ]}
      >
        {
          {
            [ShouldShowModal.filter]: (
              <FilterPermission
                formData={props.formDataFilter}
                formErrors={props.formErrorsFilter}
                change={props.changeFormInputFilter}
              />
            ),
            [ShouldShowModal.permission]: (
              <SavePermission
                formData={props.formDataPermission}
                formErrors={props.formErrorsPermission}
                modules={props.modules}
                change={props.changeFormInputPermission}
              />
            ),
          }[props.shouldShowModal]
        }
      </Dialog>
      <Container className="mainContainer" fluid={true}>
        <div className="d-flex justify-content-between" style={{ paddingBottom: '30px' }}>
          <div className="pageTitle" style={{ display: 'grid' }}>
            <Label>{props.title}</Label>
          </div>
          <div className="button-filter-container">
            <Button
              size="md"
              title="+ Cadastrar permissão"
              onClick={(): void =>
                props.openModal(ShouldShowModal.permission, 'Cadastrar permissão')
              }
            />
            <div className="filter-container">
              <div
                className="filter-content"
                onClick={(): void => props.openModal(ShouldShowModal.filter, '')}
              >
                <FilterVector />
              </div>
            </div>
          </div>
        </div>
        <CustomTable
          columns={columns}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data={dataTable as any[]}
          numberRowsPerPage={props.permissions.pageSize as number}
          progressPending={props.state === States.loading}
        />
        <Pagination
          currentPage={props.permissions.page}
          totalCount={props.permissions.total}
          pageSize={props.permissions.pageSize}
          onPageChange={page => props.paginationChange(page)}
          total={props.permissions.total}
        />
      </Container>
    </React.Fragment>
  );
};
