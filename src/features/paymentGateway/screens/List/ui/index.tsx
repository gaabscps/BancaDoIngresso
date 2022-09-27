import React, { Fragment } from 'react';
import FilterVector from '@/assets/images/svg/FilterVector';
import { Button, Loading } from '@/components';
import { Container } from 'reactstrap';
import { RegisterContent } from '@/features/paymentGateway/components/RegisterContent';
import { ReactComponent as Status } from '@/assets/images/svg/status.svg';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { ReactComponent as Trash } from '@/assets/images/svg/lixeira.svg';
import { ActionProps, Dialog } from '@/components/Dialog';
import { ColumnStatus, CustomTable } from '@/components/Table';
import Pagination from '@/components/Utils/Pagination';
import { PosRequestParams } from '@/features/pos/types';
import { FilterContent } from '@/features/paymentGateway/components/FilterContent';
import { FormErrors, OnChangeFormInput, FormData } from '@/hooks/useForm';
import ChargeSetup from '@/model/ChargeSetup';
import { columns } from './table';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}
export interface DataRow {
  id: string;
  name: string;
  url: string;
  email: string;
  actions: string;
  status: number;
}

// eslint-disable-next-line no-shadow
export enum ShouldShowModal {
  filter = 'filter',
  gateway = 'gateway',
}

interface PosContainerProps {
  state: States;
  gatewayState?: ChargeSetup;
  listPaymentGateway: ChargeSetup[];
  currentPage: PosRequestParams;
  shouldShowModal: ShouldShowModal;
  title: string | React.ReactNode;
  visible: boolean;
  formDataPaymentGateway: FormData;
  formErrorsPaymentGateway: FormErrors;
  formDataFilter: FormData;
  formErrorsFilter: FormErrors;
  onSavePaymentGateway: () => Promise<void>;
  onPaginationChange: (page: number) => void;
  changeColorColumn: (status: number) => void;
  onChangeFormInputFilter: OnChangeFormInput;
  onToggle: () => void;
  onFilter: () => Promise<void>;
  onChangeFormInputPaymentGateway: OnChangeFormInput;
  onShowDeletePaymentGateway: (gateway: ChargeSetup) => void;
  onShouldShowModal: ({
    value,
    newTitleModal,
    gateway,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    gateway?: ChargeSetup;
  }) => void;
}

export const PaymentGatewayContainer: React.FC<PosContainerProps> = ({
  listPaymentGateway,
  state,
  gatewayState,
  currentPage,
  title,
  visible,
  shouldShowModal,
  formDataPaymentGateway,
  formErrorsPaymentGateway,
  formDataFilter,
  formErrorsFilter,
  onChangeFormInputFilter,
  onChangeFormInputPaymentGateway,
  onSavePaymentGateway,
  onPaginationChange,
  changeColorColumn,
  onToggle,
  onFilter,
  onShouldShowModal,
  onShowDeletePaymentGateway,
}) => {
  const dataTablePos = listPaymentGateway?.map(item => ({
    id: item.id,
    name: (
      <ColumnStatus statusColor={String(changeColorColumn(Number(item.status)))}>
        {item.name}
      </ColumnStatus>
    ),
    url: item.url,
    email: item.email,
    actions: (
      <React.Fragment>
        <Pen
          className="mr-2 svg-icon action-icon"
          onClick={(): void =>
            onShouldShowModal({
              value: ShouldShowModal.gateway,
              newTitleModal: `${item.name}`,
              gateway: item,
            })
          }
        />
        <Trash
          className="mr-2 svg-icon action-icon"
          onClick={() => {
            onShowDeletePaymentGateway(item);
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
            [ShouldShowModal.filter]: renderActionDialogToCancel,
            [ShouldShowModal.gateway]: renderActionDialogToCancel,
          }[shouldShowModal],
          {
            [ShouldShowModal.filter]: {
              title: 'Aplicar',
              onClick: (): Promise<void> => onFilter(),
            },
            [ShouldShowModal.gateway]: {
              title: gatewayState?.id ? 'Salvar' : 'Cadastrar novo gateway de pagamento',
              onClick: (): Promise<void> => onSavePaymentGateway(),
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
            [ShouldShowModal.gateway]: (
              <RegisterContent
                formData={formDataPaymentGateway}
                formErrors={formErrorsPaymentGateway}
                onChangeFormInput={onChangeFormInputPaymentGateway}
                listPos={listPaymentGateway}
              />
            ),
          }[shouldShowModal]
        }
      </Dialog>

      <Container className="mainContainer" fluid={true}>
        <div className="d-flex justify-content-between">
          <div className="pageTitle">
            <span>Gateway de pagamento</span>
          </div>
          <div className="button-filter-container">
            <Button
              title="+ Cadastrar novo gateway de pagamento"
              onClick={(): void =>
                onShouldShowModal({
                  value: ShouldShowModal.gateway,
                  newTitleModal: 'Cadastrar novo gateway de pagamento',
                })
              }
            />
            <div className="filter-container">
              <div
                className="filter-content"
                onClick={(): void =>
                  onShouldShowModal({
                    value: ShouldShowModal.filter,
                    newTitleModal: '',
                  })
                }
              >
                <FilterVector />
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex pb-2 status-container">
          <div className="eventStatus subText">
            <Status style={{ color: '#7AD81B' }} />
            Gateway de pagamento ativo
          </div>
          <div className="eventStatus subText">
            <Status style={{ color: '#E64F49' }} />
            Gateway de pagamento inativo
          </div>
        </div>
        <CustomTable
          columns={columns}
          data={dataTablePos}
          theme="primary"
          numberRowsPerPage={currentPage.pageSize}
          progressPending={state === States.loading}
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
