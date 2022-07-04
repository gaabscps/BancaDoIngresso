import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Breadcrumb from "../../../layout/breadcrumb";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  Label,
  NavLink,
} from "reactstrap";

const Sample = (props) => {
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const d = new Date();
  const hour = d.getHours();

  const user = useSelector((content) => content.User?.user);

  return (
    <Fragment>
      <Container className="mainContainer" fluid={true}>
        <div style={{ display: "grid", paddingBottom: "20px" }}>
          <Label className="pageTitle">Visão Geral</Label>
          <Label className="fieldLabel">Últimos 30 dias</Label>
        </div>
        <Row>
          <Col sm="12">
            <CardHeader className="cardHeader row">
              <div className="firstDiv col">
                <div className="firstContent textContent d-flex align-items-start">
                  <img
                    src={require("../../../assets/images/svg/clock.svg")}
                    style={{ paddingRight: "8px", marginTop: "5px" }}
                  />
                  <div className="d-flex flex-column">
                    Eventos pendentes de liberação
                    <div className="count">20</div>
                  </div>
                </div>
              </div>
              <div className="firstDiv col">
                <div className="firstContent textContent d-flex align-items-start">
                  <img
                    src={require("../../../assets/images/svg/x.svg")}
                    style={{ paddingRight: "8px", marginTop: "5px" }}
                  />
                  <div className="d-flex flex-column">
                    Eventos cancelados
                    <div className="count">5</div>
                  </div>
                </div>
              </div>
              <div className="firstDiv col">
                <div className="firstContent textContent d-flex align-items-start">
                  <img
                    src={require("../../../assets/images/svg/money.svg")}
                    style={{ paddingRight: "8px", marginTop: "5px" }}
                  />
                  <div className="d-flex flex-column">
                    PDV’s cadastrados
                    <div className="count">100</div>
                  </div>
                </div>
              </div>

              <div className="lastDiv col">
                <div className="firstContent textContent d-flex align-items-start">
                  <img
                    src={require("../../../assets/images/svg/reMoney.svg")}
                    style={{ paddingRight: "8px", marginTop: "5px" }}
                  />
                  <div className="d-flex flex-column">
                    Chargeback
                    <div className="count">100</div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Col>
        </Row>
        <Col>
          <div style={{ display: "grid", paddingTop: "50px" }}>
            <div className="d-flex justify-content-between">
              <Label className="pageTitle">Eventos próximos</Label>
              <Label className="normalText">Ver todos</Label>
            </div>
            <Label className="fieldLabel">Últimos 7 dias</Label>
          </div>
          <div style={{ width: "1062px", display: "contents" }}>
            <div
              className="d-inline-block justify-content-between"
              style={{
                paddingBottom: "30px",
                borderStyle: "solid",
                borderColor: "#0ff",
                borderWidth: "1px",
                minWidth: "auto",
              }}
            >
              <div className="partyCard">
                <div class="partyImage2">
                  <img
                    className="actionCard"
                    src={require("../../../assets/images/svg/actionCard.svg")}
                    style={{ paddingRight: "10px" }}
                  />
                  <div className="descriptionEvent">
                    <div className="nameEvent">Revoada do Tatu</div>
                    <div className="dateEvent">
                      <img
                        src={require("../../../assets/images/svg/calendar.svg")}
                        style={{ paddingRight: "10px" }}
                      />
                      07/05/2022
                    </div>

                    <div className="locationEvent">
                      <img
                        src={require("../../../assets/images/svg/locationPin.svg")}
                        style={{ paddingRight: "10px" }}
                      />
                      Campinas/SP
                    </div>
                  </div>
                </div>
              </div>
              <div className="partyCard">
                <div class="partyImage1">
                  <img
                    className="actionCard"
                    src={require("../../../assets/images/svg/actionCard.svg")}
                    style={{ paddingRight: "10px" }}
                  />
                  <div className="descriptionEvent">
                    <div className="nameEvent">Vans Warped Tour - Issues</div>
                    <div className="dateEvent">
                      <img
                        src={require("../../../assets/images/svg/calendar.svg")}
                        style={{ paddingRight: "10px" }}
                      />
                      10/05/2022
                    </div>

                    <div className="locationEvent">
                      {" "}
                      <img
                        src={require("../../../assets/images/svg/locationPin.svg")}
                        style={{ paddingRight: "10px" }}
                      />
                      Aparecida do Taboado/MS
                    </div>
                  </div>
                </div>
              </div>
              <div className="partyCard">
                <div class="partyImage3">
                  <img
                    className="actionCard"
                    src={require("../../../assets/images/svg/actionCard.svg")}
                    style={{ paddingRight: "10px" }}
                  />
                  <div className="descriptionEvent">
                    <div className="nameEvent">João Rock 2022</div>
                    <div className="dateEvent">
                      <img
                        src={require("../../../assets/images/svg/calendar.svg")}
                        style={{ paddingRight: "10px" }}
                      />
                      10/05/2022
                    </div>

                    <div className="locationEvent">
                      <img
                        src={require("../../../assets/images/svg/locationPin.svg")}
                        style={{ paddingRight: "10px" }}
                      />
                      Ribeirão Preto/SP
                    </div>
                  </div>
                </div>
              </div>
              <div className="partyCard">
                <div class="partyImage3">
                  <img
                    className="actionCard"
                    src={require("../../../assets/images/svg/actionCard.svg")}
                    style={{ paddingRight: "10px" }}
                  />
                  <div className="descriptionEvent">
                    <div className="nameEvent">
                      {" "}
                      Camarote Bacana - Fabiano Henrique
                    </div>
                    <div className="dateEvent">
                      <img
                        src={require("../../../assets/images/svg/calendar.svg")}
                        style={{ paddingRight: "10px" }}
                      />
                      11/05/2022
                    </div>

                    <div className="locationEvent">
                      <img
                        src={require("../../../assets/images/svg/locationPin.svg")}
                        style={{ paddingRight: "10px" }}
                      />
                      Campinas/SP
                    </div>
                  </div>
                </div>
              </div>
              <div className="partyCard">
                <div class="partyImage1">
                  <img
                    className="actionCard"
                    src={require("../../../assets/images/svg/actionCard.svg")}
                    style={{ paddingRight: "10px" }}
                  />
                  <div className="descriptionEvent">
                    <div className="nameEvent">
                      Vans Warped Tour - Slow Bleeding
                    </div>
                    <div className="dateEvent">
                      <img
                        src={require("../../../assets/images/svg/calendar.svg")}
                        style={{ paddingRight: "10px" }}
                      />
                      10/05/2022
                    </div>

                    <div className="locationEvent">
                      {" "}
                      <img
                        src={require("../../../assets/images/svg/locationPin.svg")}
                        style={{ paddingRight: "10px" }}
                      />
                      Ribeirão Preto/SP
                    </div>
                  </div>
                </div>
              </div>
              <div className="partyCard">
                <div class="partyImage2">
                  <img
                    className="actionCard"
                    src={require("../../../assets/images/svg/actionCard.svg")}
                    style={{ paddingRight: "10px" }}
                  />
                  <div className="descriptionEvent">
                    <div className="nameEvent">Festa Universitária</div>
                    <div className="dateEvent">
                      <img
                        src={require("../../../assets/images/svg/calendar.svg")}
                        style={{ paddingRight: "10px" }}
                      />
                      10/05/2022
                    </div>

                    <div className="locationEvent">
                      {" "}
                      <img
                        src={require("../../../assets/images/svg/locationPin.svg")}
                        style={{ paddingRight: "10px" }}
                      />
                      Ribeirão Preto/SP
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Container>
    </Fragment>
  );
};

export default Sample;
