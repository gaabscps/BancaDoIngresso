import React, { useState } from "react";
import { Modal, Button, Collapse } from "react-bootstrap";
import { Card, Col, Container, Label, Input } from "reactstrap";
import CloseModal from "../../assets/images/svg/CloseModal";
import SuperInput from "../sharedComponents/SuperInput";

const RegisterPdv = ({ show, setShowPdv }) => {
  const handleClose = () => setShowPdv(false);
  return (
    <Modal
      size={"xl"}
      show={show}
      onHide={() => setShowPdv(false)}
      dialogClassName="modal-550px"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header>
        <Modal.Title
          id="example-custom-modal-styling-title"
          className="pageTitle"
        >
          Cadastrar novo PDV
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
                  Nome do PDV
                </Label>
                <SuperInput
                  id="exampleEmail"
                  name="email"
                  placeholder="Digite o nome do Sub PDV"
                />
              </div>
            </div>
            <div className="d-flex">
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleEmail">
                  Endereço do PDV
                </Label>
                <SuperInput
                  id="exampleEmail"
                  name="email"
                  placeholder="Digite o endereço do PDV. Ex: Rua 123 da Silva"
                />
              </div>
            </div>
            <div className="d-flex">
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleEmail">
                  Estado
                </Label>
                <SuperInput
                  style={{ width: "152px" }}
                  id="exampleEmail"
                  name="email"
                  placeholder="Ex:  Administradores"
                  type="select"
                />
              </div>
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleEmail">
                  Cidade
                </Label>
                <SuperInput
                  style={{ width: "364px" }}
                  id="exampleEmail"
                  name="email"
                  placeholder="Selecione ou digite a cidade"
                  type="email"
                />
              </div>
            </div>
            <div className="fieldSpacing">
              <Label className="fieldLabel" for="exampleEmail">
                CPF/CNPJ
              </Label>
              <SuperInput
                style={{ width: "370px" }}
                id="exampleEmail"
                name="email"
                placeholder="Digite o CPF ou CNPJ do PDV"
              />
            </div>
            <div className="fieldSpacing">
              <Label className="fieldLabel" for="exampleEmail">
                Número de celular
              </Label>
              <SuperInput
                style={{ width: "431px" }}
                id="exampleEmail"
                name="email"
                placeholder="(00) 0 0000-0000"
              />
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
          <Button variant="dark">Cadastrar novo PDV</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterPdv;
