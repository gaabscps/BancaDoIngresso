import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, FormGroup, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { ApplicationState } from '../../../store';
import logoBanca from '../../../assets/images/logo/logoBanca.png';
import { setAuthLocalStorage, isAuthenticated } from '../../../helpers/localStorage';
import Loader from '../../../layout/loader';
import CpfComponent from './steps/cpf';
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
  cpf: string;
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
}

const ForgetPassword = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useNavigate();
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

  const handleCpf = (): void => {
    dispatch(recoverPasswordRequest(form.cpf));
  };

  const handleCode = async (): Promise<void> => {
    const chanagePassword: ChangePassword = {
      token: form.code,
      password: form.password,
      confirmPassword: form.confirmPassword,
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
        handleCpf();
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
      <div className="login-card" style={{ padding: '75px' }}>
        <div>
          <div className="login-main login-tab">
            <a className="logo text-center">
              <img className="img-fluid for-light" src={logoBanca} alt="looginpage" />
            </a>
            <Form className="theme-form " onSubmit={handleStep}>
              <div style={{ display: 'grid', justifyContent: 'center' }}>
                {step === 0 && <CpfComponent form={form} handleForm={handleForm} />}
                {step === 1 && <CodeComponent />}
                {step === 2 && <PasswordComponent form={form} handleForm={handleForm} />}
                {step === 3 && <SuccessComponent />}
                {step !== 3 && (
                  <FormGroup className="mb-0 mt-4">
                    {/* {step === 0 && (
                    <Button
                      onClick={() => history.push("/")}
                      color="primary"
                      outline
                      className="btn-block"
                    >
                      Voltar
                    </Button>
                  )} */}
                    {step !== 0 && (
                      <Button
                        onClick={() => setStep(0)}
                        style={{ color: '#B2140C', backgroundColor: '#B2140C' }}
                        // className="btn-block"
                      >
                        <div className="loginFormText">Início</div>
                      </Button>
                    )}
                  </FormGroup>
                )}
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
