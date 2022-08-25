import React, { ChangeEvent } from 'react';
import { Label, Input, FormGroup, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { cpfMask } from '../../../../../utils/input-mask';
import goBackArrow from '../../../../../assets/images/svg/goBackArrow.svg';
import idCard from '../../../../../assets/images/svg/idCard.svg';
import Button from '../../../../Utils/Button';

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
      <Row>
        <Col md="12">
          <div style={{ marginBottom: '50px', display: 'contents' }}>
            <div style={{ maxWidth: '450px' }} className="subTitleMain mb-2">
              Digite abaixo o seu CPF para receber o link de recuperação de senha em seu e-mail
              cadastrado
            </div>
          </div>
        </Col>
      </Row>
      <FormGroup>
        <Label
          className="col-form-label fieldLabel"
          style={{ marginBottom: '10px', marginTop: '10px' }}
        >
          <img className="mr-2" src={idCard} />
          Seu CPF
        </Label>
        <Input
          name="cpf"
          className="form-control loginForm"
          required={true}
          placeholder="123.456.789-00"
          value={props.form?.cpf ? cpfMask(props.form?.cpf) : ''}
          onChange={props.handleForm}
          maxLength={14}
        />
        <Button
          className="mainButton"
          theme="red"
          size="lg"
          style={{ width: '100%', marginTop: '200px' }}
          disabled={!props.form?.cpf}
        >
          Enviar link de recuperação
        </Button>
      </FormGroup>
    </>
  );
};

export default Cpf;
