/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useState } from 'react';
import { Container, FormGroup, Label, Row, Col, Button, ButtonGroup } from 'reactstrap';
import SuperInput from '../../../../../sharedComponents/SuperInput';
import SuperCollapse from '../../../../../sharedComponents/SuperCollapse';
import POSIcon from '../../../../../../assets/images/svg/Pos';

const Sample = (): JSX.Element => {
  const [allowDiscount, setAllowDiscount] = useState(true);

  return (
    <Fragment>
      <Container className="subContainer" fluid={true}>
        <hr className="divider" />
        <div className="secondPageTitle" style={{ marginTop: '50px', marginBottom: '30px' }}>
          Configurando POS
        </div>
        <div className="groupButton">
          <Label className="fieldLabel">Permitir POS?</Label>
          <ButtonGroup style={{ width: '100px' }}>
            <Button variant="outline-dark" style={{ height: '62px', width: '100px' }}>
              Sim
            </Button>
            <Button variant="outline-dark" style={{ height: '62px', width: '100px' }}>
              Não
            </Button>
          </ButtonGroup>
        </div>
        <div className="whiteContainer">
          <FormGroup>
            <Row lg="2" md="1">
              <Col>
                <Row>
                  <Col>
                    <div className="fieldSpacing">
                      <Label className="fieldLabel" for="posName">
                        POS
                      </Label>
                      <SuperInput
                        id="posName"
                        name="posName"
                        placeholder="Digite ou selecione o produto"
                      />
                      <div className="auxSucessText" style={{ paddingTop: '20px' }}>
                        + cadastrar nova POS
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div className="fieldSpacing">
                      <Label className="fieldLabel" for="waiter">
                        Porcentagem do garçom (%)
                      </Label>
                      <SuperInput
                        style={{ width: '135px' }}
                        id="waiter"
                        name="waiter"
                        placeholder="Ex: 100"
                      />
                    </div>
                  </Col>
                </Row>
                <div className="d-flex pt-2"></div>
                <div className="d-flex pt-2">
                  <div className="fieldSpacing">
                    <Label className="fieldLabel" for="commission">
                      Porcentagem de comissão(%)
                    </Label>
                    <SuperInput
                      style={{ width: '135px' }}
                      id="commission"
                      name="commission"
                      placeholder="0%"
                    />
                  </div>
                  <div className="groupButton">
                    <Label className="fieldLabel">Aceita desconto?</Label>
                    <ButtonGroup style={{ width: '100px' }}>
                      <Button
                        variant="outline-dark"
                        style={{ height: '62px', width: '100px' }}
                        onClick={() => setAllowDiscount(true)}
                      >
                        Sim
                      </Button>
                      <Button
                        variant="outline-dark"
                        style={{ height: '62px', width: '100px' }}
                        onClick={() => setAllowDiscount(false)}
                      >
                        Não
                      </Button>
                    </ButtonGroup>
                  </div>
                </div>
              </Col>
            </Row>
          </FormGroup>
          <div className="nextPageButton">
            <div className="auxSucessText" style={{ paddingTop: '20px' }}>
              + cadastrar nova POS
            </div>
          </div>
        </div>
        <div style={{ marginTop: '50px' }}>
          <SuperCollapse
            title="POS’s inseridos"
            content="Nenhum POS foi inserido. Aqui será exibida uma lista dos seus POS's inseridos"
            leftIcon={POSIcon()}
          />
        </div>
      </Container>
    </Fragment>
  );
};

export default Sample;
