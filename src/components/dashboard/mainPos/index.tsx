import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import moment from 'moment';
import { CollumnStatus, CustomTable, TableColumn } from '../../Utils/Table';
import { ModalConfirmation } from '../../Utils/Modal/ModalConfirmation';
import { ReactComponent as Pen } from '../../../assets/images/svg/pen.svg';
import { ReactComponent as Status } from '../../../assets/images/svg/status.svg';
import { ReactComponent as Trash } from '../../../assets/images/svg/lixeira.svg';
import Button from '../../Utils/Button';
import Page from '../../../entities/Page';
import { ApplicationState } from '../../../store';
import { listRequest, deleteRequest } from '../../../store/ducks/pos/actions';
import { CheckUserState } from '../../../store/ducks/check-user/types';
import { PosState } from '../../../store/ducks/pos/types';
import Pos from '../../../entities/Pos';
import Filter from '../../modal/FilterPos';
import FilterVector from '../../../assets/images/svg/FilterVector';
import RegisterPos from '../../modal/RegisterPos';
import PosStatus from '../../../entities/PosStatus';

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
  const page: Page<Pos, Pos> = {
    page: 1,
    pageSize: 10,
    sort: 'name', // Adicionar cidade!!!
    order: 'DESC',
  };
  const [showPos, setShowPos] = useState(false);
  const [showExclude, setShowExclude] = useState(false);
  const [pagination, setPagination] = useState(page);
  const [showFilter, setShowFilter] = useState(false);
  const [idPos, setIdPos] = useState('');

  const pos = useSelector<ApplicationState, PosState>(store => store.pos);
  const checkUser = useSelector<ApplicationState, CheckUserState>(store => store.checkUser);
  const dispatch = useDispatch();

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
  };

  useEffect(() => {
    if (!checkUser.call && checkUser.logged) {
      if (!pos.loading && pos.data && !pos.data.page) {
        dispatch(listRequest(pagination));
      } else if (!pos.error && pos.data && pos.data.page && pos.data.page.total) {
        setPagination(pos.data.page);
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
  const dataTablePos = pagination.list
    ? pagination.list?.map(item => ({
        id: item.id,
        name: (
          <CollumnStatus statusColor={changeColorCollumn(item.status)}>{item.name}</CollumnStatus>
        ),
        date: moment(item.expirationDate, 'YYYY-DD-MM hh:mm:ss').format('DD/MM/YYYY'),
        currentPdv: item.pdv?.name,
        serial: item.serialNumber,
        actions: (
          <>
            <Pen
              onClick={() => {
                setShowPos(!showPos);
                setIdPos(item.id);
              }}
              className="mr-2 svg-icon"
            />
            <Trash
              onClick={() => {
                setShowExclude(!showExclude);
                setIdPos(item.id);
              }}
              className="mr-2 svg-icon"
            />
          </>
        ),
      }))
    : [{ id: '', name: '', date: '', currentPdv: '', serialNumber: '', pdv: '' }];

  return (
    <>
      <Filter show={showFilter} setShowFilter={callShowFilter} />
      <ModalConfirmation
        show={showExclude}
        setShow={callShowExclude}
        onBtnAction={() => deletePos()}
      />
      <RegisterPos show={showPos} setShow={callShowPos} idPos={idPos} />
      <Container className="mainContainer" fluid={true}>
        <div className="d-flex justify-content-between" style={{ paddingBottom: '30px' }}>
          <div style={{ display: 'grid' }}>
            <div className="pageTitle">POS</div>
          </div>
          <div className="button-filter-container">
            <Button color="primary" onClick={() => setShowPos(true)}>
              + Cadastrar nova POS
            </Button>
            <div onClick={() => setShowFilter(true)} className="filter-container">
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
        <CustomTable theme={'primary'} columns={columnsPrimaryStatusColor} data={dataTablePos} />
      </Container>
    </>
  );
};

export default Sample;
