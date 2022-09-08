import React from 'react';
import { useHistory } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { Button } from '@/components';
import goBackArrow from '../../../../../assets/images/svg/goBackArrow.svg';
import MailIcon from '../../../../../assets/images/svg/Mail';

interface EmailObject {
  email: string;
}

interface StateProps {
  form: EmailObject;
}

interface DispatchProps {
  handleReSend(): void;
}

type Props = StateProps & DispatchProps;

const Code = (props: Props): JSX.Element => {
  // const dispatch = useDispatch();
  const history = useHistory();
  const goBack = (): void => {
    history.push('/');
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
        title="Ir para a página de entrada"
        onClick={(): void => undefined}
      />
      <div className="d-flex justify-content-center subTitleMain">
        <div style={{ marginTop: '40px' }}>Não recebeu o link de recuperação?&nbsp;</div>
        <a
          className="d-flex forgotPassword"
          style={{ cursor: 'pointer', color: '#B2140C', position: 'relative' }}
          onClick={props.handleReSend}
        >
          Reenviar
        </a>
      </div>
    </>
  );
};

export default Code;
