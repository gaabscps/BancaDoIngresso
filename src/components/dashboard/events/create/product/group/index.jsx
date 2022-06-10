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
          Cadastrando grupos
        </div>
        <div className="whiteContainer">
          <FormGroup>
            <div className="fieldSpacing">
              <Label className="fieldLabel" for="exampleEmail">
                Nome do grupo
              </Label>
              <SuperInput
                id="exampleEmail"
                name="email"
                placeholder="Digite o nome do grupo. Ex: Bebidas"
                type="email"
              />
            </div>
            <div className="fieldSpacing">
              <Label className="fieldLabel" for="exampleFile">
                Imagem do grupo (opcional)
              </Label>
              <SuperInput
                id="exampleFile"
                placeholder="Nenhum arquivo selecionado"
                name="file"
                type="file"
              />
            </div>
            <div className="fieldSpacing">
              <Label className="fieldLabel" for="exampleEmail">
                Nome do Subgrupo (opcional)
              </Label>
              <div className="fieldSpacing">
                <SuperInput
                  id="exampleEmail"
                  name="email"
                  placeholder="Bebidas doces"
                  type="email"
                />
              </div>
              <div className="fieldSpacing">
                <SuperInput
                  id="exampleEmail"
                  name="email"
                  placeholder="Bebidas alcoolicas"
                  type="email"
                />
              </div>
              <div className="fieldSpacing">
                <SuperInput
                  id="exampleEmail"
                  name="email"
                  placeholder="Bebidas quentes"
                  type="email"
                />
              </div>
              <div className="fieldSpacing">
                <SuperInput
                  id="exampleEmail"
                  name="email"
                  placeholder="Bebidas energeticas"
                  type="email"
                />
              </div>
            </div>
          </FormGroup>
          <div className="nextPageButton">
            <div className="auxSucessText" style={{ paddingTop: "20px" }}>
              + cadastrar grupo
            </div>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default Sample;
