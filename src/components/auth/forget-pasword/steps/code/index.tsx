import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import goBackArrow from '../../../../../assets/images/svg/goBackArrow.svg';
import MailIcon from '../../../../../assets/images/svg/Mail';
import Button from '../../../../Utils/Button';

interface EmailObject {
  email: string;
}

interface StateProps {
  form: EmailObject;
}

const Code = (props: StateProps): JSX.Element => {
  const history = useNavigate();
  const goBack = (): void => {
    history('/');
    history(0);
  };
  return (
    <>
      <Row>
        <Col md="12">
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
              <p style={{ width: '450px' }} className="normalText">
                Enviamos o link de recuperação de senha para o seu e-mail <b>{props.form.email}</b>
              </p>
            </div>
          </div>
        </Col>
      </Row>

      <div className="d-flex justify-content-center" style={{ marginTop: '22px' }}>
        <MailIcon />
      </div>
      <Button
        className="mainButton"
        theme="red"
        size="lg"
        style={{ width: '100%', marginTop: '140px' }}
      >
        Ir para a página de entrada
      </Button>
      <div className="d-flex justify-content-center subTitleMain">
        <div style={{ marginTop: '40px' }}>Não recebeu o link de recuperação?&nbsp;</div>
        <a
          className="d-flex forgotPassword"
          style={{ cursor: 'pointer', color: '#B2140C', position: 'relative' }}
        >
          Reenviar
        </a>
      </div>
    </>
  );
};

export default Code;
