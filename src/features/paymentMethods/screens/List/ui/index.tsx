/* eslint-disable react/jsx-key */
import React, { Fragment } from 'react';
import FilterVector from '@/assets/images/svg/FilterVector';
import { Button, Loading } from '@/components';
import { Container } from 'reactstrap';
import { RegisterContent } from '@/features/paymentMethods/components/RegisterContent';
import { ReactComponent as Status } from '@/assets/images/svg/status.svg';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { ReactComponent as Trash } from '@/assets/images/svg/lixeira.svg';
import { ActionProps, Dialog } from '@/components/Dialog';
import { ColumnStatus, CustomTable } from '@/components/Table';
import Pagination from '@/components/Utils/Pagination';
import { PaymentMethodsRequestParams } from '@/features/paymentMethods/types';
import { FilterContent } from '@/features/paymentMethods/components/FilterContent';
import { FormErrors, OnChangeFormInput, FormData } from '@/hooks/useForm';

import PaymentGateway from '@/model/PaymentGateway';
import { colors } from '@/styles/colors';
import { columns } from './table';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}
export interface DataRow {
  id: string;
  name: string;
  paymentGateway: string;
  status: number;
  actions: string;
}

// eslint-disable-next-line no-shadow
export enum ShouldShowModal {
  filter = 'filter',
  paymentMethods = 'paymentMethods',
}

interface PaymentMethodsContainerProps {
  state: States;
  paymentMethodsState?: PaymentGateway;
  listPaymentMethods: PaymentGateway[];
  currentPage: PaymentMethodsRequestParams;
  shouldShowModal: ShouldShowModal;
  title: string | React.ReactNode;
  visible: boolean;
  formDataPaymentMethods: FormData;
  formErrorsPaymentMethods: FormErrors;
  formDataFilter: FormData;
  formErrorsFilter: FormErrors;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listChargeSetup: any[];
  clearFilter: () => void;
  onSavePaymentMethods: () => Promise<void>;
  onPaginationChange: (page: number) => void;
  changeColorColumn: (status: number) => void;
  onChangeFormInputFilter: OnChangeFormInput;
  onToggle: () => void;
  onFilter: () => Promise<void>;
  onChangeFormInputPaymentMethods: OnChangeFormInput;
  onShowDeletePaymentMethods: (paymentMethods: PaymentGateway) => void;
  onShouldShowModal: ({
    value,
    newTitleModal,
    paymentMethods,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    paymentMethods?: PaymentGateway;
  }) => void;
}

export const PaymentMethodsContainer: React.FC<PaymentMethodsContainerProps> = ({
  listPaymentMethods,
  state,
  paymentMethodsState,
  currentPage,
  title,
  visible,
  shouldShowModal,
  formDataPaymentMethods,
  formErrorsPaymentMethods,
  formDataFilter,
  formErrorsFilter,
  listChargeSetup,
  clearFilter,
  onChangeFormInputFilter,
  onChangeFormInputPaymentMethods,
  onSavePaymentMethods,
  onPaginationChange,
  changeColorColumn,
  onToggle,
  onFilter,
  onShouldShowModal,
  onShowDeletePaymentMethods,
}) => {
  const dataTablePaymentMethods = listPaymentMethods?.map(paymentMethods => ({
    id: paymentMethods.id,
    name: (
      <ColumnStatus statusColor={String(changeColorColumn(Number(paymentMethods.status)))}>
        {paymentMethods.name}
      </ColumnStatus>
    ),
    paymentGateway: paymentMethods.charge.name,
    actions: (
      <React.Fragment>
        <Pen
          className="mr-4 svg-icon action-icon"
          onClick={(): void =>
            onShouldShowModal({
              value: ShouldShowModal.paymentMethods,
              newTitleModal: `Editar ${paymentMethods.name}`,
              paymentMethods,
            })
          }
        />
        <Trash
          className="mr-4 svg-icon action-icon svg-icon-trash"
          onClick={() => {
            onShowDeletePaymentMethods(paymentMethods);
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

  const renderActionDialogToClearFilter: ActionProps = {
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
            [ShouldShowModal.filter]: renderActionDialogToClearFilter,
            [ShouldShowModal.paymentMethods]: renderActionDialogToCancel,
          }[shouldShowModal],
          {
            [ShouldShowModal.filter]: {
              title: 'Aplicar',
              onClick: (): Promise<void> => onFilter(),
            },
            [ShouldShowModal.paymentMethods]: {
              title: paymentMethodsState?.id ? 'Salvar' : 'Cadastrar nova forma de pagamento',
              onClick: (): Promise<void> => onSavePaymentMethods(),
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
            [ShouldShowModal.paymentMethods]: (
              <RegisterContent
                formData={formDataPaymentMethods}
                formErrors={formErrorsPaymentMethods}
                onChangeFormInput={onChangeFormInputPaymentMethods}
                listPaymentMethods={listPaymentMethods}
                listChargeSetup={listChargeSetup}
              />
            ),
          }[shouldShowModal]
        }
      </Dialog>

      <Container className="mainContainer" fluid={true}>
        <div className="d-flex justify-content-between pb-4">
          <h5 className="pageTitle">Formas de pagamento</h5>
          <div className="button-filter-container">
            <Button
              title="+ Cadastrar nova forma de pagamento"
              onClick={(): void =>
                onShouldShowModal({
                  value: ShouldShowModal.paymentMethods,
                  newTitleModal: 'Cadastrar nova forma de pagamento',
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
            <Status color={colors.green} />
            Forma de pagamento ativo
          </div>
          <div className="eventStatus subText">
            <Status color={colors.red} />
            Forma de pagamento inativo
          </div>
        </div>
        <CustomTable
          columns={columns}
          data={dataTablePaymentMethods}
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
