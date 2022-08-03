import React, { Fragment, useEffect } from 'react';
import { Container, Row, Col, CardHeader, Label } from 'reactstrap';
// import { useDispatch } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router';
import clock from '../../../assets/images/svg/clock.svg';
import x from '../../../assets/images/svg/x.svg';
import money from '../../../assets/images/svg/money.svg';
import reMoney from '../../../assets/images/svg/reMoney.svg';
import calendar from '../../../assets/images/svg/calendar.svg';
import locationPin from '../../../assets/images/svg/locationPin.svg';
import { getRequest } from '../../../store/ducks/home/actions';
import { ApplicationState } from '../../../store';
import { HomeState } from '../../../store/ducks/home/types';

const Sample = (): JSX.Element => {
  const history = useNavigate();
  const home = useSelector<ApplicationState, HomeState>(store => store.home);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRequest());
  }, []);

  const viewAll = (): void => {
    history('/events');
  };

  console.log(home);
  return (
    <Fragment>
      <Container className="mainContainer" fluid={true}>
        <div style={{ display: 'grid', paddingBottom: '20px' }}>
          <Label className="pageTitle">Visão Geral</Label>
          <Label className="fieldLabel">Últimos 30 dias</Label>
        </div>
        <Row>
          <Col sm="12">
            <CardHeader className="cardHome">
              <div className="row">
                <div className="col">
                  <div className="d-flex justify-content-center">
                    <div className="p-40">
                      <div className="textContent flex-row">
                        <img src={clock} />
                        Eventos pendentes de liberação
                      </div>
                      <div className="count">{home?.data?.pendingReleaseEvents}</div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="d-flex justify-content-center">
                    <div className="p-40">
                      <div className="textContent flex-row">
                        <img src={x} />
                        Eventos cancelados
                      </div>
                      <div className="count">{home.data.canceledEvents}</div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="d-flex justify-content-center">
                    <div className="p-40">
                      <div className="textContent flex-row">
                        <img src={money} />
                        PDV’s cadastrados
                      </div>
                      <div className="count">{home.data.registeredPdvs}</div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="d-flex justify-content-center">
                    <div className="p-40">
                      <div className="textContent flex-row">
                        <img src={reMoney} />
                        Chargeback
                      </div>
                      <div className="count">{home.data.chargeback}</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Col>
        </Row>
        <Col>
          <div style={{ display: 'grid', paddingTop: '50px' }}>
            <div className="d-flex justify-content-between">
              <Label className="pageTitle">Eventos próximos</Label>
              <Label className="normalText" onClick={viewAll} style={{ cursor: 'pointer' }}>
                Ver todos
              </Label>
            </div>
            <Label className="fieldLabel">Últimos 7 dias</Label>
          </div>
          <div style={{ width: '1062px', display: 'contents' }}>
            <div
              className="parent"
              style={{
                paddingBottom: '30px',
                // borderStyle: 'solid',
                // borderColor: '#0ff',
                borderWidth: '1px',
                minWidth: 'auto',
              }}
            >
              {home?.data?.lastEvents?.map(events => (
                <div key={events.id} className="partyCard">
                  <div className="partyImage2">
                    <img className="actionCard" src={reMoney} style={{ paddingRight: '10px' }} />
                    <div className="descriptionEvent">
                      <div className="nameEvent">{events?.name}</div>
                      <div className="dateEvent">
                        <>
                          <img src={calendar} style={{ paddingRight: '10px' }} />
                          {moment(events?.startDate).format('DD/MM/YYYY')}
                        </>
                      </div>
                      <div className="locationEvent">
                        <img src={locationPin} style={{ paddingRight: '10px' }} />
                        {events?.address?.city}/{events?.address?.state}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Container>
    </Fragment>
  );
};

export default Sample;
