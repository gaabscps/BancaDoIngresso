import React, { ChangeEvent, useEffect, useState } from 'react';
import { FormGroup, Label, Input, Container, Col, Row } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { Button } from '@/components/Button';
import loginLock from '@/assets/images/svg/loginLock.svg';
import eye from '@/assets/images/login/eye.png';
import closeEye from '@/assets/images/login/closeEye.png';
import { REACT_APP_AUTH } from '@/utils/config';
import { getBoolean } from '@/helpers/common/localStorage';
import SuccessComponent from '../success';

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

const Password = (props: Props): JSX.Element => {
  const [togglePassword, setTogglePassword] = useState(false);
  const [showSucessPasswordModal, setShowSucessPasswordModal] = useState(false);
  const history = useHistory();

  const handleNext = (): void => {
    if (getBoolean(String(REACT_APP_AUTH))) {
      history.push('/dashboard/admin');
    }
  };

  const HideShowPassword = (tPassword: boolean): void => {
    setTogglePassword(!tPassword);
  };

  const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);

  const HideShowConfirmPassword = (tConfirmPassword: boolean): void => {
    setToggleConfirmPassword(!tConfirmPassword);
  };

  useEffect(() => {
    if (getBoolean(String(REACT_APP_AUTH))) {
      setShowSucessPasswordModal(true);
    }
  }, [showSucessPasswordModal]);

  return (
    <>
      <SuccessComponent
        show={showSucessPasswordModal}
        setShowSucessPasswordModal={setShowSucessPasswordModal}
      />
      <Container>
        <Col>
          <Row>
            <Col md="12">
              <div style={{ display: '-webkit-box' }}>
                <div style={{ display: 'grid' }}>
                  <h4 className="forgotPasswordLabel">Defina a sua nova senha</h4>
                </div>
              </div>
              <p style={{ width: '450px' }} className="subTitleMain">
                Digite nos campos abaixo a sua nova senha
              </p>
            </Col>
          </Row>
          <FormGroup>
            <div>
              <Label className="col-form-label fieldLabel">
                <img className="mr-2" src={loginLock} />
                Sua nova senha
              </Label>
              <Input
                key={1}
                name="password"
                className="form-control loginForm"
                required={true}
                placeholder="12345"
                value={props.form?.password}
                onChange={e => props.handleForm(e)}
                type={togglePassword ? 'text' : 'password'}
              />
              <div key={1} className="show-hide" style={{ marginTop: '95px', cursor: 'pointer' }}>
                {togglePassword ? (
                  <img
                    onClick={() => HideShowPassword(togglePassword)}
                    className="d-flex justify-content-center align-items-center passwordIcon"
                    src={eye}
                  />
                ) : (
                  <img
                    onClick={() => HideShowPassword(togglePassword)}
                    className="d-flex justify-content-center align-items-center passwordIcon"
                    src={closeEye}
                  />
                )}
              </div>
              <div className="auxGrayText" style={{ marginTop: '15px' }}>
                Sua senha deve conter:{' '}
              </div>
              <div className="auxGrayText" style={{ marginTop: '15px' }}>
                • No mínimo 8 caracteres;
                <br /> • Pelo menos um número;
                <br /> • Pelo menos um caractere maiúsculo.{' '}
              </div>
            </div>
            <div style={{ marginTop: '30px' }}>
              <Label className="col-form-label fieldLabel">
                <img className="mr-2" src={loginLock} />
                Confirme a sua nova senha
              </Label>
              <Input
                key={2}
                name="confirmPassword"
                className="form-control loginForm"
                required={true}
                placeholder="12345"
                value={props.form?.confirmPassword}
                onChange={props.handleForm}
                type={toggleConfirmPassword ? 'text' : 'password'}
              />
              <div key={2} className="show-hide" style={{ cursor: 'pointer', marginTop: '360px' }}>
                {toggleConfirmPassword ? (
                  <img
                    onClick={() => HideShowConfirmPassword(toggleConfirmPassword)}
                    className="d-flex justify-content-center align-items-center passwordIcon"
                    src={eye}
                  />
                ) : (
                  <img
                    onClick={() => HideShowConfirmPassword(toggleConfirmPassword)}
                    className="d-flex justify-content-center align-items-center passwordIcon"
                    src={closeEye}
                  />
                )}
              </div>
            </div>
          </FormGroup>
          <Button
            className="mainButton"
            theme="red"
            size="lg"
            style={{ width: '100%', marginTop: '90px' }}
            disabled={!(props.form?.password && props.form?.confirmPassword)}
            onClick={() => handleNext()}
            title="Alterar a minha senha"
          />
        </Col>
      </Container>
    </>
  );
};

export default Password;
