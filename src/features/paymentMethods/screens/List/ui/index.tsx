/* eslint-disable react/jsx-key */
import React, { Fragment } from 'react';
import FilterVector from '@/assets/images/svg/FilterVector';
import { Button, Loading } from '@/components';
import { Container, Label } from 'reactstrap';
import { RegisterContent } from '@/features/paymentMethods/components/RegisterContent';
import { ReactComponent as Status } from '@/assets/images/svg/status.svg';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { ReactComponent as Trash } from '@/assets/images/svg/lixeira.svg';
import { ActionProps, Dialog } from '@/components/Dialog';
import { ColumnStatus, CustomTable } from '@/components/Table';
import Pagination from '@/components/Utils/Pagination';
// import { PaymentMethodsRequestParams } from '@/features/paymentMethods/types';
import { FilterContent } from '@/features/paymentMethods/components/FilterContent';
import { FormErrors, OnChangeFormInput, FormData } from '@/hooks/useForm';
import Pdv from '@/model/Pdv';
// import PaymentMethods from '@/model/PaymentMethods';
import PaymentMethods from '@/model/PaymentMethods';
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
  paymentMethodsState?: PaymentMethods;
  listPaymentMethods: PaymentMethods[];
  currentPage: PaymentMethodsRequestParams;
  shouldShowModal: ShouldShowModal;
  title: string | React.ReactNode;
  visible: boolean;
  formDataPaymentMethods: FormData;
  formErrorsPaymentMethods: FormErrors;
  formDataFilter: FormData;
  formErrorsFilter: FormErrors;
  listPdv: Pdv[];
  onSavePaymentMethods: () => Promise<void>;
  onPaginationChange: (page: number) => void;
  changeColorColumn: (status: number) => void;
  onChangeFormInputFilter: OnChangeFormInput;
  onToggle: () => void;
  onFilter: () => Promise<void>;
  onChangeFormInputPaymentMethods: OnChangeFormInput;
  onShowDeletePaymentMethods: (paymentMethods: PaymentMethods) => void;
  onShouldShowModal: ({
    value,
    newTitleModal,
    paymentMethods,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    paymentMethods?: PaymentMethods;
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
  listPdv,
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
  // const dataTablePaymentMethods = listPaymentMethods?.map(item => ({
  //   id: item.id,
  //   name: (
  //     <ColumnStatus statusColor={String(changeColorColumn(Number(item.status)))}>
  //       {item.name}
  //     </ColumnStatus>
  //   ),
  //   paymentGateway: item.paymentGateway,
  //   actions: (
  //     <React.Fragment>
  //       <Pen
  //         className="mr-2 svg-icon action-icon"
  //         onClick={(): void =>
  //           onShouldShowModal({
  //             value: ShouldShowModal.paymentMethods,
  //             newTitleModal: `Editar ${item.name}`,
  //             paymentMethods: item,
  //           })
  //         }
  //       />
  //       <Trash
  //         className="mr-2 svg-icon action-icon"
  //         onClick={() => {
  //           onShowDeletePaymentMethods(item);
  //         }}
  //       />
  //     </React.Fragment>
  //   ),
  // }));
  const dataTablePaymentMethods = [
    {
      id: '1',
      name: <ColumnStatus statusColor={String(changeColorColumn(1))}>PayPal</ColumnStatus>,
      paymentGateway: 'gateway',
      actions: (
        <React.Fragment>
          <Pen
            className="mr-2 svg-icon action-icon"
            onClick={(): void =>
              onShouldShowModal({
                value: ShouldShowModal.paymentMethods,
                newTitleModal: `Editar PayPal`,
                // paymentMethods: 1,
              })
            }
          />
          <Trash
            className="mr-2 svg-icon action-icon"
            onClick={() => {
              // onShowDeletePaymentMethods();
            }}
          />
        </React.Fragment>
      ),
    },
  ];

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
            [ShouldShowModal.paymentMethods]: renderActionDialogToCancel,
          }[shouldShowModal],
          {
            [ShouldShowModal.filter]: {
              title: 'Filtrar',
              onClick: (): Promise<void> => onFilter(),
            },
            [ShouldShowModal.paymentMethods]: {
              title: paymentMethodsState?.id
                ? 'Editar forma de pagamento'
                : 'Cadastrar nova forma de pagamento',
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
                listPdv={listPdv}
              />
            ),
          }[shouldShowModal]
        }
      </Dialog>

      <Container className="mainContainer" fluid={true}>
        <div className="d-flex justify-content-between" style={{ paddingBottom: '30px' }}>
          <div className="pageTitle" style={{ display: 'grid' }}>
            <Label>Formas de pagamento</Label>
          </div>
          <div className="button-filter-container">
            <Button
              title="+ Cadastrar nova forma de pagamento"
              onClick={(): void =>
                onShouldShowModal({
                  value: ShouldShowModal.paymentMethods,
                  newTitleModal: 'Cadastrar nova formas de pagamento',
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
            Forma de pagamento ativo
          </div>
          <div className="eventStatus subText">
            <Status style={{ color: '#E64F49' }} />
            Forma de pagamento inativo
          </div>
        </div>
        <CustomTable columns={columns} data={dataTablePaymentMethods} theme="primary" />
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
