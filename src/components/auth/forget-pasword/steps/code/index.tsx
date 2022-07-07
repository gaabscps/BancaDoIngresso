import React, { ChangeEvent } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

interface CodeObject {
  code: string;
}

interface StateProps {
  form: CodeObject;
}
interface DispatchProps {
  handleForm(e: ChangeEvent<HTMLInputElement>): void;
}

type Props = StateProps & DispatchProps;

const Code = (props: Props): JSX.Element => (
  <>
    <FormGroup>
      <Label className="col-form-label">Código Recebido</Label>
      <Input
        className="form-control"
        type="text"
        max={4}
        required={true}
        placeholder=""
        name="code"
        onChange={props.handleForm}
        value={props.form.code}
      />
    </FormGroup>
  </>
);

export default Code;
