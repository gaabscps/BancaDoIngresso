import React, { Fragment } from 'react';
import { Container, FormGroup, Label, Row, Col } from 'reactstrap';
import { Button } from 'react-bootstrap';
import SuperInput from '../../../../../sharedComponents/SuperInput';

const Sample = (): JSX.Element => (
  <Fragment>
    <Container className="subContainer" fluid={true}>
      <hr className="dividerUp" />
      <Row>
        <Col>
          <FormGroup className="fieldSpacing">
            <Label className="fieldLabel" for="usersName">
              Usuário do PDV
            </Label>
            <SuperInput
              placeholder="Digite ou selecione o usuário do PDV"
              id="usersName"
              name="usersName"
            />
          </FormGroup>
        </Col>
        <Col>
          <div style={{ color: '#fff', marginTop: '50px' }}>
            <Button style={{ height: '50px', width: '200px' }} variant="outline-light">
              <div className="greyNormalText">Inserir usuário</div>
            </Button>
          </div>
        </Col>
      </Row>
      <div className="auxSucessText" style={{ paddingTop: '20px' }}>
        + cadastrar novo usuário
      </div>
      <div className="nextPageButton">
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

export default Sample;
