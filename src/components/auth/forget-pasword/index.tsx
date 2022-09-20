import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, FormGroup, Container, Col } from 'reactstrap';
import { useLocation, useHistory } from 'react-router-dom';
// import { URLSearchParams } from 'url';
import { Loading } from '@/components';
import { ApplicationState } from '../../../store';
import logoBanca from '../../../assets/images/logo/logoBanca.png';
// import { setAuthLocalStorage } from '../../../helpers/localStorage';
import CpfComponent from './steps/cpf';
import CodeComponent from './steps/code';
import PasswordComponent from './steps/password';
import SuccessComponent from '../../../features/auth/components/ModalSuccess';
import {
  recoverPasswordRequest,
  changePasswordRequest,
  loginRequest,
} from '../../../store/ducks/auth/actions';
import { AuthState } from '../../../store/ducks/auth/types';
import ChangePassword from '../../../model/ChangePassword';

interface RecoveryPassword {
  cpf: string;
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
}

const ForgetPassword = (): JSX.Element => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const [form, setForm] = useState<RecoveryPassword>({} as RecoveryPassword);
  const [step, setStep] = useState<number>(0);
  const [showSucessPasswordModal, setShowSucessPasswordModal] = useState(false);

  // const cookies = new Cookies();

  const auth = useSelector<ApplicationState, AuthState>(store => store.auth);

  const chanagePassword: ChangePassword = {
    token: form.code,
    password: form.password,
    confirmPassword: form.confirmPassword,
  };

  const login = (cpf: string): void => {
    dispatch(loginRequest(cpf, form.password));
  };

  if (!auth.loading && !auth.error) {
    if (auth.data) {
      if (auth.data.recoverPassword && auth.data.recoverPassword.email && step === 0) {
        const newForm = {
          ...form,
          email: auth.data.recoverPassword.email,
        };
        setForm(newForm);
        setStep(1);
      } else if (auth.data.changePassword && auth.data.changePassword.login && step === 2) {
        const newForm = {
          ...form,
          cpf: auth.data.changePassword.login,
        };
        setForm(newForm);
        // setStep(2);
        setShowSucessPasswordModal(true);

        login(auth.data.changePassword.login);
      }
    }
    // if (auth.data.login) {
    //   setAuthLocalStorage(auth.data.login);
    //   window.location.href = '/';
    // }
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

  const handleCode = async (data: ChangePassword): Promise<void> => {
    dispatch(changePasswordRequest(data));
  };

  const handleReSend = (): void => {
    dispatch(recoverPasswordRequest(form.cpf));
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
        history.push('/');
        break;
      case 2:
        handleCode(chanagePassword);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');
    if (code && step === 0) {
      const newForm = {
        ...form,
        code,
      };
      setForm(newForm);
      setStep(2);
    }
  }, [history]);

  return (
    <>
      <SuccessComponent
        show={showSucessPasswordModal}
        setShowSucessPasswordModal={setShowSucessPasswordModal}
      />
      <Loading isVisible={auth.loading} />
      <div className="body-login">
        <Container>
          <Col className="login-card">
            <div className="login-main login-tab">
              <a className="logo text-center" href="#javascript">
                <img className="img-fluid for-light" src={logoBanca} alt="looginpage" />
              </a>
              <Form className="theme-form loginCard" onSubmit={handleStep}>
                <div style={{ display: 'grid' }}>
                  {step === 0 && <CpfComponent form={form} handleForm={handleForm} />}
                  {/* {step === 0 && <PasswordComponent form={form} handleForm={handleForm} />} */}
                  {/* {step === 0 && <PasswordComponent form={form} handleForm={handleForm} />} */}
                  {step === 1 && <CodeComponent form={form} handleReSend={handleReSend} />}
                  {step === 2 && <PasswordComponent form={form} handleForm={handleForm} />}
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
                    </FormGroup>
                  )}
                </div>
              </Form>
            </div>
          </Col>
        </Container>
      </div>
    </>
  );
};

export default ForgetPassword;
