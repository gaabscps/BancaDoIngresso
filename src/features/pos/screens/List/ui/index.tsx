/* eslint-disable react/jsx-key */
import React, { Fragment } from 'react';
import FilterVector from '@/assets/images/svg/FilterVector';
import { Button, Loading } from '@/components';
import { Container, Label } from 'reactstrap';
import { ReactComponent as Status } from '@/assets/images/svg/status.svg';
import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { ReactComponent as Trash } from '@/assets/images/svg/lixeira.svg';
import { ColumnStatus, CustomTable } from '@/components/Table';
import Pagination from '@/components/Utils/Pagination';
import Pos from '@/model/Pos';
import { PosRequestParams } from '@/features/pos/types';
// import { FormData, FormErrors, OnChangeFormInput } from '@/hooks/useForm';
// import { cp } from 'fs';
import dayjs from 'dayjs';
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
interface PosContainerProps {
  state: States;
  posState?: Pos;
  listPos: Pos[];
  currentPage: PosRequestParams;
  // title: string | React.ReactNode;
  // currentPage: PosRequestParams;
  // visible: boolean;
  // // shouldShowModal: ShouldShowModal;
  // formDataPdv: FormData;
  // formErrorsPdv: FormErrors;
  // onChangeFormInputPdv: OnChangeFormInput;
  // formDataFilter: FormData;
  // formErrorsFilter: FormErrors;
  // onChangeFormInputFilter: OnChangeFormInput;
  // onToggle: () => void;
  onPaginationChange: (page: number) => void;
  // onShouldShowModal: ({
  //   // value,
  //   newTitleModal,
  //   pos,
  // }: {
  //   // value: ShouldShowModal;
  //   newTitleModal: string | React.ReactNode;
  //   pos?: Pos;
  // }) => void;
  // onSavePdv: () => Promise<void>;
  // onFilter: () => Promise<void>;
  // // onShowEdit: (id: string) => Promise<void>;
  // onShowDelete: (pdv: Pos) => void;
  // // onShowFilter: () => void;
}

export const PosContainer: React.FC<PosContainerProps> = ({
  listPos,
  state,
  // posState,
  currentPage,
  onPaginationChange,
}) => {
  const dataTablePos = listPos?.map(item => ({
    id: item.id,
    name: <ColumnStatus statusColor={'#0000'}>{item.name}</ColumnStatus>,
    date: dayjs(item.expirationDate, 'YYYY-DD-MM hh:mm:ss').format('DD/MM/YYYY'),
    currentPdv: item.pdv.name,
    serial: item.serialNumber,
    actions: (
      <React.Fragment>
        <Pen className="mr-2 svg-icon action-icon" />
        <Trash className="mr-2 svg-icon action-icon" />
      </React.Fragment>
    ),
  }));
  return (
    <Fragment>
      <Loading isVisible={state === States.loading} />
      <Container className="mainContainer" fluid={true}>
        <div className="d-flex justify-content-between" style={{ paddingBottom: '30px' }}>
          <div className="pageTitle" style={{ display: 'grid' }}>
            <Label onClick={() => console.log(listPos)}>POS</Label>
          </div>
          <div className="button-filter-container">
            <Button
              title="+ Cadastrar novo POS"
              color="primary"
              onClick={() => {
                // eslint-disable-next-line no-unused-expressions
                undefined;
              }}
            />
            <div className="filter-container">
              <div className="filter-content">
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
