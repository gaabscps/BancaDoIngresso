import React, { ChangeEvent } from 'react';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { cpfMask } from '../../../../../utils/input-mask';
import goBackArrow from '../../../../../assets/images/svg/goBackArrow.svg';
import idCard from '../../../../../assets/images/svg/idCard.svg';

interface CPFObject {
  cpf: string;
}

interface StateProps {
  form: CPFObject;
}

interface DispatchProps {
  handleForm(e: ChangeEvent<HTMLInputElement>): void;
}

type Props = StateProps & DispatchProps;

const Cpf = (props: Props): JSX.Element => {
  const history = useNavigate();
  const goBack = (): void => {
    history('/');
  };
  return (
    <>
      <div style={{ display: '-webkit-box' }}>
        <img
          src={goBackArrow}
          style={{
            paddingRight: '25px',
            paddingTop: '10px',
            cursor: 'pointer',
          }}
          onClick={goBack}
        />
        <div style={{ display: 'grid' }}>
          <h4 className="forgotPasswordLabel">Esqueceu sua senha?</h4>
        </div>
      </div>
      <p style={{ width: '450px' }} className="subTitleMain">
        Digite abaixo o seu CPF para receber o link de recuperação de senha em seu e-mail cadastrado
      </p>
      <FormGroup>
        <Label className="col-form-label fieldLabel">
          <img className="mr-2" src={idCard} />
          Seu CPF
        </Label>
        <Input
          name="cpf"
          className="form-control loginForm"
          required={true}
          placeholder="Digite seu CPF"
          value={props.form?.cpf ? cpfMask(props.form?.cpf) : ''}
          onChange={props.handleForm}
          maxLength={14}
        />
      </FormGroup>
      <Button color="primary" className="btn-block mainButton" style={{ marginTop: '200px' }}>
        <div className="loginFormText">Enviar link de recuperação</div>
      </Button>
    </>
  );
};

export default Cpf;
