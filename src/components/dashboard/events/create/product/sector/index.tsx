import React, { Fragment } from 'react';
import { Container, FormGroup, Label, Row, Col } from 'reactstrap';
import SectorIcon from '../../../../../../assets/images/svg/Sector';
import SuperCollapse from '../../../../../sharedComponents/SuperCollapse';

import SuperInput from '../../../../../sharedComponents/SuperInput';

const Sample = (): JSX.Element => (
  <Fragment>
    <Container className="subContainer" fluid={true}>
      <hr className="divider" />
      <div className="secondPageTitle" style={{ marginTop: '50px', marginBottom: '30px' }}>
        Cadastrando setores
      </div>
      <div className="whiteContainer">
        <FormGroup>
          <Row lg="2" md="1">
            <Col>
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="sectionName">
                  Nome do setor
                </Label>
                <SuperInput
                  id="sectionName"
                  name="sectionName"
                  placeholder="Digite ou selecione o nome do setor"
                />
              </div>
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="imageBase64">
                  Imagem do setor (opcional)
                </Label>
                <SuperInput
                  id="imageBase64"
                  placeholder="Nenhum arquivo selecionado"
                  name="imageBase64"
                  type="file"
                />
              </div>
            </Col>
          </Row>
        </FormGroup>
        <div className="nextPageButton">
          <div className="auxSucessText" style={{ paddingTop: '20px' }}>
            + cadastrar setor
          </div>
        </div>
      </div>
      <div style={{ marginTop: '50px' }}>
        <SuperCollapse
          title="Setores cadastrados"
          content="Nenhum setor foi cadastrado. Aqui será exibida uma lista dos seus setores cadastrados"
          leftIcon={SectorIcon()}
        />
      </div>
    </Container>
  </Fragment>
);

export default Sample;
