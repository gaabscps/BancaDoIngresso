/* eslint-disable react/jsx-key */
import React, { Fragment, useState } from 'react';
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

const Sample = (): JSX.Element => {
  const [showPdv, setShowPdv] = useState(false);
  const [showSubPdvList, setShowSubPdvList] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showExclude, setShowExclude] = useState(false);

  interface DataRow {
    image: string;
    pdvName: string;
    address: string;
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
      selector: row => row.image,
      width: '100px',
    },
    {
      name: 'Nome do PDV',
      selector: row => row.pdvName,
    },
    {
      name: 'Endereço',
      selector: row => row.address,
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
  const dataPrimaryImage = mockData.map(item => ({
    id: item.id,
    image: <CollumnImage srcImage={item.image} />,
    pdvName: item.pdvName,
    address: item.address,
    city: item.city,
    state: item.state,
    actions: [
      <Pen
        onClick={() => {
          setShowPdv(!showPdv);
        }}
        className="mr-2 svg-icon"
      />,
      <Trash
        onClick={() => {
          setShowExclude(!showExclude);
        }}
        className="mr-2 svg-icon"
      />,
      <SubPdvIcon
        onClick={() => {
          setShowSubPdvList(!showSubPdvList);
        }}
        className="mr-2 svg-icon last-child-icon"
      />,
    ],
  }));

  // Logica para Paginação mockada
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const totalPages = 5;
  const numberRowsPerPage = 10;

  const [pending, setPending] = React.useState(true);

  async function handleFetch(pageNumber: number): Promise<void> {
    setPending(true);
    const response = await fetch(
      `https://api.instantwebtools.net/v1/passenger?page=${pageNumber}&size=${numberRowsPerPage}`,
    );
    const data = await response.json();
    setTotalCount(data.totalPages);
    setPending(false);
  }
  React.useEffect(() => {
    handleFetch(page);
  }, []);

  async function handlePaginationChange(pageNumber: number): Promise<void> {
    setPage(pageNumber);
    await handleFetch(pageNumber);
  }

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
              progressPending={pending}
              // progressPending={true}
              numberRowsPerPage={numberRowsPerPage}
              columns={columnsPrimaryImage}
              data={dataPrimaryImage}
              theme="primary"
            />
            <Pagination
              currentPage={page}
              totalCount={totalCount}
              pageSize={totalPages}
              onPageChange={pagee => handlePaginationChange(pagee)}
            />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Sample;
