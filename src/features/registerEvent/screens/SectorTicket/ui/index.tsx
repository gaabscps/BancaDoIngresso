/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import { Loading } from '@/components';
import { Container } from 'reactstrap';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

interface SectorTicketContainerProps {
  state: States;
}

export const SectorTicketContainer: React.FC<SectorTicketContainerProps> = ({ state }) => (
  <Fragment>
    <Loading isVisible={state === States.loading} />
    <Container className="mainContainer" fluid={true}>
      <div className="container-event">
        <h5 className="mb-2 border-bottom-title mb-5">Setor e ingresso</h5>
      </div>
    </Container>
  </Fragment>
);