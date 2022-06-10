import React, { Fragment, useState } from "react";
import Breadcrumb from "../../../../layout/breadcrumb";
import { Modal, Button } from "react-bootstrap";
import { Container, Row, Card, Col, Label, Input, FormGroup } from "reactstrap";
import SuperTable from "../../../sharedComponents/SuperTable";
import SuperButton from "../../../sharedComponents/SuperButton";
import { useHistory } from "react-router-dom";
import { Circle } from "react-feather";
import SuperInput from "../../../sharedComponents/SuperInput";

const Sample = () => {
  const history = useHistory();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const createEvent = () => {
    history.push("/general");
  };

  return (
    <Fragment>
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
                    onClick={handleShow}
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
                    onClick={handleShow}
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
                    onClick={handleShow}
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Modal
        size="lg"
        backdrop={{ width: "100%", height: "100%" }}
        show={show}
        onHide={handleClose}
      >
        <Modal.Header onHide={() => setShow(false)}>
          <Modal.Title className="pageTitle">
            Cadastrar voucher de desconto
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs={12}>
                <Card
                  className="mainContainer"
                  style={{ backgroundColor: "#F1F1F1" }}
                >
                  <FormGroup className="fieldSpacing">
                    <Label className="fieldLabel" for="exampleEmail">
                      Descrição do voucher (opcional)
                    </Label>
                    <SuperInput
                      id="exampleEmail"
                      name="email"
                      placeholder="Digite a descrição do voucher de desconto"
                      type="email"
                    />
                  </FormGroup>
                  <div>
                    <FormGroup className="fieldSpacing">
                      <Label className="fieldLabel" for="exampleDatetime">
                        Valor do voucher
                      </Label>
                      <SuperInput
                        style={{ width: "243px" }}
                        id="exampleTime"
                        name="time"
                        placeholder="Ex:R$ 200,00"
                        type="number"
                      />
                    </FormGroup>
                    <FormGroup className="fieldSpacing">
                      <Label className="fieldLabel" for="exampleDatetime">
                        Código do voucher (gerar automatico, só número e 6 dig)
                      </Label>
                      <SuperInput
                        style={{ width: "243px" }}
                        id="exampleTime"
                        name="time"
                        placeholder="EX: JOA200"
                        type="number"
                      />
                    </FormGroup>
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ height: "56px" }}
            variant="dark"
            onClick={handleClose}
          >
            Gerar voucher
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default Sample;
