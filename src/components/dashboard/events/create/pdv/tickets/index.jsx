import React, { Fragment, useEffect, useState } from "react";
import {
  Container,
  Input,
  FormGroup,
  Label,
} from "reactstrap";
import { Button, ButtonGroup } from "react-bootstrap";
const Sample = (props) => {
  return (
    <Fragment>
      <Container className="subContainer" fluid={true}>
        <hr className="dividerUp" />
        <FormGroup className="fieldSpacing">
          <Label className="infoSubTitle">Camarote &gt;&gt; Setor</Label>
          <div classname="checkFieldSpacing" check>
            <Input type="checkbox" />
            <Label className="checkLabel" check>Camarote Masculino</Label>
          </div>
          <div classname="checkFieldSpacing" check>
            <Input type="checkbox" />
            <Label className="checkLabel" check>Camarote Meia entrada</Label>
          </div>
          <div classname="checkFieldSpacing" check>
            <Input type="checkbox" />
            <Label className="checkLabel" check>Camarote Feminino</Label>
          </div>
        </FormGroup>
        <hr className="dividerUp" />
        <div className="d-flex">
          <FormGroup className="fieldSpacing" style={{ marginRight: "250px" }}>
            <Label className="infoSubTitle">Área VIP</Label>
            <div classname="checkFieldSpacing" check>
              <Input type="checkbox" />
              <Label check className="checkLabel">Geral</Label>
            </div>
            <div classname="checkFieldSpacing" check>
              <Input type="checkbox" />
              <Label check className="checkLabel">Meia entrada</Label>
            </div>
            <div classname="checkFieldSpacing" check>
              <Input type="checkbox" />
              <Label check className="checkLabel">Universitário</Label>
            </div>
            <div classname="checkFieldSpacing" check>
              <Input type="checkbox" />
              <Label check className="checkLabel">Camarote</Label>
            </div>
            <div classname="checkFieldSpacing" check>
              <Input type="checkbox" />
              <Label check className="checkLabel">Área Vip</Label>
            </div>
          </FormGroup>
          <FormGroup className="fieldSpacing">
            <Label className="infoSubTitle">Pista</Label>
            <div classname="checkFieldSpacing" check>
              <Input type="checkbox" />
              <Label check className="checkLabel">Pista Masculina</Label>
            </div>
            <div classname="checkFieldSpacing" check>
              <Input type="checkbox" />
              <Label check className="checkLabel">Pista Meia entrada</Label>
            </div>
            <div classname="checkFieldSpacing" check>
              <Input type="checkbox" />
              <Label check className="checkLabel">Pista Feminina</Label>
            </div>
            <div classname="checkFieldSpacing" check>
              <Input type="checkbox" />
              <Label check className="checkLabel">Camarote</Label>
            </div>
            <div classname="checkFieldSpacing" check>
              <Input type="checkbox" />
              <Label check className="checkLabel">Área Vip</Label>
            </div>
            <div classname="checkFieldSpacing" check>
              <Input type="checkbox" />
              <Label check className="checkLabel">Geral</Label>
            </div>
            <div classname="checkFieldSpacing" check>
              <Input type="checkbox" />
              <Label check className="checkLabel">Universitário</Label>
            </div>
          </FormGroup>
        </div>
        <div className="nextPageButton">
          <div style={{ color: "#fff" }}>
            <Button
              style={{ height: "50px", width: "200px", borderColor: "#A5A5A5" }}
              variant="outline-light"
            >
              <div className="greyNormalText">Adicionar PDV</div>
            </Button>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default Sample;
