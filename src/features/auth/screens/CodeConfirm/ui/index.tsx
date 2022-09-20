import React from 'react';
// import { Col, Container } from 'reactstrap';
import goBackArrow from '@/assets/images/svg/goBackArrow.svg';
import MailIcon from '@/assets/images/svg/Mail';
import { Button, Loading } from '@/components';
import { Col, Container } from 'reactstrap';
import { States } from '../../Login/ui';

interface CodeConfirmContainerProps {
  onGoToLogin: () => void;
  onGoToForgotPassword: () => void;
  email: string;
  resendCode: () => void;
  state: States;
}

export const CodeConfirmContainer: React.FC<CodeConfirmContainerProps> = ({
  state,
  email,
  onGoToLogin,
  onGoToForgotPassword,
  resendCode,
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
                onClick={onGoToForgotPassword}
              />
              <div style={{ display: 'grid' }}>
                <p style={{ width: '450px' }} className="normalText">
                  Enviamos o link de recuperação de senha para o seu e-mail {email}
                </p>
              </div>
            </div>

            <div className="d-flex justify-content-center" style={{ marginTop: '22px' }}>
              <MailIcon />
            </div>
            <Button
              className="mainButton"
              theme="red"
              size="lg"
              style={{ width: '100%', marginTop: '140px' }}
              title="Ir para a página de entrada"
              onClick={onGoToLogin}
            />
            <div className="d-flex justify-content-center subTitleMain">
              <div style={{ marginTop: '40px' }}>Não recebeu o link de recuperação?&nbsp;</div>
              <a
                className="d-flex forgotPassword"
                style={{ cursor: 'pointer', color: '#B2140C', position: 'relative' }}
                onClick={resendCode}
              >
                Reenviar
              </a>
            </div>
          </div>
        </Col>
      </Container>
    </div>
  </>
);
