import React, { Fragment, useEffect, useState } from 'react';
import { Container, Row, Col, Label, Input, FormGroup } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'moment';
import SuperButton from '../../../sharedComponents/SuperButton';
import DiscountVoucher from '../../../modal/DiscountVoucher';
import blackAlert from '../../../../assets/images/svg/blackAlert.svg';
import yellowStatus from '../../../../assets/images/svg/yellowStatus.svg';
import greenStatus from '../../../../assets/images/svg/greenStatus.svg';
import redStatus from '../../../../assets/images/svg/redStatus.svg';
import blueStatus from '../../../../assets/images/svg/blueStatus.svg';
import pen from '../../../../assets/images/svg/pen.svg';
import lixeira from '../../../../assets/images/svg/lixeira.svg';
import ticket from '../../../../assets/images/svg/ticket.svg';
import { ApplicationState } from '../../../../store';
import { listRequest } from '../../../../store/ducks/event/actions';
import { EventState } from '../../../../store/ducks/event/types';
import Page from '../../../../entities/Page';
import EventFind from '../../../../entities/EventFind';
import Event from '../../../../entities/Event';
import { CheckUserState } from '../../../../store/ducks/check-user/types';

const Sample = (): JSX.Element => {
  const event = useSelector<ApplicationState, EventState>(store => store.event);
  const checkUser = useSelector<ApplicationState, CheckUserState>(store => store.checkUser);
  const dispatch = useDispatch();
  const page: Page<EventFind, Event> = {
    page: 1,
    pageSize: 10,
    sort: 'startDate',
    order: 'DESC',
  };
  const [pagination, setPagination] = useState(page);

  useEffect(() => {
    if (!checkUser.call && checkUser.logged) {
      if (!event.loading && event.data && !event.data.page) {
        dispatch(listRequest(pagination));
      } else if (!event.error && event.data && event.data.page && event.data.page.total) {
        setPagination(event.data.page);
      }
    }
  }, [event]);

  /*
  const handlePagination = (pageNumber: number): void => {
    const newPage: Page<EventFind, Event> = {
      ...pagination,
      page: pageNumber,
    };
    setPagination(newPage);
    dispatch(listRequest(pagination));
  };
  */

  const history = useNavigate();
  const [show, setShow] = useState(false);

  const createEvent = (): void => {
    history('/event/general');
  };

  const callShow = (b: boolean): void => {
    setShow(b);
  };

  const getImageStyle = (imageUrl: string): React.CSSProperties => {
    const style: React.CSSProperties = {
      backgroundImage: `url(${imageUrl}`,
    };
    return style;
  };

  const convertDateToString = (date: Date): string => {
    if (date) {
      return Moment(date).format('DD/MM/YYYY [às] HH:mm');
    }
    return '';
  };

  return (
    <Fragment>
      <DiscountVoucher show={show} setShow={callShow} />
      <Container className="mainContainer" fluid={true}>
        <div className="d-flex justify-content-between" style={{ paddingBottom: '30px' }}>
          <div style={{ display: 'grid' }}>
            <Label className="pageTitle">Todos os eventos cadastrados</Label>
            <Label className="fieldLabel">
              <img src={blackAlert} style={{ paddingRight: '10px' }} alt="" />
              Você tem <b>3 eventos</b> em rascunho
            </Label>
          </div>
          <Row className="justify-content-between">
            <SuperButton color="primary" onClick={createEvent}>
              + Cadastrar evento
            </SuperButton>
            <FormGroup>
              <Input
                id="exampleSelect"
                name="select"
                type="select"
                style={{
                  width: '182px',
                  height: '50px',
                  borderColor: '#222222',
                  marginLeft: '15px',
                }}
              >
                <option>20 por página</option>
                <option>40 por página</option>
                <option>60 por página</option>
              </Input>
            </FormGroup>
          </Row>
        </div>
        <Row>
          <Col>
            <div className="d-flex pb-2">
              <div className="eventStatus subText">
                <img src={yellowStatus} style={{ paddingRight: '10px' }} alt="" />
                Evento com liberação pendente
              </div>
              <div className="eventStatus subText">
                <img src={greenStatus} style={{ paddingRight: '10px' }} alt="" />
                Evento liberado
              </div>
              <div className="eventStatus subText">
                <img src={redStatus} style={{ paddingRight: '10px' }} alt="" />
                Evento recusado
              </div>
              <div className="eventStatus subText">
                <img src={blueStatus} style={{ paddingRight: '10px' }} alt="" />
                Rascunho
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <div className="cabeçalho">
              <div className="linhaDaTabela headerFoto normalText">Imagem</div>
              <div className="linhaDaTabela headerStatus"></div>
              <div className="linhaDaTabela headerNome normalText">Nome do evento</div>
              <div className="linhaDaTabela headerCidade normalText">Cidade</div>
              <div className="linhaDaTabela headerData normalText">Inicio evento</div>
              <div className="linhaDaTabela headerData normalText">Fim evento</div>
              <div className="linhaDaTabela headerAção normalText">Ação</div>
            </div>
            {pagination.total &&
              pagination.total > 0 &&
              pagination.list?.map(data => (
                <div key={data.id} className="rows">
                  <div
                    className="linhaDaTabela campoFoto"
                    style={getImageStyle(data.imageBase64)}
                  ></div>
                  <div className="linhaDaTabela campoStatus"></div>
                  <div className="linhaDaTabela campoNome">
                    <div>
                      <div className="celulaNome subText">{data.name}</div>
                    </div>
                  </div>
                  <div className="linhaDaTabela campoCidade">
                    <div className="celulaCidade subText">{`${data.address.city}/${data.address.state}`}</div>
                  </div>
                  <div className="linhaDaTabela campoData">
                    <div className="celulaData subText">{convertDateToString(data.startDate)}</div>
                  </div>
                  <div className="linhaDaTabela campoData">
                    <div className="celulaData subText">{convertDateToString(data.endDate)}</div>
                  </div>
                  <div className="linhaDaTabela campoAção">
                    <div className="celulaAção">
                      <img src={pen} style={{ paddingRight: '25px' }} alt="" />
                      <img src={lixeira} style={{ paddingRight: '25px' }} alt="" />
                      <img src={ticket} onClick={() => setShow(true)} alt="" />
                    </div>
                  </div>
                </div>
              ))}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Sample;
