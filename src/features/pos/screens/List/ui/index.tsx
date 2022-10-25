/* eslint-disable react/jsx-key */
import React, { Fragment } from 'react';
import FilterVector from '@/assets/images/svg/FilterVector';
import { Button, Loading } from '@/components';
import { Container } from 'reactstrap';
import { RegisterContent } from '@/features/pos/components/RegisterContent';
import { ReactComponent as Status } from '@/assets/images/svg/status.svg';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { ReactComponent as Trash } from '@/assets/images/svg/lixeira.svg';
import { ActionProps, Dialog } from '@/components/Dialog';
import { ColumnStatus, CustomTable } from '@/components/Table';
import Pagination from '@/components/Utils/Pagination';
import Pos from '@/model/Pos';
import { PosRequestParams } from '@/features/pos/types';
import dayjs from 'dayjs';
import { FilterContent } from '@/features/pos/components/FilterContent';
import { FormErrors, OnChangeFormInput, FormData } from '@/hooks/useForm';
import Pdv from '@/model/Pdv';
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
  posState?: Pos;
  listPos: Pos[];
  currentPage: PosRequestParams;
  shouldShowModal: ShouldShowModal;
  title: string | React.ReactNode;
  visible: boolean;
  formDataPos: FormData;
  formErrorsPos: FormErrors;
  formDataFilter: FormData;
  formErrorsFilter: FormErrors;
  listPdv: Pdv[];
  clearFilter: () => void;
  onSavePos: () => Promise<void>;
  onPaginationChange: (page: number) => void;
  changeColorColumn: (status: number) => void;
  onChangeFormInputFilter: OnChangeFormInput;
  onToggle: () => void;
  onFilter: () => Promise<void>;
  onChangeFormInputPos: OnChangeFormInput;
  onShowDeletePos: (pos: Pos) => void;
  onShouldShowModal: ({
    value,
    newTitleModal,
    pos,
  }: {
    value: ShouldShowModal;
    newTitleModal: string | React.ReactNode;
    pos?: Pos;
  }) => void;
}

export const PosContainer: React.FC<PosContainerProps> = ({
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
  listPdv,
  clearFilter,
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
      <ColumnStatus statusColor={String(changeColorColumn(Number(item.status)))}>
        {item.name}
      </ColumnStatus>
    ),
    date:
      item.expirationDate === null
        ? '-----'
        : dayjs(item.expirationDate, 'YYYY-DD-MM hh:mm:ss').format('DD/MM/YYYY'),
    currentPdv: item.pdv?.name === undefined ? '-----' : item.pdv?.name,
    serial: item.serialNumber,
    actions: (
      <React.Fragment>
        <Pen
          className="mr-4 svg-icon action-icon"
          onClick={(): void =>
            onShouldShowModal({
              value: ShouldShowModal.pos,
              newTitleModal: `${item.name}`,
              pos: item,
            })
          }
        />
        <Trash
          className="mr-4 svg-icon action-icon svg-icon-trash"
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
  const renderActionDialogToCancelFilter: ActionProps = {
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
            [ShouldShowModal.filter]: renderActionDialogToCancelFilter,
            [ShouldShowModal.pos]: renderActionDialogToCancel,
          }[shouldShowModal],
          {
            [ShouldShowModal.filter]: {
              title: 'Aplicar',
              onClick: (): Promise<void> => onFilter(),
            },
            [ShouldShowModal.pos]: {
              title: posState?.id ? 'Salvar' : 'Cadastrar nova POS',
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
                listPdv={listPdv}
              />
            ),
          }[shouldShowModal]
        }
      </Dialog>

      <Container className="mainContainer" fluid={true}>
        <div className="d-flex justify-content-between" style={{ paddingBottom: '30px' }}>
          <div className="pageTitle" style={{ display: 'grid' }}>
            <h5 className="pageTitle">POS</h5>
          </div>
          <div className="button-filter-container">
            <Button
              title="+ Cadastrar nova POS"
              onClick={(): void =>
                onShouldShowModal({
                  value: ShouldShowModal.pos,
                  newTitleModal: 'Cadastrar nova POS',
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
            POS em uso
          </div>
          <div className="eventStatus subText">
            <Status style={{ color: '#FFE249' }} />
            POS reservada
          </div>

          <div className="eventStatus subText">
            <Status style={{ color: '#3CAFC8' }} />
            POS em estoque
          </div>
          <div className="eventStatus subText">
            <Status style={{ color: '#E64F49' }} />
            POS inativa
          </div>
        </div>
        <CustomTable
          columns={columns}
          data={dataTablePos}
          numberRowsPerPage={currentPage.pageSize}
          progressPending={state === States.loading}
          theme="primary"
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
