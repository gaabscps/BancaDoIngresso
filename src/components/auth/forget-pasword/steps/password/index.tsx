import React, { ChangeEvent } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

interface ConfirmPassword {
  password: string;
  confirmPassword: string;
}

interface StateProps {
  form: ConfirmPassword;
}
interface DispatchProps {
  handleForm(e: ChangeEvent<HTMLInputElement>): void;
}

type Props = StateProps & DispatchProps;

const Password = (props: Props): JSX.Element => (
  <>
    <FormGroup>
      <Label className="col-form-label">Senha</Label>
      <Input
        className="form-control"
        type="password"
        name="password"
        required={true}
        placeholder=""
        onChange={props.handleForm}
        value={props.form.password}
      />
    </FormGroup>
    <FormGroup>
      <Label className="col-form-label">Confirme sua senha</Label>
      <Input
        className="form-control"
        type="password"
        name="confirmPassword"
        required={true}
        placeholder=""
        onChange={props.handleForm}
        value={props.form.confirmPassword}
      />
    </FormGroup>
  </>
);

export default Password;
