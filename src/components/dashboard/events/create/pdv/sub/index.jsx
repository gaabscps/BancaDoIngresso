import React, { Fragment, useEffect, useState } from "react";
import { Container, Label } from "reactstrap";
import { Button, ButtonGroup } from "react-bootstrap";
import SuperButton from "../../../../../sharedComponents/SuperButton";
import SuperInput from "../../../../../sharedComponents/SuperInput";
import SubPdvIcon from "../../../../../../assets/images/svg/SubPdv";
import SuperCollapse from "../../../../../sharedComponents/SuperCollapse";
import SubPdvRegistration from "../../../../../modal/SubPdvRegistration";

const Sample = (props) => {
  const [show, setShow] = useState(false);

  return (
    <Fragment>
      <SubPdvRegistration show={show} setShow={setShow} />
      <Container className="subContainer" fluid={true}>
        <hr className="dividerUp" />
        <div className="d-flex">
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
          <div style={{ color: "#fff", marginTop: "50px", marginLeft: "20px" }}>
            <Button
              style={{ height: "50px", width: "270px" }}
              variant="outline-light"
            >
              <div className="greyNormalText" onClick={() => setShow(true)}>+ cadastrar novo Sub PDV</div>
            </Button>
          </div>
        </div>
          <div style={{ marginTop: "50px" }}>
          <SuperCollapse
            title="Sub PDV’s cadastrados"
            content="Nenhum sub PDV cadastrado. Aqui será exibida uma lista dos seus sub PDV’s cadastrados"
            leftIcon={SubPdvIcon}
          />
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
