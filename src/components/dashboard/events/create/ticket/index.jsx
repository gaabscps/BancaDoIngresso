import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Label, Col } from "reactstrap";
import { Button, ButtonGroup } from "react-bootstrap";

import MainInformation from "./main/index";
import PaymentInformation from "./payment/index";
import GeneralInformation from "./general/index";

const Sample = (props) => {
  const [step, setStep] = useState(null);
  const history = useHistory();

  const nextStep = () => {
    history.push("/product");
  };
  const goBack = () => {
    history.goBack();
  };

  const ShowInformation = () => {
    if (step === 0) {
      return <MainInformation />;
    }
    if (step === 1) {
      return <PaymentInformation />;
    }
    if (step === 2) {
      return <GeneralInformation />;
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
            src={require("../../../../../assets/images/svg/stepByStep/step2.svg")}
          />
        </div>
        <Col>
          <div style={{ display: "grid", paddingBottom: "50px" }}>
            <div className="pageTitle">Setor e ingresso</div>
            <img
              src={require("../../../../../assets/images/svg/titleLine.svg")}
              style={{ paddingTop: "-20px" }}
            />
          </div>
          <div className="groupButton">
            <Label className="fieldLabel">Este evento terá ingressos?</Label>
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
          <div className="secondPageTitle">Adicionando setor e ingresso</div>
          <div className="infoSubTitle">
            Preencha as 3 (TRÊS) etapas abaixo para adicionar um setor e ingresso
          </div>
          <div className="infoContainer">
            <div className="d-flex justify-content-around">
              <Button variant="outline-light" onClick={() => setStep(0)}>
                <div className="buttonText">
                  Configurações principais
                </div>
              </Button>
              <Button variant="outline-light" onClick={() => setStep(1)}>
                <div className="buttonText">
                  Configurações de pagamento
                </div>
              </Button>
              <Button variant="outline-light" onClick={() => setStep(2)}>
                <div className="buttonText">
                  Configurações gerais
                </div>
              </Button>
            </div>
            <ShowInformation />
          </div>
          <hr className="dividerDown" />
          <div className="nextPageButton">
            <div style={{ color: "#fff" }}>
              <Button style={{ height: "50px" }} variant="outline-light" onClick={goBack}>
                Voltar
              </Button>
            </div>
            <Button variant="dark" onClick={nextStep}>
              Avançar para Produtos
            </Button>
          </div>
        </Col>
      </Container>
    </Fragment>
  );
};

export default Sample;
