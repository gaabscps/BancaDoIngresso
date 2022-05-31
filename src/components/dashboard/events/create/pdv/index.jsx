import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  FormGroup,
  Label,
  ButtonGroup,
  Button,
} from "reactstrap";
import SuperButton from "../../../../sharedComponents/SuperButton";
import SuperInput from "../../../../sharedComponents/SuperInput";

import PdvTicket from "./tickets/index";
import PdvPos from "./pos/index";
import PdvProduct from "./products/index";
import PdvUser from "./user/index";
import PdvSub from "./sub/index";

const Sample = (props) => {
  const [step, setStep] = useState(null);
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
        <div className="pageTitle">PDV</div>
        <div className="groupButton">
          <Label className="fieldLabel">Permitir código de desconto?</Label>
          <ButtonGroup style={{ width: "100px" }}>
            <SuperButton>Sim</SuperButton>
            <SuperButton>Não</SuperButton>
          </ButtonGroup>
        </div>
        <Form>
          <FormGroup className="fieldSpacing">
            <Label className="fieldLabel" for="exampleEmail">PDV</Label>
            <SuperInput
              id="exampleEmail"
              name="email"
              placeholder="Digite ou selecione o PDV"
              type="email"
            />
          </FormGroup>
        </Form>
        <div className="pageSubTitle">Adicionando PDV</div>
        <div className="infoSubTitle">
        Preencha as cinco (5) etapas abaixo para adicionar um PDV
        </div>
        <div className="d-flex justify-content-around">
          <SuperButton color="primary" onClick={() => setStep(0)}>
            Ingressos por PDV
          </SuperButton>
          <SuperButton color="primary" onClick={() => setStep(1)}>
            Inserir POS
          </SuperButton>
          <SuperButton color="primary " onClick={() => setStep(2)}>
            Inserir produtos
          </SuperButton>

          <SuperButton color="primary " onClick={() => setStep(3)}>
            Inserir usuários
          </SuperButton>

          <SuperButton color="primary " onClick={() => setStep(4)}>
            Inserir Sub PDV’s
          </SuperButton>
        </div>
        <div>
          <ShowInformation />
        </div>
        <div className="nextPageButton">
        <SuperButton
            onClick={goBack}
          >
            Voltar
          </SuperButton>
          <SuperButton onClick={nextStep}>Avançar para confirmação</SuperButton>
        </div>
      </Container>
    </Fragment>
  );
};

export default Sample;
