/* eslint-disable react/jsx-key */
import React, { Fragment, useEffect } from 'react';
import { Container, Label } from 'reactstrap';
import { CollumnStatus, CustomTable, TableColumn } from '@/components/Utils/Table';
import Button from '@/components/Utils/Button';
import FilterVector from '@/assets/images/svg/FilterVector';
import Page from '@/model/Page';
import Pos from '@/model/Pos';
import Pagination from '@/components/Utils/Pagination';

import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { ReactComponent as Trash } from '@/assets/images/svg/lixeira.svg';
import PosStatus from '@/model/PosStatus';

interface PosContainerProps {
  handleRenderListPos: (page: Page<Pos, Pos>) => void;
  list: Pos[];
  pagination: Page<Pos, Pos>;
  setPagination: React.Dispatch<React.SetStateAction<Page<Pos, Pos>>>;
  onShowRegister: () => void;
  onShowEdit: (id: string) => Promise<void>;
  onShowDelete: (id: string) => Promise<void>;
}

interface DataRow {
  id: string;
  name: string;
  serialNumber: string;
  actions: string;
  status: number;
  expirationDate: string;
  currentPdv: string;
}

export const PosContainer: React.FC<PosContainerProps> = ({
  onShowRegister,
  onShowEdit,
  onShowDelete,
  list,
  pagination,
  setPagination,
  handleRenderListPos,
}) => {
  useEffect(() => {
    handleRenderListPos(pagination);
  }, []);

  const changeColorCollumn = (status: PosStatus): string => {
    switch (status) {
      case 0:
        return '#3CAFC8';
      case 1:
        return '#7AD81B';
      case 2:
        return '#FFE249';
      case 3:
        return '#E64F49';
      default:
        return 'grey';
    }
  };

  const initialTablePos = [
    {
      id: '',
      imageBase64: '',
      name: '',
      street: '',
      city: '',
      state: '',
      actions: '',
    },
  ];

  const columnsPrimaryStatusColor: TableColumn<DataRow>[] = [
    {
      name: 'Nome da POS',
      selector: row => row.name,
    },
    {
      name: 'Nº de serie',
      selector: row => row.serialNumber,
    },
    {
      name: 'Data do vínculo',
      selector: row => row.expirationDate,
    },
    {
      name: 'PDV atual',
      selector: row => row.currentPdv,
    },
    {
      name: 'Ações',
      selector: row => row.actions,
      width: '120px',
    },
  ];

  async function handlePaginationChange(pageNumber: number): Promise<void> {
    setPagination({
      ...pagination,
      page: pageNumber,
    });
    handleRenderListPos({
      ...pagination,
      page: pageNumber,
    });
  }

  const dataTablePos = list
    ? list?.map(item => ({
        id: item.id,
        name: (
          <CollumnStatus statusColor={changeColorCollumn(item.status)}>{item.name}</CollumnStatus>
        ),
        serialNumber: item.serialNumber,
        expirationDate: item.expirationDate,
        currentPos: item.name,
        actions: (
          <>
            <Pen
              onClick={() => {
                onShowEdit(item.id);
              }}
              className="mr-2 svg-icon action-icon"
            />
            <Trash
              onClick={() => {
                onShowDelete(item.id);
              }}
              className="mr-2 svg-icon action-icon"
            />
          </>
        ),
      }))
    : initialTablePos;

  return (
    <Fragment>
      <Container className="mainContainer" fluid={true}>
        <div className="d-flex justify-content-between" style={{ paddingBottom: '30px' }}>
          <div className="pageTitle" style={{ display: 'grid' }}>
            <Label>POS</Label>
          </div>
          <div className="button-filter-container">
            <Button color="primary" onClick={onShowRegister}>
              + Cadastrar novo POS
            </Button>
            <div className="filter-container">
              <div className="filter-content">
                <FilterVector />
              </div>
            </div>
          </div>
        </div>
        <CustomTable
          // progressPending={pending}
          // // progressPending={true}
          // numberRowsPerPage={numberRowsPerPage}
          columns={columnsPrimaryStatusColor}
          data={dataTablePos}
          theme="primary"
        />
        <Pagination
          currentPage={pagination.page}
          totalCount={pagination.total}
          pageSize={pagination.pageSize}
          onPageChange={pagee => handlePaginationChange(pagee)}
          total={pagination.total}
        />
      </Container>
    </Fragment>
  );
};
