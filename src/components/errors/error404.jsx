import React, { Fragment, useEffect } from "react";
import sad from "../../assets/images/other-images/sad.png";
import { Link } from "react-router-dom";
import { Container, Button, Media, Col } from "reactstrap";
import { translate, setLanguage } from "react-switch-lang";
import Cookies from "universal-cookie";

const Error404 = (props) => {
  const cookies = new Cookies();

  useEffect(() => {
    const cookieLang = cookies.get("language");
    if (!cookieLang) {
      setLanguage("br");
    } else {
      setLanguage(cookieLang);
    }
  }, []);

  return (
    <Fragment>
      <div className="page-wrapper">
        <div className="error-wrapper">
          <Container>
            <Media body className="img-100" src={sad} alt="" />
            <div className="error-heading">
              <h2 className="headline font-danger">{"404"}</h2>
            </div>
            <Col md="8 offset-md-2">
              <p className="sub-content">{props.t("PageNotFound")}</p>
            </Col>
            <Link to={`/`}>
              <Button color="danger-gradien" size="lg">
                {props.t("BackToHome")}
              </Button>
            </Link>
          </Container>
        </div>
      </div>
    </Fragment>
  );
};

export default translate(Error404);
