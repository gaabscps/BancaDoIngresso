import React, { Fragment, useState } from 'react';
import { Container, FormGroup, Label, Row, Col, Button, ButtonGroup } from 'reactstrap';
import SuperInput from '../../../../../sharedComponents/SuperInput';
import SuperCollapse from '../../../../../sharedComponents/SuperCollapse';
import ProductIcon from '../../../../../../assets/images/svg/Product';

const Sample = (): JSX.Element => {
  const [show, setShow] = useState(false);

  return (
    <Fragment>
      <Container className="subContainer" fluid={true}>
        <hr className="dividerUp" />
        <div className="groupButton">
          <Label className="fieldLabel">Permitir produto?</Label>
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

            <div className="whiteContainer">
              <Row lg="2" md="1">
                <Col>
                  <FormGroup>
                    <Label className="fieldLabel" for="eventSectionsSection">
                      Setor
                    </Label>
                    <SuperInput
                      // style={{ width: '359px' }}
                      placeholder="Digite ou selecione o setor"
                      id="eventSectionsSection"
                      name="eventSectionsSection"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label className="fieldLabel" for="eventSectionsProducts">
                      Produtos
                    </Label>
                    <SuperInput
                      // style={{ width: '359px' }}
                      id="eventSectionsProducts"
                      name="eventSectionsProducts"
                      placeholder="Digite ou selecione o produto"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <div className="auxGrayText pb-2">Inserir TODOS produtos desse setor</div>
            </div>
          </>
        ) : null}

        <div style={{ marginTop: '50px' }}>
          <SuperCollapse
            title="Setores e produtos inseridos"
            content="Nenhum setor e produto inserido. Aqui será exibida uma lista dos seus setores e produtos inseridos"
            leftIcon={ProductIcon}
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
