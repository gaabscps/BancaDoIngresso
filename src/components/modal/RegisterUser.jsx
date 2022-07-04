import React, { useState } from "react";
import { Modal, Button, Collapse } from "react-bootstrap";
import { Card, Col, Container, Label, Input } from "reactstrap";
import CloseModal from "../../assets/images/svg/CloseModal";
import SuperInput from "../sharedComponents/SuperInput";

const RegisterUser = ({ show, setShowUser }) => {
  const handleClose = () => setShowUser(false);
  const [open, setOpen] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);
  return (
    <Modal
      size={"xl"}
      show={show}
      onHide={() => setShowUser(false)}
      dialogClassName="modal-550px"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header>
        <Modal.Title
          id="example-custom-modal-styling-title"
          className="pageTitle"
        >
          Cadastrar grupo
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
            <div style={{ display: "grid", paddingBottom: "50px" }}>
              <Label className="pageTitle">Informações básicas</Label>
              <img
                src={require("../../assets/images/svg/titleLine.svg")}
                style={{ paddingTop: "-20px" }}
              />
            </div>
            <div className="d-flex">
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleEmail">
                  Nome do grupo
                </Label>
                <SuperInput
                  style={{ width: "431px" }}
                  id="exampleEmail"
                  name="email"
                  placeholder="Ex:  Administradores"
                  type="email"
                />
              </div>
            </div>
            <div className="d-flex">
              <div className="fieldSpacing">
                <Label className="fieldLabel" for="exampleEmail">
                  Nome do usuário
                </Label>
                <SuperInput
                  style={{ width: "431px" }}
                  id="exampleEmail"
                  name="email"
                  placeholder="Ex:  José da Silva"
                />
              </div>
            </div>
            <div className="fieldSpacing">
              <Label className="fieldLabel" for="exampleEmail">
                E-mail
              </Label>
              <SuperInput
                style={{ width: "431px" }}
                id="exampleEmail"
                name="email"
                placeholder="Ex:  Administradores"
                type="email"
              />
            </div>
            <div className="fieldSpacing">
              <Label className="fieldLabel" for="exampleEmail">
                Nome do grupo
              </Label>
              <SuperInput
                style={{ width: "431px" }}
                id="exampleEmail"
                name="email"
                placeholder="Ex: josedasilva123@gmail.com"
                type="email"
              />
            </div>
            <div className="fieldSpacing">
              <Label className="fieldLabel" for="exampleEmail">
                Nome do grupo
              </Label>
              <SuperInput
                style={{ width: "431px" }}
                id="exampleEmail"
                name="email"
                placeholder="Ex:  Administradores"
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
            <div className="fieldSpacing">
              <Label className="fieldLabel" for="exampleEmail">
                CPF
              </Label>
              <SuperInput
                style={{ width: "431px" }}
                id="exampleEmail"
                name="email"
                placeholder="Ex: 123.456.789-00"
              />
            </div>
            <div className="fieldSpacing">
              <Label className="fieldLabel" for="exampleEmail">
                Senha
              </Label>
              <SuperInput
                style={{ width: "431px" }}
                id="exampleEmail"
                name="email"
                placeholder="Ex: 123123"
              />
            </div>
            <div style={{ display: "grid", paddingBottom: "50px" }}>
              <Label className="pageTitle">Tipo do usuário </Label>
              <Label className="subTitleMain">
                Papel do usuário dentro do sistema
              </Label>
              <img
                src={require("../../assets/images/svg/thirdTitleLine.svg")}
                style={{ paddingTop: "-20px" }}
              />
            </div>
            <div className="d-flex">
              <div className="normalText ">
                <div classname="checkFieldSpacing" check>
                  <Input type="checkbox" />
                  <Label check className="checkLabel">
                    Funcionários
                  </Label>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <div className="normalText ">
                <div classname="checkFieldSpacing" check>
                  <Input type="checkbox" />
                  <Label check className="checkLabel">
                    PDV
                  </Label>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <div className="normalText ">
                <div classname="checkFieldSpacing" check>
                  <Input type="checkbox" />
                  <Label check className="checkLabel">
                    SubPDV
                  </Label>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <div className="normalText ">
                <div classname="checkFieldSpacing" check>
                  <Input type="checkbox" />
                  <Label check className="checkLabel">
                    POS
                  </Label>
                </div>
              </div>
            </div>
            <div style={{ display: "grid", paddingBottom: "50px", marginTop: "50px" }}>
              <Label className="pageTitle">Grupo</Label>
              <Label className="subTitleMain">
              Grupo de permissões que o usuário terá no sistema
              </Label>
              <img
                src={require("../../assets/images/svg/fourTitleLine.svg")}
                style={{ paddingTop: "-20px" }}
              />
            </div>
            <div className="d-flex">
              <div className="normalText ">
                <div classname="checkFieldSpacing" check>
                  <Input type="checkbox" />
                  <Label check className="checkLabel">
                    Funcionários
                  </Label>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <div className="normalText ">
                <div classname="checkFieldSpacing" check>
                  <Input type="checkbox" />
                  <Label check className="checkLabel">
                    PDV
                  </Label>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <div className="normalText ">
                <div classname="checkFieldSpacing" check>
                  <Input type="checkbox" />
                  <Label check className="checkLabel">
                    SubPDV
                  </Label>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <div className="normalText ">
                <div classname="checkFieldSpacing" check>
                  <Input type="checkbox" />
                  <Label check className="checkLabel">
                    POS
                  </Label>
                </div>
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
          <Button variant="dark">Cadastrar usuário</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterUser;
