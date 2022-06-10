import React, { Fragment, useEffect, useState } from "react";
import { Container, Col, FormGroup, Label } from "reactstrap";

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
          Cadastrando combos
        </div>
        <div className="whiteContainer">
          <FormGroup>
            <div className="fieldSpacing">
              <Label className="fieldLabel" for="exampleEmail">
                Grupo do combo
              </Label>
              <SuperInput
                id="exampleEmail"
                name="email"
                placeholder="Digite ou selecione o grupo do combo"
                type="email"
              />
            </div>
            <div className="fieldSpacing">
              <Label className="fieldLabel" for="exampleEmail">
                Subgrupo do combo (opcional)
              </Label>
              <SuperInput
                id="exampleEmail"
                name="email"
                placeholder="Digite ou selecione o subgrupo do combo"
                type="email"
              />
            </div>
            <div className="d-flex pt-2">
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleNumber">
                  Quantidade
                </Label>
                <SuperInput
                  style={{ width: "243px" }}
                  id="exampleNumber"
                  name="number"
                  placeholder="Ex: 200"
                  type="number"
                />
              </div>
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleNumber">
                  Valor do combo
                </Label>
                <SuperInput
                  style={{ width: "243px" }}
                  id="exampleNumber"
                  name="number"
                  placeholder="Ex: 20,00"
                  type="number"
                />
              </div>
            </div>
            <div className="fieldSpacing">
              <Label className="fieldLabel" for="exampleFile">
                Imagem do produto (opcional)
              </Label>
              <SuperInput
                id="exampleFile"
                placeholder="Nenhum arquivo selecionado"
                name="file"
                type="file"
              />
            </div>
            <div style={{ display: "grid", paddingBottom: "50px" }}>
              <div className="pageTitle">Produtos do combo</div>
              <img
                src={require("../../../../../../assets/images/svg/titleLine.svg")}
                style={{ paddingTop: "-20px" }}
              />
            </div>
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
          </FormGroup>
          <div className="nextPageButton">
            <div className="auxSucessText" style={{ paddingTop: "20px" }}>
              + cadastrar combo
            </div>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default Sample;