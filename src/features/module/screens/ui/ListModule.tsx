import FilterVector from '@/assets/images/svg/FilterVector';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { ReactComponent as Trash } from '@/assets/images/svg/lixeira.svg';
import { Button, Dialog, Loading } from '@/components';
import { CustomTable, TableColumn } from '@/components/Table';
import { ActionProps } from '@/components/Dialog';
import { FormData, FormErrors, OnChangeFormInput } from '@/hooks';
import Module from '@/model/Module';
import React from 'react';
import { Container, Label } from 'reactstrap';
import Pagination from '@/components/Utils/Pagination';
import Page from '@/model/Page';
import { ShouldShowModal, States } from '..';
import { FilterModule } from './FilterModule';
import { SaveModule } from './SaveModule';

interface DataTable {
  name: string;
  description: string;
  actions: string;
}

interface StateProps {
  state: States;
  modalTitle: string | React.ReactNode;
  visible: boolean;
  shouldShowModal: ShouldShowModal;
  renderActionDialogToClearFilter: ActionProps;
  renderModalActionProps: ActionProps;
  module?: Module;
  formDataFilter: FormData;
  formErrorsFilter: FormErrors;
  formDataModule: FormData;
  formErrorsModule: FormErrors;
  title: string;
  modules: Page<Module, Module>;
}

interface DispatchProps {
  onToggle(): void;
  onFilter(): Promise<void>;
  save(): Promise<void>;
  changeFormInputFilter: OnChangeFormInput;
  changeFormInputModule: OnChangeFormInput;
  openModal(value: ShouldShowModal, modalTitle: string, module?: Module): void;
  showDelete(module: Module): void;
  paginationChange(page: number): void;
}

type Props = StateProps & DispatchProps;

export const ModuleList: React.FC<Props> = (props: Props): JSX.Element => {
  const dataTable = props.modules.list?.map(data => ({
    name: data.name,
    description: data.description,
    actions: (
      <div className="d-flex">
        <Pen
          onClick={(): void => props.openModal(ShouldShowModal.module, 'Editar módulo', data)}
          className="mr-2 svg-icon action-icon"
        />
        <Trash onClick={(): void => props.showDelete(data)} className="mr-2 svg-icon action-icon" />
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
        isContentWithCard={props.shouldShowModal !== ShouldShowModal.module}
        actions={[
          {
            [ShouldShowModal.filter]: props.renderActionDialogToClearFilter,
            [ShouldShowModal.module]: props.renderModalActionProps,
          }[props.shouldShowModal],
          {
            [ShouldShowModal.filter]: {
              title: 'Aplicar',
              onClick: (): Promise<void> => props.onFilter(),
            },
            [ShouldShowModal.module]: {
              title: props.module?.id ? 'Editar módulo' : 'Cadastrar módulo',
              onClick: (): Promise<void> => props.save(),
            },
          }[props.shouldShowModal],
        ]}
      >
        {
          {
            [ShouldShowModal.filter]: (
              <FilterModule
                formData={props.formDataFilter}
                formErrors={props.formErrorsFilter}
                change={props.changeFormInputFilter}
              />
            ),
            [ShouldShowModal.module]: (
              <SaveModule
                formData={props.formDataModule}
                formErrors={props.formErrorsModule}
                change={props.changeFormInputModule}
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
              title="+ Cadastrar módulo"
              onClick={(): void => props.openModal(ShouldShowModal.module, 'Cadastrar módulo')}
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
          numberRowsPerPage={props.modules.pageSize as number}
          progressPending={props.state === States.loading}
        />
        <Pagination
          currentPage={props.modules.page}
          totalCount={props.modules.total}
          pageSize={props.modules.pageSize}
          onPageChange={page => props.paginationChange(page)}
          total={props.modules.total}
        />
      </Container>
    </React.Fragment>
  );
};
