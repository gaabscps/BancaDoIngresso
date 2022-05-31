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
        <div className="groupButton">
          <Label className="fieldLabel">Enviar ingresso por WhatsApp?</Label>
          <ButtonGroup style={{width: "100px"}}>
            <SuperButton>Sim</SuperButton>
            <SuperButton>Não</SuperButton>
          </ButtonGroup>
        </div>
        <FormGroup  className="fieldSpacing">
          <Label className="fieldLabel" for="exampleSelect">
            Tipo do código
          </Label>
          <SuperInput
            placeholder="Digite ou selecione o tipo do código"
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
          <Label className="fieldLabel" for="exampleSelect">
            Tipo de impressão
          </Label>
          <SuperInput
            placeholder="Digite ou selecione o tipo de impressão"
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
          <Label className="fieldLabel">Portão de entrada</Label>
          <SuperInput
            id="exampleEmail"
            placeholder="Digite o nome do portão de entrada"
            type="text"
          />
        </FormGroup>
        <div className="groupButton">
          <Label className="fieldLabel">Pedir nome antes da compra?</Label>
          <ButtonGroup style={{width: "100px"}}>
            <SuperButton>Sim</SuperButton>
            <SuperButton>Não</SuperButton>
          </ButtonGroup>
        </div>
        <div className="groupButton">
          <Label className="fieldLabel">Imprimir nome no ingresso?</Label>
          <ButtonGroup style={{width: "100px"}}>
            <SuperButton>Sim</SuperButton>
            <SuperButton>Não</SuperButton>
          </ButtonGroup>
        </div>
        <div className="groupButton">
          <Label className="fieldLabel">Pedir CPF?</Label>
          <ButtonGroup style={{width: "100px"}}>
            <SuperButton>Sim</SuperButton>
            <SuperButton>Não</SuperButton>
          </ButtonGroup>
        </div>
        <div className="groupButton">
          <Label className="fieldLabel">Imprimir CPF no ingresso?</Label>
          <ButtonGroup style={{width: "100px"}}>
            <SuperButton>Sim</SuperButton>
            <SuperButton>Não</SuperButton>
          </ButtonGroup>
        </div>
        <div className="groupButton">
          <Label className="fieldLabel">Consultar CPF?</Label>
          <ButtonGroup style={{width: "100px"}}>
            <SuperButton>Sim</SuperButton>
            <SuperButton>Não</SuperButton>
          </ButtonGroup>
        </div>
        <FormGroup  className="fieldSpacing">
          <Label className="fieldLabel" for="exampleSelect">
            Limite de compra por CPF
          </Label>
          <SuperInput
            style={{ width: "135px" }}
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
      </Container>
    </Fragment>
  );
};

export default Sample;