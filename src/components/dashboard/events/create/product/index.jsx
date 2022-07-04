import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Card, Label, FormGroup } from "reactstrap";
import { Button, ButtonGroup } from "react-bootstrap";

import GroupInformation from "./group/index";
import ProductInformation from "./product/index";
import ComboInformation from "./combo/index";
import SectorInformation from "./sector/index";
import PosInformation from "./pos/index";

import SuperButton from "../../../../sharedComponents/SuperButton";

const Sample = (props) => {
  const [step, setStep] = useState(0);
  const [show, setShow] = useState(false);
  const history = useHistory();

  const nextStep = () => {
    history.push("/event/pdv");
  };
  const goBack = () => {
    history.goBack();
  };

  const ShowInformation = () => {
    if (step === 0) {
      return <GroupInformation />;
    }
    if (step === 1) {
      return <ProductInformation />;
    }
    if (step === 2) {
      return <ComboInformation />;
    }
    if (step === 3) {
      return <SectorInformation />;
    }
    if (step === 4) {
      return <PosInformation />;
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
            src={require("../../../../../assets/images/svg/stepByStep/step3.svg")}
          />
        </div>
        <Col>
          <div style={{ display: "grid", paddingBottom: "50px" }}>
            <div className="pageTitle">Setor e produto</div>
            <img
              src={require("../../../../../assets/images/svg/titleLine.svg")}
              style={{ paddingTop: "-20px" }}
            />
          </div>
          <div className="groupButton">
            <Label className="fieldLabel">Este evento terá produtos?</Label>
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
              <div className="secondPageTitle">Adicionando setor e produto</div>
              <div className="infoSubTitle">
                Preencha as 5 (CINCO) etapas abaixo para adicionar um setor e
                produto
              </div>
              <div className="infoContainer">
                <div className="d-flex justify-content-around">
                  <button
                    className={
                      step === 0 ? "tabButtonActive" : "tabButtonDesactive"
                    }
                    onClick={() => setStep(0)}
                  >
                    <div className="textButtonsTab">Cadastro de grupos</div>
                  </button>
                  <button
                    className={
                      step === 1 ? "tabButtonActive" : "tabButtonDesactive"
                    }
                    onClick={() => setStep(1)}
                  >
                    <div className="textButtonsTab">Cadastro de produtos</div>
                  </button>
                  <button
                    className={
                      step === 2 ? "tabButtonActive" : "tabButtonDesactive"
                    }
                    onClick={() => setStep(2)}
                  >
                    <div className="textButtonsTab">Cadastro de combos</div>
                  </button>
                  <button
                    className={
                      step === 3 ? "tabButtonActive" : "tabButtonDesactive"
                    }
                    onClick={() => setStep(3)}
                  >
                    <div className="textButtonsTab">Cadastro de setores</div>
                  </button>
                  <button
                    className={
                      step === 4 ? "tabButtonActive" : "tabButtonDesactive"
                    }
                    onClick={() => setStep(4)}
                  >
                    <div className="textButtonsTab">Canfigurações de POS</div>
                  </button>
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
              Avançar para PDV
            </SuperButton>
          </div>
        </Col>
      </Container>
    </Fragment>
  );
};

export default Sample;
