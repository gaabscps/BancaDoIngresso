import React, { Fragment, useState } from 'react';
import { Container, FormGroup, Label } from 'reactstrap';
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
          <div className="fieldSpacing">
            <div className="fieldLabel">
              <Label className="fieldLabel" for="exampleEmail">
                Nome do setor
              </Label>
              <SuperInput
                style={{ width: '546px' }}
                placeholder="Digite ou selecione o nome do setor"
                name="email"
              />
            </div>
            <div
              className="auxSucessText"
              style={{ paddingTop: '20px' }}
              onClick={() => setShowNewSector(true)}
            >
              + cadastrar novo setor
            </div>
          </div>
          <div className="fieldSpacing">
            <Label className="fieldLabel" for="exampleEmail">
              Nome do ingresso
            </Label>
            <SuperInput
              id="exampleEmail"
              name="email"
              placeholder="Digite o nome do ingresso"
              type="email"
            />
          </div>
          <div className="groupButton">
            <Label className="fieldLabel">Permitir meia entrada?</Label>
            <ButtonGroup style={{ width: '100px' }}>
              <Button variant="outline-dark" style={{ height: '62px', width: '100px' }}>
                Sim
              </Button>
              <Button variant="outline-dark" style={{ height: '62px', width: '100px' }}>
                Não
              </Button>
            </ButtonGroup>
          </div>
          <div className="d-flex pt-2">
            <div className="fieldSpacing">
              <Label className="fieldLabel" for="exampleNumber">
                Porcentagem de meia entrada (%)
              </Label>
              <SuperInput
                style={{ width: '135px' }}
                id="exampleNumber"
                name="number"
                placeholder="0%"
                type="number"
              />
            </div>
            <div className="fieldSpacing">
              <Label className="fieldLabel" for="exampleNumber">
                Quantidade de ingressos meia entrada
              </Label>
              <SuperInput
                style={{ width: '232px' }}
                id="exampleNumber"
                name="number"
                placeholder="20000"
                type="number"
              />
            </div>
          </div>
          <div className="groupButton">
            <Label className="fieldLabel">Permitir ingresso cortesia?</Label>
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
            <Label className="fieldLabel" for="exampleEmail">
              Quantidade de ingressos cortesia
            </Label>
            <SuperInput
              style={{ width: '243px' }}
              id="exampleEmail"
              name="email"
              placeholder="Ex: 20000"
            />
          </div>
          <div className="groupButton">
            <Label className="fieldLabel">Numerar ingressos?</Label>
            <ButtonGroup style={{ width: '100px' }}>
              <Button variant="outline-dark" style={{ height: '62px', width: '100px' }}>
                Sim
              </Button>
              <Button variant="outline-dark" style={{ height: '62px', width: '100px' }}>
                Não
              </Button>
            </ButtonGroup>
          </div>
          <div>
            <div className="fieldSpacing">
              <Label className="fieldLabel" for="exampleFile">
                Layout de impressão
              </Label>
              <SuperInput
                id="exampleFile"
                placeholder="Nenhum arquivo selecionado"
                name="file"
                type="file"
              />
            </div>
          </div>
          <div>
            <div className="fieldSpacing">
              <Label className="fieldLabel" for="exampleFile">
                Imagem de impressão
              </Label>
              <SuperInput
                id="exampleFile"
                placeholder="Nenhum arquivo selecionado"
                name="file"
                type="file"
              />
            </div>
          </div>
          <div className="fieldSpacing">
            <Label className="fieldLabel" for="exampleSelect">
              Impressora
            </Label>
            <SuperInput
              placeholder="Selecione a impressora para impressão"
              id="exampleSelect"
              name="select"
              type="select"
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </SuperInput>
          </div>
          <div className="fieldSpacing">
            <Label className="fieldLabel" for="exampleNumber">
              Número de vias
            </Label>
            <SuperInput
              style={{ width: '171px' }}
              id="exampleNumber"
              name="number"
              placeholder="Ex: 200"
              type="number"
            />
          </div>
          <div className="groupButton">
            <Label className="fieldLabel">Reimprimir ingresso?</Label>
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
            <Label className="fieldLabel">Imprimir número do lote?</Label>
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
            <Label className="fieldLabel" for="exampleText">
              Observação
            </Label>
            <SuperInput
              style={{ height: '343px' }}
              id="exampleText"
              placeholder="Digite aqui observações que irão aparecer no ingresso"
              name="text"
              type="textarea"
            />
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
        </FormGroup>
      </Container>
    </Fragment>
  );
};

export default Sample;
