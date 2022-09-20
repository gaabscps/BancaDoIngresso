import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import { Button, InputText, Loading } from '@/components';
import idCard from '@/assets/images/svg/idCard.svg';
import goBackArrow from '@/assets/images/svg/goBackArrow.svg';
import { UseFormReturn } from '@/hooks/useForm';

// eslint-disable-next-line no-shadow
export enum States {
  default = 'default',
  loading = 'loading',
  error = 'error',
}

interface ForgotPasswordContainerProps
  extends Pick<UseFormReturn, 'formData' | 'formErrors' | 'onChangeFormInput'> {
  state: States;
  onSubmit: () => void;
  onGoToLogin: () => void;
  // onGoToForgotPassword: () => void;
  resendCode?: () => void;
}

// eslint-disable-next-line no-shadow
export enum FormInputName {
  document = 'document',
}
export const ForgotPasswordContainer: React.FC<ForgotPasswordContainerProps> = ({
  state,
  formData,
  formErrors,
  onChangeFormInput,
  onGoToLogin,
  onSubmit,
  // onGoToForgotPassword,
}) => (
  <>
    <Loading isVisible={state === States.loading} />
    <div className="body-login">
      <Container>
        <Col className="login-card">
          <div className="login-main login-tab">
            <div style={{ display: '-webkit-box' }}>
              <img
                src={goBackArrow}
                style={{
                  paddingRight: '25px',
                  paddingTop: '10px',
                  cursor: 'pointer',
                }}
                onClick={onGoToLogin}
              />
              <div style={{ display: 'grid' }}>
                <h4 className="forgotPasswordLabel">Esqueceu sua senha?</h4>
              </div>
            </div>
            <Row>
              <Col md="12">
                <div style={{ marginBottom: '50px', display: 'contents' }}>
                  <div style={{ maxWidth: '450px' }} className="subTitleMain mb-2">
                    Digite abaixo o seu CPF para receber o link de recuperação de senha em seu
                    e-mail cadastrado
                  </div>
                </div>
              </Col>
            </Row>
            <InputText
              name="document"
              label={
                <div>
                  <img className="mr-2" src={idCard} />
                  {'Seu CPF'}
                </div>
              }
              className="form-control loginForm"
              placeholder="123.456.789-00"
              maxLength={14}
              value={formData[FormInputName.document]}
              onChange={e => onChangeFormInput(FormInputName.document)(e.target.value)}
              error={formErrors.document && formErrors.document[0]}
            />
            <Button
              className="mainButton"
              theme="red"
              size="lg"
              style={{ width: '100%', marginTop: '200px' }}
              // disabled={!props.form?.cpf}
              title="Enviar link de recuperação"
              onClick={onSubmit}
            />
          </div>
        </Col>
      </Container>
    </div>
  </>
);
