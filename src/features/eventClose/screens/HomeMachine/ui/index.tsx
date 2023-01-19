/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import { Loading } from '@/components';
import { Container } from 'reactstrap';
import './style.scss';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';
import { colors } from '@/styles/colors';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

interface HomeMachineContainerProps {
  state: States;
  eventLocation: any;
}

export const HomeMachineContainer: React.FC<HomeMachineContainerProps> = ({
  state,
  eventLocation,
}) => {
  const { id: eventId } = useParams<{ id: string }>();

  return (
    <Fragment>
      <Loading isVisible={state === States.loading} />
      <Container className="mainContainer" fluid={true}>
        <div className="pageTitle d-flex mb-2">
          <Link to={`${process.env.PUBLIC_URL}/dashboard/event`}>
            <ArrowLeft color={colors.black} className="arrow-left" />
          </Link>
          <h5 className="ml-3 mb-0 mt-2 pageTitle">
            Máquinas {eventLocation?.event?.name && `- ${eventLocation?.event?.name}`}
          </h5>
        </div>
        <p className="text-black-50 mb-5">Escolha o que você deseja visualizar</p>

        <div className="father-cards-machine">
          <Link
            to={`${process.env.PUBLIC_URL}/dashboard/event-close/machines/ticket-sales/${eventId}`}
          >
            Venda de ingressos
          </Link>
          <Link
            to={`${process.env.PUBLIC_URL}/dashboard/event-close/machines/product-sale/${eventId}`}
          >
            Venda de produtos
          </Link>
          <Link to={`${process.env.PUBLIC_URL}/dashboard/event-close/machines/report/${eventId}`}>
            Relatório PagSeguro
          </Link>
        </div>
      </Container>
    </Fragment>
  );
};
