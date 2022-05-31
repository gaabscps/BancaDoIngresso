import React, { Fragment, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
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
          <Label className="fieldLabel">Permitir produto?</Label>
          <ButtonGroup style={{ width: "100px" }}>
            <SuperButton>Sim</SuperButton>
            <SuperButton>Não</SuperButton>
          </ButtonGroup>
        </div>
        <div className="d-flex">
          <FormGroup className="fieldSpacing">
            <Label className="fieldLabel" for="exampleSelect">
              Setor
            </Label>
            <SuperInput
              style={{ width: "359px" }}
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
          <FormGroup className="fieldSpacing">
            <Label className="fieldLabel" for="exampleNumber">
              Porcentagem do Garçom (%)
            </Label>
            <SuperInput
              style={{ width: "359px" }}
              id="exampleNumber"
              name="number"
              placeholder="0%"
              type="number"
            />
          </FormGroup>
        </div>
        <div className="nextPageButton">
          <SuperButton
            color="primary"
            style={{ width: "144px", height: "50px" }}
          >
            Adcionar PDV
          </SuperButton>
        </div>
      </Container>
    </Fragment>
  );
};

export default Sample;
