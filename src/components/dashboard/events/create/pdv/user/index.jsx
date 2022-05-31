import React, { Fragment, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
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
        <div className="d-flex">
          <FormGroup className="fieldSpacing">
            <Label className="fieldLabel" for="exampleSelect">
              Usuário do PDV
            </Label>
            <SuperInput
              placeholder="Digite ou selecione o usuário do PDV"
              id="exampleSelect"
              name="select"
              type="select"
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </SuperInput>
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
