import React, { Fragment, useState } from "react";
import { Container, Row, Col, Label, Input, FormGroup } from "reactstrap";
import SuperButton from "../../sharedComponents/SuperButton";
import { useHistory } from "react-router-dom";
import RegisterPdv from "../../modal/RegisterPdv";
const Sample = () => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [showPdv, setShowPdv] = useState(false);

  

  return (
    <Fragment>
      <RegisterPdv show={showPdv} setShowPdv={setShowPdv} />
      <Container className="mainContainer" fluid={true}>
        <div
          className="d-flex justify-content-between"
          style={{ paddingBottom: "30px" }}
        >
          <div style={{ display: "grid" }}>
            <Label className="pageTitle">PDV</Label>
          </div>
          <Row className="justify-content-between">
            <SuperButton color="primary" onClick={() => setShowPdv(true)}>
              + Cadastrar novo PDV
            </SuperButton>
          </Row>
        </div>
        <Row>
          <Col sm="12">
            <div className="cabeçalho">
              <div className="linhaDaTabela headerFoto normalText">Imagem</div>
              <div className="linhaDaTabela headerStatus"></div>
              <div className="linhaDaTabela headerNome normalText">
                Nome do PDV
              </div>
              <div className="linhaDaTabela headerCidade normalText">
                Endereço
              </div>
              <div className="linhaDaTabela headerCidade normalText">
                Cidade
              </div>
              <div className="linhaDaTabela headerCidade normalText">
                Estado
              </div>
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
                <div className="celulaCidade subText">
                  Rua dos Imigrantes Al...
                </div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">Campinas</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">SP</div>
              </div>
              <div className="linhaDaTabela campoAção">
                <div className="celulaAção">
                  <img
                    src={require("../../../assets/images/svg/pen.svg")}
                    style={{ paddingRight: "25px" }}
                  />
                  <img
                    src={require("../../../assets/images/svg/lixeira.svg")}
                    style={{ paddingRight: "25px" }}
                  />
                  <img
                    src={require("../../../assets/images/svg/subPDV.svg")}
                    onClick={() => setShow(true)}
                  />
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="linhaDaTabela campoFoto4"></div>
              <div className="linhaDaTabela campoNome">
                <div>
                  <div className="celulaNome subText">
                    Lojinha da Dona Maria
                  </div>
                </div>
              </div>
              <div className="linhaDaTabela campoCidade">
                <div className="celulaCidade subText">
                  Avenida Barão de Ja...
                </div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">Uberlândia</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">MG</div>
              </div>
              <div className="linhaDaTabela campoAção">
                <div className="celulaAção">
                  <img
                    src={require("../../../assets/images/svg/pen.svg")}
                    style={{ paddingRight: "25px" }}
                  />
                  <img
                    src={require("../../../assets/images/svg/lixeira.svg")}
                    style={{ paddingRight: "25px" }}
                  />
                  <img
                    src={require("../../../assets/images/svg/subPDV.svg")}
                    onClick={() => setShow(true)}
                  />
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="linhaDaTabela campoFoto2"></div>
              <div className="linhaDaTabela campoNome">
                <div>
                  <div className="celulaNome subText">
                    Escola Oficina do Estudante
                  </div>
                </div>
              </div>
              <div className="linhaDaTabela campoCidade">
                <div className="celulaCidade subText">
                  Avenida Barão de Ja...
                </div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">Cuiabá</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">MT</div>
              </div>
              <div className="linhaDaTabela campoAção">
                <div className="celulaAção">
                  <img
                    src={require("../../../assets/images/svg/pen.svg")}
                    style={{ paddingRight: "25px" }}
                  />
                  <img
                    src={require("../../../assets/images/svg/lixeira.svg")}
                    style={{ paddingRight: "25px" }}
                  />
                  <img
                    src={require("../../../assets/images/svg/subPDV.svg")}
                    onClick={() => setShow(true)}
                  />
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="linhaDaTabela campoFoto3"></div>
              <div className="linhaDaTabela campoNome">
                <div className="celulaNome subText">Empório Top</div>
              </div>
              <div className="linhaDaTabela campoCidade">
                <div className="celulaCidade subText">
                  Avenida Barão de Ja...
                </div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">Salvador</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">BA</div>
              </div>
              <div className="linhaDaTabela campoAção">
                <div className="celulaAção">
                  <img
                    src={require("../../../assets/images/svg/pen.svg")}
                    style={{ paddingRight: "25px" }}
                  />
                  <img
                    src={require("../../../assets/images/svg/lixeira.svg")}
                    style={{ paddingRight: "25px" }}
                  />
                  <img
                    src={require("../../../assets/images/svg/subPDV.svg")}
                    onClick={() => setShow(true)}
                  />
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="linhaDaTabela campoFoto3"></div>
              <div className="linhaDaTabela campoNome">
                <div className="celulaNome subText">Mercadinho da Esquina</div>
              </div>
              <div className="linhaDaTabela campoCidade">
                <div className="celulaCidade subText">
                  Avenida Barão de Ja...
                </div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">Rio de Janeiro</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">RJ</div>
              </div>
              <div className="linhaDaTabela campoAção">
                <div className="celulaAção">
                  <img
                    src={require("../../../assets/images/svg/pen.svg")}
                    style={{ paddingRight: "25px" }}
                  />
                  <img
                    src={require("../../../assets/images/svg/lixeira.svg")}
                    style={{ paddingRight: "25px" }}
                  />
                  <img
                    src={require("../../../assets/images/svg/subPDV.svg")}
                    onClick={() => setShow(true)}
                  />
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="linhaDaTabela campoFoto3"></div>
              <div className="linhaDaTabela campoNome">
                <div className="celulaNome subText">
                  Shopping Iguatemi de São Lou...
                </div>
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
                  <img
                    src={require("../../../assets/images/svg/pen.svg")}
                    style={{ paddingRight: "25px" }}
                  />
                  <img
                    src={require("../../../assets/images/svg/lixeira.svg")}
                    style={{ paddingRight: "25px" }}
                  />
                  <img
                    src={require("../../../assets/images/svg/subPDV.svg")}
                    onClick={() => setShow(true)}
                  />
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
