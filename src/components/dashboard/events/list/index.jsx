import React, { Fragment, useState } from "react";
import Breadcrumb from "../../../../layout/breadcrumb";
import { Modal, Button } from "react-bootstrap";
import { Container, Row, Card, Col, Label, Input, FormGroup } from "reactstrap";
import SuperButton from "../../../sharedComponents/SuperButton";
import { useHistory } from "react-router-dom";
import DiscountVoucher from "../../../modal/DiscountVoucher"


const Sample = () => {
  const history = useHistory();
  const [show, setShow] = useState(false);

  const createEvent = () => {
    history.push("/general");
  };

  return (
    <Fragment>
      <DiscountVoucher show={show} setShow={setShow} />
      <Container className="mainContainer" fluid={true}>
        <div
          className="d-flex justify-content-between"
          style={{ paddingBottom: "30px" }}
        >
          <div style={{ display: "grid" }}>
            <Label className="pageTitle">Todos os eventos cadastrados</Label>
            <Label className="fieldLabel">
              <img
                src={require("../../../../assets/images/svg/blackAlert.svg")}
                style={{ paddingRight: "10px" }}
              />
              Você tem <b>3 eventos</b> em rascunho
            </Label>
          </div>
          <Row className="justify-content-between">
            <SuperButton color="primary" onClick={createEvent}>
              + Cadastrar evento
            </SuperButton>
            <FormGroup>
              <Input
                id="exampleSelect"
                name="select"
                type="select"
                style={{
                  width: "182px",
                  height: "50px",
                  borderColor: "#222222",
                  marginLeft: "15px",
                }}
              >
                <option>20 por página</option>
                <option>40 por página</option>
                <option>60 por página</option>
              </Input>
            </FormGroup>
            {/* <img
              style={{ paddingLeft: "15px" }}
              src={require("../../../../assets/images/svg/filterVector.svg")}
            /> */}
          </Row>
        </div>
        <Row>
          <Col>
            <div className="d-flex pb-2">
              <div className="eventStatus subText">
                <img
                  src={require("../../../../assets/images/svg/yellowStatus.svg")}
                  style={{ paddingRight: "10px" }}
                />
                Evento com liberação pendente
              </div>
              <div className="eventStatus subText">
                <img
                  src={require("../../../../assets/images/svg/greenStatus.svg")}
                  style={{ paddingRight: "10px" }}
                />
                Evento liberado
              </div>
              <div className="eventStatus subText">
                <img
                  src={require("../../../../assets/images/svg/redStatus.svg")}
                  style={{ paddingRight: "10px" }}
                />
                Evento recusado
              </div>
              <div className="eventStatus subText">
                <img
                  src={require("../../../../assets/images/svg/blueStatus.svg")}
                  style={{ paddingRight: "10px" }}
                />
                Rascunho
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <div className="cabeçalho">
              <div className="linhaDaTabela headerFoto normalText">Imagem</div>
              <div className="linhaDaTabela headerStatus"></div>
              <div className="linhaDaTabela headerNome normalText">
                Nome do evento
              </div>
              <div className="linhaDaTabela headerCidade normalText">
                Cidade
              </div>
              <div className="linhaDaTabela headerData normalText">
                Inicio evento
              </div>
              <div className="linhaDaTabela headerData normalText">
                Fim evento
              </div>
              <div className="linhaDaTabela headerAção normalText">Ação</div>
            </div>
            <div className="rows">
              <div className="linhaDaTabela campoFoto"></div>
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
                    src={require("../../../../assets/images/svg/pen.svg")}
                    style={{ paddingRight: "25px" }}
                  />
                  <img
                    src={require("../../../../assets/images/svg/lixeira.svg")}
                    style={{ paddingRight: "25px" }}
                  />
                  <img
                    src={require("../../../../assets/images/svg/ticket.svg")}
                    onClick={() => setShow(true)}
                  />
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="linhaDaTabela campoFoto4"></div>
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
                    src={require("../../../../assets/images/svg/pen.svg")}
                    style={{ paddingRight: "25px" }}
                  />
                  <img
                    src={require("../../../../assets/images/svg/lixeira.svg")}
                    style={{ paddingRight: "25px" }}
                  />
                  <img
                    src={require("../../../../assets/images/svg/ticket.svg")}
                    onClick={() => setShow(true)}
                  />
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="linhaDaTabela campoFoto2"></div>
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
                    src={require("../../../../assets/images/svg/pen.svg")}
                    style={{ paddingRight: "25px" }}
                  />
                  <img
                    src={require("../../../../assets/images/svg/lixeira.svg")}
                    style={{ paddingRight: "25px" }}
                  />
                  <img
                    src={require("../../../../assets/images/svg/ticket.svg")}
                    onClick={() => setShow(true)}
                  />
                </div>
              </div>
            </div>
            <div className="rows">
              <div className="linhaDaTabela campoFoto3"></div>
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
                    src={require("../../../../assets/images/svg/pen.svg")}
                    style={{ paddingRight: "25px" }}
                  />
                  <img
                    src={require("../../../../assets/images/svg/lixeira.svg")}
                    style={{ paddingRight: "25px" }}
                  />
                  <img
                    src={require("../../../../assets/images/svg/ticket.svg")}
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
