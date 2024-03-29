import React, { Fragment } from 'react';
import { Container, Col, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import step5 from '../../../../../assets/images/svg/stepByStep/step5.svg';
import titleLine from '../../../../../assets/images/svg/titleLine.svg';
import SuperButton from '../../../../sharedComponents/SuperButton';

const Sample = (): JSX.Element => {
  const history = useHistory();

  const nextStep = (): void => {
    history.push('/events');
  };
  const goBack = (): void => {
    history.goBack();
  };

  return (
    <Fragment>
      <Container className="mainContainer" fluid={true}>
        <div className="d-flex justify-content-center stepContainer">
          <img src={step5} />
        </div>
        <Col>
          <div className="titleStep">
            <div className="pageTitle">Confirmação de dados</div>
            <img src={titleLine} style={{ paddingTop: '-20px' }} />
          </div>
          <hr className="dividerDown" />
          <div className="nextPageButton">
            <div style={{ color: '#fff' }}>
              <Button style={{ height: '50px' }} variant="outline-light" onClick={goBack}>
                Voltar
              </Button>
            </div>
            <SuperButton style={{ width: '278px' }} onClick={nextStep}>
              Finalizar cadastro do evento
            </SuperButton>
          </div>
        </Col>
      </Container>
    </Fragment>
  );
};

export default Sample;
