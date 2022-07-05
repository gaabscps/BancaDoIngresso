import React from "react";
import { FormGroup, Label, Input, Button } from "reactstrap";
import { translate } from "react-switch-lang";
import SuperInput from "../../../../sharedComponents/SuperInput";
import { cpfMask } from "../../../../../utils/input-mask";
import { useHistory } from "react-router-dom";

const Cpf = ({ form, handleForm, ...props }) => {
  return (
    <>
      <div style={{ display: "-webkit-box" }}>
        <div style={{ display: "grid" }}>
          <h4 className="forgotPasswordLabel">Defina a sua nova senha</h4>
        </div>
      </div>
      <p style={{ width: "450px" }} className="subTitleMain">
        Digite nos campos abaixo a sua nova senha
      </p>
      <FormGroup>
        <div>
          <Label className="col-form-label fieldLabel">
            <img
              className="mr-2"
              src={require("../../../../../assets/images/svg/loginLock.svg")}
            />
            Sua nova senha
          </Label>
          <Input
            name="username"
            className="form-control loginForm"
            required=""
            placeholder="Digite sua nova senha"
            value={form?.username}
            onChange={handleForm}
          />
          <div className="auxGrayText" style={{marginTop: "15px"}}>*A sua senha deve conter 6 dígitos numéricos* </div>
        </div>
        <div style={{marginTop: "30px"}}>
          <Label className="col-form-label fieldLabel">
            <img
              className="mr-2"
              src={require("../../../../../assets/images/svg/loginLock.svg")}
            />
            Confirme a sua nova senha
          </Label>
          <Input
            name="username"
            className="form-control loginForm"
            required=""
            placeholder="Digite sua nova senha novamente"
            value={form?.username}
            onChange={handleForm}
          />
        </div>
      </FormGroup>
      <Button
        color="primary"
        className="btn-block mainButton"
        style={{ marginTop: "90px" }}
      >
        <div className="loginFormText">Alterar a minha senha</div>
      </Button>
    </>
  );
};

export default translate(Cpf);
