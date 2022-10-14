import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import dayjs from 'dayjs';
import Page from '@/model/Page';
import Pos from '@/model/Pos';
import PosStatus from '@/model/PosStatus';
import { Button } from '@/components/Button';
import { ColumnStatus, CustomTable, TableColumn } from '@/components/Table';
import { ModalConfirmation } from '../../Utils/Modal/ModalConfirmation';
// import { ReactComponent as Pen } from '../../../assets/images/svg/pen.svg';
// import { ReactComponent as Status } from '../../../assets/images/svg/status.svg';
// import { ReactComponent as Trash } from '../../../assets/images/svg/lixeira.svg';
import { ApplicationState } from '../../../store';
import {
  listRequest,
  deleteRequest,
  updateRequest,
  createRequest,
} from '../../../store/ducks/pos/actions';
import { CheckUserState } from '../../../store/ducks/check-user/types';
import { PosState } from '../../../store/ducks/pos/types';
import Filter from '../../modal/FilterPos';
import FilterVector from '../../../assets/images/svg/FilterVector';
import RegisterPos from '../../modal/RegisterPos';
import Pagination from '../../Utils/Pagination';

interface DataRow {
  id: string;
  name: string;
  serial: string;
  actions: string;
  status: number;
  date: string;
  currentPdv: string;
}

// enum PosStatus {
//   STOCK,
//   USE,
//   RESERVED,
//   INACTIVE,
// }

const Sample = (): JSX.Element => {
  const [dataList, setDataList] = useState<Pos[] | undefined>([]);
  const [showPos, setShowPos] = useState(false);
  const [showExclude, setShowExclude] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [idPos, setIdPos] = useState('');
  // const [paginationPage, setPaginationPage] = useState(1);
  const page: Page<Pos, Pos> = {
    page: 1,
    pageSize: 10,
    sort: 'name', // Adicionar cidade!!!
    order: 'DESC',
  };
  const [pagination, setPagination] = useState(page);

  const pos = useSelector<ApplicationState, PosState>(store => store.pos);
  const checkUser = useSelector<ApplicationState, CheckUserState>(store => store.checkUser);
  const dispatch = useDispatch();

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

  const saveRequesetPos = (data: Pos): void => {
    if (idPos) dispatch(updateRequest({ ...data, id: idPos }));
    else dispatch(createRequest(data));
  };

  const callShowPos = (show: boolean): void => {
    setIdPos('');
    setShowPos(show);
  };
  const callShowExclude = (show: boolean): void => {
    setIdPos('');
    setShowExclude(show);
  };
  const callShowFilter = (show: boolean): void => {
    setShowFilter(show);
  };

  const deletePos = (): void => {
    dispatch(deleteRequest(idPos));
    callShowExclude(false);
    handlePaginationChange(pagination.page);
  };

  useEffect(() => {
    if (!checkUser.call && checkUser.logged) {
      if (!pos.loading && pos.data && !pos.data.page) {
        dispatch(listRequest(pagination));
      } else if (!pos.error && pos.data && pos.data.page && pos.data.page.total) {
        setDataList(pos.data.page.list);
        setPagination({ ...pagination, ...pos.data.page });
      }
    }
  }, [pos]);

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

  const columnsPrimaryStatusColor: TableColumn<DataRow>[] = [
    {
      name: 'Nome da POS',
      selector: row => row.name,
    },
    {
      name: 'Nº de serie',
      selector: row => row.serial,
    },
    {
      name: 'Data do vínculo',
      selector: row => row.date,
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
  const dataTablePos = dataList
    ? dataList?.map(item => ({
        id: item.id,
        name: (
          <ColumnStatus statusColor={changeColorCollumn(item.status)}>{item.name}</ColumnStatus>
        ),
        date: dayjs(item.expirationDate, 'YYYY-DD-MM hh:mm:ss').format('DD/MM/YYYY'),
        currentPdv: item.pdv?.name,
        serial: item.serialNumber,
        actions: (
          <>
            {/* <Pen
              onClick={() => {
                setShowPos(!showPos);
                setIdPos(item.id);
              }}
              className="mr-4 svg-icon action-icon"
            />
            <Trash
              onClick={() => {
                setShowExclude(!showExclude);
                setIdPos(item.id);
              }}
              className="mr-4 svg-icon action-icon"
            /> */}
          </>
        ),
      }))
    : [];
  return (
    <>
      <Filter show={showFilter} setShowFilter={callShowFilter} />
      <ModalConfirmation
        show={showExclude}
        setShow={callShowExclude}
        onBtnAction={() => deletePos()}
      />
      <RegisterPos
        show={showPos}
        setShow={callShowPos}
        idPos={idPos}
        saveRequest={saveRequesetPos}
        reload={() => handlePaginationChange(pagination.page)}
      />
      <Container className="mainContainer" fluid={true}>
        <div className="d-flex justify-content-between" style={{ paddingBottom: '30px' }}>
          <div style={{ display: 'grid' }}>
            <div className="pageTitle">POS</div>
          </div>
          <div className="button-filter-container">
            <Button
              title="+ Cadastrar nova POS"
              color="primary"
              onClick={() => setShowPos(true)}
            ></Button>
            <div onClick={() => setShowFilter(true)} className="filter-container">
              <div className="filter-content">
                <FilterVector />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="d-flex pb-2 status-container">
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
        </div> */}
        {/* <CustomTable theme={'primary'} columns={columnsPrimaryStatusColor} data={dataTablePos} /> */}
        <Pagination
          currentPage={pagination.page}
          totalCount={pagination.total}
          pageSize={page.pageSize}
          onPageChange={pagee => handlePaginationChange(pagee)}
          total={page.total}
        />
      </Container>
    </>
  );
};

export default Sample;
