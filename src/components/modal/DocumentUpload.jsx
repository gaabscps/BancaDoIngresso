import React, { useState } from "react";
import { Modal, Button, Collapse } from "react-bootstrap";
import { Card, Col, Container, Label, Input } from "reactstrap";
import CloseModal from "../../assets/images/svg/CloseModal";
import SuperInput from "../sharedComponents/SuperInput";

const DocumentUpload = ({ show, setShowDocument }) => {
  const handleClose = () => setShowDocument(false);
  return (
    <Modal
      size={"xl"}
      show={show}
      onHide={() => setShowDocument(false)}
      dialogClassName="modal-550px"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header >
        <Modal.Title
          id="example-custom-modal-styling-title"
          className="pageTitle"
        >
          Upload de documento
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
            <div>
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleFile">
                  Arquivo
                </Label>
                <SuperInput
                  id="exampleFile"
                  placeholder="Nenhum arquivo selecionado"
                  name="file"
                  type="file"
                />
              </div>
            </div>
            <div className="d-flex">
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleEmail">
                  Título do documento
                </Label>
                <SuperInput
                  id="exampleEmail"
                  name="email"
                  placeholder="Selecione ou digite o tipo do gateway de pagamento"
                />
              </div>
            </div>
            <div className="fieldSpacing">
              <Label className="fieldLabel" for="exampleText">
                Descrição
              </Label>
              <SuperInput
                style={{ width: "534px", height: "261px" }}
                id="exampleText"
                placeholder="Digite aqui a descrição do arquivo"
                name="text"
                type="textarea"
              />
            </div>
            <div className="d-flex">
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleEmail">
                  Categoria
                </Label>
                <SuperInput
                  id="exampleEmail"
                  name="email"
                  placeholder="Selecione ou digite a categoria do arquivo"
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
          <Button variant="dark">Upload</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DocumentUpload;
