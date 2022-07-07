import React, { Fragment, useState } from 'react';
import { Container, Row, Col, Label } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import SuperButton from '../../sharedComponents/SuperButton';
import DiscountVoucher from '../../modal/DiscountVoucher';
import detail from '../../../assets/images/svg/detail.svg';

const Sample = (): JSX.Element => {
  const history = useNavigate();
  const [show, setShow] = useState(false);

  const createEvent = (): void => {
    history('/general');
  };

  const callShow = (b: boolean): void => {
    setShow(b);
  };

  return (
    <Fragment>
      <DiscountVoucher show={show} setShow={callShow} />
      <Container className="mainContainer" fluid={true}>
        <div className="d-flex justify-content-between" style={{ paddingBottom: '30px' }}>
          <div style={{ display: 'grid' }}>
            <Label className="pageTitle">Logs</Label>
          </div>
          <Row className="justify-content-between">
            <SuperButton color="primary" onClick={createEvent}>
              Exportar logs
            </SuperButton>
          </Row>
        </div>
        <Row>
          <Col sm="12">
            <div className="cabeçalho">
              <div className="linhaDaTabela headerNome normalText">Atividade</div>
              <div className="linhaDaTabela headerCidade normalText">Responsável</div>
              <div className="linhaDaTabela headerData normalText">IP responsável</div>
              <div className="linhaDaTabela headerData normalText">Data da atividade</div>
              <div className="linhaDaTabela headerAção normalText">Ações</div>
            </div>
            <div className="rows">
              <div className="linhaDaTabela campoNome">
                <div>
                  <div className="celulaNome subText">Criação de evento</div>
                </div>
              </div>
              <div className="linhaDaTabela campoCidade">
                <div className="celulaCidade subText">jose.silva</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">192.168.0.1</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">02/02/2022 às 10:30</div>
              </div>
              <div className="linhaDaTabela campoAção">
                <div className="celulaAção">
                  <img src={detail} style={{ paddingRight: '25px' }} alt="" />
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="linhaDaTabela campoNome">
                <div>
                  <div className="celulaNome subText">Edição de evento</div>
                </div>
              </div>
              <div className="linhaDaTabela campoCidade">
                <div className="celulaCidade subText">maria.almeida</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">192.168.0.2</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">10/02/2022 às 11:30</div>
              </div>
              <div className="linhaDaTabela campoAção">
                <div className="celulaAção">
                  <img src={detail} style={{ paddingRight: '25px' }} alt="" />
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="linhaDaTabela campoNome">
                <div>
                  <div className="celulaNome subText">Exclusão de evento</div>
                </div>
              </div>
              <div className="linhaDaTabela campoCidade">
                <div className="celulaCidade subText">marco.souza</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">192.168.0.3</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">12/02/2022 às 13:30</div>
              </div>
              <div className="linhaDaTabela campoAção">
                <div className="celulaAção">
                  <img src={detail} style={{ paddingRight: '25px' }} alt="" />
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="linhaDaTabela campoNome">
                <div>
                  <div className="celulaNome subText">Criação de usuário</div>
                </div>
              </div>
              <div className="linhaDaTabela campoCidade">
                <div className="celulaCidade subText">roberta.feijo</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">192.168.0.4</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">12/02/2022 às 14:30</div>
              </div>
              <div className="linhaDaTabela campoAção">
                <div className="celulaAção">
                  <img src={detail} style={{ paddingRight: '25px' }} alt="" />
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="linhaDaTabela campoNome">
                <div>
                  <div className="celulaNome subText">Alteração de taxa</div>
                </div>
              </div>
              <div className="linhaDaTabela campoCidade">
                <div className="celulaCidade subText">pedro.oliveira</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">192.168.0.5</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">13/02/2022 às 10:30</div>
              </div>
              <div className="linhaDaTabela campoAção">
                <div className="celulaAção">
                  <img src={detail} style={{ paddingRight: '25px' }} alt="" />
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="linhaDaTabela campoNome">
                <div>
                  <div className="celulaNome subText">Cadastro de produto</div>
                </div>
              </div>
              <div className="linhaDaTabela campoCidade">
                <div className="celulaCidade subText">julia.cavalheiro</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">192.168.0.6</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">13/02/2022 às 08:20</div>
              </div>
              <div className="linhaDaTabela campoAção">
                <div className="celulaAção">
                  <img src={detail} style={{ paddingRight: '25px' }} alt="" />
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
