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
import PaymentGateway from '@/model/PaymentGateway';
import { columns } from './table';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}
export interface DataRow {
  id: string;
  name: string;
  serial: string;
  actions: string;
  status: number;
  date: string;
  currentPdv: string;
}

// eslint-disable-next-line no-shadow
export enum ShouldShowModal {
  filter = 'filter',
  pos = 'pos',
}

interface PosContainerProps {
  state: States;
  posState?: PaymentGateway;
  listPos: PaymentGateway[];
  currentPage: PosRequestParams;
  shouldShowModal: ShouldShowModal;
  title: string | React.ReactNode;
  visible: boolean;
  formDataPos: FormData;
  formErrorsPos: FormErrors;
  formDataFilter: FormData;
  formErrorsFilter: FormErrors;
  onSavePos: () => Promise<void>;
  onPaginationChange: (page: number) => void;
  changeColorColumn: (status: number) => void;
  onChangeFormInputFilter: OnChangeFormInput;
  onToggle: () => void;
  onFilter: () => Promise<void>;
  onChangeFormInputPos: OnChangeFormInput;
  onShowDeletePos: (pos: PaymentGateway) => void;
  onShouldShowModal: ({
    value,
    newTitleModal,
    pos,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    pos?: PaymentGateway;
  }) => void;
}

export const PaymentGatewayContainer: React.FC<PosContainerProps> = ({
  listPos,
  state,
  posState,
  currentPage,
  title,
  visible,
  shouldShowModal,
  formDataPos,
  formErrorsPos,
  formDataFilter,
  formErrorsFilter,
  onChangeFormInputFilter,
  onChangeFormInputPos,
  onSavePos,
  onPaginationChange,
  changeColorColumn,
  onToggle,
  onFilter,
  onShouldShowModal,
  onShowDeletePos,
}) => {
  const dataTablePos = listPos?.map(item => ({
    id: item.id,
    name: (
      <ColumnStatus statusColor={String(changeColorColumn(Number(item.actived)))}>
        {item.name}
      </ColumnStatus>
    ),
    idd: item.charge.name,
    actions: (
      <React.Fragment>
        <Pen
          className="mr-2 svg-icon action-icon"
          onClick={(): void =>
            onShouldShowModal({
              value: ShouldShowModal.pos,
              newTitleModal: `Editar ${item.name}`,
            })
          }
        />
        <Trash
          className="mr-2 svg-icon action-icon"
          onClick={() => {
            onShowDeletePos(item);
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
            [ShouldShowModal.pos]: renderActionDialogToCancel,
          }[shouldShowModal],
          {
            [ShouldShowModal.filter]: {
              title: 'Filtrar',
              onClick: (): Promise<void> => onFilter(),
            },
            [ShouldShowModal.pos]: {
              title: posState?.id ? 'Salvar' : 'Cadastrar novo gateway de pagamento',
              onClick: (): Promise<void> => onSavePos(),
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
            [ShouldShowModal.pos]: (
              <RegisterContent
                formData={formDataPos}
                formErrors={formErrorsPos}
                onChangeFormInput={onChangeFormInputPos}
                listPos={listPos}
              />
            ),
          }[shouldShowModal]
        }
      </Dialog>

      <Container className="mainContainer" fluid={true}>
        <div className="d-flex justify-content-between">
          <div className="pageTitle" style={{ display: 'grid' }}>
            <span>Gateway de pagamento</span>
          </div>
          <div className="button-filter-container">
            <Button
              title="+ Cadastrar novo gateway de pagamento"
              onClick={(): void =>
                onShouldShowModal({
                  value: ShouldShowModal.pos,
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
        <CustomTable columns={columns} data={dataTablePos} theme="primary" />
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
