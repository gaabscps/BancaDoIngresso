import React, { Fragment, useState } from 'react';
import { Container, Row, Col, Label } from 'reactstrap';
import SuperButton from '../../sharedComponents/SuperButton';
import RegisterPayment from '../../modal/RegisterPayment';
import greenStatus from '../../../assets/images/svg/greenStatus.svg';
import redStatus from '../../../assets/images/svg/redStatus.svg';
import pen from '../../../assets/images/svg/pen.svg';
import lixeira from '../../../assets/images/svg/lixeira.svg';

const Sample = (): JSX.Element => {
  const [showPayment, setShowPayment] = useState(false);

  const callShow = (b: boolean): void => {
    setShowPayment(b);
  };

  return (
    <Fragment>
      <RegisterPayment show={showPayment} setShowPayment={callShow} />

      <Container className="mainContainer" fluid={true}>
        <div className="d-flex justify-content-between" style={{ paddingBottom: '30px' }}>
          <div style={{ display: 'grid' }}>
            <Label className="pageTitle">Formas de pagamento</Label>
          </div>
          <Row className="justify-content-between">
            <SuperButton color="primary" onClick={() => setShowPayment(true)}>
              + Cadastrar nova forma de pagamento
            </SuperButton>
          </Row>
        </div>
        <Row>
          <Col>
            <div className="d-flex pb-2">
              <div className="eventStatus subText">
                <img src={greenStatus} style={{ paddingRight: '10px' }} alt="" />
                Forma de pagamento ativo
              </div>
              <div className="eventStatus subText">
                <img src={redStatus} style={{ paddingRight: '10px' }} alt="" />
                Forma de pagamento inativo
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <div className="cabeçalho">
              <div className="linhaDaTabela headerStatus"></div>
              <div className="linhaDaTabela headerNome normalText">Nome da forma de pagamento</div>
              <div className="linhaDaTabela headerData normalText">Gateway de pagamento</div>
              <div className="linhaDaTabela headerAção normalText">Ações</div>
            </div>
            <div className="rows">
              <div className="linhaDaTabela campoStatus"></div>
              <div className="linhaDaTabela campoNome">
                <div>
                  <div className="celulaNome subText">PIX</div>
                </div>
              </div>

              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">-----</div>
              </div>
              <div className="linhaDaTabela campoAção">
                <div className="celulaAção">
                  <img src={pen} style={{ paddingRight: '25px' }} alt="" />
                  <img src={lixeira} style={{ paddingRight: '25px' }} alt="" />
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="linhaDaTabela campoStatus"></div>
              <div className="linhaDaTabela campoNome">
                <div>
                  <div className="celulaNome subText">Dinheiro</div>
                </div>
              </div>

              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">-----</div>
              </div>
              <div className="linhaDaTabela campoAção">
                <div className="celulaAção">
                  <img src={pen} style={{ paddingRight: '25px' }} alt="" />
                  <img src={lixeira} style={{ paddingRight: '25px' }} alt="" />
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="linhaDaTabela campoStatus"></div>
              <div className="linhaDaTabela campoNome">
                <div>
                  <div className="celulaNome subText">Cartão de crédito PagSeguro</div>
                </div>
              </div>

              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">Pagseguro</div>
              </div>
              <div className="linhaDaTabela campoAção">
                <div className="celulaAção">
                  <img src={pen} style={{ paddingRight: '25px' }} alt="" />
                  <img src={lixeira} style={{ paddingRight: '25px' }} alt="" />
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="linhaDaTabela campoStatus"></div>
              <div className="linhaDaTabela campoNome">
                <div>
                  <div className="celulaNome subText">Cartão de débito PagSeguro</div>
                </div>
              </div>

              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">Pagseguro</div>
              </div>
              <div className="linhaDaTabela campoAção">
                <div className="celulaAção">
                  <img src={pen} style={{ paddingRight: '25px' }} alt="" />
                  <img src={lixeira} style={{ paddingRight: '25px' }} alt="" />
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="linhaDaTabela campoStatus"></div>
              <div className="linhaDaTabela campoNome">
                <div>
                  <div className="celulaNome subText">Cartão de débito Safra Pay</div>
                </div>
              </div>

              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">Safra Pay</div>
              </div>
              <div className="linhaDaTabela campoAção">
                <div className="celulaAção">
                  <img src={pen} style={{ paddingRight: '25px' }} alt="" />
                  <img src={lixeira} style={{ paddingRight: '25px' }} alt="" />
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="linhaDaTabela campoStatus"></div>
              <div className="linhaDaTabela campoNome">
                <div>
                  <div className="celulaNome subText">Cartão de crédito Safra Pay</div>
                </div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">Safra Pay</div>
              </div>
              <div className="linhaDaTabela campoAção">
                <div className="celulaAção">
                  <img src={pen} style={{ paddingRight: '25px' }} alt="" />
                  <img src={lixeira} style={{ paddingRight: '25px' }} alt="" />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Sample;
