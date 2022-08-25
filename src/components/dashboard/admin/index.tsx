import React, { Fragment, useEffect } from 'react';
import { CardHeader, Label } from 'reactstrap';
// import { useDispatch } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router';
import clock from '../../../assets/images/svg/clock.svg';
import x from '../../../assets/images/svg/x.svg';
import money from '../../../assets/images/svg/money.svg';
import eventos from '../../../eventos.json';
import reMoney from '../../../assets/images/svg/reMoney.svg';
import calendar from '../../../assets/images/svg/calendar.svg';
import locationPin from '../../../assets/images/svg/locationPin.svg';
import { getRequest } from '../../../store/ducks/home/actions';
import { ApplicationState } from '../../../store';
import { HomeState } from '../../../store/ducks/home/types';

interface Eventos {
  id: string;
  image: string;
  name: string;
  date: string;
  city: string;
}

const eventoss: Eventos[] = [];
eventos.eventos.forEach(eventi => {
  eventoss.push(eventi as Eventos);
});

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

  return (
    <Fragment>
      <div className="container-home pt-5">
        <div style={{ display: 'grid', paddingBottom: '20px' }}>
          <Label className="pageTitle">Visão Geral</Label>
          <Label className="fieldLabel">Últimos 30 dias</Label>
        </div>
        <CardHeader className="cardHome">
          <div className="row">
            <div className="col home-column">
              <div className="home-text-container">
                <div className="textContent flex-row">
                  <img src={clock} />
                  <span> Eventos pendentes de liberação</span>
                </div>
                <div className="count">
                  <span>{home?.data?.pendingReleaseEvents}</span>
                </div>
              </div>
            </div>
            <div className="col home-column">
              <div className="home-text-container">
                <div className="textContent flex-row">
                  <img src={x} />
                  <span>Eventos cancelados</span>
                </div>
                <div className="count">{home.data.canceledEvents}</div>
              </div>
            </div>
            <div className="col home-column">
              <div className="home-text-container">
                <div className="textContent flex-row">
                  <img src={money} />
                  <span>PDV’s cadastrados</span>
                </div>
                <div className="count">
                  <span>{home.data.registeredPdvs}</span>
                </div>
              </div>
            </div>
            <div className="col home-column">
              <div className="home-text-container">
                <div className="textContent flex-row">
                  <img src={reMoney} />
                  <span>Chargeback</span>
                </div>
                <div className="count">
                  <span>{home.data.chargeback}</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <div style={{ display: 'grid', paddingTop: '50px' }}>
          <div className="d-flex justify-content-between">
            <Label className="pageTitle">Próximos eventos</Label>
            <Label className="normalText" onClick={viewAll} style={{ cursor: 'pointer' }}>
              Ver todos
            </Label>
          </div>
          {/* <Label className="fieldLabel">Últimos 7 dias</Label> */}
        </div>
        <div style={{ width: '1062px', display: 'contents' }}>
          <div
            className="grid-card-home"
            style={{
              paddingBottom: '30px',
              borderWidth: '1px',
              minWidth: 'auto',
            }}
          >
            {eventoss.length > 0 ? (
              eventoss.map(events => (
                <figure key={events.id} className="partyCard">
                  <img className="" src={events.image} />
                  <div className="descriptionEvent">
                    <div className="nameEvent">{events.name}</div>
                    <div className="info-container">
                      <div className="dateEvent">
                        <img src={calendar} style={{ paddingRight: '10px', width: '25px' }} />
                        {moment(events.date).format('DD/MM/YYYY')}
                      </div>
                      <div className="locationEvent">
                        <img src={locationPin} style={{ paddingRight: '10px', width: '23px' }} />
                        {events.city}
                      </div>
                    </div>
                  </div>
                </figure>
              ))
            ) : (
              <div>Nenhum evento encontrado</div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Sample;
