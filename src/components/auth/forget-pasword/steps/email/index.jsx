import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import { translate } from "react-switch-lang";

const Email = ({ form, handleForm, ...props }) => {
  return (
    <>
      <FormGroup>
        <Label className="col-form-label">
          <img
            className="mr-2"
            src={require("../../../../../assets/images/login/mail.svg")}
          />
          Seu e-mail
        </Label>
        <Input
          className="form-control"
          type="email"
          name="email"
          required=""
          placeholder=""
          onChange={handleForm}
          value={form?.email || ""}
        />
      </FormGroup>
    </>
  );
};

export default translate(Email);
