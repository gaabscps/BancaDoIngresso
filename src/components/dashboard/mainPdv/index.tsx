/* eslint-disable react/jsx-key */
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Label } from 'reactstrap';
import RegisterPdv from '../../modal/RegisterPdv';
import SubPdvList from '../../modal/SubPdvs';
import Button from '../../Utils/Button';
import FilterVector from '../../../assets/images/svg/FilterVector';
import Filter from '../../modal/Filter';
import { CollumnImage, CustomTable, TableColumn } from '../../Utils/Table';
import { mockData } from '../../Utils/Table/mock';
import { ReactComponent as Pen } from '../../../assets/images/svg/pen.svg';
import { ReactComponent as Trash } from '../../../assets/images/svg/lixeira.svg';
import { ReactComponent as SubPdvIcon } from '../../../assets/images/svg/subPDV.svg';
import Pagination from '../../Utils/Pagination';
import ConfirmExclude from '../../modal/ConfirmExclude';
import Page from '../../../entities/Page';
import Pdv from '../../../entities/Pdv';
import { ApplicationState } from '../../../store';
import { listRequest } from '../../../store/ducks/pdv/actions';
import { CheckUserState } from '../../../store/ducks/check-user/types';
import { PdvState } from '../../../store/ducks/pdv/types';

const Sample = (): JSX.Element => {
  const [showSubPdvList, setShowSubPdvList] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showExclude, setShowExclude] = useState(false);

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

  const callShow = (b: boolean): void => {
    setShowPdv(b);
  };
  const callShowSub = (b: never): void => {
    setShowSubPdvList(b);
  };
  const callShowFilter = (b: never): void => {
    setShowFilter(b);
  };
  const callShowExclude = (b: never): void => {
    setShowExclude(b);
  };
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
  const [tablePdv, setTablePdv] = useState({
    id: '',
    imageBase64: '',
    name: '',
    street: '',
    city: '',
    state: '',
    actions: '',
  });
  // const [form, setForm] = useState<CreatePDV | any>({} as CreatePDV);

  useEffect(() => {
    if (!checkUser.call && checkUser.logged) {
      if (!pdv.loading && pdv.data && !pdv.data.page) {
        dispatch(listRequest(pagination));
      } else if (!pdv.error && pdv.data && pdv.data.page && pdv.data.page.total) {
        const dataTablePdv = pdv.data?.list?.map(item => ({
          id: item.id,
          imageBase64: item.imageBase64,
          name: item.name,
          street: item.address.street,
          city: item.address.city,
          state: item.address.state,
          actions: (
            <>
              <Pen
                onClick={() => {
                  setShowPdv(!showPdv);
                }}
                className="mr-2 svg-icon"
              />
              ,
              <Trash
                onClick={() => {
                  setShowExclude(!showExclude);
                }}
                className="mr-2 svg-icon"
              />
              ,
              <SubPdvIcon
                onClick={() => {
                  setShowSubPdvList(!showSubPdvList);
                }}
                className="mr-2 svg-icon last-child-icon"
              />
              ,
            </>
          ),
        }));
        setTablePdv(dataTablePdv);
        setPagination(pdv.data.page);
      }
    }
  }, [pdv]);
  useEffect(() => {
    console.log(tablePdv);
  }, [tablePdv]);

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
      <ConfirmExclude show={showExclude} setShowExclude={callShowExclude} />
      <Filter show={showFilter} setShowFilter={callShowFilter} />
      <SubPdvList
        show={showSubPdvList}
        setShowSubPdvList={callShowSub}
        setShowExclude={callShowExclude}
      />
      <RegisterPdv show={showPdv} setShowPdv={callShow} />
      <Container className="mainContainer" fluid={true}>
        <div className="d-flex justify-content-between" style={{ paddingBottom: '30px' }}>
          <div style={{ display: 'grid' }}>
            <Label className="pageTitle">PDV</Label>
          </div>
          <Row className="justify-content-between">
            <Button color="primary" onClick={() => setShowPdv(true)}>
              + Cadastrar novo PDV
            </Button>
            <div onClick={() => setShowFilter(true)} className="filter-container">
              <div className="filter-content">
                <FilterVector />
              </div>
            </div>
          </Row>
        </div>
        <Row>
          <Col sm="12">
            <CustomTable
              // progressPending={pending}
              // // progressPending={true}
              // numberRowsPerPage={numberRowsPerPage}
              columns={columnsPrimaryImage}
              data={tablePdv}
              theme="primary"
            />
            {/* <Pagination
              currentPage={page.page}
              totalCount={page.page}
              pageSize={page.pageSize}
              onPageChange={pagee => handlePaginationChange(pagee)}
            /> */}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Sample;
