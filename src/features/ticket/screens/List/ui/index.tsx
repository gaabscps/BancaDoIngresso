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
import { FilterContent } from '@/features/client/components/FilterContent';
import { updateMask as updateMaskCPF } from '@/helpers/masks/cpf';
import OrderTicket from '@/model/OrderTicket';
import { TicketCommentController, TicketRequestParams } from '@/features/ticket/types';
import dayjs from 'dayjs';
import formatValueToCurrency from '@/helpers/common/mask';
import OrderPayment from '@/model/OrderPayment';
import PaymentType from '@/model/PaymentType';
import StatusType from '@/model/StatusType';
import PaymentStatus from '@/model/PaymentStatus';
import { RegisterCommentContent } from '@/features/ticket/components/RegisterCommentContent';
import { TicketDetailContent } from '@/features/ticket/components/TicketDetailContent';
import OrderTicketDetail from '@/model/OrderTicketDetail';
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
  detail = 'detail',
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
  controllerComment: TicketCommentController;
  ticketDetail: OrderTicketDetail;
}

interface DispatchProps {
  onToggle: () => void;
  onPaginationChange: (page: number) => void;
  onChangeFormInputFilter: OnChangeFormInput;
  onShowReversePayment: (orderTicket: OrderTicket) => void;
  onShowCancelTicket: (orderTicket: OrderTicket) => void;
  onFilter: () => Promise<void>;
  clearFilter: () => void;
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
  ticketDetail,
  clearFilter,
  onPaginationChange,
  onChangeFormInputFilter,
  onToggle,
  onFilter,
  onShowReversePayment,
  onShowCancelTicket,
  onShouldShowModal,
}) => {
  const getClassName = (isRed: boolean): string => {
    let className = 'mr-4 svg-icon action-icon';
    if (isRed) {
      className = 'mr-4 svg-icon-error action-icon';
    }
    return className;
  };
  const fromStatusType = (statusType: StatusType): string => {
    let s = '';
    switch (statusType) {
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

  const fromPaymentStatus = (paymentStatus: PaymentStatus): string => {
    let s = '';
    switch (paymentStatus) {
      case PaymentStatus.APPROVED:
        s = 'Aprovado';
        break;
      case PaymentStatus.DISAPPROVED:
        s = 'Reprovado';
        break;
      case PaymentStatus.AWAITING_PAYMENT:
        s = 'Aguardando Pagamento';
        break;
      case PaymentStatus.CANCELED:
        s = 'Cancelado';
        break;
      case PaymentStatus.CANCELLATION_ANALYSIS:
        s = 'Aguardando analise do cancelamento';
        break;
      default:
        s = '';
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
    paymentStatus:
      item.ticketStatus === StatusType.EXCLUDED
        ? fromStatusType(item.ticketStatus)
        : fromPaymentStatus(item.orderPaymentStatus),
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
          className={getClassName(item.reverseDate !== undefined || item.reverseDate !== null)}
          onClick={() => {
            onShowReversePayment(item);
          }}
        />
        {item.comments && item.comments.length > 0 && (
          <span
            className="badge badge-custom position-absolute top-0 start-100 translate-middle rounded-pill bg-danger"
            style={{ marginLeft: '12px' }}
          >
            {item.comments.length}
          </span>
        )}
        <Comment
          className={getClassName(item.comments && item.comments.length > 0)}
          onClick={(): void =>
            onShouldShowModal({
              value: ShouldShowModal.comment,
              newTitleModal: 'Comentários',
              orderTicket: item,
            })
          }
        />
        <Detail
          className={'mr-4 svg-icon action-icon'}
          onClick={() =>
            onShouldShowModal({
              value: ShouldShowModal.detail,
              newTitleModal: 'Ver dados',
              orderTicket: item,
            })
          }
        />
        <X
          className={getClassName(item.cancelDate !== undefined || item.cancelDate !== null)}
          onClick={() => {
            onShowCancelTicket(item);
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
            [ShouldShowModal.detail]: renderActionDialogToCancel,
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
            [ShouldShowModal.detail]: {
              title: 'OK',
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
            [ShouldShowModal.detail]: <TicketDetailContent detail={ticketDetail} />,
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
