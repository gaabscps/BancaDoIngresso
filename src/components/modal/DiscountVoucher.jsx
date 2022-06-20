import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Card, Col, Container, FormGroup, Label, Row } from "reactstrap";
import SuperInput from "../sharedComponents/SuperInput";

const DiscountVoucher = ({ show, setShow }) => {
  const handleClose = () => setShow(false);
  return (
    <Modal
      size={"xl"}
      //   onHide={() => setShow(false)}
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
          Cadastrar voucher de desconto
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
                  style={{ width: "620px" }}
                  id="exampleEmail"
                  name="email"
                  placeholder="Digite a descrição do voucher de desconto"
                  type="email"
                />
              </div>
            </div>
            <div className="d-flex">
              <div className="fieldSpacing">
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
              </div>
              <div className="fieldSpacing">
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
              </div>
            </div>
          </Card>
        </Container>
        <div className="nextPageButton" style={{ marginTop: "5px" }}>
          <Button
            style={{ height: "56px" }}
            variant="dark"
            onClick={() => handleClose()}
          >
            Gerar voucher
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DiscountVoucher;
