import React, { useState } from "react";
import { Modal, Button, Collapse } from "react-bootstrap";
import { Card, Col, Container, Label, Input } from "reactstrap";
import SuperInput from "../sharedComponents/SuperInput";

const RegisterPos = ({ show, setShowPos }) => {
  const handleClose = () => setShowPos(false);
  return (
    <Modal
      size={"xl"}
      show={show}
      onHide={() => setShowPos(false)}
      dialogClassName="modal-550px"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="example-custom-modal-styling-title"
          className="pageTitle"
        >
          Cadastrar nova POS
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
                  Nome da POS
                </Label>
                <SuperInput
                  id="exampleEmail"
                  name="email"
                  placeholder="Digite o nome da POS"
                />
              </div>
            </div>
            <div className="d-flex">
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleEmail">
                  Nº de série da POS
                </Label>
                <SuperInput
                  id="exampleEmail"
                  name="email"
                  placeholder="Digite o nº de serie da POS"
                />
              </div>
            </div>
            <div className="d-flex">
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleEmail">
                  Situação da POS
                </Label>
                <SuperInput
                  id="exampleEmail"
                  name="email"
                  placeholder="Selecione ou digite a situação da POS"
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
          <Button variant="dark">Cadastrar nova POS</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterPos;
