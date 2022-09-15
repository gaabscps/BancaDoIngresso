import React, { Fragment } from 'react';
import { Container, Row, Col } from 'reactstrap';

export const Footer = (): JSX.Element => (
  <Fragment>
    <footer className="footer">
      <Container fluid={true}>
        <Row>
          <Col md="12" className="footer-copyright text-center">
            <p className="mb-0">{'Copyright 2022 © Banca do Ingresso Web by Squads.'}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  </Fragment>
);
