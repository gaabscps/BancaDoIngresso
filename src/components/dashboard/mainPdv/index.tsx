/* eslint-disable react/jsx-key */
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Label } from 'reactstrap';
import RegisterPdv from '../../modal/RegisterPdv';
import SubPdvList from '../../modal/SubPdvs';
import Button from '../../Utils/Button';
import FilterVector from '../../../assets/images/svg/FilterVector';
import Filter from '../../modal/FilterPdv';
import { CollumnImage, CustomTable, TableColumn } from '../../Utils/Table';
import { ReactComponent as Pen } from '../../../assets/images/svg/pen.svg';
import { ReactComponent as Trash } from '../../../assets/images/svg/lixeira.svg';
import { ReactComponent as SubPdvIcon } from '../../../assets/images/svg/subPDV.svg';

// import Pagination from '../../Utils/Pagination';
import Page from '../../../entities/Page';
import Pdv from '../../../entities/Pdv';
import { ApplicationState } from '../../../store';
import { listRequest, updateRequest, createRequest } from '../../../store/ducks/pdv/actions';
import { CheckUserState } from '../../../store/ducks/check-user/types';
import { PdvState } from '../../../store/ducks/pdv/types';
import { ModalConfirmation } from '../../Utils/Modal/ModalConfirmation';
import Pagination from '../../Utils/Pagination';

const Sample = (): JSX.Element => {
  const [showSubPdvList, setShowSubPdvList] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showExclude, setShowExclude] = useState(false);
  const [idPdv, setIdPdv] = useState<string | undefined>('');

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
  const pdv = useSelector<ApplicationState, PdvState>(store => store.pdv);
  const checkUser = useSelector<ApplicationState, CheckUserState>(store => store.checkUser);
  const dispatch = useDispatch();
  const page: Page<Pdv, Pdv> = {
    page: 1,
    pageSize: 10,
    sort: 'name', // Adicionar cidade!!!
    order: 'DESC',
  };
  const [showPdv, setShowPdv] = useState(false);
  const [pagination, setPagination] = useState(page);
  // const [form, setForm] = useState<CreatePDV | any>({} as CreatePDV);

  async function handlePaginationChange(pageNumber: number): Promise<void> {
    setPagination({
      ...pagination,
      page: pageNumber,
    });
    dispatch(
      listRequest({
        ...pagination,
        page: pageNumber,
      }),
    );
  }
  const saveRequesetPdv = (data: Pdv): void => {
    if (idPdv) dispatch(updateRequest({ ...data, id: idPdv }));
    else dispatch(createRequest(data));
  };
  const callShow = (b: boolean): void => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    setShowPdv(b);
  };
  const callShowSub = (b: never): void => {
    setShowSubPdvList(b);
    setIdPdv('');
  };
  const callShowFilter = (b: never): void => {
    setShowFilter(b);
    setIdPdv('');
  };
  const callShowExclude = (b: never): void => {
    setShowExclude(b);
  };

  useEffect(() => {
    if (!checkUser.call && checkUser.logged) {
      if (!pdv.loading && pdv.data && !pdv.data.page) {
        dispatch(listRequest(pagination));
      } else if (!pdv.error && pdv.data && pdv.data.page && pdv.data.page.total) {
        setPagination({ ...pagination, ...pdv.data.page });
      }
    }
  }, [pdv]);

  const onClickEditPdv = (id: string): void => {
    setShowPdv(!showPdv);
    setIdPdv(id);
  };

  const dataTablePdv = pagination.list
    ? pagination.list?.map(item => ({
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
                onClickEditPdv(item.id);
              }}
              className="mr-2 svg-icon action-icon"
            />
            <Trash
              onClick={() => {
                setShowExclude(!showExclude);
              }}
              className="mr-2 svg-icon action-icon"
            />
            <SubPdvIcon
              onClick={() => {
                setShowSubPdvList(!showSubPdvList);
              }}
              className="mr-2 svg-icon action-icon"
            />
          </>
        ),
      }))
    : initialTablePdv;

  // Logica para Paginação mockada
  // const [totalCount, setTotalCount] = useState(0);
  // const totalPages = 5;
  // const numberRowsPerPage = 10;

  // const [pending, setPending] = React.useState(true);

  // async function handleFetch(pageNumber: number): Promise<void> {
  //   setPending(true);
  //   const response = await fetch(
  //     `https://api.instantwebtools.net/v1/passenger?page=${pageNumber}&size=${numberRowsPerPage}`,
  //   );
  //   const data = await response.json();
  //   setTotalCount(data.totalPages);
  //   setPending(false);
  // }
  // React.useEffect(() => {
  //   handleFetch(page);
  // }, []);

  // async function handlePaginationChange(pagePagination: number): Promise<void> {
  //   setPagination(pagePagination.page);
  //   await handleFetch(pageNumber);
  // }

  return (
    <Fragment>
      <ModalConfirmation show={showExclude} setShow={setShowExclude} />
      <Filter show={showFilter} setShowFilter={callShowFilter} />
      <SubPdvList
        showConfirm={showExclude}
        show={showSubPdvList}
        setShowSubPdvList={callShowSub}
        setShowExclude={callShowExclude}
      />
      <RegisterPdv
        show={showPdv}
        setShow={callShow}
        pdvid={idPdv}
        saveRequest={saveRequesetPdv}
        reload={() => handlePaginationChange(pagination.page)}
      />
      <Container className="mainContainer" fluid={true}>
        <div className="d-flex justify-content-between" style={{ paddingBottom: '30px' }}>
          <div className="pageTitle" style={{ display: 'grid' }}>
            <Label>PDV</Label>
          </div>
          <div className="button-filter-container">
            <Button color="primary" onClick={() => setShowPdv(true)}>
              + Cadastrar novo PDV
            </Button>
            <div onClick={() => setShowFilter(true)} className="filter-container">
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
          pageSize={page.pageSize}
          onPageChange={pagee => handlePaginationChange(pagee)}
          total={page.total}
        />
      </Container>
    </Fragment>
  );
};

export default Sample;
