import FilterVector from '@/assets/images/svg/FilterVector';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { ReactComponent as Trash } from '@/assets/images/svg/lixeira.svg';
import { Button, Dialog, DropdonwFlags, Loading } from '@/components';
import { CustomTable, TableColumn } from '@/components/Table';
import { ActionProps } from '@/components/Dialog';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks';
import React, { ChangeEvent } from 'react';
import { Container, Label } from 'reactstrap';
import Pagination from '@/components/Utils/Pagination';
import Page from '@/model/Page';
import Module from '@/model/Module';
import Menu from '@/model/Menu';
import { ShouldShowModal, States } from '..';
import { FilterMenu } from './FilterMenu';
import { SaveMenu } from './SaveMenu';

interface DataTable {
  name: string;
  module: string;
  permission: string;
  icon: string;
  link: string;
  position: string;
  subMenus: string;
  status: string;
  actions: string;
}

interface DataColumn {
  id: string;
  name: string;
}

interface StateProps {
  state: States;
  modalTitle: string | React.ReactNode;
  visible: boolean;
  shouldShowModal: ShouldShowModal;
  renderActionDialogToClearFilter: ActionProps;
  renderModalActionProps: ActionProps;
  menu?: Menu;
  formDataFilter: FormData;
  formErrorsFilter: FormErrors;
  formDataMenu: FormData;
  formErrorsMenu: FormErrors;
  showActivateSwitch: boolean;
  modules: Module[];
  title: string;
  menus: Page<Menu, Menu>;
}

interface DispatchProps {
  onToggle(): void;
  onFilter(): Promise<void>;
  save(): Promise<void>;
  changeFormInputFilter: OnChangeFormInput;
  changeFormInputMenu: OnChangeFormInput;
  onActivateAndInactivate(e: ChangeEvent<HTMLInputElement>): void;
  openModal(value: ShouldShowModal, modalTitle: string, menu?: Menu): void;
  showDelete(menu: Menu): void;
  paginationChange(page: number): void;
}

type Props = StateProps & DispatchProps;

export const ListMenu: React.FC<Props> = (props: Props): JSX.Element => {
  const dataTable = props.menus.list?.map(menu => {
    const dataColumnSubMenus: DataColumn[] = [];
    if (menu.subMenus && menu.subMenus.length > 0) {
      menu.subMenus.forEach(data => {
        dataColumnSubMenus.push({
          id: data.id,
          name: data.name,
        });
      });
    }

    return {
      name: menu.name,
      module: menu.module.description,
      permission: menu.permission.description,
      icon: menu.icon,
      link: menu.link,
      position: menu.position,
      subMenus:
        // eslint-disable-next-line no-nested-ternary
        menu.subMenus && menu.subMenus.length > 1 ? (
          <DropdonwFlags pointerClass={true} dataColumn={dataColumnSubMenus} />
        ) : menu.subMenus && menu.subMenus.length === 1 ? (
          menu.subMenus[0].name
        ) : (
          ''
        ),
      status: menu.actived ? (
        <div className="flag-item text-success">Ativo</div>
      ) : (
        <div className="flag-item text-danger">Inativo</div>
      ),
      actions: (
        <div className="d-flex">
          <Pen
            onClick={(): void => props.openModal(ShouldShowModal.menu, 'Editar Menu', menu)}
            className="mr-4 svg-icon action-icon"
          />
          <Trash
            onClick={(): void => props.showDelete(menu)}
            className="mr-2 svg-icon action-icon svg-icon-trash"
          />
        </div>
      ),
    };
  });

  const columns: TableColumn<DataTable>[] = [
    {
      name: 'Nome',
      selector: row => row.name,
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
      name: 'Icone',
      selector: row => row.icon,
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
      name: 'Sub Menus',
      selector: row => row.subMenus,
      cell: row => row.subMenus,
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
        isContentWithCard={props.shouldShowModal !== ShouldShowModal.menu}
        actions={[
          {
            [ShouldShowModal.filter]: props.renderActionDialogToClearFilter,
            [ShouldShowModal.menu]: props.renderModalActionProps,
          }[props.shouldShowModal],
          {
            [ShouldShowModal.filter]: {
              title: 'Aplicar',
              onClick: (): Promise<void> => props.onFilter(),
            },
            [ShouldShowModal.menu]: {
              title: props.menu?.id ? 'Editar menu' : 'Cadastrar menu',
              onClick: (): Promise<void> => props.save(),
            },
          }[props.shouldShowModal],
        ]}
      >
        {
          {
            [ShouldShowModal.filter]: (
              <FilterMenu
                formData={props.formDataFilter}
                formErrors={props.formErrorsFilter}
                change={props.changeFormInputFilter}
              />
            ),
            [ShouldShowModal.menu]: (
              <SaveMenu
                formData={props.formDataMenu}
                formErrors={props.formErrorsMenu}
                showActivateSwitch={props.showActivateSwitch}
                modules={props.modules}
                change={props.changeFormInputMenu}
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
              title="+ Cadastrar menu"
              onClick={(): void => props.openModal(ShouldShowModal.menu, 'Cadastrar menu')}
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
          numberRowsPerPage={props.menus.pageSize as number}
          progressPending={props.state === States.loading}
        />
        <Pagination
          currentPage={props.menus.page}
          totalCount={props.menus.total}
          pageSize={props.menus.pageSize}
          onPageChange={page => props.paginationChange(page)}
          total={props.menus.total}
        />
      </Container>
    </React.Fragment>
  );
};
