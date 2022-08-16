import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Col, Label, Button, ButtonGroup } from 'reactstrap';
import GroupInformation from './group/index';
import ProductInformation from './product/index';
import ComboInformation from './combo/index';
import SectorInformation from './sector/index';
import PosInformation from './pos/index';
import step3 from '../../../../../assets/images/svg/stepByStep/step3.svg';
// import titleLine from '../../../../../assets/images/svg/titleLine.svg';
import SuperButton from '../../../../sharedComponents/SuperButton';

const Sample = (): JSX.Element => {
  const [step, setStep] = useState(0);
  const [show, setShow] = useState(false);
  const history = useNavigate();

  const nextStep = (): void => {
    history('/event/pdv');
  };
  const goBack = (): void => {
    history(-1);
  };

  const ShowInformation = (): JSX.Element => {
    let response: JSX.Element;
    switch (step) {
      case 0:
        response = <GroupInformation />;
        break;
      case 1:
        response = <ProductInformation />;
        break;
      case 2:
        response = <ComboInformation />;
        break;
      case 3:
        response = <SectorInformation />;
        break;
      case 4:
        response = <PosInformation />;
        break;
      default:
        response = <GroupInformation />;
        break;
    }
    return response;
  };

  return (
    <Fragment>
      <Container className="mainContainer" fluid={true}>
        <div className="d-flex justify-content-center stepContainer">
          <img src={step3} alt="" />
        </div>
        <Col>
          <div className="titleStep">
            <div className="pageTitle">Setor e produto</div>
            <hr className="lineText" />
            {/* <hr className="lineText" /> */}
          </div>
          <div className="groupButton">
            <Label className="fieldLabel">Este evento terá produtos?</Label>
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
              <div className="secondPageTitle">Adicionando setor e produto</div>
              <div className="infoSubTitle">
                Preencha as 5 (CINCO) etapas abaixo para adicionar um setor e produto
              </div>
              <div className="infoContainer">
                <div className="d-flex justify-content-center flex-wrap">
                  <button
                    className={step === 0 ? 'tabButtonActive' : 'tabButtonDesactive'}
                    onClick={() => setStep(0)}
                  >
                    <div className="textButtonsTab">Cadastro de grupos</div>
                  </button>
                  <button
                    className={step === 1 ? 'tabButtonActive' : 'tabButtonDesactive'}
                    onClick={() => setStep(1)}
                  >
                    <div className="textButtonsTab">Cadastro de produtos</div>
                  </button>
                  <button
                    className={step === 2 ? 'tabButtonActive' : 'tabButtonDesactive'}
                    onClick={() => setStep(2)}
                  >
                    <div className="textButtonsTab">Cadastro de combos</div>
                  </button>
                  <button
                    className={step === 3 ? 'tabButtonActive' : 'tabButtonDesactive'}
                    onClick={() => setStep(3)}
                  >
                    <div className="textButtonsTab">Cadastro de setores</div>
                  </button>
                  <button
                    className={step === 4 ? 'tabButtonActive' : 'tabButtonDesactive'}
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
            <div style={{ color: '#fff' }}>
              <Button style={{ height: '50px' }} variant="outline-light" onClick={goBack}>
                Voltar
              </Button>
            </div>
            <SuperButton style={{ width: '278px' }} onClick={nextStep}>
              Avançar para PDV
            </SuperButton>
          </div>
        </Col>
      </Container>
    </Fragment>
  );
};

export default Sample;
