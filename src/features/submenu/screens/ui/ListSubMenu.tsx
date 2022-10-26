import FilterVector from '@/assets/images/svg/FilterVector';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { ReactComponent as Trash } from '@/assets/images/svg/lixeira.svg';
import { Button, Dialog, Loading } from '@/components';
import { CustomTable, TableColumn } from '@/components/Table';
import { ActionProps } from '@/components/Dialog';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks';
import React, { ChangeEvent } from 'react';
import { Container, Label } from 'reactstrap';
import Pagination from '@/components/Utils/Pagination';
import Page from '@/model/Page';
import Module from '@/model/Module';
import Menu from '@/model/Menu';
import SubMenu from '@/model/SubMenu';
import { ShouldShowModal, States } from '..';
import { FilterSubMenu } from './FilterSubMenu';
import { SaveSubMenu } from './SaveSubMenu';

interface DataTable {
  name: string;
  module: string;
  menu: string;
  permission: string;
  icon: string;
  link: string;
  position: string;
  subMenus: string;
  status: string;
  actions: string;
}

interface StateProps {
  state: States;
  modalTitle: string | React.ReactNode;
  visible: boolean;
  shouldShowModal: ShouldShowModal;
  renderActionDialogToClearFilter: ActionProps;
  renderModalActionProps: ActionProps;
  subMenu?: SubMenu;
  formDataFilter: FormData;
  formErrorsFilter: FormErrors;
  formDataSubMenu: FormData;
  formErrorsSubMenu: FormErrors;
  showActivateSwitch: boolean;
  modules: Module[];
  title: string;
  menus: Menu[];
  subMenus: Page<SubMenu, SubMenu>;
}

interface DispatchProps {
  onToggle(): void;
  onFilter(): Promise<void>;
  save(): Promise<void>;
  changeFormInputFilter: OnChangeFormInput;
  changeFormInputSubMenu: OnChangeFormInput;
  onActivateAndInactivate(e: ChangeEvent<HTMLInputElement>): void;
  openModal(value: ShouldShowModal, modalTitle: string, submenu?: SubMenu): void;
  showDelete(submenu: SubMenu): void;
  paginationChange(page: number): void;
}

type Props = StateProps & DispatchProps;

export const ListSubMenu: React.FC<Props> = (props: Props): JSX.Element => {
  const dataTable = props.subMenus.list?.map(submenu => ({
    name: submenu.name,
    menu: submenu.menu.name,
    module: submenu.module.name,
    permission: submenu.permission.name,
    link: submenu.link,
    position: submenu.position,
    status: submenu.actived ? (
      <div className="flag-item text-success">Ativo</div>
    ) : (
      <div className="flag-item text-danger">Inativo</div>
    ),
    actions: (
      <div className="d-flex">
        <Pen
          onClick={(): void => props.openModal(ShouldShowModal.submenu, 'Editar Menu', submenu)}
          className="mr-2 svg-icon action-icon"
        />
        <Trash
          onClick={(): void => props.showDelete(submenu)}
          className="mr-2 svg-icon action-icon"
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
      name: 'Menu',
      selector: row => row.menu,
    },
    {
      name: 'Módulo',
      selector: row => row.module,
    },
    {
      name: 'Permissão',
      selector: row => row.permission,
    },
    {
      name: 'Link',
      selector: row => row.link,
    },
    {
      name: 'Posição',
      selector: row => row.position,
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
    <React.Fragment>
      <Loading isVisible={props.state === States.loading} />
      <Dialog
        title={props.modalTitle}
        visible={props.visible}
        onClose={props.onToggle}
        position="center"
        isContentWithCard={props.shouldShowModal !== ShouldShowModal.submenu}
        actions={[
          {
            [ShouldShowModal.filter]: props.renderActionDialogToClearFilter,
            [ShouldShowModal.submenu]: props.renderModalActionProps,
          }[props.shouldShowModal],
          {
            [ShouldShowModal.filter]: {
              title: 'Aplicar',
              onClick: (): Promise<void> => props.onFilter(),
            },
            [ShouldShowModal.submenu]: {
              title: props.subMenu?.id ? 'Editar submenu' : 'Cadastrar submenu',
              onClick: (): Promise<void> => props.save(),
            },
          }[props.shouldShowModal],
        ]}
      >
        {
          {
            [ShouldShowModal.filter]: (
              <FilterSubMenu
                formData={props.formDataFilter}
                formErrors={props.formErrorsFilter}
                change={props.changeFormInputFilter}
              />
            ),
            [ShouldShowModal.submenu]: (
              <SaveSubMenu
                formData={props.formDataSubMenu}
                formErrors={props.formErrorsSubMenu}
                showActivateSwitch={props.showActivateSwitch}
                menus={props.menus}
                modules={props.modules}
                change={props.changeFormInputSubMenu}
                onActivateAndInactivate={props.onActivateAndInactivate}
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
              title="+ Cadastrar SubMenu"
              onClick={(): void => props.openModal(ShouldShowModal.submenu, 'Cadastrar submenu')}
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
          numberRowsPerPage={props.subMenus.pageSize as number}
          progressPending={props.state === States.loading}
        />
        <Pagination
          currentPage={props.subMenus.page}
          totalCount={props.subMenus.total}
          pageSize={props.subMenus.pageSize}
          onPageChange={page => props.paginationChange(page)}
          total={props.subMenus.total}
        />
      </Container>
    </React.Fragment>
  );
};
