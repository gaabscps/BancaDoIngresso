import React, { Fragment, useState } from 'react';
import { Container, Row, Col, Label } from 'reactstrap';
import RegisterPdv from '../../modal/RegisterPdv';
import pen from '../../../assets/images/svg/pen.svg';
import lixeira from '../../../assets/images/svg/lixeira.svg';
import subPDV from '../../../assets/images/svg/subPDV.svg';
import SubPdvList from '../../modal/SubPdvs';
import Button from '../../Utils/Button';
import FilterVector from '../../../assets/images/svg/FilterVector';

const Sample = (): JSX.Element => {
  const [showPdv, setShowPdv] = useState(false);
  const [showSubPdvList, setShowSubPdvList] = useState(false);

  const callShow = (b: boolean): void => {
    setShowPdv(b);
  };
  const callShowSub = (b: never): void => {
    setShowSubPdvList(b);
  };
  return (
    <Fragment>
      <SubPdvList show={showSubPdvList} setShowSubPdvList={callShowSub} />
      <RegisterPdv show={showPdv} setShowPdv={callShow} />
      <Container className="mainContainer" fluid={true}>
        <div className="d-flex justify-content-between" style={{ paddingBottom: '30px' }}>
          <div style={{ display: 'grid' }}>
            <Label className="pageTitle">PDV</Label>
          </div>
          <Row className="justify-content-between">
            <Button color="primary" onClick={() => setShowPdv(true)}>
              + Cadastrar novo PDV
            </Button>
            <div className="filter-container">
              <FilterVector />
            </div>
          </Row>
        </div>
        <Row>
          <Col sm="12">
            <div className="cabeçalho">
              <div className="linhaDaTabela headerFoto normalText">Imagem</div>
              <div className="linhaDaTabela headerStatus"></div>
              <div className="linhaDaTabela headerNome normalText">Nome do PDV</div>
              <div className="linhaDaTabela headerCidade normalText">Endereço</div>
              <div className="linhaDaTabela headerCidade normalText">Cidade</div>
              <div className="linhaDaTabela headerCidade normalText">Estado</div>
              <div className="linhaDaTabela headerAção normalText">Ação</div>
            </div>
            <div className="rows">
              <div className="linhaDaTabela campoFoto"></div>
              <div className="linhaDaTabela campoNome">
                <div>
                  <div className="celulaNome subText">Lojinha do Seu Zé</div>
                </div>
              </div>
              <div className="linhaDaTabela campoCidade">
                <div className="celulaCidade subText">Rua dos Imigrantes Al...</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">Campinas</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">SP</div>
              </div>
              <div className="linhaDaTabela campoAção">
                <div className="celulaAção">
                  <img src={pen} style={{ paddingRight: '25px' }} alt="" />
                  <img src={lixeira} style={{ paddingRight: '25px' }} alt="" />
                  <img src={subPDV} onClick={() => setShowSubPdvList(true)} alt="" />
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="linhaDaTabela campoFoto4"></div>
              <div className="linhaDaTabela campoNome">
                <div>
                  <div className="celulaNome subText">Lojinha da Dona Maria</div>
                </div>
              </div>
              <div className="linhaDaTabela campoCidade">
                <div className="celulaCidade subText">Avenida Barão de Ja...</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">Uberlândia</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">MG</div>
              </div>
              <div className="linhaDaTabela campoAção">
                <div className="celulaAção">
                  <img src={pen} style={{ paddingRight: '25px' }} alt="" />
                  <img src={lixeira} style={{ paddingRight: '25px' }} alt="" />
                  <img src={subPDV} onClick={() => setShowSubPdvList(true)} alt="" />
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="linhaDaTabela campoFoto2"></div>
              <div className="linhaDaTabela campoNome">
                <div>
                  <div className="celulaNome subText">Escola Oficina do Estudante</div>
                </div>
              </div>
              <div className="linhaDaTabela campoCidade">
                <div className="celulaCidade subText">Avenida Barão de Ja...</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">Cuiabá</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">MT</div>
              </div>
              <div className="linhaDaTabela campoAção">
                <div className="celulaAção">
                  <img src={pen} style={{ paddingRight: '25px' }} alt="" />
                  <img src={lixeira} style={{ paddingRight: '25px' }} alt="" />
                  <img src={subPDV} onClick={() => setShowSubPdvList(true)} alt="" />
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="linhaDaTabela campoFoto3"></div>
              <div className="linhaDaTabela campoNome">
                <div className="celulaNome subText">Empório Top</div>
              </div>
              <div className="linhaDaTabela campoCidade">
                <div className="celulaCidade subText">Avenida Barão de Ja...</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">Salvador</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">BA</div>
              </div>
              <div className="linhaDaTabela campoAção">
                <div className="celulaAção">
                  <img src={pen} style={{ paddingRight: '25px' }} alt="" />
                  <img src={lixeira} style={{ paddingRight: '25px' }} alt="" />
                  <img src={subPDV} onClick={() => setShowSubPdvList(true)} alt="" />
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="linhaDaTabela campoFoto3"></div>
              <div className="linhaDaTabela campoNome">
                <div className="celulaNome subText">Mercadinho da Esquina</div>
              </div>
              <div className="linhaDaTabela campoCidade">
                <div className="celulaCidade subText">Avenida Barão de Ja...</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">Rio de Janeiro</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">RJ</div>
              </div>
              <div className="linhaDaTabela campoAção">
                <div className="celulaAção">
                  <img src={pen} style={{ paddingRight: '25px' }} alt="" />
                  <img src={lixeira} style={{ paddingRight: '25px' }} alt="" />
                  <img src={subPDV} onClick={() => setShowSubPdvList(true)} alt="" />
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="linhaDaTabela campoFoto3"></div>
              <div className="linhaDaTabela campoNome">
                <div className="celulaNome subText">Shopping Iguatemi de São Lou...</div>
              </div>
              <div className="linhaDaTabela campoCidade">
                <div className="celulaCidade subText">Campinas/SP</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">Santa Fé do Sul</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">SP</div>
              </div>
              <div className="linhaDaTabela campoAção">
                <div className="celulaAção">
                  <img src={pen} style={{ paddingRight: '25px' }} alt="" />
                  <img src={lixeira} style={{ paddingRight: '25px' }} alt="" />
                  <img src={subPDV} onClick={() => setShowSubPdvList(true)} alt="" />
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
