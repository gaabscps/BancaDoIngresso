import React, { useState } from "react";
import { Modal, Button, Collapse } from "react-bootstrap";
import { Card, Col, Container, Label, Input } from "reactstrap";
import SuperInput from "../sharedComponents/SuperInput";

const RegisterGateway = ({ show, setShowGateway }) => {
  const handleClose = () => setShowGateway(false);
  return (
    <Modal
      size={"xl"}
      show={show}
      onHide={() => setShowGateway(false)}
      dialogClassName="modal-550px"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="example-custom-modal-styling-title"
          className="pageTitle"
        >
          Cadastrar novo gateway de pagamento
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
                  Nome do gateway de pagamento{" "}
                </Label>
                <SuperInput
                  id="exampleEmail"
                  name="email"
                  placeholder="Digite o nome do gateway de pagamento"
                />
              </div>
            </div>
            <div className="d-flex">
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleEmail">
                  Tipo do gateway de pagamento{" "}
                </Label>
                <SuperInput
                  id="exampleEmail"
                  name="email"
                  placeholder="Selecione ou digite o tipo do gateway de pagamento"
                />
              </div>
            </div>
            <div className="d-flex">
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleEmail">
                  Token do gateway de pagamento
                </Label>
                <SuperInput
                  style={{ width: "370px" }}
                  id="exampleEmail"
                  name="email"
                  placeholder="Ex: 123456"
                />
              </div>
            </div>
            <div className="d-flex">
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleEmail">
                  Secret{" "}
                </Label>
                <SuperInput
                  style={{ width: "370px" }}
                  id="exampleEmail"
                  name="email"
                  placeholder="Ex: 1234567"
                />
              </div>
            </div>
            <div className="d-flex">
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleEmail">
                  Porta{" "}
                </Label>
                <SuperInput
                  style={{ width: "370px" }}
                  id="exampleEmail"
                  name="email"
                  placeholder="Ex: 123"
                />
              </div>
            </div>
          </Card>
        </Container>
        <div className="nextPageButton">
          <div style={{ color: "#fff" }}>
            <Button
              style={{ height: "50px" }}
              variant="outline-light"
              onClick={() => handleClose()}
            >
              Cancelar
            </Button>
          </div>
          <Button variant="dark">Cadastrar novo gateway de pagamento</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterGateway;
