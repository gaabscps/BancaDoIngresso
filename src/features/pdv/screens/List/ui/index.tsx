/* eslint-disable react/jsx-key */
import React, { Fragment, useEffect, useState } from 'react';
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
  document: string;
  handleRenderListPdv: (page: Page<Pdv, Pdv>) => void;
  list: Pdv[];
  onShowRegister: () => void;
  onShowRegisterSubPdv: () => void;
  onShowEdit: (value: any) => Promise<void>;
  onShowEditSubPdv: (value: any) => Promise<void>;
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
  onShowRegisterSubPdv,
  onShowEdit,
  // onShowEditSubPdv,
  list,
  handleRenderListPdv,
}) => {
  const initial_state_pagination: Page<Pdv, Pdv> = {
    page: 1,
    pageSize: 10,
    sort: 'name', // Adicionar cidade!!!
    order: 'DESC',
  };
  const [pagination, setPagination] = useState(initial_state_pagination);

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
    // dispatch(
    //   listRequest({
    //     ...pagination,
    //     page: pageNumber,
    //   }),
    // );
  }
  // const saveRequesetPdv = (data: Pdv): void => {
  //   if (idPdv) dispatch(updateRequest({ ...data, id: idPdv }));
  //   else dispatch(createRequest(data));
  // };
  // const callShow = (b: boolean): void => {
  //   // eslint-disable-next-line @typescript-eslint/no-use-before-define
  //   setShowPdv(b);
  // };
  // const callShowSub = (b: never): void => {
  //   setShowSubPdvList(b);
  //   setIdPdv('');
  // };
  // const callShowFilter = (b: never): void => {
  //   setShowFilter(b);
  //   setIdPdv('');
  // };
  // const callShowExclude = (b: never): void => {
  //   setShowExclude(b);
  // };

  // useEffect(() => {
  //   if (!checkUser.call && checkUser.logged) {
  //     if (!pdv.loading && pdv.data && !pdv.data.page) {
  //       dispatch(listRequest(pagination));
  //     } else if (!pdv.error && pdv.data && pdv.data.page && pdv.data.page.total) {
  //       setPagination({ ...pagination, ...pdv.data.page });
  //     }
  //   }
  // }, [pdv]);

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
                // TODO: Open modal to delete PDV
              }}
              className="mr-2 svg-icon action-icon"
            />
            <SubPdvIcon
              onClick={() => {
                onShowRegisterSubPdv();
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
