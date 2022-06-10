import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Label,
  FormGroup,
} from "reactstrap";
import { Button, ButtonGroup } from "react-bootstrap";

import GroupInformation from "./group/index";
import ProductInformation from "./product/index";
import ComboInformation from "./combo/index";
import SectorInformation from "./sector/index";
import PosInformation from "./pos/index";

import SuperButton from "../../../../sharedComponents/SuperButton";

const Sample = (props) => {
  const [step, setStep] = useState(null);
  const history = useHistory();

  const nextStep = () => {
    history.push("/pdv");
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
          <div className="secondPageTitle">Adicionando setor e produto</div>
          <div className="infoSubTitle">
             Preencha as 5 (CINCO) etapas abaixo para adicionar um setor e produto
          </div>
          <div className="infoContainer">
            <div className="d-flex justify-content-around">
              <Button variant="outline-light" onClick={() => setStep(0)}>
                <div className="buttonText">
                  Cadastro de grupos
                </div>
              </Button>
              <Button variant="outline-light" onClick={() => setStep(1)}>
                <div className="buttonText">
                  Cadastro de produtos
                </div>
              </Button>
              <Button variant="outline-light" onClick={() => setStep(2)}>
                <div className="buttonText">
                 Cadastro de combos
                </div>
              </Button>
              <Button variant="outline-light" onClick={() => setStep(3)}>
                <div className="buttonText">
                 Cadastro de setores
                </div>
              </Button>
              <Button variant="outline-light" onClick={() => setStep(4)}>
                <div className="buttonText">
                 Canfigurações de POS
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
              Avançar para PDV
            </Button>
          </div>
        </Col>
      </Container>
    </Fragment>
  );
};

export default Sample;
