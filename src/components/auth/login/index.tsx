import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Form, Input, Label, Button } from 'reactstrap';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { getLocalStorage } from '../../../helpers/localStorage';
import Loader from '../../../layout/loader';
import { cpfMask } from '../../../utils/input-mask';
import logoBanca from '../../../assets/images/logo/logoBanca.png';
import idCard from '../../../assets/images/svg/idCard.svg';
import loginLock from '../../../assets/images/svg/loginLock.svg';
import eye from '../../../assets/images/login/eye.png';
import closeEye from '../../../assets/images/login/closeEye.png';
import { loginRequest } from '../../../store/ducks/auth/actions';
import { setAuthSessionStorage } from '../../../helpers/sessionStorage';
import Auth from '../../../entities/Auth';

interface Loginstate {
  username: string;
  password: string;
}

const Login = (): JSX.Element => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [togglePassword, setTogglePassword] = useState(false);
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
                  <div
                    className="show-hide"
                    onClick={() => HideShowPassword(togglePassword)}
                    style={{ cursor: 'pointer' }}
                  >
                    {togglePassword ? (
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
                  <span>{errors.username && 'O campo senha é obrigatório!'}</span>
                  <div className="valid-feedback">{'Looks good!'}</div>
                </Col>
              </div>
              <Button className="mainButton" style={{ marginTop: '60px' }}>
                <div className="loginFormText">Entrar</div>
              </Button>
              <div className="d-flex justify-content-center align-items-center forgotPassword">
                <a
                  onClick={() => history('/forget-pwd')}
                  className="link"
                  style={{ cursor: 'pointer' }}
                >
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
