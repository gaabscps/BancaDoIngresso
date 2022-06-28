import React, { Fragment, useState } from "react";
import { Container, Row, Col, Label, Input, FormGroup } from "reactstrap";
import SuperButton from "../../sharedComponents/SuperButton";
import { useHistory } from "react-router-dom";
import DiscountVoucher from "../../modal/DiscountVoucher";
import RegisterGateway from "../../modal/RegisterGateway";

const Sample = () => {
  const history = useHistory();
  const [showGateway, setShowGateway] = useState(false);

  return (
    <Fragment>
      <RegisterGateway show={showGateway} setShowGateway={setShowGateway} />
      <Container className="mainContainer" fluid={true}>
        <div
          className="d-flex justify-content-between"
          style={{ paddingBottom: "30px" }}
        >
          <div style={{ display: "grid" }}>
            <Label className="pageTitle">Gateway de pagamento</Label>
          </div>
          <Row className="justify-content-between">
            <SuperButton color="primary" onClick={() => setShowGateway(true)}>
              + Cadastrar novo gateway de pagamento
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
                Gateway de pagamento ativo
              </div>
              <div className="eventStatus subText">
                <img
                  src={require("../../../assets/images/svg/redStatus.svg")}
                  style={{ paddingRight: "10px" }}
                />
                Gateway de pagamento inativo
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <div className="cabeçalho">
              <div className="linhaDaTabela headerStatus"></div>
              <div className="linhaDaTabela headerNome normalText">
                Nome do gateway de pagamento
              </div>
              <div className="linhaDaTabela headerCidade normalText">Tipo</div>
              <div className="linhaDaTabela headerData normalText">Porta</div>
              <div className="linhaDaTabela headerData normalText">
                IP de Destino
              </div>
              <div className="linhaDaTabela headerAção normalText">Ações</div>
            </div>
            <div className="rows">
              <div className="linhaDaTabela campoStatus"></div>
              <div className="linhaDaTabela campoNome">
                <div>
                  <div className="celulaNome subText">Pagseguro</div>
                </div>
              </div>
              <div className="linhaDaTabela campoCidade">
                <div className="celulaCidade subText">POS</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">11</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">192.168.0.1</div>
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
                  <div className="celulaNome subText">Paypal</div>
                </div>
              </div>
              <div className="linhaDaTabela campoCidade">
                <div className="celulaCidade subText">Site</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">0</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">192.168.0.0</div>
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
                  <div className="celulaNome subText">Mercado Pago</div>
                </div>
              </div>
              <div className="linhaDaTabela campoCidade">
                <div className="celulaCidade subText">Site</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">443</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">192.168.0.12</div>
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
                  <div className="celulaNome subText">GetNet</div>
                </div>
              </div>
              <div className="linhaDaTabela campoCidade">
                <div className="celulaCidade subText">POS</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">587</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">192.168.0.2</div>
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
                  <div className="celulaNome subText">Safra Pay</div>
                </div>
              </div>
              <div className="linhaDaTabela campoCidade">
                <div className="celulaCidade subText">Site</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">465</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">192.168.0.3</div>
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
                  <div className="celulaNome subText">Banco Pay</div>
                </div>
              </div>
              <div className="linhaDaTabela campoCidade">
                <div className="celulaCidade subText">POS</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">997</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">192.168.0.4</div>
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
