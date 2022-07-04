import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import { translate } from "react-switch-lang";
import SuperInput from "../../../../sharedComponents/SuperInput";
import { cpfMask } from "../../../../../utils/input-mask";

const Cpf = ({ form, handleForm, ...props }) => {
  return (
    <>
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
    </>
  );
};

export default translate(Cpf);
