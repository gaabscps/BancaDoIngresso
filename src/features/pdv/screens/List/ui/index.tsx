/* eslint-disable react/jsx-key */
import React, { Fragment, useEffect } from 'react';
import { Container, Label } from 'reactstrap';
import { CollumnImage, CustomTable, TableColumn } from '@/components/Utils/Table';
import Button from '@/components/Utils/Button';
import FilterVector from '@/assets/images/svg/FilterVector';
import Page from '@/model/Page';
import Pdv from '@/model/Pdv';
import Pagination from '@/components/Utils/Pagination';

import { ReactComponent as Pen } from '@/assets/images/svg/pen.svg';
import { ReactComponent as Trash } from '@/assets/images/svg/lixeira.svg';
import { ReactComponent as SubPdvIcon } from '@/assets/images/svg/subPDV.svg';

interface PdvContainerProps {
  handleRenderListPdv: (page: Page<Pdv, Pdv>) => void;
  list: Pdv[];
  pagination: Page<Pdv, Pdv>;
  setPagination: React.Dispatch<React.SetStateAction<Page<Pdv, Pdv>>>;
  onShowRegister: () => void;
  onShowEdit: (id: string) => Promise<void>;
  onShowDelete: (id: string) => Promise<void>;
  onShowListSub: (id: string, name: string) => Promise<void>;
  onShowFilter: () => void;
}

interface DataRow {
  id: string;
  imageBase64: string;
  name: string;
  street: string;
  city: string;
  state: string;
  actions: string;
  status: string;
}

export const PdvContainer: React.FC<PdvContainerProps> = ({
  onShowRegister,
  onShowEdit,
  onShowDelete,
  list,
  pagination,
  setPagination,
  handleRenderListPdv,
  onShowListSub,
  onShowFilter,
}) => {
  useEffect(() => {
    handleRenderListPdv(pagination);
  }, []);

  const initialTablePdv = [
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

  const columnsPrimaryImage: TableColumn<DataRow>[] = [
    {
      name: 'Imagem',
      selector: row => row.imageBase64,
      width: '100px',
    },
    {
      name: 'Nome do PDV',
      selector: row => row.name,
    },
    {
      name: 'Endereço',
      selector: row => row.street,
    },
    {
      name: 'Cidade',
      selector: row => row.city,
    },
    {
      name: 'Estado',
      selector: row => row.state,
    },
    {
      name: 'Ações',
      selector: row => row.actions,
      width: '160px',
    },
  ];

  async function handlePaginationChange(pageNumber: number): Promise<void> {
    setPagination({
      ...pagination,
      page: pageNumber,
    });
    handleRenderListPdv({
      ...pagination,
      page: pageNumber,
    });
  }

  const dataTablePdv = list
    ? list?.map(item => ({
        id: item.id,
        imageBase64: <CollumnImage srcImage={item.imageBase64} />,
        name: item.name,
        street: item.address.street,
        city: item.address.city,
        state: item.address.state,
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
            <SubPdvIcon
              onClick={() => {
                onShowListSub(item.id, item.name);
              }}
              className="mr-2 svg-icon action-icon"
            />
          </>
        ),
      }))
    : initialTablePdv;

  return (
    <Fragment>
      <Container className="mainContainer" fluid={true}>
        <div className="d-flex justify-content-between" style={{ paddingBottom: '30px' }}>
          <div className="pageTitle" style={{ display: 'grid' }}>
            <Label>PDV</Label>
          </div>
          <div className="button-filter-container">
            <Button color="primary" onClick={onShowRegister}>
              + Cadastrar novo PDV
            </Button>
            <div className="filter-container">
              <div className="filter-content" onClick={onShowFilter}>
                <FilterVector />
              </div>
            </div>
          </div>
        </div>
        <CustomTable
          // progressPending={pending}
          // // progressPending={true}
          // numberRowsPerPage={numberRowsPerPage}
          columns={columnsPrimaryImage}
          data={dataTablePdv}
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
