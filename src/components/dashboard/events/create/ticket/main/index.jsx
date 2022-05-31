import React, { Fragment, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Input,
  FormGroup,
  Label,
  ButtonGroup,
  Button,
} from "reactstrap";
import SuperButton from "../../../../../sharedComponents/SuperButton";
import SuperInput from "../../../../../sharedComponents/SuperInput";

const Sample = (props) => {
  return (
    <Fragment>
      <Container className="subContainer" fluid={true}>
        <FormGroup  className="fieldSpacing">
          <Label className="fieldLabel" for="exampleSelect">
            Nome do setor
          </Label>
          <SuperInput
            style={{ width: "546px" }}
            placeholder="Digite ou selecione o nome do setor"
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
        <FormGroup  className="fieldSpacing">
          <Label className="fieldLabel" for="exampleEmail">
            Nome do ingresso
          </Label>
          <SuperInput
            id="exampleEmail"
            name="email"
            placeholder="Digite o nome do ingresso"
            type="email"
          />
        </FormGroup>
        <div className="d-flex pt-2">
          <FormGroup  className="fieldSpacing">
            <Label className="fieldLabel" for="exampleNumber">
              Quantidade de ingressos
            </Label>
            <SuperInput
              style={{ width: "232px" }}
              id="exampleNumber"
              name="number"
              placeholder="Ex: 20000"
              type="number"
            />
          </FormGroup>
          <FormGroup  className="fieldSpacing">
            <Label className="fieldLabel" for="exampleNumber">
              Valor unitário
            </Label>
            <SuperInput
              style={{ width: "243px" }}
              id="exampleNumber"
              name="number"
              placeholder="Ex: 20,00"
              type="number"
            />
          </FormGroup>
        </div>
        <FormGroup  className="fieldSpacing">
          <Label className="fieldLabel" for="exampleNumber">
            Valor total
          </Label>
          <SuperInput
            style={{ width: "243px" }}
            id="exampleNumber"
            name="number"
            placeholder="Ex: 200,00"
            type="number"
          />
        </FormGroup>
        <div className="d-flex">
          <FormGroup  className="fieldSpacing">
            <Label className="fieldLabel" for="exampleDatetime">
              Data Início da Venda
            </Label>
            <SuperInput
              style={{ width: "243px" }}
              id="exampleDate"
              name="date"
              placeholder="DD/MM/AAAA"
              type="date"
            />
          </FormGroup>
          <FormGroup  className="fieldSpacing">
            <Label className="fieldLabel" for="exampleDatetime">
              Data Fim da Venda
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
          <FormGroup  className="fieldSpacing">
            <Label className="fieldLabel" for="exampleDatetime">
              Hora Início do Evento
            </Label>
            <SuperInput
              style={{ width: "243px" }}
              id="exampleTime"
              name="time"
              placeholder="time placeholder"
              type="time"
            />
          </FormGroup>
          <FormGroup  className="fieldSpacing">
            <Label className="fieldLabel" for="exampleDatetime">
              Hora Fim do Evento
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

        <div className="groupButton">
          <Label className="fieldLabel">Permitir meia entrada?</Label>
          <ButtonGroup style={{ width: "100px" }}>
            <SuperButton>Sim</SuperButton>
            <SuperButton>Não</SuperButton>
          </ButtonGroup>
        </div>
        <FormGroup  className="fieldSpacing">
          <Label className="fieldLabel" for="exampleNumber">
            Valor total
          </Label>
          <SuperInput
            style={{ width: "135px" }}
            id="exampleNumber"
            name="number"
            placeholder="Ex: 200,00"
            type="number"
          />
        </FormGroup>
        <FormGroup  className="fieldSpacing">
          <Label className="fieldLabel" for="exampleNumber">
            Quantidade de ingressos cortesia
          </Label>
          <SuperInput
            style={{ width: "232px" }}
            id="exampleNumber"
            name="number"
            placeholder="Ex: 20000"
            type="number"
          />
        </FormGroup>
        <FormGroup  className="fieldSpacing">
          <Label className="fieldLabel" for="examplePassword">
            Senha para liberar cortesia
          </Label>
          <SuperInput
            style={{ width: "232px" }}
            id="examplePassword"
            name="password"
            placeholder="*******"
            type="password"
          />
        </FormGroup>

        <div className="groupButton">
          <Label className="fieldLabel">Numerar ingressos?</Label>
          <ButtonGroup style={{ width: "100px" }}>
            <SuperButton>Sim</SuperButton>
            <SuperButton>Não</SuperButton>
          </ButtonGroup>
        </div>
        <div>
          <FormGroup  className="fieldSpacing">
            <Label className="fieldLabel" for="exampleFile" sm={2}>
              Layout de impressão
            </Label>
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
        <div>
          <FormGroup  className="fieldSpacing">
            <Label className="fieldLabel" for="exampleFile" sm={2}>
              Imagem de impressão
            </Label>
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
        <FormGroup  className="fieldSpacing">
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
        </FormGroup>
        <FormGroup  className="fieldSpacing">
          <Label className="fieldLabel" for="exampleNumber">
            Número de vias
          </Label>
          <SuperInput
            style={{ width: "171px" }}
            id="exampleNumber"
            name="number"
            placeholder="Ex: 200"
            type="number"
          />
        </FormGroup>
        <div className="groupButton">
          <Label className="fieldLabel">Reimprimir ingresso?</Label>
          <ButtonGroup style={{ width: "100px" }}>
            <SuperButton>Sim</SuperButton>
            <SuperButton>Não</SuperButton>
          </ButtonGroup>
        </div>
        <div className="groupButton">
          <Label className="fieldLabel">Imprimir número do lote?</Label>
          <ButtonGroup style={{ width: "100px" }}>
            <SuperButton>Sim</SuperButton>
            <SuperButton>Não</SuperButton>
          </ButtonGroup>
        </div>
        <FormGroup  className="fieldSpacing">
          <Label className="fieldLabel" for="exampleSelect">
            Quantidade ingressos venda do site
          </Label>
          <SuperInput
            placeholder="20000"
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
        <FormGroup  className="fieldSpacing">
          <Label className="fieldLabel" for="exampleText">
            Observação
          </Label>
          <SuperInput
            style={{ height: "343px" }}
            id="exampleText"
            placeholder="Digite aqui observações que irão aparecer no ingresso"
            name="text"
            type="textarea"
          />
        </FormGroup>
        <div className="secondPageTitle">Lotes</div>
        <div className="pageSubTitle">Cadastrar lote</div>
        <FormGroup  className="fieldSpacing">
          <Label className="fieldLabel" for="exampleEmail">
            Nome do lote
          </Label>
          <SuperInput
            id="exampleEmail"
            name="email"
            placeholder="Digite o nome do lote"
            type="email"
          />
        </FormGroup>
        <div className="d-flex">
          <FormGroup  className="fieldSpacing">
            <Label className="fieldLabel" for="exampleDatetime">
              Data Início da Venda
            </Label>
            <SuperInput
              style={{ width: "243px" }}
              id="exampleDate"
              name="date"
              placeholder="DD/MM/AAAA"
              type="date"
            />
          </FormGroup>
          <FormGroup  className="fieldSpacing">
            <Label className="fieldLabel" for="exampleDatetime">
              Data Fim da Venda
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
          <FormGroup  className="fieldSpacing">
            <Label className="fieldLabel" for="exampleDatetime">
              Hora Início do Evento
            </Label>
            <SuperInput
              style={{ width: "243px" }}
              id="exampleTime"
              name="time"
              placeholder="time placeholder"
              type="time"
            />
          </FormGroup>
          <FormGroup  className="fieldSpacing">
            <Label className="fieldLabel" for="exampleDatetime">
              Hora Fim do Evento
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
        <FormGroup  className="fieldSpacing">
          <Label className="fieldLabel" for="exampleNumber">
            Porcentagem de Comissão (%)
          </Label>
          <SuperInput
            style={{ width: "135px" }}
            id="exampleNumber"
            name="number"
            placeholder="0%"
            type="number"
          />
        </FormGroup>
        <div className="d-flex pt-2">
          <FormGroup  className="fieldSpacing">
            <Label className="fieldLabel" for="exampleNumber">
              Quantidade de ingressos
            </Label>
            <SuperInput
              style={{ width: "232px" }}
              id="exampleNumber"
              name="number"
              placeholder="Ex: 20000"
              type="number"
            />
          </FormGroup>
          <FormGroup  className="fieldSpacing">
            <Label className="fieldLabel" for="exampleNumber">
              Valor unitário
            </Label>
            <SuperInput
              style={{ width: "232px" }}
              id="exampleNumber"
              name="number"
              placeholder="Ex: 20,00"
              type="number"
            />
          </FormGroup>
        </div>
        <FormGroup  className="fieldSpacing">
          <Label className="fieldLabel" for="exampleNumber">
            Valor total estimado
          </Label>
          <SuperInput
            style={{ width: "243px" }}
            id="exampleNumber"
            name="number"
            placeholder="Ex: 200,00"
            type="number"
          />
        </FormGroup>
      </Container>
    </Fragment>
  );
};

export default Sample;
