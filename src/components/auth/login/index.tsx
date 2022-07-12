import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { setAuthLocalStorage, getLocalStorage } from '../../../helpers/localStorage';
import Loader from '../../../layout/loader';
import { cpfMask } from '../../../utils/input-mask';
import logoBanca from '../../../assets/images/logo/logoBanca.png';
import idCard from '../../../assets/images/svg/idCard.svg';
import loginLock from '../../../assets/images/svg/loginLock.svg';
import eye from '../../../assets/images/login/eye.png';
import { ApplicationState } from '../../../store';
import { loginRequest } from '../../../store/ducks/auth/actions';
import { AuthState } from '../../../store/ducks/auth/types';
import { setAuthSessionStorage } from '../../../helpers/sessionStorage';
import Auth from '../../../entities/Auth';

interface Loginstate {
  username: string;
  password: string;
}

const Login = (): JSX.Element => {
  const auth = useSelector<ApplicationState, AuthState>(store => store.auth);
  const [isCheck, setIsCheck] = useState(false);
  if (!auth.loading && !auth.error) {
    if (auth.data && auth.data.login) {
      setAuthLocalStorage(auth.data.login, isCheck);
      window.location.href = '/';
    }
  }
  const history = useNavigate();
  const dispatch = useDispatch();
  const [togglePassword, setTogglePassword] = useState(false);
  // const [values, setValues] = useState({ cpf: "" });
  const [form, setForm] = useState({} as Loginstate);
  const [errors] = useState({
    username: false,
    password: false,
  });

  const cookies = new Cookies();
  const HideShowPassword = (tPassword: boolean): void => {
    setTogglePassword(!tPassword);
  };

  useEffect(() => {
    if (getLocalStorage('token')) {
      setAuthSessionStorage({
        token: getLocalStorage('token') as string,
        user: getLocalStorage('user') as string,
      } as unknown as Auth);
      history('/dashboard/admin');
    }
  }, [cookies, history]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    dispatch(loginRequest(form.username, form.password));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { currentTarget } = e;
    const { name, value } = currentTarget;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <>
      <Loader />
      <div className="login-card">
        <div>
          <div className="login-main login-tab">
            <a className="logo text-center" href="#javascript">
              <img className="img-fluid for-light" src={logoBanca} alt="looginpage" />
            </a>
            <Form className="loginCard" noValidate={true} onSubmit={handleSubmit}>
              <div style={{ marginBottom: '50px' }}>
                <div className="pageTitle">Seja bem-vindo(a)! Entre com a sua conta</div>
                <div className="subTitleMain">Digite abaixo o seu CPF e sua senha para entrar</div>
              </div>
              <div className="form-row ">
                <Col className="loginField">
                  <Label className="loginFormLabel">
                    <img className="mr-2" src={idCard} />
                    Seu CPF
                  </Label>
                  <Input
                    name="username"
                    className="form-control loginForm"
                    required={true}
                    placeholder="Digite seu CPF"
                    value={form?.username ? cpfMask(form?.username) : ''}
                    onChange={handleChange}
                    isValid={!errors.username}
                    maxLength={14}
                  />
                  <span>{errors.username && 'O campo do CPF é obrigatório!'}</span>
                  <div className="valid-feedback">{'Looks good!'}</div>
                </Col>
                <Col>
                  <Label className="loginFormLabel">
                    <img className="mr-2" src={loginLock} />
                    Senha
                  </Label>
                  <Input
                    className="form-control loginForm"
                    type={togglePassword ? 'text' : 'password'}
                    required={true}
                    placeholder="Digite sua senha"
                    name="password"
                    value={form?.password || ''}
                    onChange={handleChange}
                  />
                  <div className="show-hide" onClick={() => HideShowPassword(togglePassword)}>
                    <img
                      className="d-flex justify-content-center align-items-center passwordIcon"
                      src={eye}
                    />
                  </div>
                  <span>{errors.username && 'O campo senha é obrigatório!'}</span>
                  <div className="valid-feedback">{'Looks good!'}</div>
                </Col>
              </div>
              <FormGroup className="d-flex justify-content-between align-items-center mb-2">
                <div className="checkbox ml-3" style={{ marginTop: '25px' }}>
                  <Input id="checkbox1" type="checkbox" onChange={() => setIsCheck(!isCheck)} />
                  <Label className="loginFormLabel" for="checkbox1">
                    Mantenha-me conectado
                  </Label>
                </div>
              </FormGroup>
              <Button className="mainButton" style={{ marginTop: '60px' }}>
                <div className="loginFormText">Entrar</div>
              </Button>
              <div className="d-flex justify-content-center align-items-center forgotPassword">
                <a onClick={() => history('/forget-pwd')} className="link" href="#javascript">
                  Esqueceu a sua senha?
                </a>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
