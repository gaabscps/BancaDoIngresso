import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Label, Col } from "reactstrap";
import { Button, ButtonGroup } from "react-bootstrap";

import MainInformation from "./main/index";
import PaymentInformation from "./payment/index";
import GeneralInformation from "./general/index";
import SuperCollapse from "../../../../sharedComponents/SuperCollapse";
import TicketIcon from "../../../../../assets/images/svg/Ticket";
import BackOnTop from "../../../../sharedComponents/BackOnTop";
import SuperButton from "../../../../sharedComponents/SuperButton";

const Sample = (props) => {
  const [step, setStep] = useState(0);
  const [show, setShow] = useState(false);
  const history = useHistory();

  const nextStep = () => {
    history.push("/event/product");
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
          {show ? (
            <>
              <SuperCollapse
                title="Setores e ingressos adicionados"
                content="Nenhum setor e ingresso foi adicionado. Aqui será exibida uma lista dos seus setores e ingressos adicionados"
                leftIcon={TicketIcon}
              />
              <div className="secondPageTitle">
                Adicionando setor e ingresso
              </div>
              <div className="infoSubTitle">
                Preencha as 3 (TRÊS) etapas abaixo para adicionar um setor e
                ingresso
              </div>
              <div className="infoContainer">
                <div className="d-flex justify-content-center">
                  <div
                    style={{
                      marginRight: "50px",
                    }}
                  >
                    <button
                      className={step === 0 ? "tabButtonActive" : "tabButtonDesactive"}
                      onClick={() => setStep(0)}
                    >
                      <div className="textButtonsTab">
                        Configurações principais
                      </div>
                    </button>
                  </div>
                  <div
                    style={{
                      marginRight: "50px",
                    }}
                  >
                    <button
                      className={step === 1 ? "tabButtonActive" : "tabButtonDesactive"}
                      onClick={() => setStep(1)}
                    >
                      <div className="textButtonsTab">
                        Configurações de pagamento
                      </div>
                    </button>
                  </div>
                  <div>
                    <button
                      className={step === 2 ? "tabButtonActive" : "tabButtonDesactive"}
                      onClick={() => setStep(2)}
                    >
                      <div className="textButtonsTab">Configurações gerais</div>
                    </button>
                  </div>
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
            <SuperButton style={{width: "278px"}} onClick={nextStep}>
              Avançar para Setor e Produtos
            </SuperButton>
          </div>
        </Col>
      </Container>
    </Fragment>
  );
};

export default Sample;
