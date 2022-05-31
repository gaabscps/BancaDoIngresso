import React, { Fragment, useState } from "react";
import Breadcrumb from "../../../../layout/breadcrumb";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import SuperTable from "../../../sharedComponents/SuperTable";
import SuperButton from "../../../sharedComponents/SuperButton";
import data from "../../../../mock-data.json";
import { useHistory } from "react-router-dom";

const Sample = () => {
  const [events, setEvents] = useState(data);
  const history = useHistory();

  const createEvent = () => {
    history.push("/general");
  };

  return (
    <Fragment>
      <Container className="mainContainer" fluid={true}>
        <div className="d-flex justify-content-between">
          <div>
            <h3>Todos os eventos cadastrados</h3>
            <p>Você tem "contadorEventos" eventos em rascunho</p>
          </div>
          <SuperButton color="primary" onClick={createEvent}>
            + Cadastrar evento
          </SuperButton>
        </div>
        <Row>
          {/* <Col>
            <div className="d-flex pb-2">
              <div className="eventStatus">
                <span
                  style={{
                    width: "15px",
                    height: "15px",
                    borderRadius: "10px",
                    color: "#ffe249",
                    paddingTop: "10px",
                  }}
                >
                  ■
                </span>
                Evento com liberação pendente
              </div>
              <div className="eventStatus">
                <span
                  style={{
                    width: "15px",
                    height: "15px",
                    borderRadius: "10px",
                    color: "#7AD81B",
                    paddingTop: "10px",
                  }}
                >
                  ■
                </span>
                Evento liberado
              </div>
              <div className="eventStatus">
                <span
                  style={{
                    width: "15px",
                    height: "15px",
                    borderRadius: "10px",
                    color: "#E54F49",
                    paddingTop: "10px",
                  }}
                >
                  ■
                </span>
                Evento recusado
              </div>
              <div className="eventStatus">
                <span
                  style={{
                    width: "15px",
                    height: "15px",
                    borderRadius: "10px",
                    color: "#3CAFC8",
                    paddingTop: "10px",
                  }}
                >
                  ■
                </span>
                Rascunho
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <Card>
              <Table className="table">
                <thead>
                  <tr>
                    <th>Imagem</th>
                    <th>Nome do evento</th>
                    <th>Cidade</th>
                    <th>Inicio do evento</th>
                    <th>Fim do evento</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((rows) => (
                    <SuperTable rows={rows} />
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col> */}
        </Row>
      </Container>
    </Fragment>
  );
};

export default Sample;
