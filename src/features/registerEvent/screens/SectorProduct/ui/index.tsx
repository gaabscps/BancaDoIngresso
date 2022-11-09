/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import { Loading } from '@/components';
import { Container } from 'reactstrap';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
}

interface SectorProductContainerProps {
  state: States;
}

export const SectorProductContainer: React.FC<SectorProductContainerProps> = ({ state }) => (
  <Fragment>
    <Loading isVisible={state === States.loading} />
    <Container className="mainContainer" fluid={true}>
      <div className="container-event">
        <h5 className="mb-2 border-bottom-title mb-5">Setor e Produto</h5>
      </div>
    </Container>
  </Fragment>
);