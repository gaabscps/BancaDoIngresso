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
          Cadastrando setores
        </div>
        <div className="whiteContainer">
          <FormGroup>
            <div className="fieldSpacing">
              <Label className="fieldLabel" for="exampleEmail">
              Nome do setor
              </Label>
              <SuperInput
                id="exampleEmail"
                name="email"
                placeholder="Digite ou selecione o nome do setor"
                type="email"
              />
            </div>
            <div className="fieldSpacing">
              <Label className="fieldLabel" for="exampleFile">
                Imagem do setor (opcional)
              </Label>
              <SuperInput
                id="exampleFile"
                placeholder="Nenhum arquivo selecionado"
                name="file"
                type="file"
              />
            </div>
          </FormGroup>
          <div className="nextPageButton">
            <div className="auxSucessText" style={{ paddingTop: "20px" }}>
               + cadastrar setor
            </div>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default Sample;