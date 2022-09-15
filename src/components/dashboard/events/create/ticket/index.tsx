import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Label, Button, ButtonGroup } from 'reactstrap';

import MainInformation from './main/index';
import PaymentInformation from './payment/index';
import GeneralInformation from './general/index';
import SuperCollapse from '../../../../sharedComponents/SuperCollapse';
import TicketIcon from '../../../../../assets/images/svg/Ticket';
import step2 from '../../../../../assets/images/svg/stepByStep/step2.svg';
// import titleLine from '../../../../../assets/images/svg/titleLine.svg';
import SuperButton from '../../../../sharedComponents/SuperButton';

const Sample = (): JSX.Element => {
  const [step, setStep] = useState(0);
  const [show, setShow] = useState(false);
  const history = useHistory();

  const nextStep = (): void => {
    history.push('/event/product');
  };
  const goBack = (): void => {
    history.goBack();
  };

  const ShowInformation = (): JSX.Element => {
    let response: JSX.Element;
    switch (step) {
      case 0:
        response = <MainInformation />;
        break;
      case 1:
        response = <PaymentInformation />;
        break;
      case 2:
        response = <GeneralInformation />;
        break;
      default:
        response = <MainInformation />;
        break;
    }
    return response;
  };

  return (
    <Fragment>
      <Container className="mainContainer" fluid={true}>
        <div className="d-flex justify-content-center stepContainer">
          <img src={step2} />
        </div>

        <div className="titleStep">
          <div className="pageTitle">Setor e ingresso</div>
          <hr className="lineText" />
          {/* <img src={titleLine} style={{ paddingTop: '-20px' }} /> */}
        </div>
        <div className="groupButton">
          <Label className="fieldLabel">Este evento terá ingressos?</Label>
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
        {show ? (
          <>
            <SuperCollapse
              title="Setores e ingressos adicionados"
              content="Nenhum setor e ingresso foi adicionado. Aqui será exibida uma lista dos seus setores e ingressos adicionados"
              leftIcon={TicketIcon}
            />
            <div className="secondPageTitle">Adicionando setor e ingresso</div>
            <div className="infoSubTitle">
              Preencha as 3 (TRÊS) etapas abaixo para adicionar um setor e ingresso
            </div>
            <div className="infoContainer">
              <div className="d-flex justify-content-center flex-wrap">
                <div
                  style={
                    {
                      // marginRight: '50px',
                    }
                  }
                >
                  <button
                    className={step === 0 ? 'tabButtonActive' : 'tabButtonDesactive'}
                    onClick={() => setStep(0)}
                  >
                    <div className="textButtonsTab">Configurações principais</div>
                  </button>
                </div>
                <div
                  style={
                    {
                      // marginRight: '50px',
                    }
                  }
                >
                  <button
                    className={step === 1 ? 'tabButtonActive' : 'tabButtonDesactive'}
                    onClick={() => setStep(1)}
                  >
                    <div className="textButtonsTab">Configurações de pagamento</div>
                  </button>
                </div>
                <div>
                  <button
                    className={step === 2 ? 'tabButtonActive' : 'tabButtonDesactive'}
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
          <div style={{ color: '#fff' }}>
            <Button style={{ height: '50px' }} variant="outline-light" onClick={goBack}>
              Voltar
            </Button>
          </div>
          <SuperButton style={{ width: '278px' }} onClick={nextStep}>
            Avançar para Setor e Produtos
          </SuperButton>
        </div>
      </Container>
    </Fragment>
  );
};

export default Sample;
