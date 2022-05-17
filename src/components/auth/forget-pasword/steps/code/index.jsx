import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import { translate } from "react-switch-lang";

const Code = ({ form, handleForm, ...props }) => {
  return (
    <>
      <FormGroup>
        <Label className="col-form-label">Código Recebido</Label>
        <Input
          className="form-control"
          type="text"
          max={4}
          required=""
          placeholder=""
          name="code"
          onChange={handleForm}
          value={form?.code || ""}
        />
      </FormGroup>
    </>
  );
};

export default translate(Code);
