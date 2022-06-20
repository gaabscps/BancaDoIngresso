import React, { Fragment, useEffect, useState } from "react";
import { Container, Col, FormGroup, Label } from "reactstrap";
import ProductIcon from "../../../../../../assets/images/svg/Product";
import SuperCollapse from "../../../../../sharedComponents/SuperCollapse";

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
          Cadastrando produtos
        </div>
        <div className="whiteContainer">
          <FormGroup>
            <div className="fieldSpacing">
              <Label className="fieldLabel" for="exampleEmail">
                Grupo do produto
              </Label>
              <SuperInput
                id="exampleEmail"
                name="email"
                placeholder="Digite ou selecione o grupo do produto"
                type="email"
              />
            </div>
            <div className="fieldSpacing">
              <Label className="fieldLabel" for="exampleEmail">
                Subgrupo do produto
              </Label>
              <SuperInput
                id="exampleEmail"
                name="email"
                placeholder="Digite ou selecione o subgrupo do produto"
                type="email"
              />
            </div>
            <div className="fieldSpacing">
              <Label className="fieldLabel" for="exampleEmail">
                Nome do produto
              </Label>
              <SuperInput
                id="exampleEmail"
                name="email"
                placeholder="Digite  o nome do grupo"
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
                  Valor unitário
                </Label>
                <SuperInput
                  style={{ width: "232px" }}
                  id="exampleNumber"
                  name="number"
                  placeholder="Ex: 20,00"
                  type="number"
                />
              </div>
            </div>
            <div className="fieldSpacing">
              <Label className="fieldLabel" for="exampleNumber">
                Valor total
              </Label>
              <SuperInput
                style={{ width: "232px" }}
                id="exampleNumber"
                name="number"
                placeholder="R$ 200,00"
                type="number"
              />
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
          </FormGroup>
          <div className="nextPageButton">
            <div className="auxSucessText" style={{ paddingTop: "20px" }}>
              + cadastrar produto
            </div>
          </div>
        </div>
        <div style={{ marginTop: "50px" }}>
          <SuperCollapse
            title="Produtos cadastrados"
            content="Nenhum produto foi cadastrado. Aqui será exibida uma lista dos seus produtos cadastrados"
            leftIcon={ProductIcon}
          />
        </div>
      </Container>
    </Fragment>
  );
};

export default Sample;
