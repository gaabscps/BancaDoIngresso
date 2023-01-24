/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/jsx-key */
/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import { Loading } from '@/components';
import { Col, Container, Row } from 'reactstrap';
import Event from '@/model/Event';
import Ticket from '@/model/Ticket';
import { DataConfirmation } from '../components/DataConfirmation';
import { SectorTicket } from '../components/SectorTicket';
import { SectorProduct } from '../components/SectorProduct';
import { SectorPdv } from '../components/SectorPdv';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

interface ConfirmationEventContainerProps {
  state: States;
  event: Event | undefined;
  ticket: Ticket | undefined;
}

export const ConfirmationEventContainer: React.FC<ConfirmationEventContainerProps> = ({
  state,
  event,
  ticket,
}) => (
  <Fragment>
    <Loading isVisible={state === States.loading} />
    <Container className="mainContainer" fluid={true}>
      <Row>
        <Col md={12}>
          {event?.id ? (
            <>
              <DataConfirmation event={event} />
              <SectorTicket ticket={ticket} />
              <SectorProduct event={event} />
              <SectorPdv event={event} />
            </>
          ) : (
            <h5>Evento não encontrado</h5>
          )}
        </Col>
      </Row>
    </Container>
  </Fragment>
);
