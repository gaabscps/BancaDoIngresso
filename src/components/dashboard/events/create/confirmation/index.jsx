import React, { Fragment } from "react";
import { Container, Col } from "reactstrap";
import { Button} from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Sample = (props) => {
  const history = useHistory();

  const nextStep = () => {
    history.push("/events");
  };
  const goBack = () => {
    history.goBack();
  };

  return (
    <Fragment>
      <Container className="mainContainer" fluid={true}>
        <div className="d-flex justify-content-center stepContainer">
          <img
            src={require("../../../../../assets/images/svg/stepByStep/step5.svg")}
          />
        </div>
        <Col>
          <div style={{ display: "grid", paddingBottom: "50px" }}>
            <div className="pageTitle">Confirmação de dados</div>
            <img
              src={require("../../../../../assets/images/svg/titleLine.svg")}
              style={{ paddingTop: "-20px" }}
            />
          </div>
          <hr className="dividerDown" />
          <div className="nextPageButton">
            <div style={{ color: "#fff" }}>
              <Button style={{ height: "50px" }} variant="outline-light" onClick={goBack}>
                Voltar
              </Button>
            </div>
            <Button variant="dark" onClick={nextStep}>
              Finalizar cadastro do evento
            </Button>
          </div>
        </Col>
      </Container>
    </Fragment>
  );
};

export default Sample;
