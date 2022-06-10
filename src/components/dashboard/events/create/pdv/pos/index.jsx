import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col, Card, FormGroup, Label } from "reactstrap";
import { Button, ButtonGroup } from "react-bootstrap";
import SuperInput from "../../../../../sharedComponents/SuperInput";

const Sample = (props) => {
  return (
    <Fragment>
      <Container className="subContainer" fluid={true}>
        <hr className="dividerUp" />
        <div className="groupButton">
          <Label className="fieldLabel">Permitir POS?</Label>
          <ButtonGroup style={{ width: "100px" }}>
            <Button
              variant="outline-dark"
              style={{ height: "62px", width: "100px" }}
            >
              Sim
            </Button>
            <Button
              variant="outline-dark"
              style={{ height: "62px", width: "100px" }}
            >
              Não
            </Button>
          </ButtonGroup>
        </div>
        <hr className="dividerUp" />
        <div className="d-flex pt-2">
          <FormGroup  className="fieldSpacing">
            <Label className="fieldLabel" for="exampleNumber">
            POS
            </Label>
            <SuperInput
              id="exampleNumber"
              placeholder="Digite ou selecione a POS"
            />
          </FormGroup>
          <FormGroup  className="fieldSpacing">
            <Label className="fieldLabel" for="exampleNumber">
            Porcentagem do Garçom (%)
            </Label>
            <SuperInput
              style={{ width: "135px" }}
              id="exampleNumber"
              name="number"
              placeholder="0%"
            />
          </FormGroup>
        </div>
        
        <div className="nextPageButton">
          <div style={{ color: "#fff" }}>
            <Button
              style={{ height: "50px", width: "200px", borderColor: "#A5A5A5" }}
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
