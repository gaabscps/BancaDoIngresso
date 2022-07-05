import React from "react";
import { FormGroup, Label, Input, Button } from "reactstrap";
import { translate } from "react-switch-lang";
import SuperInput from "../../../../sharedComponents/SuperInput";
import { cpfMask } from "../../../../../utils/input-mask";
import { useHistory } from "react-router-dom";

const Cpf = ({ form, handleForm, ...props }) => {
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
          <h4 className="forgotPasswordLabel">Esqueceu sua senha?</h4>
        </div>
      </div>
      <p style={{ width: "450px" }} className="subTitleMain">
        Digite abaixo o seu CPF para receber o link de recuperação de senha em
        seu e-mail cadastrado
      </p>
      <FormGroup>
        <Label className="col-form-label fieldLabel">
          <img
            className="mr-2"
            src={require("../../../../../assets/images/svg/idCard.svg")}
          />
          Seu CPF
        </Label>
        <Input
          name="username"
          className="form-control loginForm"
          required=""
          placeholder="Digite seu CPF"
          value={form?.username ? cpfMask(form?.username) : ""}
          onChange={handleForm}
          maxLength="14"
        />
      </FormGroup>
      <Button
        color="primary"
        className="btn-block mainButton"
        style={{ marginTop: "200px" }}
      >
        <div className="loginFormText">Enviar link de recuperação</div>
      </Button>
    </>
  );
};

export default translate(Cpf);
