import React, { Fragment, useState } from "react";
import { Container, Label} from "reactstrap";
import RegisterCompany from "../../modal/RegisterCompany";

const Sample = () => {

  return (
    <Fragment>
      <Container className="mainContainer" fluid={true}>
        <div
          className="d-flex justify-content-between"
          style={{ paddingBottom: "30px" }}
        >
          <div style={{ display: "grid" }}>
            <Label className="pageTitle">Módulos</Label>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default Sample;
