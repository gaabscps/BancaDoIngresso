import React, { Fragment, useState } from "react";
import { Button } from "react-bootstrap";
import { Container, FormGroup, Label } from "reactstrap";
import BottleIcon from "../../../../../../assets/images/svg/Bottle";
import RemoveX from "../../../../../../assets/images/svg/RemoveX";
import SuperCollapse from "../../../../../sharedComponents/SuperCollapse";

import SuperInput from "../../../../../sharedComponents/SuperInput";

const Sample = (props) => {
  const [inputFields, setInputFields] = useState([
    {
      groupName: "",
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
    setInputFields([...inputFields, { groupName: "" }]);
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
            {inputFields.map((inputField, index) => (
              <div key={index} className="d-flex">
                <div className="fieldSpacing">
                  <Label className="fieldLabel" for="exampleEmail">
                    Nome do Subgrupo (opcional)
                  </Label>
                  <div className="fieldSpacing">
                    <SuperInput
                      id="exampleEmail"
                      placeholder="Bebidas doces"
                      value={inputFields.groupName}
                      onChange={(event) => handleChangeInput(index, event)}
                    />
                  </div>
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
                    adicionar novo Subgrupo
                  </Button>
                </div>
              </div>
            ))}
          </FormGroup>
          <div className="nextPageButton">
            <div
              className="auxSucessText"
              style={{ paddingTop: "20px" }}
              onClick={handleSubmit}
            >
              + cadastrar grupo
            </div>
          </div>
        </div>
        <div style={{ marginTop: "50px" }}>
          <SuperCollapse
            title="Grupos cadastrados"
            content="Nenhum grupo foi cadastrado. Aqui será exibida uma lista dos seus grupos cadastrados"
            leftIcon={BottleIcon}
          />
        </div>
      </Container>
    </Fragment>
  );
};

export default Sample;
