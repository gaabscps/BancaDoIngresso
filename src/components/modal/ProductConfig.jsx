import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Card, Col, Container, FormGroup, Label, Row } from "reactstrap";
import CloseModal from "../../assets/images/svg/CloseModal";
import SuperInput from "../sharedComponents/SuperInput";

const DiscountTicket = ({ show, setShow }) => {
  const handleClose = () => setShow(false);
  return (
    <>
      <Modal
        size={"xl"}
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header>
          <Modal.Title
            id="example-custom-modal-styling-title"
            className="pageTitle"
          >
            Configurações do produto
          </Modal.Title>
          <div onClick={() => {handleClose()}} style={{cursor: "pointer"}}>
          <CloseModal />
        </div>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Card
              className="mainContainer"
              style={{ backgroundColor: "#F1F1F1" }}
            >
              <div className="secondPageTitle">Taxas de cartão</div>
              <img
                src={require("../../../../../../assets/images/svg/titleLine.svg")}
                style={{ paddingTop: "-40px", marginBottom: "25px" }}
              />
              <div className="pageSubTitle">Venda física</div>
              <div className="groupButton">
                <Label className="fieldLabel">Permitir venda com cartão?</Label>
                <ButtonGroup style={{ width: "100px" }}>
                  <Button
                    variant="outline-dark"
                    style={{ height: "62px", width: "100px" }}
                  >
                    Sim
                  </Button>
                  <Button
                    variant="outline-dark"
                    style={{ height: "62px", width: "100px" }}
                  >
                    Não
                  </Button>
                </ButtonGroup>
              </div>
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleNumber">
                  Débito
                </Label>
                <SuperInput
                  style={{ width: "135px" }}
                  id="exampleNumber"
                  name="number"
                  placeholder="0%"
                  type="number"
                />
              </div>
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleNumber">
                  Crédito
                </Label>
                <SuperInput
                  style={{ width: "135px" }}
                  id="exampleNumber"
                  name="number"
                  placeholder="0%"
                  type="number"
                />
              </div>
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleNumber">
                  PIX
                </Label>
                <SuperInput
                  style={{ width: "135px" }}
                  id="exampleNumber"
                  name="number"
                  placeholder="0%"
                  type="number"
                />
              </div>
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleNumber">
                  Taxa administrativa
                </Label>
                <SuperInput
                  style={{ width: "135px" }}
                  id="exampleNumber"
                  name="number"
                  placeholder="0%"
                  type="number"
                />
              </div>
              <div className="d-flex">
                <div className="fieldSpacing">
                  <Label className="fieldLabel" for="exampleNumber">
                    Qtd parcelas
                  </Label>
                  <SuperInput
                    style={{ width: "135px" }}
                    id="exampleNumber"
                    name="number"
                    placeholder="Ex: 2"
                    type="number"
                  />
                </div>
                <div className="fieldSpacing">+</div>
                <div className="fieldSpacing">
                  <Label className="fieldLabel" for="exampleNumber">
                    Juros ao mês
                  </Label>
                  <SuperInput
                    style={{ width: "135px" }}
                    id="exampleNumber"
                    name="number"
                    placeholder="Ex: 2%"
                    type="number"
                  />
                </div>
              </div>
              <div className="pageSubTitle">Venda e-commerce</div>
              <div className="groupButton">
                <Label className="fieldLabel">Permitir venda com cartão?</Label>
                <ButtonGroup style={{ width: "100px" }}>
                  <Button
                    variant="outline-dark"
                    style={{ height: "62px", width: "100px" }}
                  >
                    Sim
                  </Button>
                  <Button
                    variant="outline-dark"
                    style={{ height: "62px", width: "100px" }}
                  >
                    Não
                  </Button>
                </ButtonGroup>
              </div>
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleNumber">
                  Boleto
                </Label>
                <SuperInput
                  style={{ width: "135px" }}
                  id="exampleNumber"
                  name="number"
                  placeholder="0%"
                  type="number"
                />
              </div>
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleNumber">
                  Crédito
                </Label>
                <SuperInput
                  style={{ width: "135px" }}
                  id="exampleNumber"
                  name="number"
                  placeholder="0%"
                  type="number"
                />
              </div>
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleNumber">
                  PIX
                </Label>
                <SuperInput
                  style={{ width: "135px" }}
                  id="exampleNumber"
                  name="number"
                  placeholder="0%"
                  type="number"
                />
              </div>
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleNumber">
                  Taxa administrativa
                </Label>
                <SuperInput
                  style={{ width: "135px" }}
                  id="exampleNumber"
                  name="number"
                  placeholder="0%"
                  type="number"
                />
              </div>
              <div className="d-flex">
                <div className="fieldSpacing">
                  <Label className="fieldLabel" for="exampleNumber">
                    Qtd parcelas
                  </Label>
                  <SuperInput
                    style={{ width: "135px" }}
                    id="exampleNumber"
                    name="number"
                    placeholder="Ex: 2"
                    type="number"
                  />
                </div>
                <div className="fieldSpacing">
                  <Label className="fieldLabel" for="exampleNumber">
                    Juros ao mês
                  </Label>
                  <SuperInput
                    style={{ width: "135px" }}
                    id="exampleNumber"
                    name="number"
                    placeholder="Ex: 2%"
                    type="number"
                  />
                </div>
              </div>
            </Card>
            <div className="nextPageButton" style={{ marginTop: "5px" }}>
              <div className="auxSucessText">
                + inserir novo cupom de desconto
              </div>
            </div>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <div className="nextPageButton">
            <div style={{ color: "#fff" }}>
              <Button
                style={{ height: "50px" }}
                variant="outline-light"
                onClick={() => handleClose()}
              >
                Voltar
              </Button>
            </div>
            <Button variant="dark">Salvar</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DiscountTicket;
