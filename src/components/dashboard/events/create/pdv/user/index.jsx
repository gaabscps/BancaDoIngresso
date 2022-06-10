import React, { Fragment, useEffect, useState } from "react";
import {
  Container,
  FormGroup,
  Label,
} from "reactstrap";
import { Button, ButtonGroup } from "react-bootstrap";
import SuperInput from "../../../../../sharedComponents/SuperInput";

const Sample = (props) => {
  return (
    <Fragment>
      <Container className="subContainer" fluid={true}>
        <hr className="dividerUp" />
        <div className="d-flex">
          <FormGroup className="fieldSpacing">
            <Label className="fieldLabel" for="exampleSelect">
              Usuário do PDV
            </Label>
            <SuperInput
              placeholder="Digite ou selecione o usuário do PDV"
              id="exampleSelect"
            />
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
