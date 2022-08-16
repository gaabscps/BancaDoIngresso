import React, { useEffect, useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Form, Button, Row, Container } from 'reactstrap';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '../../Utils/Input';
import { getLocalStorage } from '../../../helpers/localStorage';
import Loader from '../../../layout/loader';
import { cpfMask } from '../../../utils/input-mask';
import logoBanca from '../../../assets/images/logo/logoBanca.png';
import idCard from '../../../assets/images/svg/idCard.svg';
import loginLock from '../../../assets/images/svg/loginLock.svg';
import eye from '../../../assets/images/login/eye.png';
// import { ApplicationState } from '../../../store';
import { loginRequest } from '../../../store/ducks/auth/actions';
// import { AuthState } from '../../../store/ducks/auth/types';
import { setAuthSessionStorage } from '../../../helpers/sessionStorage';
import Auth from '../../../entities/Auth';

interface Loginstate {
  username: string;
  password: string;
}

const schema = yup.object().shape({
  username: yup.string().min(14, 'CPF Inválido').required('O CPF é obrigatório'),
  password: yup.string().required('A senha é obrigatória'),
});

const Login = (): JSX.Element => {
  // const auth = useSelector<ApplicationState, AuthState>(store => store.auth);
  // if (!auth.loading && !auth.error) {
  //   if (auth.data && auth.data.login) {
  //     setAuthLocalStorage(auth.data.login);
  //     window.location.href = '/';
  //   }
  // }
  const history = useNavigate();
  const dispatch = useDispatch();
  const [togglePassword, setTogglePassword] = useState(false);
  // const [values, setValues] = useState({ cpf: "" });
  const [form, setForm] = useState({} as Loginstate);
  const cookies = new Cookies();
  const HideShowPassword = (tPassword: boolean): void => {
    setTogglePassword(!tPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    if (getLocalStorage('token')) {
      setAuthSessionStorage({
        token: getLocalStorage('token') as string,
        user: getLocalStorage('user') as string,
      } as unknown as Auth);
      history('/dashboard/admin');
    }
  }, [cookies, history]);

  const onSubmit = async (data: any): Promise<void> => {
    // e.preventDefault();

    dispatch(loginRequest(data.username, data.password));
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
      <Container fluid={true}>
        <Row lg="2" md="1">
          <Col xs="auto" className="login-card">
            <div className="login-main login-tab">
              <a className="logo text-center" href="#javascript">
                <img className="img-fluid for-light" src={logoBanca} alt="looginpage" />
              </a>
              <Form className="loginCard" noValidate={true} onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col md="12">
                    <div style={{ marginBottom: '50px', display: 'contents' }}>
                      <div className="pageTitle">Seja bem-vindo(a)! Entre com a sua conta</div>
                      <div className="subTitleMain">
                        Digite abaixo o seu CPF e sua senha para entrar
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="form-row ">
                  <Row>
                    <Col className="loginField">
                      {/* <Label className="loginFormLabel">
                        <img className="mr-2" src={idCard} />
                        Seu CPF
                      </Label> */}
                      {/* <Input
                        name="username"
                        className="form-control loginForm"
                        required={true}
                        placeholder="Digite seu CPF"
                        value={form?.username ? cpfMask(form?.username) : ''}
                        onChange={handleChange}
                        maxLength={14}
                      /> */}
                      <Input
                        label={
                          <p>
                            <img className="mr-2" src={idCard} />
                            {'Seu CPF'}
                          </p>
                        }
                        type="text"
                        placeholder="Digite o seu CPF"
                        register={register}
                        value={form?.username ? cpfMask(form?.username) : ''}
                        name="username"
                        onChange={handleChange}
                        error={errors?.username?.message}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Input
                        label={
                          <p>
                            <img className="mr-2" src={loginLock} />
                            {'Senha'}
                          </p>
                        }
                        type={togglePassword ? 'text' : 'password'}
                        placeholder="Digite o seu CPF"
                        register={register}
                        value={form?.password}
                        name="password"
                        onChange={handleChange}
                        error={errors?.password?.message}
                      />
                      <div className="show-hide" onClick={() => HideShowPassword(togglePassword)}>
                        <img
                          className="d-flex justify-content-center align-items-center passwordIcon"
                          src={eye}
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
                <Button className="mainButton" style={{ marginTop: '60px' }}>
                  <div className="loginFormText">Entrar</div>
                </Button>
                <div className="d-flex justify-content-center align-items-center forgotPassword">
                  <a onClick={() => history('/forget-pwd')} className="link">
                    Esqueceu a sua senha?
                  </a>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
