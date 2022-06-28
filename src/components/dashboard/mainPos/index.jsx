import React, { Fragment, useState } from "react";
import { Container, Row, Col, Label, Input, FormGroup } from "reactstrap";
import SuperButton from "../../sharedComponents/SuperButton";
import { useHistory } from "react-router-dom";
import DiscountVoucher from "../../modal/DiscountVoucher";
import RegisterPos from "../../modal/RegisterPos";

const Sample = () => {
  const history = useHistory();
  const [showPos, setShowPos] = useState(false);

 

  return (
    <Fragment>
       <RegisterPos show={showPos} setShowPdv={setShowPos} />
      <Container className="mainContainer" fluid={true}>
        <div
          className="d-flex justify-content-between"
          style={{ paddingBottom: "30px" }}
        >
          <div style={{ display: "grid" }}>
            <Label className="pageTitle">POS</Label>
          </div>
          <Row className="justify-content-between">
            <SuperButton color="primary" onClick={() => setShowPos(true)}>
              + Cadastrar nova POS
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
                POS em uso
              </div>
              <div className="eventStatus subText">
                <img
                  src={require("../../../assets/images/svg/yellowStatus.svg")}
                  style={{ paddingRight: "10px" }}
                />
                POS reservada
              </div>

              <div className="eventStatus subText">
                <img
                  src={require("../../../assets/images/svg/redStatus.svg")}
                  style={{ paddingRight: "10px" }}
                />
                POS inativa
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <div className="cabeçalho">
              <div className="linhaDaTabela headerStatus"></div>
              <div className="linhaDaTabela headerNome normalText">
                Nome da POS
              </div>
              <div className="linhaDaTabela headerCidade normalText">
                N° de serie
              </div>
              <div className="linhaDaTabela headerData normalText">
                Inicio evento
              </div>
              <div className="linhaDaTabela headerData normalText">
                Evento atual
              </div>
              <div className="linhaDaTabela headerAção normalText">Ações</div>
            </div>
            <div className="rows">
              <div className="linhaDaTabela campoStatus"></div>
              <div className="linhaDaTabela campoNome">
                <div>
                  <div className="celulaNome subText">Revoada do Tatu</div>
                </div>
              </div>
              <div className="linhaDaTabela campoCidade">
                <div className="celulaCidade subText">São Paulo/SP</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">01/04/2022 às 15:30</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">01/04/2022 às 15:30</div>
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
                    Camarote Bacana - Fabiano Henrique e Thiago
                  </div>
                </div>
              </div>
              <div className="linhaDaTabela campoCidade">
                <div className="celulaCidade subText">Campinas/SP</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">01/04/2022 às 15:30</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">01/04/2022 às 15:30</div>
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
                    Vans Warped Tour - Slow Bleeding
                  </div>
                </div>
              </div>
              <div className="linhaDaTabela campoCidade">
                <div className="celulaCidade subText">
                  São José do Rio Preto/SP
                </div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">01/04/2022 às 15:30</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">01/04/2022 às 15:30</div>
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
                <div className="celulaNome subText">João Rock 2022</div>
              </div>
              <div className="linhaDaTabela campoCidade">
                <div className="celulaCidade subText">Araraquara/SP</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">01/04/2022 às 15:30</div>
              </div>
              <div className="linhaDaTabela campoData">
                <div className="celulaData subText">01/04/2022 às 15:30</div>
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
