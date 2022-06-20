import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Card, Col, Container, FormGroup, Label, Row } from "reactstrap";
import SuperInput from "../sharedComponents/SuperInput";

const DiscountTicket = ({ show, setShow }) => {
  const handleClose = () => setShow(false);
  return (
    <>
      <Modal
        size={"xl"}
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-550px"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="example-custom-modal-styling-title"
            className="pageTitle"
          >
            Adicionar cupom de desconto
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Card
              className="mainContainer"
              style={{ backgroundColor: "#F1F1F1" }}
            >
              <div className="d-flex">
                <div className="fieldSpacing">
                  <Label className="fieldLabel" for="exampleEmail">
                    Descrição do voucher (opcional)
                  </Label>
                  <SuperInput
                    style={{ width: "418px" }}
                    id="exampleEmail"
                    placeholder="Digite a descrição do voucher de desconto"
                  />
                </div>
                <div className="fieldSpacing">
                  <Label className="fieldLabel" for="exampleEmail">
                    Código do cupom
                  </Label>
                  <SuperInput
                    style={{ width: "360px" }}
                    id="exampleEmail"
                    placeholder="Digite a descrição do voucher de desconto"
                  />
                </div>
              </div>
              <div className="d-flex">
                <div className="fieldSpacing">
                  <Label className="fieldLabel" for="exampleEmail">
                    Quantidade de cupons
                  </Label>
                  <SuperInput
                    style={{ width: "135px" }}
                    id="exampleEmail"
                    placeholder="0"
                  />
                </div>
                <div className="fieldSpacing">
                  <Label className="fieldLabel" for="exampleEmail">
                    Porcentagem de desconto (%)
                  </Label>
                  <SuperInput
                    style={{ width: "248px" }}
                    id="exampleEmail"
                    placeholder="0"
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
          <Button
            style={{ height: "56px" }}
            variant="dark"
            onClick={() => handleClose()}
          >
            Gerar voucher
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DiscountTicket;
