import React from 'react';
import { Col, Form, Container } from 'reactstrap';
import { UseFormReturn } from '@/hooks/useForm';
// import SuccessComponent from '../success';
import { Button, InputText } from '@/components';
import loginLock from '@/assets/images/svg/loginLock.svg';
import eye from '@/assets/images/login/eye.png';
import closeEye from '@/assets/images/login/closeEye.png';
import { SuccessContent } from '@/features/auth/components/ModalSuccess';
import { Dialog } from '@/components/Dialog';
import { States } from '../../Login/ui';

interface NewPasswordContainerProps
  extends Pick<UseFormReturn, 'formData' | 'formErrors' | 'onChangeFormInput'> {
  state: States;
  shouldShowPasswordToText: boolean;
  shouldShowConfirmPasswordToText: boolean;
  visible: boolean;
  onTogglePasswordToText: () => void;
  onToggleConfirmPasswordToText: () => void;
  onSubmit: () => void;
  onToggle: () => void;
  onGoToDashboard: () => void;
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  document = 'document',
  password = 'password',
  confirmPassword = 'confirmPassword',
}

export const NewPasswordContainer: React.FC<NewPasswordContainerProps> = ({
  state,
  shouldShowPasswordToText,
  shouldShowConfirmPasswordToText,
  formData,
  formErrors,
  visible,
  onChangeFormInput,
  onTogglePasswordToText,
  onToggleConfirmPasswordToText,
  onSubmit,
  onToggle,
  onGoToDashboard,
}) => (
  <>
    <Dialog title="" visible={visible} onClose={onToggle} actions={[]}>
      <SuccessContent onGoToDashboard={onGoToDashboard} />
    </Dialog>
    <div className="body-login">
      <Container>
        <Col className="login-card">
          <div className="login-main login-tab">
            <div style={{ display: '-webkit-box' }}>
              <div style={{ display: 'grid' }}>
                <h4 className="forgotPasswordLabel">Defina a sua nova senha</h4>
              </div>
            </div>
            <p style={{ width: '450px' }} className="subTitleMain">
              Digite nos campos abaixo a sua nova senha
            </p>

            <Form
              className="loginCard"
              noValidate={true}
              onSubmit={(e): void => {
                e.preventDefault();
                onSubmit();
              }}
            >
              <div>
                <InputText
                  name="password"
                  label={
                    <div>
                      <img className="mr-2" src={loginLock} />
                      {'Senha'}
                    </div>
                  }
                  type={shouldShowPasswordToText ? 'text' : 'password'}
                  placeholder="*****"
                  value={formData[FormInputName.password]}
                  maxLength={15}
                  onChange={e => onChangeFormInput(FormInputName.password)(e.target.value)}
                  error={formErrors.password && formErrors.password[0]}
                  renderForward={
                    <div
                      className="new-password-show-hide"
                      onClick={onTogglePasswordToText}
                      style={{ cursor: 'pointer' }}
                    >
                      {shouldShowPasswordToText ? (
                        <img
                          className="d-flex justify-content-center align-items-center passwordIcon"
                          src={eye}
                        />
                      ) : (
                        <img
                          className="d-flex justify-content-center align-items-center passwordIcon"
                          src={closeEye}
                        />
                      )}
                    </div>
                  }
                />
              </div>
              <div className="auxGrayText" style={{ marginTop: '15px' }}>
                Sua senha deve conter:{' '}
              </div>
              <div className="auxGrayText" style={{ marginTop: '15px' }}>
                • No mínimo 8 caracteres;
                <br /> • Pelo menos um número;
                <br /> • Pelo menos um caractere maiúsculo.{' '}
              </div>
              <div style={{ marginTop: '30px' }}>
                <InputText
                  label="Confirme a sua nova senha"
                  key={2}
                  name="confirmPassword"
                  className="form-control loginForm"
                  required={true}
                  placeholder="12345"
                  value={formData[FormInputName.confirmPassword]}
                  onChange={e => onChangeFormInput(FormInputName.confirmPassword)(e.target.value)}
                  type={shouldShowConfirmPasswordToText ? 'text' : 'password'}
                  renderForward={
                    <div
                      className="new-password-confirm-show-hide"
                      onClick={onToggleConfirmPasswordToText}
                    >
                      {shouldShowConfirmPasswordToText ? <img src={eye} /> : <img src={closeEye} />}
                    </div>
                  }
                />
              </div>
              <Button
                theme="red"
                title="Alterar minha senha"
                className="mainButton w-100"
                style={{ width: '100%' }}
                disabled={
                  formData[FormInputName.password] !== formData[FormInputName.confirmPassword] ||
                  state === States.loading
                }
                onClick={onSubmit}
              />
            </Form>
          </div>
        </Col>
      </Container>
    </div>
  </>
);
