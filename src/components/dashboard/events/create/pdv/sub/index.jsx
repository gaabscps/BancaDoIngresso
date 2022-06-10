import React, { Fragment, useEffect, useState } from "react";
import {
  Container, Label,
} from "reactstrap";
import { Button, ButtonGroup } from "react-bootstrap";
import SuperButton from "../../../../../sharedComponents/SuperButton";
import SuperInput from "../../../../../sharedComponents/SuperInput";

const Sample = (props) => {
  return (
    <Fragment>
      <Container className="subContainer" fluid={true}>
      <hr className="dividerUp" />
      <div className="groupButton">
          <Label className="fieldLabel">Permitir Sub PDV?</Label>
          <ButtonGroup style={{ width: "100px" }}>
            <Button
              variant="outline-dark"
              style={{ height: "62px", width: "100px" }}
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
