import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { CustomTable, TableColumn } from '../../Utils/Table';
import { ModalConfirmation } from '../../Utils/Modal/ModalConfirmation';
import { ReactComponent as Pen } from '../../../assets/images/svg/pen.svg';
import { ReactComponent as Status } from '../../../assets/images/svg/status.svg';
import { ReactComponent as Trash } from '../../../assets/images/svg/lixeira.svg';
import Button from '../../Utils/Button';
import { ModalCustom } from '../../Utils/Modal';
import Page from '../../../entities/Page';
import { ApplicationState } from '../../../store';
import { listRequest } from '../../../store/ducks/pos/actions';
import { CheckUserState } from '../../../store/ducks/check-user/types';
import { PosState } from '../../../store/ducks/pos/types';
import Pos from '../../../entities/Pos';
import Filter from '../../modal/Filter';
import FilterVector from '../../../assets/images/svg/FilterVector';

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

  const pos = useSelector<ApplicationState, PosState>(store => store.pos);
  const checkUser = useSelector<ApplicationState, CheckUserState>(store => store.checkUser);
  const dispatch = useDispatch();

  const callShowPos = (b: boolean): void => {
    setShowPos(b);
  };
  const callShowExclude = (b: boolean): void => {
    setShowExclude(b);
  };
  const callShowFilter = (b: boolean): void => {
    setShowFilter(b);
  };
  interface DataRow {
    id: string;
    imageBase64: string;
    name: string;
    serial: string;
    actions: string;
    status: number;
    date: string;
    currentPdv: string;
  }
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
    },
  ];
  const dataTablePos = pagination.list ? (
    pagination.list?.map(item => ({
      id: item.id,
      name:
        //* <CollumnStatus statusColor={item.status}>{ *//
        item.name,
      /** }</CollumnStatus> */

      serial: item.serialNumber,
      actions: (
        <>
          <Pen
            onClick={() => {
              setShowPos(!showPos);
            }}
            className="mr-2 svg-icon"
          />
          <Trash
            onClick={() => {
              setShowExclude(!showExclude);
            }}
            className="mr-2 svg-icon"
          />
        </>
      ),
    }))
  ) : (
    <div></div>
  );

  useEffect(() => {
    if (!checkUser.call && checkUser.logged) {
      if (!pos.loading && pos.data && !pos.data.page) {
        dispatch(listRequest(pagination));
      } else if (!pos.error && pos.data && pos.data.page && pos.data.page.total) {
        setPagination(pos.data.page);
      }
    }
  }, [pos]);

  return (
    <>
      <Filter show={showFilter} setShowFilter={callShowFilter} />
      <ModalConfirmation show={showExclude} setShow={callShowExclude} />
      <ModalCustom
        title={'Cadastrar nova POS'}
        show={showPos}
        setShow={callShowPos}
        isCard={true}
        onBtnAction={() => {}}
      >
        <label className="input-label">Nome da POS</label>
        <input className="form-control input-default" type="text" />
        <label className="input-label">Nº de série da POS</label>
        <input className="form-control input-default" type="text" />
        <label>Situação da POS</label>
        <select className="form-control input-default">
          <option> Ativa</option>
        </select>
      </ModalCustom>
      <Container className="mainContainer" fluid={true}>
        <div className="d-flex justify-content-between" style={{ paddingBottom: '30px' }}>
          <div style={{ display: 'grid' }}>
            <div className="pageTitle">
              <label>POS</label>
            </div>
          </div>
          <Row className="justify-content-between">
            <Button color="primary" onClick={() => setShowPos(true)}>
              + Cadastrar nova POS
            </Button>
            <div onClick={() => setShowFilter(true)} className="filter-container">
              <div className="filter-content">
                <FilterVector />
              </div>
            </div>
          </Row>
        </div>
        <Row>
          <Col>
            <div className="d-flex pb-2">
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
              theme={'primary'}
              columns={columnsPrimaryStatusColor}
              data={dataTablePos}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Sample;
