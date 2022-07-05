import React from "react";
import { FormGroup, Label, Input, Button } from "reactstrap";
import { translate } from "react-switch-lang";
import MailIcon from "../../../../../assets/images/svg/Mail";
import { useHistory } from "react-router-dom";

const Code = ({ form, handleForm, ...props }) => {
  const history = useHistory();
  const goBack = () => {
    history.push("/");
  };
  return (
    <>
      <div style={{ display: "-webkit-box" }}>
        <img
          src={require("../../../../../assets/images/svg/goBackArrow.svg")}
          style={{
            paddingRight: "25px",
            paddingTop: "10px",
            cursor: "pointer",
          }}
          onClick={goBack}
        />
        <div style={{ display: "grid" }}>
          <p style={{ width: "450px" }} className="subTitleMain">
            Enviamos o link de recuperação de senha para o seu e-mail{' '}
            <b>da***@gmail.com</b>
          </p>
        </div>
      </div>
      <div className="d-flex justify-content-center" style={{marginTop: "22px"}}>
      <MailIcon />
      </div>
      <Button
        color="primary"
        className="btn-block mainButton"
        style={{ marginTop: "140px" }}
      >
        <div className="loginFormText">Ir para a página de entrada</div>
      </Button>
    </>
  );
};

export default translate(Code);
