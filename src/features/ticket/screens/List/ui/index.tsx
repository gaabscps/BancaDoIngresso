/* eslint-disable react/jsx-key */
import React, { Fragment } from 'react';
import FilterVector from '@/assets/images/svg/FilterVector';
import { DropdonwFlags, Loading } from '@/components';
import { Container, Label } from 'reactstrap';
import { ReactComponent as Detail } from '@/assets/images/svg/detail.svg';
import { ReactComponent as Comment } from '@/assets/images/svg/comment.svg';
import { ReactComponent as X } from '@/assets/images/svg/x.svg';
import { ReactComponent as Transfer } from '@/assets/images/svg/transfer.svg';
import { ActionProps, Dialog } from '@/components/Dialog';
import { CustomTable } from '@/components/Table';
import Pagination from '@/components/Utils/Pagination';
import { FormErrors, OnChangeFormInput, FormData } from '@/hooks/useForm';
import { ClientCommentController } from '@/features/client/types';
import { FilterContent } from '@/features/client/components/FilterContent';
import { updateMask as updateMaskCPF } from '@/helpers/masks/cpf';
import { RegisterCommentContent } from '@/features/client/components/RegisterCommentContent';
import OrderTicket from '@/model/OrderTicket';
import { TicketRequestParams } from '@/features/ticket/types';
import dayjs from 'dayjs';
import formatValueToCurrency from '@/helpers/common/mask';
import OrderPayment from '@/model/OrderPayment';
import PaymentType from '@/model/PaymentType';
import StatusType from '@/model/StatusType';
import { columns } from './table';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

interface DataColumn {
  id: string;
  name: string;
}

export interface DataRow {
  id: string;
  pdvName: string;
  sectionAndTicket: string;
  cpf: string;
  saleDate: string;
  paymentStatus: string;
  saleValue: string;
  paymentType: string;
  transaction: string;
  actions: string;
}

// eslint-disable-next-line no-shadow
export enum ShouldShowModal {
  filter = 'filter',
  comment = 'comment',
}

interface StateProps {
  state: States;
  title: string | React.ReactNode;
  visible: boolean;
  shouldShowModal: ShouldShowModal;
  listTickets: OrderTicket[];
  currentPage: TicketRequestParams;
  formDataFilter: FormData;
  formErrorsFilter: FormErrors;
  controllerComment: ClientCommentController;
}

interface DispatchProps {
  onToggle: () => void;
  onPaginationChange: (page: number) => void;
  onChangeFormInputFilter: OnChangeFormInput;
  onShowReversePayment: (orderTicket: OrderTicket) => void;
  onShowDeleteClient: (orderTicket: OrderTicket) => void;
  onFilter: () => Promise<void>;
  clearFilter: () => void;
  onAlterFraudAlert: (orderTicket: OrderTicket) => void;
  onShouldShowModal: ({
    value,
    newTitleModal,
    orderTicket,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    orderTicket?: OrderTicket;
  }) => void;
}

type Props = StateProps & DispatchProps;

export const TicketContainer: React.FC<Props> = ({
  state,
  listTickets,
  currentPage,
  title,
  visible,
  shouldShowModal,
  formDataFilter,
  formErrorsFilter,
  controllerComment,
  clearFilter,
  onPaginationChange,
  onChangeFormInputFilter,
  onToggle,
  onFilter,
  onShowReversePayment,
  onShowDeleteClient,
  onShouldShowModal,
  onAlterFraudAlert,
}) => {
  const fromPaymentStatus = (paymentStatus: StatusType): string => {
    let s = '';
    switch (paymentStatus) {
      case StatusType.ACTIVE:
        s = 'Aprovado';
        break;
      case StatusType.INACTIVE:
        s = 'Cancelado';
        break;
      default:
        s = 'Extornado';
        break;
    }
    return s;
  };

  const fromPaymentType = (paymentType: PaymentType): string => {
    let s = '';
    switch (paymentType) {
      case PaymentType.CREDIT_CARD:
        s = 'Cartão de crédito';
        break;
      case PaymentType.TWO_CREDIT_CARDS:
        s = 'Dois cartões';
        break;
      case PaymentType.DEBIT_CARD:
        s = 'Débito';
        break;
      case PaymentType.PIX:
        s = 'PIX';
        break;
      case PaymentType.BANK_SLIP:
        s = 'Boleto';
        break;
      case PaymentType.MONEY:
        s = 'Dinheiro';
        break;
      default:
        s = '';
        break;
    }
    return s;
  };
  const mountDataColumnPaymentType = (payments: OrderPayment[]): DataColumn[] => {
    const dataColumnProfiles: DataColumn[] = [];
    if (payments && payments.length > 0) {
      payments.forEach((data, index) => {
        dataColumnProfiles.push({
          id: String(index),
          name: fromPaymentType(data.paymentType),
        });
      });
    }
    return dataColumnProfiles;
  };
  const mountDataColumnTransaction = (payments: OrderPayment[]): DataColumn[] => {
    const dataColumnProfiles: DataColumn[] = [];
    if (payments && payments.length > 0) {
      payments.forEach((data, index) => {
        dataColumnProfiles.push({
          id: String(index),
          name: data.transaction,
        });
      });
    }
    return dataColumnProfiles;
  };
  const dataTableTicket = listTickets?.map(item => ({
    id: item.orderItemId,
    pdvName: item.pdvName,
    sectionAndTicket: item.ticketId
      ? `${item.sectionName} - ${item.isHalfPrice ? 'Meia' : 'Inteira'}`
      : item.sectionName,
    cpf: updateMaskCPF(item.clientCPF),
    saleDate: dayjs(item.saleDate).locale('pt-br').format('DD/MM/YYYY [às] HH:mm'),
    paymentStatus: fromPaymentStatus(item.paymentStatus),
    saleValue: formatValueToCurrency(`${item.saleValue}`).masked,
    paymentType:
      // eslint-disable-next-line no-nested-ternary
      item.payments && item.payments.length > 1 ? (
        <DropdonwFlags pointerClass={true} dataColumn={mountDataColumnPaymentType(item.payments)} />
      ) : item.payments && item.payments.length === 1 ? (
        fromPaymentType(item.payments[0].paymentType)
      ) : (
        ''
      ),
    transaction:
      // eslint-disable-next-line no-nested-ternary
      item.payments && item.payments.length > 1 ? (
        <DropdonwFlags pointerClass={true} dataColumn={mountDataColumnTransaction(item.payments)} />
      ) : item.payments && item.payments.length === 1 ? (
        item.payments[0].transaction
      ) : (
        ''
      ),

    actions: (
      <React.Fragment>
        <Transfer
          className="mr-2 svg-icon action-icon svg-icon-trash"
          onClick={() => {
            onShowReversePayment(item);
          }}
        />
        <Comment
          className={'mr-4 svg-icon action-icon'}
          onClick={(): void =>
            onShouldShowModal({
              value: ShouldShowModal.comment,
              newTitleModal: 'Comentários',
              orderTicket: item,
            })
          }
        />

        <Detail className={'mr-4 svg-icon action-icon'} onClick={() => onAlterFraudAlert(item)} />
        <X
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
        isContentWithCard={true}
        actions={[
          {
            [ShouldShowModal.filter]: renderActionDialogToFilter,
            [ShouldShowModal.comment]: renderActionDialogToCancel,
          }[shouldShowModal],
          {
            [ShouldShowModal.filter]: {
              title: 'Filtrar',
              onClick: (): Promise<void> => onFilter(),
            },
            [ShouldShowModal.comment]: {
              title: 'Publicar',
              onClick: (): Promise<void> => controllerComment.onAdd(),
              disabled: controllerComment.formData.comment === '',
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
            [ShouldShowModal.comment]: (
              <RegisterCommentContent
                formData={controllerComment.formData}
                formErrors={controllerComment.formErrors}
                comments={controllerComment.comments}
                onChangeFormInput={controllerComment.onChange}
              />
            ),
          }[shouldShowModal]
        }
      </Dialog>

      <Container className="mainContainer" fluid={true}>
        <div className="d-flex justify-content-between" style={{ paddingBottom: '30px' }}>
          <div className="pageTitle" style={{ display: 'grid' }}>
            <Label>Gestão de ingressos - Revoada do Tatu</Label>
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
          data={dataTableTicket}
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
