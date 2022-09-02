/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Label, Row, Col, Button, ButtonGroup } from 'reactstrap';
import SuperInput from '../../../../sharedComponents/SuperInput';

import PdvTicket from './tickets/index';
import PdvPos from './pos/index';
import PdvProduct from './products/index';
import PdvUser from './user/index';
import PdvSub from './sub/index';
import PDVIcon from '../../../../../assets/images/svg/Pdv';
import SuperCollapse from '../../../../sharedComponents/SuperCollapse';
import step4 from '../../../../../assets/images/svg/stepByStep/step4.svg';
// import titleLine from '../../../../../assets/images/svg/titleLine.svg';
import RegisterPdv from '../../../../modal/RegisterPdv';
import SuperButton from '../../../../sharedComponents/SuperButton';

const Sample = (): JSX.Element => {
  const [step, setStep] = useState(0);
  const [show, setShow] = useState(false);
  const [showPdv, setShowPdv] = useState(false);
  const [allowMoney, setAllowMoney] = useState(true);
  const [allowAdvanceFee, setAllowAdvanceFee] = useState(true);
  const [allowDebit, setAllowDebit] = useState(true);
  const [allowCreditCard, setAllowCreditCard] = useState(true);
  const [allowPix, setAllowPix] = useState(true);
  const [allowSellingWebsite, setAllowSellingWebsite] = useState(true);
  const [allowDiscount, setAllowDiscount] = useState(true);

  const history = useNavigate();

  const nextStep = (): void => {
    history('/event/confirmation');
  };
  const goBack = (): void => {
    history(-1);
  };

  const ShowInformation = (): JSX.Element => {
    let response: JSX.Element;
    switch (step) {
      case 0:
        response = <PdvTicket />;
        break;
      case 1:
        response = <PdvPos />;
        break;
      case 2:
        response = <PdvProduct />;
        break;
      case 3:
        response = <PdvUser />;
        break;
      case 4:
        response = <PdvSub />;
        break;
      default:
        response = <PdvTicket />;
        break;
    }
    return response;
  };

  return (
    <Fragment>
      <RegisterPdv show={showPdv} setShow={setShowPdv} />

      <Container className="mainContainer" fluid={true}>
        <div className="d-flex justify-content-center stepContainer">
          <img src={step4} />
        </div>
        <div className="titleStep">
          <div className="pageTitle">PDV</div>
          <hr className="lineText" />
          {/* <img src={titleLine} style={{ paddingTop: '-20px' }} /> */}
        </div>
        <div className="groupButton">
          <Label className="fieldLabel">Permitir PDV?</Label>
          <ButtonGroup style={{ width: '100px' }}>
            <Button
              variant="outline-dark"
              style={{ height: '62px', width: '100px' }}
              onClick={() => setShow(true)}
            >
              Sim
            </Button>
            <Button
              variant="outline-dark"
              style={{ height: '62px', width: '100px' }}
              onClick={nextStep}
            >
              Não
            </Button>
          </ButtonGroup>
        </div>

        <hr className="dividerUp" />
        <div style={{ marginTop: '50px' }}>
          <SuperCollapse
            title="PDV’s adicionados"
            content="Nenhum PDV foi adicionado. Aqui será exibida uma lista dos seus PDV’s adicionados"
            leftIcon={PDVIcon}
          />
        </div>
        {show ? (
          <>
            <Row lg="2" md="1">
              <Col>
                <div className="fieldSpacing">
                  <Label className="fieldLabel" for="pdvName">
                    PDV
                  </Label>
                  <SuperInput id="pdvName" name="pdvName" placeholder="Digite ou selecione o PDV" />
                  <div
                    className="auxSucessText"
                    style={{ paddingTop: '20px' }}
                    onClick={() => setShowPdv(true)}
                  >
                    + cadastrar novo PDV
                  </div>
                </div>
                <div className="groupButton">
                  <Label className="fieldLabel">Permitir dinheiro?</Label>
                  <ButtonGroup style={{ width: '100px' }}>
                    <Button
                      variant="outline-dark"
                      style={{ height: '62px', width: '100px' }}
                      onClick={() => setAllowMoney(true)}
                    >
                      Sim
                    </Button>
                    <Button
                      variant="outline-dark"
                      style={{ height: '62px', width: '100px' }}
                      onClick={() => setAllowMoney(false)}
                    >
                      Não
                    </Button>
                  </ButtonGroup>
                </div>
                <div className="groupButton">
                  <Label className="fieldLabel">Permitir taxa antecipada?</Label>
                  <ButtonGroup style={{ width: '100px' }}>
                    <Button
                      variant="outline-dark"
                      style={{ height: '62px', width: '100px' }}
                      onClick={() => setAllowAdvanceFee(true)}
                    >
                      Sim
                    </Button>
                    <Button
                      variant="outline-dark"
                      style={{ height: '62px', width: '100px' }}
                      onClick={() => setAllowAdvanceFee(false)}
                    >
                      Não
                    </Button>
                  </ButtonGroup>
                </div>
                <div className="groupButton">
                  <Label className="fieldLabel">Permitir débito?</Label>
                  <ButtonGroup style={{ width: '100px' }}>
                    <Button
                      variant="outline-dark"
                      style={{ height: '62px', width: '100px' }}
                      onClick={() => setAllowDebit(true)}
                    >
                      Sim
                    </Button>
                    <Button
                      variant="outline-dark"
                      style={{ height: '62px', width: '100px' }}
                      onClick={() => setAllowDebit(false)}
                    >
                      Não
                    </Button>
                  </ButtonGroup>
                </div>
                <div className="groupButton">
                  <Label className="fieldLabel">Permitir crédito?</Label>
                  <ButtonGroup style={{ width: '100px' }}>
                    <Button
                      variant="outline-dark"
                      style={{ height: '62px', width: '100px' }}
                      onClick={() => setAllowCreditCard(true)}
                    >
                      Sim
                    </Button>
                    <Button
                      variant="outline-dark"
                      style={{ height: '62px', width: '100px' }}
                      onClick={() => setAllowCreditCard(false)}
                    >
                      Não
                    </Button>
                  </ButtonGroup>
                </div>
                <div className="groupButton">
                  <Label className="fieldLabel">Permitir PIX?</Label>
                  <ButtonGroup style={{ width: '100px' }}>
                    <Button
                      variant="outline-dark"
                      style={{ height: '62px', width: '100px' }}
                      onClick={() => setAllowPix(true)}
                    >
                      Sim
                    </Button>
                    <Button
                      variant="outline-dark"
                      style={{ height: '62px', width: '100px' }}
                      onClick={() => setAllowPix(false)}
                    >
                      Não
                    </Button>
                  </ButtonGroup>
                </div>
                <div className="d-flex">
                  <div className="groupButton" style={{ marginRight: '100px' }}>
                    <Label className="fieldLabel">Permitir venda online?</Label>
                    <ButtonGroup style={{ width: '100px' }}>
                      <Button
                        variant="outline-dark"
                        style={{ height: '62px', width: '100px' }}
                        onClick={() => setAllowSellingWebsite(true)}
                      >
                        Sim
                      </Button>
                      <Button
                        variant="outline-dark"
                        style={{ height: '62px', width: '100px' }}
                        onClick={() => setAllowSellingWebsite(false)}
                      >
                        Não
                      </Button>
                    </ButtonGroup>
                  </div>
                  <div className="groupButton">
                    <Label className="fieldLabel">Permitir desconto?</Label>
                    <ButtonGroup style={{ width: '100px' }}>
                      <Button
                        variant="outline-dark"
                        style={{ height: '62px', width: '100px' }}
                        onClick={() => setAllowDiscount(true)}
                      >
                        Sim
                      </Button>
                      <Button
                        variant="outline-dark"
                        style={{ height: '62px', width: '100px' }}
                        onClick={() => setAllowDiscount(false)}
                      >
                        Não
                      </Button>
                    </ButtonGroup>
                  </div>
                </div>
              </Col>
            </Row>
            <hr className="dividerUp" />
            <div className="secondPageTitle">Adicionando PDV</div>
            <div className="infoSubTitle">
              Preencha as 5 (CINCO) etapas abaixo para adicionar um PDV
            </div>
            <div className="infoContainer">
              <div className="d-flex justify-content-center flex-wrap">
                <button
                  className={step === 0 ? 'tabButtonActive' : 'tabButtonDesactive'}
                  onClick={() => setStep(0)}
                >
                  <div className="buttonText">Ingressos por PDV</div>
                </button>
                <button
                  className={step === 1 ? 'tabButtonActive' : 'tabButtonDesactive'}
                  onClick={() => setStep(1)}
                >
                  <div className="buttonText">Inserir POS</div>
                </button>
                <button
                  className={step === 2 ? 'tabButtonActive' : 'tabButtonDesactive'}
                  onClick={() => setStep(2)}
                >
                  <div className="buttonText">Inserir produtos</div>
                </button>
                <button
                  className={step === 3 ? 'tabButtonActive' : 'tabButtonDesactive'}
                  onClick={() => setStep(3)}
                >
                  <div className="buttonText">Inserir usuários</div>
                </button>
                <button
                  className={step === 4 ? 'tabButtonActive' : 'tabButtonDesactive'}
                  onClick={() => setStep(4)}
                >
                  <div className="buttonText">Cadastrar Sub PDV’s</div>
                </button>
              </div>
              <ShowInformation />
            </div>
            <hr className="dividerDown" />
          </>
        ) : null}

        <div className="nextPageButton">
          <div style={{ color: '#fff' }}>
            <Button style={{ height: '50px' }} variant="outline-light" onClick={goBack}>
              Voltar
            </Button>
          </div>
          <SuperButton style={{ width: '278px' }} onClick={nextStep}>
            Avançar para confirmação
          </SuperButton>
        </div>
      </Container>
    </Fragment>
  );
};

export default Sample;
