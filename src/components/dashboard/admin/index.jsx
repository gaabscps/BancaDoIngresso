import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Breadcrumb from "../../../layout/breadcrumb";
import { Container, Row, Col, Card, CardHeader } from "reactstrap";

import { getLocalStorage } from "../../../helpers/localStorage";

const Sample = (props) => {
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const d = new Date();
  const hour = d.getHours();

  const user = useSelector((content) => content.User?.user);

  useEffect(() => {
    if (hour < 5) {
      setWelcomeMessage("Boa noite");
    } else if (hour < 8) {
      setWelcomeMessage("Bom dia");
    } else if (hour < 12) {
      setWelcomeMessage("Bom dia");
    } else if (hour < 18) {
      setWelcomeMessage("Boa tarde");
    } else {
      setWelcomeMessage("Boa noite");
    }
  }, [hour]);

  return (
    <Fragment>
      <Breadcrumb parent="Dashboard" title="Visão Geral" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>
                  {/* {welcomeMessage}, {user?.name}! */}
                  {welcomeMessage}, "userName"!
                </h5>
                <span>Este é o seu painel de controle. Aqui aparecerão os seus eventos criados.</span>
              </CardHeader>
              {/* <CardBody>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </CardBody> */}
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Sample;
