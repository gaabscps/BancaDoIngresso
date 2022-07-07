import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import goBackArrow from '../../../../../assets/images/svg/goBackArrow.svg';
import MailIcon from '../../../../../assets/images/svg/Mail';

const Code = (): JSX.Element => {
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
          <p style={{ width: '450px' }} className="subTitleMain">
            Enviamos o link de recuperação de senha para o seu e-mail <b>da***@gmail.com</b>
          </p>
        </div>
      </div>
      <div className="d-flex justify-content-center" style={{ marginTop: '22px' }}>
        <MailIcon />
      </div>
      <Button color="primary" className="btn-block mainButton" style={{ marginTop: '140px' }}>
        <div className="loginFormText">Ir para a página de entrada</div>
      </Button>
    </>
  );
};

export default Code;
