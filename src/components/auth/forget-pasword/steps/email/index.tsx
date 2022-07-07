import React, { ChangeEvent } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import mail from '../../../../../assets/images/login/mail.svg';

interface EmailObject {
  email: string;
}

interface StateProps {
  form: EmailObject;
}

interface DispatchProps {
  handleForm(e: ChangeEvent<HTMLInputElement>): void;
}

type Props = StateProps & DispatchProps;

const Email = (props: Props): JSX.Element => (
  <>
    <FormGroup>
      <Label className="col-form-label">
        <img className="mr-2" src={mail} alt="" />
        Seu e-mail
      </Label>
      <Input
        className="form-control"
        type="email"
        name="email"
        required={true}
        placeholder=""
        onChange={props.handleForm}
        value={props.form.email}
      />
    </FormGroup>
  </>
);

export default Email;
