import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import { translate } from "react-switch-lang";

const Password = ({ form, handleForm, ...props }) => {
  return (
    <>
      <FormGroup>
        <Label className="col-form-label">Senha</Label>
        <Input
          className="form-control"
          type="password"
          name="password"
          required=""
          placeholder=""
          onChange={handleForm}
          value={form?.password || ""}
        />
      </FormGroup>
      <FormGroup>
        <Label className="col-form-label">Confirme sua senha</Label>
        <Input
          className="form-control"
          type="password"
          name="confirmPassword"
          required=""
          placeholder=""
          onChange={handleForm}
          value={form?.confirmPassword || ""}
        />
      </FormGroup>
    </>
  );
};

export default translate(Password);
