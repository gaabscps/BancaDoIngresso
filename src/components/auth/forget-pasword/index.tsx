import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, FormGroup, Button } from 'reactstrap';
// import { translate, setLanguage } from "react-switch-lang";
import { useNavigate } from 'react-router-dom';
// import Cookies from "universal-cookie";
import { ApplicationState } from '../../../store';
import logoBanca from '../../../assets/images/logo/logoBanca.png';
import { setAuthLocalStorage, isAuthenticated } from '../../../helpers/localStorage';
import Loader from '../../../layout/loader';
import EmailComponent from './steps/email';
import CodeComponent from './steps/code';
import PasswordComponent from './steps/password';
import SuccessComponent from './steps/success';
import {
  recoverPasswordRequest,
  changePasswordRequest,
  loginRequest,
} from '../../../store/ducks/auth/actions';
import { AuthState } from '../../../store/ducks/auth/types';
import ChangePassword from '../../../entities/ChangePassword';

interface RecoveryPassword {
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
}

const ForgetPassword = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [titles] = useState([
    'Digite seu e-mail para receber o código de recuperação',
    'Digite o código de validação que foi enviado por e-mail para continuar',
    'Sua nova senha deve ser diferente de uma senha anterior',
  ]);
  const [labelButton] = useState(['Enviar Código', 'Confirmar', 'Finalizar']);
  const [form, setForm] = useState<RecoveryPassword>({} as RecoveryPassword);
  const [step, setStep] = useState<number>(0);

  // const cookies = new Cookies();

  const auth = useSelector<ApplicationState, AuthState>(store => store.auth);

  if (!auth.loading && !auth.error) {
    if (auth.data && (auth.data.changePassword || auth.data.recoverPassword)) {
      setStep(step + 1);
    } else if (auth.data.login) {
      setAuthLocalStorage(auth.data.login);
      window.location.href = '/';
    }
  }

  const handleForm = (e: ChangeEvent<HTMLInputElement>): void => {
    const { currentTarget } = e;
    const { value, name } = currentTarget;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleEmail = (): void => {
    dispatch(recoverPasswordRequest('000.000.000-00'));
  };

  const handleCode = async (): Promise<void> => {
    const chanagePassword: ChangePassword = {
      token: form.code,
      password: form.password,
      confirmPassword: form.password,
    };
    dispatch(changePasswordRequest(chanagePassword));
  };

  const handleLogin = (): void => {
    dispatch(loginRequest('', form.password));
  };

  const handlePassword = (): void => {
    handleLogin();
  };

  const handleStep = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (auth.loading) {
      return;
    }
    switch (step) {
      case 0:
        handleEmail();
        break;
      case 1:
        handleCode();
        break;
      case 2:
        handlePassword();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (isAuthenticated()) {
      history('/dashboard/admin');
    }
  }, [history]);

  return (
    <>
      <Loader />
      <div className="login-card">
        <div>
          <div className="login-main login-tab">
            <a className="logo text-center" href="#javascript">
              <img className="img-fluid for-light" src={logoBanca} alt="looginpage" />
            </a>
            <Form className="theme-form" onSubmit={handleStep}>
              {step !== 3 && (
                <>
                  <h5 className="text-center mb-2 f-w-100">Passo {step + 1} de 3</h5>
                  <h4>Esqueceu sua senha?</h4>
                  <p>{titles[step]}</p>
                </>
              )}
              {step === 0 && <EmailComponent form={form} handleForm={handleForm} />}
              {step === 1 && <CodeComponent form={form} handleForm={handleForm} />}
              {step === 2 && <PasswordComponent form={form} handleForm={handleForm} />}
              {step === 3 && <SuccessComponent />}
              {step !== 3 && (
                <FormGroup className="mb-0 mt-4">
                  <Button color="primary" className="btn-block">
                    {labelButton[step]}
                  </Button>
                  {step === 0 && (
                    <Button
                      onClick={() => history('/')}
                      color="primary"
                      outline
                      className="btn-block"
                    >
                      Voltar
                    </Button>
                  )}
                  {step !== 0 && (
                    <Button
                      onClick={() => setStep(0)}
                      color="primary"
                      outline
                      className="btn-block"
                    >
                      Início
                    </Button>
                  )}
                </FormGroup>
              )}
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
