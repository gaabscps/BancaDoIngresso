import React, { Fragment, useEffect, useState } from "react";
import { Container, Col, FormGroup, Label } from "reactstrap";
import { Button, ButtonGroup } from "react-bootstrap";

import SuperInput from "../../../../../sharedComponents/SuperInput";

const Sample = (props) => {
  return (
    <Fragment>
      <Container className="subContainer" fluid={true}>
        <hr className="divider" />
        <div
          className="secondPageTitle"
          style={{ marginTop: "50px", marginBottom: "30px" }}
        >
          Configurando POS
        </div>
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
        <div className="whiteContainer">
          <FormGroup>
            <div className="d-flex pt-2">
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleNumber">
                  Produto
                </Label>
                <SuperInput
                  style={{ width: "440px" }}
                  id="exampleNumber"
                  placeholder="Digite ou selecione o produto"
                />
                  <div className="auxSucessText" style={{ paddingTop: "20px" }}>
                   + cadastrar nova POS
                  </div>
              </div>
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleNumber">
                  Quantidade
                </Label>
                <SuperInput
                  style={{ width: "243px" }}
                  id="exampleNumber"
                  placeholder="Ex: 100"
                />
              </div>
            </div>
            <div className="d-flex pt-2">
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleNumber">
                  Porcentagem de comissão(%)
                </Label>
                <SuperInput
                  style={{ width: "243px" }}
                  id="exampleNumber"
                  placeholder="0%"
                />
              </div>
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleNumber">
                  Quantidade
                </Label>
                <SuperInput
                  style={{ width: "243px" }}
                  id="exampleNumber"
                  placeholder="Ex: 100"
                />
              </div>
              <div className="groupButton">
                <Label className="fieldLabel">Aceita desconto?</Label>
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
            </div>
          </FormGroup>
          <div className="nextPageButton">
            <div className="auxSucessText" style={{ paddingTop: "20px" }}>
              + cadastrar nova POS
            </div>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default Sample;
