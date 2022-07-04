import React, { useState } from "react";
import { Modal, Button, Collapse } from "react-bootstrap";
import { Card, Col, Container, Label, Input } from "reactstrap";
import CloseModal from "../../assets/images/svg/CloseModal";
import SuperInput from "../sharedComponents/SuperInput";

const NewSector = ({ show, setShowNewSector }) => {
  const handleClose = () => setShowNewSector(false);
  return (
    <Modal
      size={"xl"}
      show={show}
      onHide={() => setShowNewSector(false)}
      dialogClassName="modal-550px"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header>
        <Modal.Title
          id="example-custom-modal-styling-title"
          className="pageTitle"
        >
          Cadastrar novo setor
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
            <div className="d-flex">
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleEmail">
                  Nome do setor
                </Label>
                <SuperInput
                  id="exampleEmail"
                  name="email"
                  placeholder="Digite o nome do setor"
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
          <Button variant="dark">Cadastrar novo setor</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default NewSector;
