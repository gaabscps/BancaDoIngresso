import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Form,
  FormGroup,
  Label,
  FormText,
  ButtonGroup,
  Button,
} from "reactstrap";
import SuperButton from "../../../../sharedComponents/SuperButton";
import SuperInput from "../../../../sharedComponents/SuperInput";

const Sample = (props) => {
  const history = useHistory();

  const nextStep = () => {
    history.push("/ticket");
  };
  const goBack = () => {
    history.goBack();
  };
  
  return (
    <Fragment>
      <Container className="mainContainer" fluid={true}>
        <div className="pageTitle">Informações gerais</div>
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
                style={{ width: "152px" }}
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
                style={{ width: "364px" }}
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
                style={{ width: "243px" }}
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
                style={{ width: "243px" }}
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
                Data Início do Evento
              </Label>
              <SuperInput
                style={{ width: "243px" }}
                id="exampleTime"
                name="time"
                placeholder="time placeholder"
                type="time"
              />
            </FormGroup>
            <FormGroup className="fieldSpacing">
              <Label className="fieldLabel" for="exampleDatetime">
                Data Fim do Evento
              </Label>
              <SuperInput
                style={{ width: "243px" }}
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
          </FormGroup>
          <FormGroup className="fieldSpacing">
            <Label className="fieldLabel" for="exampleSelect">
              Cliente ou contratante
            </Label>
            <SuperInput
              placeholder="Digite ou selecione o cliente/contratante"
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
        <div className="pageTitle">Informações complementares</div>
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
              <Label className="fieldLabel" for="exampleFile" sm={2}>
                Imagem POS (jpg ou png)
              </Label>
              <FormText>Resolução: 500x500</FormText>
              <Col sm={10}>
                <SuperInput
                  id="exampleFile"
                  placeholder="Nenhum arquivo selecionado"
                  name="file"
                  type="file"
                />
              </Col>
            </FormGroup>
          </div>
          <div className="groupButton">
            <Label className="fieldLabel">Publicar evento no site?</Label>
            <ButtonGroup style={{ width: "100px" }}>
              <SuperButton>Sim</SuperButton>
              <SuperButton>Não</SuperButton>
            </ButtonGroup>
          </div>
          <div className="groupButton">
            <Label className="fieldLabel">Tamanho do texto</Label>
            <ButtonGroup style={{ width: "100px" }}>
              <SuperButton>Pequeno</SuperButton>
              <SuperButton>Médio</SuperButton>
              <SuperButton>Grande</SuperButton>
            </ButtonGroup>
          </div>
          <FormGroup className="fieldSpacing">
            <Label className="fieldLabel" for="exampleEmail">
              Frase do ingresso
            </Label>
            <SuperInput
              style={{ height: "188px" }}
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
              style={{ height: "343px" }}
              id="exampleText"
              placeholder="Digite aqui a descrição que irá aparecer no site"
              name="text"
              type="textarea"
            />
          </FormGroup>
        </Form>
        <div className="nextPageButton">
          <SuperButton
            onClick={goBack}
          >
            Voltar
          </SuperButton>
          <SuperButton
            onClick={nextStep}
          >
            Avançar para Setor e ingresso
          </SuperButton>
        </div>
      </Container>
    </Fragment>
  );
};

export default Sample;