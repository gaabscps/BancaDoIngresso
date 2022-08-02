import React, { Fragment, useState } from 'react';
import { Container, FormGroup, Label, Row, Col } from 'reactstrap';
import { Button, ButtonGroup } from 'react-bootstrap';
import SuperInput from '../../../../../sharedComponents/SuperInput';
import POSIcon from '../../../../../../assets/images/svg/Pos';
import SuperCollapse from '../../../../../sharedComponents/SuperCollapse';

const Sample = (): JSX.Element => {
  const [show, setShow] = useState(false);

  return (
    <Fragment>
      <Container className="subContainer" fluid={true}>
        <hr className="dividerUp" />
        <div className="groupButton">
          <Label className="fieldLabel">Permitir POS?</Label>
          <ButtonGroup style={{ width: '100px' }}>
            <Button
              variant="outline-dark"
              style={{ height: '62px', width: '100px' }}
              onClick={() => setShow(true)}
            >
              Sim
            </Button>
            <Button variant="outline-dark" style={{ height: '62px', width: '100px' }}>
              Não
            </Button>
          </ButtonGroup>
        </div>
        {show ? (
          <>
            <hr className="dividerUp" />
            <div className=" whiteContainer">
              <Row lg="2" md="1">
                <Col>
                  <FormGroup className="fieldSpacing">
                    <Label className="fieldLabel" for="posName">
                      POS
                    </Label>
                    <SuperInput
                      id="posName"
                      name="posName"
                      placeholder="Digite ou selecione a POS"
                    />
                    <div className="auxSucessText" style={{ paddingTop: '20px' }}>
                      + cadastrar nova POS
                    </div>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup className="fieldSpacing">
                    <Label className="fieldLabel" for="waiter">
                      Porcentagem do Garçom (%)
                    </Label>
                    <SuperInput
                      // style={{ width: '135px' }}
                      id="waiter"
                      name="waiter"
                      placeholder="0%"
                    />
                  </FormGroup>
                </Col>
              </Row>
            </div>
          </>
        ) : null}

        <div style={{ marginTop: '50px' }}>
          <SuperCollapse
            title="POS’s inseridos"
            content="Nenhum PDV foi adicionado. Aqui será exibida uma lista dos seus POS’s inseridos"
            leftIcon={POSIcon}
          />
        </div>

        <div className="nextPageButton" style={{ marginTop: '50px' }}>
          <div style={{ color: '#fff' }}>
            <Button
              style={{ height: '50px', width: '200px', borderColor: '#A5A5A5' }}
              variant="outline-light"
            >
              <div className="greyNormalText">Adicionar PDV</div>
            </Button>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default Sample;
