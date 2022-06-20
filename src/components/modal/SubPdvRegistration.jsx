import React, { useState } from "react";
import { Modal, Button, ButtonGroup } from "react-bootstrap";
import { Card, Col, Container, FormGroup, Label, Row } from "reactstrap";
import SuperInput from "../sharedComponents/SuperInput";

const SubPdvRegistration = ({ show, setShow }) => {
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
            Cadastrar novo Sub PDV
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Card
              className="mainContainer"
              style={{ backgroundColor: "#F1F1F1" }}
            >
                <div className="fieldSpacing">
                  <Label className="fieldLabel" for="exampleEmail">
                    Nome do Sub PDV
                  </Label>
                  <SuperInput
                    id="exampleEmail"
                    placeholder="Digite o nome do Sub PDV"
                  />
                </div>
                <div className="groupButton">
                  <Label className="fieldLabel">Permitir dinheiro?</Label>
                  <ButtonGroup style={{ width: "100px" }}>
                    <Button
                      variant="outline-dark"
                      style={{ height: "62px", width: "100px" }}
                      onClick={() => setShow(true)}
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
                <div className="groupButton">
                  <Label className="fieldLabel">
                    Permitir taxa antecipada?
                  </Label>
                  <ButtonGroup style={{ width: "100px" }}>
                    <Button
                      variant="outline-dark"
                      style={{ height: "62px", width: "100px" }}
                      onClick={() => setShow(true)}
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
                <div className="groupButton">
                  <Label className="fieldLabel">Permitir débito?</Label>
                  <ButtonGroup style={{ width: "100px" }}>
                    <Button
                      variant="outline-dark"
                      style={{ height: "62px", width: "100px" }}
                      onClick={() => setShow(true)}
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
                <div className="groupButton">
                  <Label className="fieldLabel">Permitir crédito?</Label>
                  <ButtonGroup style={{ width: "100px" }}>
                    <Button
                      variant="outline-dark"
                      style={{ height: "62px", width: "100px" }}
                      onClick={() => setShow(true)}
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
                <div className="groupButton">
                  <Label className="fieldLabel">Permitir PIX?</Label>
                  <ButtonGroup style={{ width: "100px" }}>
                    <Button
                      variant="outline-dark"
                      style={{ height: "62px", width: "100px" }}
                      onClick={() => setShow(true)}
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
                <div className="groupButton">
                  <Label className="fieldLabel">Permitir venda online?</Label>
                  <ButtonGroup style={{ width: "100px" }}>
                    <Button
                      variant="outline-dark"
                      style={{ height: "62px", width: "100px" }}
                      onClick={() => setShow(true)}
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
            </Card>
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
                Cancelar
              </Button>
            </div>
            <Button variant="dark">Cadastrar novo Sub PDV</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SubPdvRegistration;
