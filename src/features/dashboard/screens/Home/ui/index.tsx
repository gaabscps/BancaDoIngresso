/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { CardHeader, Label } from 'reactstrap';
import dayjs from 'dayjs';
import { HomeState } from '@/store/ducks/home/types';
import { toString } from '@/helpers/common/amount';
import Event from '@/model/Event';
import clock from '@/assets/images/svg/clock.svg';
import x from '@/assets/images/svg/x.svg';
import money from '@/assets/images/svg/money.svg';
import reMoney from '@/assets/images/svg/reMoney.svg';
import calendar from '@/assets/images/svg/calendar.svg';
import locationPin from '@/assets/images/svg/locationPin.svg';
import Pdv from '@/model/Pdv';
import { States } from '..';

export interface HomeContainerProps {
  data: HomeState;
  events: Event[];
  pdvList: Pdv[];
  onViewAllEvents: () => void;
  state: States;
}

export const HomeContainer: React.FC<HomeContainerProps> = ({
  data,
  events,
  pdvList,
  onViewAllEvents,
}) => (
  <React.Fragment>
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
                <span>{events.filter(event => event.eventStatus === 1).length}</span>
              </div>
            </div>
          </div>
          <div className="col home-column">
            <div className="home-text-container">
              <div className="textContent flex-row">
                <img src={x} />
                <span>Eventos cancelados</span>
              </div>
              <div className="count">{events.filter(event => event.eventStatus === 3).length}</div>
            </div>
          </div>
          <div className="col home-column">
            <div className="home-text-container">
              <div className="textContent flex-row">
                <img src={money} />
                <span>PDV's cadastrados</span>
              </div>
              <div className="count">
                <span>{pdvList.length}</span>
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
                <span>{!data?.data?.chargeback ? 0 : toString(data.data.chargeback)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <div style={{ display: 'grid', paddingTop: '50px' }}>
        <div className="d-flex justify-content-between">
          <Label className="pageTitle">Próximos eventos</Label>
          <Label
            className="normalText verTodos"
            onClick={onViewAllEvents}
            style={{ cursor: 'pointer' }}
          >
            Ver todos
          </Label>
        </div>
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
          {events && events.length > 0 ? (
            events?.map(event => (
              <figure
                style={event.imageBase64 === undefined ? { backgroundColor: '#d9d9d94d' } : {}}
                key={event.id}
                className="partyCard"
              >
                {event.imageBase64 && <img className="" src={event.imageBase64} />}
                <div
                  style={event.imageBase64 === undefined ? { backgroundColor: '#2222224d' } : {}}
                  className="descriptionEvent"
                >
                  <div className="nameEvent">{event.name}</div>
                  <div className="info-container">
                    <div className="dateEvent">
                      <img src={calendar} style={{ paddingRight: '10px', width: '25px' }} />
                      {dayjs(event.startDate).format('DD/MM/YYYY')}
                    </div>
                    <div className="locationEvent">
                      <img src={locationPin} style={{ paddingRight: '10px', width: '23px' }} />
                      {event.address.city}
                    </div>
                  </div>
                </div>
              </figure>
            ))
          ) : (
            <div>nenhum Evento cadastrado</div>
          )}
        </div>
      </div>
    </div>
  </React.Fragment>
);
