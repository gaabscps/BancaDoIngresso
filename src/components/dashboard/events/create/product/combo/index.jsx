import React, { Fragment, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Container, Col, FormGroup, Label } from "reactstrap";
import ComboIcon from "../../../../../../assets/images/svg/Combo";
import RemoveX from "../../../../../../assets/images/svg/RemoveX";
import SuperCollapse from "../../../../../sharedComponents/SuperCollapse";

import SuperInput from "../../../../../sharedComponents/SuperInput";

const Sample = (props) => {
  const [inputFields, setInputFields] = useState([
    {
      productName: "",
      amount: "",
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("input", inputFields);
  };

  const handleChangeInput = (index, event) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.values;
    setInputFields(values);
  };

  const handleAddFields = () => {
    setInputFields([...inputFields, { productName: "", amount: "" }]);
  };

  const handleDeleteFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

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
                p
              />
            </div>
            {inputFields.map((inputField, index) => (
              <div key={index} className="d-flex pt-2">
                <div className="fieldSpacing">
                  <Label className="fieldLabel" for="exampleNumber">
                    Produto
                  </Label>
                  <SuperInput
                    style={{ width: "440px" }}
                    id="exampleNumber"
                    placeholder="Digite ou selecione o produto"
                    value={inputFields.groupName}
                    onChange={(event) => handleChangeInput(index, event)}
                  />
                </div>
                <div className="fieldSpacing">
                  <Label className="fieldLabel" for="exampleNumber">
                    Quantidade
                  </Label>
                  <SuperInput
                    style={{ width: "134px" }}
                    id="exampleNumber"
                    placeholder="Ex: 100"
                    value={inputFields.groupName}
                    onChange={(event) => handleChangeInput(index, event)}
                  />
                </div>
                <div
                  style={{ color: "#fff", marginTop: "55px" }}
                  className="d-flex"
                >
                  <div
                    style={{
                      height: "50px",
                      cursor: "pointer",
                      paddingTop: "15px",
                      marginRight: "25px",
                    }}
                    onClick={() => handleDeleteFields(index)}
                  >
                    <RemoveX />
                  </div>
                  <Button
                    style={{ height: "50px" }}
                    variant="outline-light"
                    onClick={() => handleAddFields()}
                  >
                    adicionar novo produto no combo
                  </Button>
                </div>
              </div>
            ))}
            <div className="d-flex pt-2"></div>
          </FormGroup>
          <div className="nextPageButton">
            <div className="auxSucessText" style={{ paddingTop: "20px" }}>
              + cadastrar combo
            </div>
          </div>
        </div>
        <div style={{ marginTop: "50px" }}>
          <SuperCollapse
            title="Grupos cadastrados"
            content="Nenhum grupo foi cadastrado. Aqui será exibida uma lista dos seus grupos cadastrados"
            leftIcon={ComboIcon}
          />
        </div>
      </Container>
    </Fragment>
  );
};

export default Sample;
