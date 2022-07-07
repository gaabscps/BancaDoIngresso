import React, { Fragment, useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Container, Col, Form, FormGroup, Label, FormText } from 'reactstrap';
import SuperInput from '../../../../sharedComponents/SuperInput';
import step1 from '../../../../../assets/images/svg/stepByStep/step1.svg';
import titleLine from '../../../../../assets/images/svg/titleLine.svg';
import auxSucess from '../../../../../assets/images/svg/auxSucess.svg';
import secondTitleLine from '../../../../../assets/images/svg/secondTitleLine.svg';
import NewCategory from '../../../../modal/NewCategory';
import RegisterCompany from '../../../../modal/RegisterCompany';
import ParentEvent from '../../../../modal/ParentEvent';
import SuperButton from '../../../../sharedComponents/SuperButton';

const Sample = (): JSX.Element => {
  const history = useNavigate();
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [showCompany, setShowCompany] = useState(false);
  const [showParentEvent, setShowParentEvent] = useState(false);

  const nextStep = (): void => {
    history('/event/ticket');
  };
  const goBack = (): void => {
    history(-1);
  };

  return (
    <Fragment>
      <NewCategory show={showNewCategory} setShowNewCategory={setShowNewCategory} />
      <RegisterCompany show={showCompany} setShowCompany={setShowCompany} />
      <ParentEvent show={showParentEvent} setShowParentEvent={setShowParentEvent} />
      <Container className="mainContainer" fluid={true}>
        <div className="d-flex justify-content-center stepContainer">
          <img src={step1} />
        </div>
        <Col>
          <div style={{ display: 'grid', paddingBottom: '50px' }}>
            <Label className="pageTitle">Informações gerais</Label>
            <img src={titleLine} style={{ paddingTop: '-20px' }} />
          </div>
          <Form>
            <FormGroup className="fieldSpacing">
              <Label className="fieldLabel" for="exampleSelect">
                Tipo de evento
              </Label>
              <SuperInput
                placeholder="Digite ou selecione o tipo do evento"
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
              <div
                className="auxSucessText"
                style={{ paddingTop: '20px' }}
                onClick={() => setShowParentEvent(true)}
              >
                <img style={{ paddingRight: '6px' }} src={auxSucess} />
                vincular evento Pai
              </div>
            </FormGroup>
            <FormGroup className="fieldSpacing">
              <Label className="fieldLabel" for="exampleEmail">
                Nome do Evento
              </Label>
              <SuperInput
                id="exampleEmail"
                name="email"
                placeholder="Digite o nome do evento. Ex: Baile do Dennis DJ"
                type="email"
              />
            </FormGroup>
            <FormGroup className="fieldSpacing">
              <Label className="fieldLabel" for="exampleEmail">
                Nome do Evento (POS)
              </Label>
              <SuperInput
                id="exampleEmail"
                name="email"
                placeholder="Digite o nome do evento na POS. Ex: Baile do DN.DJ"
                type="email"
              />
            </FormGroup>
            <FormGroup className="fieldSpacing">
              <Label className="fieldLabel" for="exampleEmail">
                Nome do estabelecimento
              </Label>
              <SuperInput
                id="exampleEmail"
                name="email"
                placeholder="Digite o nome do estabelecimento evento. Ex: Folk Valley"
                type="email"
              />
            </FormGroup>
            <FormGroup className="fieldSpacing">
              <Label className="fieldLabel" for="exampleEmail">
                Local do evento
              </Label>
              <SuperInput
                id="exampleEmail"
                name="email"
                placeholder="Digite o local do evento. Ex: Rua Perimetral Leste, 123"
                type="email"
              />
            </FormGroup>
            <div className="d-flex">
              <FormGroup className="fieldSpacing">
                <Label className="fieldLabel" for="exampleSelect">
                  Estado
                </Label>
                <SuperInput
                  style={{ width: '152px' }}
                  placeholder="SP"
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
              </FormGroup>
              <FormGroup className="fieldSpacing">
                <Label className="fieldLabel" for="exampleSelect">
                  Cidade
                </Label>
                <SuperInput
                  style={{ width: '364px' }}
                  placeholder="Selecione ou digite a cidade"
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
              </FormGroup>
            </div>
            <div className="d-flex">
              <FormGroup className="fieldSpacing">
                <Label className="fieldLabel" for="exampleDatetime">
                  Data Início do Evento
                </Label>
                <SuperInput
                  style={{ width: '243px' }}
                  id="exampleDate"
                  name="date"
                  placeholder="DD/MM/AAAA"
                  type="date"
                />
              </FormGroup>
              <FormGroup className="fieldSpacing">
                <Label className="fieldLabel" for="exampleDatetime">
                  Data Fim do Evento
                </Label>
                <SuperInput
                  style={{ width: '243px' }}
                  id="exampleDate"
                  name="date"
                  placeholder="DD/MM/AAAA"
                  type="date"
                />
              </FormGroup>
            </div>
            <div className="d-flex">
              <FormGroup className="fieldSpacing">
                <Label className="fieldLabel" for="exampleDatetime">
                  Hora Início do Evento
                </Label>
                <SuperInput
                  style={{ width: '243px' }}
                  id="exampleTime"
                  name="time"
                  placeholder="time placeholder"
                  type="time"
                />
              </FormGroup>
              <FormGroup className="fieldSpacing">
                <Label className="fieldLabel" for="exampleDatetime">
                  Hora Fim do Evento
                </Label>
                <SuperInput
                  style={{ width: '243px' }}
                  id="exampleTime"
                  name="time"
                  placeholder="time placeholder"
                  type="time"
                />
              </FormGroup>
            </div>
            <FormGroup className="fieldSpacing">
              <Label className="fieldLabel" for="exampleSelect">
                Categoria do evento
              </Label>
              <SuperInput
                placeholder="Digite ou selecione a categoria do evento"
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
              <div
                className="auxSucessText"
                style={{ paddingTop: '20px' }}
                onClick={() => setShowNewCategory(true)}
              >
                + cadastrar nova categoria
              </div>
            </FormGroup>
            <FormGroup className="fieldSpacing">
              <Label className="fieldLabel" for="exampleSelect">
                Empresa ou contratante
              </Label>
              <SuperInput
                placeholder="Digite ou selecione o cliente/contratante"
                id="exampleSelect"
              />
              <div
                className="auxSucessText"
                style={{ paddingTop: '20px' }}
                onClick={() => setShowCompany(true)}
              >
                + cadastrar nova empresa ou contratante
              </div>
            </FormGroup>
            <FormGroup className="fieldSpacing">
              <Label className="fieldLabel" for="exampleEmail">
                Censura do evento
              </Label>
              <SuperInput
                id="exampleEmail"
                name="email"
                placeholder="Digite a idade de censura. Ex: 16"
                type="email"
              />
            </FormGroup>
          </Form>
          <div style={{ display: 'grid', paddingBottom: '50px' }}>
            <Label className="pageTitle">Informações complementares</Label>
            <img src={secondTitleLine} style={{ paddingTop: '-20px' }} />
          </div>
          <Form>
            <FormGroup className="fieldSpacing">
              <Label className="fieldLabel" for="exampleEmail">
                Facebook do evento
              </Label>
              <SuperInput
                id="exampleEmail"
                name="email"
                placeholder="Copie e cole o link do Facebook do evento"
                type="email"
              />
            </FormGroup>
            <FormGroup className="fieldSpacing">
              <Label className="fieldLabel" for="exampleEmail">
                Instagram do evento
              </Label>
              <SuperInput
                id="exampleEmail"
                name="email"
                placeholder="Copie e cole o link do Instagram do evento"
                type="email"
              />
            </FormGroup>
            <FormGroup className="fieldSpacing">
              <Label className="fieldLabel" for="exampleEmail">
                Nome do estabelecimento
              </Label>
              <SuperInput
                id="exampleEmail"
                name="email"
                placeholder="Digite o nome do estabelecimento evento. Ex: Folk Valley"
                type="email"
              />
            </FormGroup>
            <div>
              <FormGroup className="fieldSpacing">
                <Label className="fieldLabel" for="exampleFile">
                  Imagem POS (jpg ou png)
                  <FormText className="greyNormalText">Resolução: 384x168</FormText>
                </Label>
                <SuperInput
                  id="exampleFile"
                  placeholder="Nenhum arquivo selecionado"
                  name="file"
                  type="file"
                />
              </FormGroup>
            </div>
            <div>
              <FormGroup className="fieldSpacing">
                <Label className="fieldLabel" for="exampleFile">
                  Imagem principal do evento (jpg ou png)
                  <FormText className="greyNormalText">Resolução: 500x500</FormText>
                </Label>
                <SuperInput
                  id="exampleFile"
                  placeholder="Nenhum arquivo selecionado"
                  name="file"
                  type="file"
                />
              </FormGroup>
            </div>
            <div className="groupButton">
              <Label className="fieldLabel">Publicar evento no site?</Label>
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
              <Label className="fieldLabel">Tamanho do texto</Label>
              <ButtonGroup style={{ width: '100px' }}>
                <Button variant="outline-dark" style={{ height: '62px', width: '121px' }}>
                  Pequeno
                </Button>
                <Button variant="outline-dark" style={{ height: '62px', width: '121px' }}>
                  Médio
                </Button>
                <Button variant="outline-dark" style={{ height: '62px', width: '121px' }}>
                  Grande
                </Button>
              </ButtonGroup>
            </div>
            <FormGroup className="fieldSpacing">
              <Label className="fieldLabel" for="exampleEmail">
                Frase do ingresso
              </Label>
              <SuperInput
                style={{ height: '188px' }}
                id="exampleText"
                placeholder="Digite a frase que irá aparecer no ingresso"
                name="text"
                type="textarea"
              />
            </FormGroup>
            <FormGroup className="fieldSpacing">
              <Label className="fieldLabel" for="exampleText">
                Descrição para o site
              </Label>
              <SuperInput
                style={{ height: '343px' }}
                id="exampleText"
                placeholder="Digite aqui a descrição que irá aparecer no site"
                name="text"
                type="textarea"
              />
            </FormGroup>
          </Form>
          <div className="nextPageButton">
            <div style={{ color: '#fff' }}>
              <Button style={{ height: '50px' }} variant="outline-light" onClick={goBack}>
                Voltar{' '}
              </Button>
            </div>
            <SuperButton style={{ width: '278px' }} onClick={nextStep}>
              Avançar para Setor e ingresso
            </SuperButton>
          </div>
        </Col>
      </Container>
    </Fragment>
  );
};

export default Sample;
