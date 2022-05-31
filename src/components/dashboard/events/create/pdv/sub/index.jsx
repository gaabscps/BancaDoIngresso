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
        <div className="groupButton">
          <Label className="fieldLabel">Permitir Sub PDV?</Label>
          <ButtonGroup style={{ width: "100px" }}>
            <SuperButton>Sim</SuperButton>
            <SuperButton>Não</SuperButton>
          </ButtonGroup>
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
