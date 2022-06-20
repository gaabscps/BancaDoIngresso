import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Col, Form, FormGroup, Label } from "reactstrap";
import { Button, ButtonGroup } from "react-bootstrap";
import SuperButton from "../../../../sharedComponents/SuperButton";
import SuperInput from "../../../../sharedComponents/SuperInput";

import PdvTicket from "./tickets/index";
import PdvPos from "./pos/index";
import PdvProduct from "./products/index";
import PdvUser from "./user/index";
import PdvSub from "./sub/index";
import PDVIcon from "../../../../../assets/images/svg/Pdv";
import SuperCollapse from "../../../../sharedComponents/SuperCollapse";

const Sample = (props) => {
  const [step, setStep] = useState(0);
  const [show, setShow] = useState(false);
  const history = useHistory();

  const nextStep = () => {
    history.push("/confirmation");
  };
  const goBack = () => {
    history.goBack();
  };

  const ShowInformation = () => {
    if (step === 0) {
      return <PdvTicket />;
    }
    if (step === 1) {
      return <PdvPos />;
    }
    if (step === 2) {
      return <PdvProduct />;
    }
    if (step === 3) {
      return <PdvUser />;
    }
    if (step === 4) {
      return <PdvSub />;
    }
    if (step === null) {
      return null;
    }
  };

  return (
    <Fragment>
      <Container className="mainContainer" fluid={true}>
        <div className="d-flex justify-content-center stepContainer">
          <img
            src={require("../../../../../assets/images/svg/stepByStep/step4.svg")}
          />
        </div>
        <Col>
          <div style={{ display: "grid", paddingBottom: "50px" }}>
            <div className="pageTitle">PDV</div>
            <img
              src={require("../../../../../assets/images/svg/titleLine.svg")}
              style={{ paddingTop: "-20px" }}
            />
          </div>
          <div className="groupButton">
            <Label className="fieldLabel">Permitir PDV?</Label>
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
                onClick={nextStep}
              >
                Não
              </Button>
            </ButtonGroup>
          </div>
          <hr className="dividerUp" />
          <div style={{ marginTop: "50px" }}>
            <SuperCollapse
              title="PDV’s adicionados"
              content="Nenhum PDV foi adicionado. Aqui será exibida uma lista dos seus PDV’s adicionados"
              leftIcon={PDVIcon}
            />
          </div>
          {show ? (
            <>
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleNumber">
                  PDV
                </Label>
                <SuperInput
                  id="exampleNumber"
                  placeholder="Digite ou selecione o PDV"
                />
                <div className="auxSucessText" style={{ paddingTop: "20px" }}>
                  + cadastrar novo PDV
                </div>
              </div>
              <div className="groupButton">
                <Label className="fieldLabel">Permitir dinheiro?</Label>
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
              <div className="groupButton">
                <Label className="fieldLabel">Permitir taxa antecipada?</Label>
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
              <div className="groupButton">
                <Label className="fieldLabel">Permitir débito?</Label>
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
              <div className="groupButton">
                <Label className="fieldLabel">Permitir crédito?</Label>
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
              <div className="groupButton">
                <Label className="fieldLabel">Permitir PIX?</Label>
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
              <div className="d-flex">
                <div className="groupButton" style={{ marginRight: "100px" }}>
                  <Label className="fieldLabel">Permitir venda online?</Label>
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
                <div className="groupButton">
                  <Label className="fieldLabel">Permitir desconto?</Label>
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
              <hr className="dividerUp" />
              <div className="secondPageTitle">Adicionando PDV</div>
              <div className="infoSubTitle">
                Preencha as 5 (CINCO) etapas abaixo para adicionar um PDV
              </div>
              <div className="infoContainer">
                <div className="d-flex justify-content-around">
                  <Button variant="outline-light" onClick={() => setStep(0)}>
                    <div className="buttonText">Ingressos por PDV</div>
                  </Button>
                  <Button variant="outline-light" onClick={() => setStep(1)}>
                    <div className="buttonText">Inserir POS</div>
                  </Button>
                  <Button variant="outline-light" onClick={() => setStep(2)}>
                    <div className="buttonText">Inserir produtos</div>
                  </Button>
                  <Button variant="outline-light" onClick={() => setStep(3)}>
                    <div className="buttonText">Inserir usuários</div>
                  </Button>
                  <Button variant="outline-light" onClick={() => setStep(4)}>
                    <div className="buttonText">Cadastrar Sub PDV’s</div>
                  </Button>
                </div>
                <ShowInformation />
              </div>
              <hr className="dividerDown" />
            </>
          ) : null}

          <div className="nextPageButton">
            <div style={{ color: "#fff" }}>
              <Button
                style={{ height: "50px" }}
                variant="outline-light"
                onClick={goBack}
              >
                Voltar
              </Button>
            </div>
            <Button variant="dark" onClick={nextStep}>
              Avançar para confirmação
            </Button>
          </div>
        </Col>
      </Container>
    </Fragment>
  );
};

export default Sample;
