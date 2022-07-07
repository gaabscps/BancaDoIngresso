import React, { Fragment } from 'react';
import { Container, Col } from 'reactstrap';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import step5 from '../../../../../assets/images/svg/stepByStep/step5.svg';
import titleLine from '../../../../../assets/images/svg/titleLine.svg';

const Sample = (): JSX.Element => {
  const history = useNavigate();

  const nextStep = (): void => {
    history('/events');
  };
  const goBack = (): void => {
    history(-1);
  };

  return (
    <Fragment>
      <Container className="mainContainer" fluid={true}>
        <div className="d-flex justify-content-center stepContainer">
          <img src={step5} alt="" />
        </div>
        <Col>
          <div style={{ display: 'grid', paddingBottom: '50px' }}>
            <div className="pageTitle">Confirmação de dados</div>
            <img src={titleLine} style={{ paddingTop: '-20px' }} alt="" />
          </div>
          <hr className="dividerDown" />
          <div className="nextPageButton">
            <div style={{ color: '#fff' }}>
              <Button style={{ height: '50px' }} variant="outline-light" onClick={goBack}>
                Voltar
              </Button>
            </div>
            <Button variant="dark" onClick={nextStep}>
              Finalizar cadastro do evento
            </Button>
          </div>
        </Col>
      </Container>
    </Fragment>
  );
};

export default Sample;
