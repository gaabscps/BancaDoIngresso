/* eslint-disable react/jsx-key */
import React, { Fragment } from 'react';
import FilterVector from '@/assets/images/svg/FilterVector';
import { Loading } from '@/components';
import { Container, Label } from 'reactstrap';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { ReactComponent as Trash } from '@/assets/images/svg/lixeira.svg';
import { ActionProps, Dialog } from '@/components/Dialog';
import { CustomTable } from '@/components/Table';
import Pagination from '@/components/Utils/Pagination';
import { FormErrors, OnChangeFormInput, FormData } from '@/hooks/useForm';
import Client from '@/model/Client';
import { ClientRequestParams } from '@/features/client/types';
import { FilterContent } from '@/features/client/components/FilterContent';
import { RegisterContent } from '@/features/client/components/RegisterContent';
import { updateMask as updateMaskCPF } from '@/helpers/masks/cpf';
import { updateMask as updateMaskPhone } from '@/helpers/masks/mobilePhone';
import { columns } from './table';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}
export interface DataRow {
  id: string;
  name: string;
  cpf: string;
  cellPhone: string;
  email: string;
  actions: string;
}

// eslint-disable-next-line no-shadow
export enum ShouldShowModal {
  filter = 'filter',
  client = 'client',
}

interface StateProps {
  state: States;
  clientState?: Client;
  listClient: Client[];
  currentPage: ClientRequestParams;
  shouldShowModal: ShouldShowModal;
  title: string | React.ReactNode;
  visible: boolean;
  formDataClient: FormData;
  formErrorsClient: FormErrors;
  formDataFilter: FormData;
  formErrorsFilter: FormErrors;
}

interface DispatchProps {
  clearFilter: () => void;
  onSaveClient: () => Promise<void>;
  onPaginationChange: (page: number) => void;
  onChangeFormInputFilter: OnChangeFormInput;
  onToggle: () => void;
  onFilter: () => Promise<void>;
  onChangeFormInputClient: OnChangeFormInput;
  onShowDeleteClient: (client: Client) => void;
  onShouldShowModal: ({
    value,
    newTitleModal,
    client,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    client?: Client;
  }) => void;
}

type Props = StateProps & DispatchProps;

export const ClientContainer: React.FC<Props> = ({
  state,
  clientState,
  listClient,
  currentPage,
  shouldShowModal,
  title,
  visible,
  formDataClient,
  formErrorsClient,
  formDataFilter,
  formErrorsFilter,
  clearFilter,
  onSaveClient,
  onPaginationChange,
  onChangeFormInputFilter,
  onToggle,
  onFilter,
  onChangeFormInputClient,
  onShowDeleteClient,
  onShouldShowModal,
}) => {
  const dataTableClient = listClient?.map(item => ({
    id: item.id,
    name: item.name,
    cpf: updateMaskCPF(item.cpf),
    cellPhone: updateMaskPhone(item.cellPhone),
    email: item.email,
    actions: (
      <React.Fragment>
        <Pen
          className="mr-4 svg-icon action-icon"
          onClick={(): void =>
            onShouldShowModal({
              value: ShouldShowModal.client,
              newTitleModal: `Editar ${item.name}`,
              client: item,
            })
          }
        />
        <Trash
          className="mr-2 svg-icon action-icon svg-icon-trash"
          onClick={() => {
            onShowDeleteClient(item);
          }}
        />
      </React.Fragment>
    ),
  }));

  const renderActionDialogToCancel: ActionProps = {
    title: 'Cancelar',
    onClick: (): void => onToggle(),
    theme: 'noneBorder',
  };
  const renderActionDialogToFilter: ActionProps = {
    title: 'Limpar',
    onClick: (): void => clearFilter(),
    theme: 'noneBorder',
  };

  return (
    <Fragment>
      <Loading isVisible={state === States.loading} />
      <Dialog
        title={title}
        visible={visible}
        onClose={onToggle}
        position={shouldShowModal === ShouldShowModal.filter ? 'right' : 'center'}
        isContentWithCard={shouldShowModal !== ShouldShowModal.filter}
        actions={[
          {
            [ShouldShowModal.filter]: renderActionDialogToFilter,
            [ShouldShowModal.client]: renderActionDialogToCancel,
          }[shouldShowModal],
          {
            [ShouldShowModal.filter]: {
              title: 'Filtrar',
              onClick: (): Promise<void> => onFilter(),
            },
            [ShouldShowModal.client]: {
              title: clientState?.id ? 'Salvar' : 'Cadastrar novo cliente',
              onClick: (): Promise<void> => onSaveClient(),
              disabled:
                formDataClient.name === '' ||
                formDataClient.cpf === '' ||
                formDataClient.rg === '' ||
                formDataClient.cellPhone === '' ||
                formDataClient.email === '' ||
                formDataClient.birthDate === '' ||
                formDataClient.zipCode === '' ||
                formDataClient.state === '' ||
                formDataClient.city === '' ||
                formDataClient.district === '' ||
                formDataClient.street === '',
            },
          }[shouldShowModal],
        ]}
      >
        {
          {
            [ShouldShowModal.filter]: (
              <FilterContent
                formData={formDataFilter}
                formErrors={formErrorsFilter}
                onChangeFormInput={onChangeFormInputFilter}
              />
            ),
            [ShouldShowModal.client]: (
              <RegisterContent
                formData={formDataClient}
                formErrors={formErrorsClient}
                onChangeFormInput={onChangeFormInputClient}
              />
            ),
          }[shouldShowModal]
        }
      </Dialog>

      <Container className="mainContainer" fluid={true}>
        <div className="d-flex justify-content-between" style={{ paddingBottom: '30px' }}>
          <div className="pageTitle" style={{ display: 'grid' }}>
            <Label>Gestão de clientes</Label>
          </div>
          <div className="button-filter-container">
            <div className="filter-container">
              <div
                className="filter-content"
                onClick={(): void => {
                  onToggle();
                  onShouldShowModal({
                    value: ShouldShowModal.filter,
                    newTitleModal: '',
                  });
                }}
              >
                <FilterVector />
              </div>
            </div>
          </div>
        </div>
        <CustomTable
          columns={columns}
          data={dataTableClient}
          numberRowsPerPage={currentPage.pageSize}
          progressPending={state === States.loading}
          theme="primaryWithMargin"
        />
        <Pagination
          currentPage={currentPage.page}
          totalCount={currentPage.total}
          pageSize={currentPage.pageSize}
          onPageChange={page => onPaginationChange(page)}
          total={currentPage.total}
        />
      </Container>
    </Fragment>
  );
};
