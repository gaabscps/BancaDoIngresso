/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import { Loading } from '@/components';
import { Container } from 'reactstrap';
import './style.scss';
import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { ArrowLeft } from 'react-feather';
import { colors } from '@/styles/colors';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

interface HomeContainerProps {
  state: States;
  eventState: any;
  eventLocation: any;
}

export const HomeContainer: React.FC<HomeContainerProps> = ({
  state,
  eventState,
  eventLocation,
}) => {
  const { startDate, endDate, childs, contractor, address } = eventState;
  const { id: eventId } = useParams<{ id: string }>();

  return (
    <Fragment>
      <Loading isVisible={state === States.loading} />
      <Container className="mainContainer" fluid={true}>
        <div className="pageTitle d-flex mb-5">
          <Link to={`${process.env.PUBLIC_URL}/dashboard/event`}>
            <ArrowLeft color={colors.black} className="arrow-left" />
          </Link>
          <h5 className="ml-3 mb-0 mt-2 pageTitle">
            Fechamento de evento - {eventLocation?.event?.name}
          </h5>
        </div>
        {childs && childs.length > 0 ? (
          <ul className="list-event-children">
            <li>Nome do(s) evento(s) filho(s)</li>
            {childs.map((child: any) => (
              <li key={child.id}>{child.name}</li>
            ))}
          </ul>
        ) : (
          ''
        )}

        {contractor ? (
          <ul className="list-event-children mt-5">
            <li>Contratante</li>
            <li>{contractor.name}</li>
          </ul>
        ) : (
          ''
        )}
        {startDate && endDate ? (
          <table className="table-custom-close-event mt-5">
            <thead>
              <tr>
                <th scope="col">Data início</th>
                <th scope="col">Data fim</th>
                <th scope="col">Hora início</th>
                <th scope="col">Hora fim</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{dayjs(startDate).format('DD/MM/YYYY')}</td>
                <td>{dayjs(endDate).format('DD/MM/YYYY')}</td>
                <td>{dayjs(startDate).format('HH:mm')}</td>
                <td>{dayjs(endDate).format('HH:mm')}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          ''
        )}

        {address?.city ? (
          <ul className="list-event-children mt-5">
            <li>Cidade</li>
            <li>{address?.city}</li>
          </ul>
        ) : (
          ''
        )}
        <hr className="mt-5 mb-4" />
        <div className="father-cards-event-close">
          <Link
            to={`${process.env.PUBLIC_URL}/dashboard/event-close/general-collection/${eventId}`}
          >
            Arrecadação geral
          </Link>
          <Link to={`${process.env.PUBLIC_URL}/dashboard/event-close/income/${eventId}`}>
            Receitas
          </Link>
          <Link to={`${process.env.PUBLIC_URL}/dashboard/event-close/expenses/${eventId}`}>
            Despesas
          </Link>
          <Link to={`${process.env.PUBLIC_URL}/dashboard/event-close/machines/${eventId}`}>
            Máquinas
          </Link>
          <Link to={`${process.env.PUBLIC_URL}/dashboard/event-close/final-settlement/${eventId}`}>
            Acerto final
          </Link>
        </div>
      </Container>
    </Fragment>
  );
};
