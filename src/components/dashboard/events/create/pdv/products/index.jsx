import React, { Fragment, useEffect, useState } from "react";
import { Container, FormGroup, Label } from "reactstrap";
import { Button, ButtonGroup } from "react-bootstrap";
import SuperInput from "../../../../../sharedComponents/SuperInput";
import SuperCollapse from "../../../../../sharedComponents/SuperCollapse";
import ProductIcon from "../../../../../../assets/images/svg/Product";

const Sample = (props) => {
  const [show, setShow] = useState(false);

  return (
    <Fragment>
      <Container className="subContainer" fluid={true}>
        <hr className="dividerUp" />
        <div className="groupButton">
          <Label className="fieldLabel">Permitir produto?</Label>
          <ButtonGroup style={{ width: "100px" }}>
            <Button
              variant="outline-dark"
              style={{ height: "62px", width: "100px" }}
              onClick={() => setShow(true)}
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
        {show ? (
          <>
            <hr className="dividerUp" />
            <div className="whiteContainer">
              <div className="d-flex ">
                <FormGroup style={{ marginRight: "50px" }}>
                  <Label className="fieldLabel" for="exampleSelect">
                    Setor
                  </Label>
                  <SuperInput
                    style={{ width: "359px" }}
                    placeholder="Digite ou selecione o setor"
                    id="exampleSelect"
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="fieldLabel" for="exampleNumber">
                    Produtos
                  </Label>
                  <SuperInput
                    style={{ width: "359px" }}
                    id="exampleNumber"
                    placeholder="Digite ou selecione o produto"
                  />
                </FormGroup>
              </div>
              <div className="auxGrayText pb-2">
                Inserir TODOS produtos desse setor
              </div>
            </div>
          </>
        ) : null}

        <div style={{ marginTop: "50px" }}>
          <SuperCollapse
            title="Setores e produtos inseridos"
            content="Nenhum setor e produto inserido. Aqui será exibida uma lista dos seus setores e produtos inseridos"
            leftIcon={ProductIcon}
          />
        </div>

        <div className="nextPageButton" style={{ marginTop: "50px" }}>
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
