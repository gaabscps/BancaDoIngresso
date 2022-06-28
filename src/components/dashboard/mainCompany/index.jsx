import React, { Fragment, useState } from "react";
import { Container, Row, Col, Label, Input, FormGroup } from "reactstrap";
import SuperButton from "../../sharedComponents/SuperButton";
import { useHistory } from "react-router-dom";
import DiscountVoucher from "../../modal/DiscountVoucher";
import RegisterCompany from "../../modal/RegisterCompany";

const Sample = () => {
  const history = useHistory();
  const [showCompany, setShowCompany] = useState(false);

  return (
    <Fragment>
      <RegisterCompany show={showCompany} setShowCompany={setShowCompany} />
      <Container className="mainContainer" fluid={true}>
        <div
          className="d-flex justify-content-between"
          style={{ paddingBottom: "30px" }}
        >
          <div style={{ display: "grid" }}>
            <Label className="pageTitle">Empresas</Label>
          </div>
          <Row className="justify-content-between">
            <SuperButton color="primary" onClick={() => setShowCompany(true)}>
              + Cadastrar nova empresa
            </SuperButton>
          </Row>
        </div>
        <Row>
          <Col>
            <div className="d-flex pb-2">
              <div className="eventStatus subText">
                <img
                  src={require("../../../assets/images/svg/greenStatus.svg")}
                  style={{ paddingRight: "10px" }}
                />
                Empresa ativa
              </div>
              <div className="eventStatus subText">
                <img
                  src={require("../../../assets/images/svg/redStatus.svg")}
                  style={{ paddingRight: "10px" }}
                />
                Empresa inativa
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <div className="cabeçalho">
              <div className="linhaDaTabela headerStatus"></div>
              <div className="linhaDaTabela headerNome normalText">
                Nome da Empresa{" "}
              </div>
              <div className="linhaDaTabela headerCidade normalText">
                CPF/CNPJ
              </div>
              <div className="linhaDaTabela headerData normalText">
                Telefone
              </div>
              <div className="linhaDaTabela headerData normalText">
                Tipo da empresa
              </div>
              <div className="linhaDaTabela headerAção normalText">Ações</div>
            </div>
            <div className="rows">
              <div className="linhaDaTabela campoStatus"></div>
              <div className="linhaDaTabela campoNome">
                <div>
                  <div className="celulaNome subText">
                    Arnold Schwarzenegger Produtor
                  </div>
                </div>
              </div>
              <div className="linhaDaTabela campoCidade">
                <div className="celulaCidade subText">961.958.430-91</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">(21) 9 9877-0001</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">Padrão</div>
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
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="linhaDaTabela campoStatus"></div>
              <div className="linhaDaTabela campoNome">
                <div>
                  <div className="celulaNome subText">
                    Arnold Schwarzenegger Produções
                  </div>
                </div>
              </div>
              <div className="linhaDaTabela campoCidade">
                <div className="celulaCidade subText">961.958.430-91</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">(21) 9 9877-0001</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">Padrão</div>
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
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="linhaDaTabela campoStatus"></div>
              <div className="linhaDaTabela campoNome">
                <div>
                  <div className="celulaNome subText">
                    Arnold Schwarzenegger Produtora
                  </div>
                </div>
              </div>
              <div className="linhaDaTabela campoCidade">
                <div className="celulaCidade subText">961.958.430-91</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">(21) 9 9877-0001</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">Padrão</div>
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
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="linhaDaTabela campoStatus"></div>
              <div className="linhaDaTabela campoNome">
                <div>
                  <div className="celulaNome subText">
                    Arnold Schwarzenegger Agência
                  </div>
                </div>
              </div>
              <div className="linhaDaTabela campoCidade">
                <div className="celulaCidade subText">961.958.430-91</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">(21) 9 9877-0001</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">Padrão</div>
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
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="linhaDaTabela campoStatus"></div>
              <div className="linhaDaTabela campoNome">
                <div>
                  <div className="celulaNome subText">
                    Arnold Schwarzenegger Espetaculos
                  </div>
                </div>
              </div>
              <div className="linhaDaTabela campoCidade">
                <div className="celulaCidade subText">961.958.430-91</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">(21) 9 9877-0001</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">Padrão</div>
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
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="linhaDaTabela campoStatus"></div>
              <div className="linhaDaTabela campoNome">
                <div>
                  <div className="celulaNome subText">
                    Arnold Schwarzenegger Shows&Eventos
                  </div>
                </div>
              </div>
              <div className="linhaDaTabela campoCidade">
                <div className="celulaCidade subText">961.958.430-91</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">(21) 9 9877-0001</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">Padrão</div>
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
