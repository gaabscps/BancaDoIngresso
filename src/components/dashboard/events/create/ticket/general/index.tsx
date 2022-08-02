import React, { Fragment, useState } from 'react';
import { Container, FormGroup, Label, Row, Col } from 'reactstrap';
import { Button, ButtonGroup } from 'react-bootstrap';
import SuperInput from '../../../../../sharedComponents/SuperInput';
import BackOnTop from '../../../../../sharedComponents/BackOnTop';
import NewSector from '../../../../../modal/NewSector';

const Sample = (): JSX.Element => {
  const [showNewSector, setShowNewSector] = useState(false);
  return (
    <Fragment>
      <NewSector show={showNewSector} setShowNewSector={setShowNewSector} />
      <Container className="subContainer" fluid={true}>
        <hr className="dividerUp" />
        <FormGroup>
          <Row lg="2" md="1">
            <Col>
              <div className="groupButton">
                <Label className="fieldLabel">Enviar ingresso por WhatsApp?</Label>
                <ButtonGroup style={{ width: '100px' }}>
                  <Button variant="outline-dark" style={{ height: '62px', width: '100px' }}>
                    Sim
                  </Button>
                  <Button variant="outline-dark" style={{ height: '62px', width: '100px' }}>
                    Não
                  </Button>
                </ButtonGroup>
              </div>
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleNumber">
                  Tipo do código
                </Label>
                <SuperInput
                  // style={{ width: '171px' }}
                  id="exampleNumber"
                  name="number"
                  placeholder="Digite ou selecione o tipo do código"
                  type="number"
                />
              </div>
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleNumber">
                  Tipo de impressão
                </Label>
                <SuperInput
                  // style={{ width: '171px' }}
                  id="exampleNumber"
                  name="number"
                  placeholder="Digite ou selecione o tipo de impressão"
                />
              </div>
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleNumber">
                  Portão de entrada
                </Label>
                <SuperInput
                  // style={{ width: '171px' }}
                  id="exampleNumber"
                  name="number"
                  placeholder="Digite o nome do portão de entrada"
                />
              </div>
              <div className="groupButton">
                <Label className="fieldLabel">Pedir nome antes da compra?</Label>
                <ButtonGroup style={{ width: '100px' }}>
                  <Button variant="outline-dark" style={{ height: '62px', width: '100px' }}>
                    Sim
                  </Button>
                  <Button variant="outline-dark" style={{ height: '62px', width: '100px' }}>
                    Não
                  </Button>
                </ButtonGroup>
              </div>
              <div className="groupButton">
                <Label className="fieldLabel">Imprimir nome no ingresso?</Label>
                <ButtonGroup style={{ width: '100px' }}>
                  <Button variant="outline-dark" style={{ height: '62px', width: '100px' }}>
                    Sim
                  </Button>
                  <Button variant="outline-dark" style={{ height: '62px', width: '100px' }}>
                    Não
                  </Button>
                </ButtonGroup>
              </div>
              <div className="groupButton">
                <Label className="fieldLabel">Pedir CPF?</Label>
                <ButtonGroup style={{ width: '100px' }}>
                  <Button variant="outline-dark" style={{ height: '62px', width: '100px' }}>
                    Sim
                  </Button>
                  <Button variant="outline-dark" style={{ height: '62px', width: '100px' }}>
                    Não
                  </Button>
                </ButtonGroup>
              </div>
              <div className="groupButton">
                <Label className="fieldLabel">Imprimir CPF no ingresso?</Label>
                <ButtonGroup style={{ width: '100px' }}>
                  <Button variant="outline-dark" style={{ height: '62px', width: '100px' }}>
                    Sim
                  </Button>
                  <Button variant="outline-dark" style={{ height: '62px', width: '100px' }}>
                    Não
                  </Button>
                </ButtonGroup>
              </div>
              <div className="groupButton">
                <Label className="fieldLabel">Consultar CPF? </Label>
                <ButtonGroup style={{ width: '100px' }}>
                  <Button variant="outline-dark" style={{ height: '62px', width: '100px' }}>
                    Sim
                  </Button>
                  <Button variant="outline-dark" style={{ height: '62px', width: '100px' }}>
                    Não
                  </Button>
                </ButtonGroup>
              </div>
              <div className="fieldSpacing">
                <SuperInput
                  // onChange={onChangeForm()}
                  placeholder="Limite de compra por CPF"
                  id="printer"
                  name="printer"
                  type="select"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </SuperInput>
              </div>
              <div className="nextPageButton" style={{ marginTop: '50px' }}>
                <div style={{ marginRight: '25px', paddingTop: '5px' }}>
                  <BackOnTop />
                </div>
                <div style={{ color: '#fff' }}>
                  <Button
                    style={{
                      height: '50px',
                      width: '250px',
                      borderColor: '#A5A5A5',
                    }}
                    variant="outline-light"
                  >
                    <div className="greyNormalText">Próxima etapa</div>
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </FormGroup>
      </Container>
    </Fragment>
  );
};

export default Sample;
