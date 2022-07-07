import React, { Fragment } from 'react';
import { Container, Label } from 'reactstrap';

const Sample = (): JSX.Element => (
  <Fragment>
    <Container className="mainContainer" fluid={true}>
      <div className="d-flex justify-content-between" style={{ paddingBottom: '30px' }}>
        <div style={{ display: 'grid' }}>
          <Label className="pageTitle">Módulos</Label>
        </div>
      </div>
    </Container>
  </Fragment>
);

export default Sample;
