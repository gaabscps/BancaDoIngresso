import React from 'react';
import { Col, Form, Container, Row } from 'reactstrap';
import { UseFormReturn } from '@/hooks/useForm';
import { Button, InputText, Loading } from '@/components';
import logoBanca from '@/assets/images/logo/logoBanca.png';
import idCard from '@/assets/images/svg/idCard.svg';
import loginLock from '@/assets/images/svg/loginLock.svg';
import eye from '@/assets/images/login/eye.png';
import closeEye from '@/assets/images/login/closeEye.png';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
  error = 'error',
}

interface LoginContainerProps
  extends Pick<UseFormReturn, 'formData' | 'formErrors' | 'onChangeFormInput'> {
  state: States;
  shouldShowPasswordToText: boolean;
  onTogglePasswordToText: () => void;
  onSubmit: () => void;
  onGoToForgotPassword: () => void;
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  document = 'document',
  password = 'password',
}

export const LoginContainer: React.FC<LoginContainerProps> = ({
  state,
  shouldShowPasswordToText,
  formData,
  formErrors,
  onChangeFormInput,
  onSubmit,
  onTogglePasswordToText,
  onGoToForgotPassword,
}) => (
  <React.Fragment>
    <Loading isVisible={state === States.loading} />

    <div className="body-login">
      <Container>
        <Col className="login-card">
          <div className="login-main login-tab">
            <a className="logo text-center" href="/">
              <img className="img-fluid for-light" src={logoBanca} alt="login page" />
            </a>
            <Form
              className="loginCard"
              noValidate={true}
              onSubmit={(e): void => {
                e.preventDefault();
                onSubmit();
              }}
            >
              <Row>
                <Col style={{ marginLeft: '-6px' }}>
                  <div style={{ marginBottom: '50px', display: 'contents' }}>
                    <div className="pageTitleLogin">Seja bem-vindo(a)! Entre com a sua conta</div>
                    <div className="subTitleMain mb-2">
                      Digite abaixo o seu CPF e sua senha para entrar
                    </div>
                  </div>
                </Col>
              </Row>
              <div className="flex-column form-row ">
                <div style={{ marginBottom: '-10px' }}>
                  <Row>
                    <Col className="loginField" style={{ marginTop: '20px' }}>
                      <InputText
                        name="document"
                        label={
                          <div>
                            <img className="mr-2" src={idCard} />
                            {'Seu CPF'}
                          </div>
                        }
                        placeholder="000.000.000-00"
                        maxLength={14}
                        value={formData[FormInputName.document]}
                        onChange={e => onChangeFormInput(FormInputName.document)(e.target.value)}
                        error={formErrors.document && formErrors.document[0]}
                      />
                    </Col>
                  </Row>
                </div>
                <div style={{ marginBottom: '100px' }}>
                  <Row>
                    <Col>
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
                            className="show-hide"
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
                    </Col>
                  </Row>
                </div>
              </div>

              <Button
                title="Entrar"
                disabled={
                  !formData[FormInputName.document] ||
                  !formData[FormInputName.password] ||
                  state === States.loading
                }
                onClick={onSubmit}
                theme="red"
                size="xl"
              />
              <div className="d-flex justify-content-center align-items-center forgotPassword">
                <a
                  onClick={onGoToForgotPassword}
                  className="link"
                  style={{ cursor: 'pointer', color: '#B2140C' }}
                >
                  Esqueceu a sua senha?
                </a>
              </div>
            </Form>
          </div>
        </Col>
      </Container>
    </div>
  </React.Fragment>
);
