import React, { Fragment, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Input,
  FormGroup,
  Label,
  ButtonGroup,
  Button,
} from "reactstrap";
import SuperButton from "../../../../../sharedComponents/SuperButton";
import SuperInput from "../../../../../sharedComponents/SuperInput";

const Sample = (props) => {
  return (
    <Fragment>
      <Container className="subContainer" fluid={true}>
        <div className="fieldSpacing">
          <Label className="fieldLabel">Camarote &gt; Setor</Label>
          <FormGroup classname="checkFieldSpacing" check>
            <Input type="checkbox" />
            <Label check>Camarote Masculino</Label>
          </FormGroup>
          <FormGroup classname="checkFieldSpacing" check>
            <Input type="checkbox" />
            <Label check>Camarote Meia entrada</Label>
          </FormGroup>
          <FormGroup classname="checkFieldSpacing" check>
            <Input type="checkbox" />
            <Label check>Camarote Feminino</Label>
          </FormGroup>
        </div>
        <div className="fieldSpacing">
          <Label className="fieldLabel">Área VIP</Label>
          <FormGroup classname="checkFieldSpacing" check>
            <Input type="checkbox" />
            <Label check>Geral</Label>
          </FormGroup>
          <FormGroup classname="checkFieldSpacing" check>
            <Input type="checkbox" />
            <Label check>Meia entrada</Label>
          </FormGroup>
          <FormGroup classname="checkFieldSpacing" check>
            <Input type="checkbox" />
            <Label check>Universitário</Label>
          </FormGroup>
          <FormGroup classname="checkFieldSpacing" check>
            <Input type="checkbox" />
            <Label check>Camarote</Label>
          </FormGroup>
          <FormGroup classname="checkFieldSpacing" check>
            <Input type="checkbox" />
            <Label check>Área Vip</Label>
          </FormGroup>
        </div>
        <div className="fieldSpacing">
          <Label className="fieldLabel">Pista</Label>
          <FormGroup classname="checkFieldSpacing" check>
            <Input type="checkbox" />
            <Label check>Pista Masculina</Label>
          </FormGroup>
          <FormGroup classname="checkFieldSpacing" check>
            <Input type="checkbox" />
            <Label check>Pista Meia entrada</Label>
          </FormGroup>
          <FormGroup classname="checkFieldSpacing" check>
            <Input type="checkbox" />
            <Label check>Pista Feminina</Label>
          </FormGroup>
          <FormGroup classname="checkFieldSpacing" check>
            <Input type="checkbox" />
            <Label check>Camarote</Label>
          </FormGroup>
          <FormGroup classname="checkFieldSpacing" check>
            <Input type="checkbox" />
            <Label check>Área Vip</Label>
          </FormGroup>
          <FormGroup classname="checkFieldSpacing" check>
            <Input type="checkbox" />
            <Label check>Geral</Label>
          </FormGroup>
          <FormGroup classname="checkFieldSpacing" check>
            <Input type="checkbox" />
            <Label check>Universitário</Label>
          </FormGroup>
        </div>
        <div className="nextPageButton">
          <SuperButton
            color="primary"
            style={{ width: "144px", height: "50px" }}
          >
            Adcionar PDV
          </SuperButton>
        </div>
      </Container>
    </Fragment>
  );
};

export default Sample;
