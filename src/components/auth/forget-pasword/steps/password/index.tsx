import React, { ChangeEvent } from 'react';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import loginLock from '../../../../../assets/images/svg/loginLock.svg';

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
    <div style={{ display: '-webkit-box' }}>
      <div style={{ display: 'grid' }}>
        <h4 className="forgotPasswordLabel">Defina a sua nova senha</h4>
      </div>
    </div>
    <p style={{ width: '450px' }} className="subTitleMain">
      Digite nos campos abaixo a sua nova senha
    </p>
    <FormGroup>
      <div>
        <Label className="col-form-label fieldLabel">
          <img className="mr-2" src={loginLock} />
          Sua nova senha
        </Label>
        <Input
          name="password"
          className="form-control loginForm"
          required={true}
          placeholder="Digite sua nova senha"
          value={props.form?.password}
          onChange={e => props.handleForm(e)}
        />
        <div className="auxGrayText" style={{ marginTop: '15px' }}>
          *A sua senha deve conter 6 dígitos numéricos*{' '}
        </div>
      </div>
      <div style={{ marginTop: '30px' }}>
        <Label className="col-form-label fieldLabel">
          <img className="mr-2" src={loginLock} />
          Confirme a sua nova senha
        </Label>
        <Input
          name="confirmPassword"
          className="form-control loginForm"
          required={true}
          placeholder="Digite sua nova senha novamente"
          value={props.form?.confirmPassword}
          onChange={props.handleForm}
        />
      </div>
    </FormGroup>
    <Button color="primary" className="btn-block mainButton" style={{ marginTop: '90px' }}>
      <div className="loginFormText">Alterar a minha senha</div>
    </Button>
  </>
);

export default Password;
