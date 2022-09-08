import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Media, Col } from 'reactstrap';
import sad from '../../assets/images/other-images/sad.png';

export const Error404 = (): JSX.Element => (
  <Fragment>
    <div className="page-wrapper">
      <div className="error-wrapper">
        <Container>
          <Media body className="img-100" src={sad} alt="" />
          <div className="error-heading">
            <h2 className="headline font-danger">{'404'}</h2>
          </div>
          <Col md="8 offset-md-2">
            <p className="sub-content">Página não encontrada.</p>
          </Col>
          <Link to={`/`}>
            <Button color="danger-gradien" size="lg">
              Voltar para a Home
            </Button>
          </Link>
        </Container>
      </div>
    </div>
  </Fragment>
);
