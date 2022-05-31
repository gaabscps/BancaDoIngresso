import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Input,
  FormGroup,
  Label,
  ButtonGroup,
  Button,
} from "reactstrap";

import MainInformation from "./main/index";
import PaymentInformation from "./payment/index";
import GeneralInformation from "./general/index";
import SuperButton from "../../../../sharedComponents/SuperButton";

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
        <div className="pageTitle">Setor e ingresso</div>
        <div className="groupButton">
          <Label className="fieldLabel">Este evento terá ingressos?</Label>
          <ButtonGroup style={{width: "100px"}}>
            <SuperButton >Sim</SuperButton>
            <SuperButton >Não</SuperButton>
          </ButtonGroup>
        </div>
        <div className="pageSubTitle">Adicionando setor e ingresso</div>
        <div className="infoSubTitle">
          Preencha as três (3) etapas abaixo para adicionar um setor e ingresso
        </div>
        <div className="d-flex justify-content-around">
          <SuperButton color="primary" onClick={() => setStep(0)}>
            Configurações principais
          </SuperButton>
          <SuperButton color="primary" onClick={() => setStep(1)}>
            Configurações de pagamento
          </SuperButton>
          <SuperButton color="primary " onClick={() => setStep(2)}>
            Configurações gerais
          </SuperButton>
        </div>
        <ShowInformation />
        <div className="nextPageButton">
        <SuperButton
            onClick={goBack}
          >
            Voltar
          </SuperButton>
          <SuperButton onClick={nextStep}>Avançar para Produtos</SuperButton>
        </div>
      </Container>
    </Fragment>
  );
};

export default Sample;
