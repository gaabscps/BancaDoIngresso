/* eslint-disable import/no-unresolved */
import React, { Fragment } from 'react';
import { Loading } from '@/components';
import { Col, Container, Row } from 'reactstrap';

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
      <Row>
        <Col md={4}>
          <h5 className="mb-2 border-bottom-title mb-5">Setor e ingresso</h5>
        </Col>
      </Row>
    </Container>
  </Fragment>
);
