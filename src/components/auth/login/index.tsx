import React, { useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Form, Container, Row } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Loading, Button } from '@/components';
import Input from '../../Utils/Input';
import logoBanca from '../../../assets/images/logo/logoBanca.png';
import idCard from '../../../assets/images/svg/idCard.svg';
import loginLock from '../../../assets/images/svg/loginLock.svg';
import eye from '../../../assets/images/login/eye.png';
import closeEye from '../../../assets/images/login/closeEye.png';
import { ApplicationState } from '../../../store';
import { loginRequest } from '../../../store/ducks/auth/actions';
import { AuthState } from '../../../store/ducks/auth/types';

interface Loginstate {
  username: string;
  password: string;
}

const Login = (): JSX.Element => {
  const auth = useSelector<ApplicationState, AuthState>(store => store.auth);

  const history = useHistory();
  const dispatch = useDispatch();
  const [togglePassword, setTogglePassword] = useState(false);
  const [form, setForm] = useState({} as Loginstate);
  const HideShowPassword = (tPassword: boolean): void => {
    setTogglePassword(!tPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(schema),
  });

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
      <Loading isVisible={auth.loading} />
      <div className="body-login">
        <Container>
          <Col className="login-card">
            <div className="login-main login-tab">
              <a className="logo text-center" href="#javascript">
                <img className="img-fluid for-light" src={logoBanca} alt="looginpage" />
              </a>
              <Form className="loginCard" noValidate={true} onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col style={{ marginLeft: '-6px' }}>
                    <div style={{ marginBottom: '50px', display: 'contents' }}>
                      <div className="pageTitleLogin">Seja bem-vindo(a)! Entre com a sua conta</div>
                      <div className="subTitleMain mb-2">
                        Digite abaixo o seu CPF e sua senha para entrar
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="flex-column form-row ">
                  <div style={{ marginBottom: '-10px' }}>
                    <Row>
                      <Col className="loginField" style={{ marginTop: '20px' }}>
                        <Input
                          label={
                            <div>
                              <img className="mr-2" src={idCard} />
                              {'Seu CPF'}
                            </div>
                          }
                          type="text"
                          placeholder="123.456.789-00"
                          register={register}
                          value={form?.username ?? ''}
                          name="username"
                          onChange={handleChange}
                          error={errors?.username?.message}
                        />
                      </Col>
                    </Row>
                  </div>
                  <div style={{ marginBottom: '100px' }}>
                    <Row>
                      <Col>
                        <Input
                          label={
                            <div>
                              <img className="mr-2" src={loginLock} />
                              {'Senha'}
                            </div>
                          }
                          type={togglePassword ? 'text' : 'password'}
                          placeholder="minhasenha123"
                          register={register}
                          value={form?.password}
                          name="password"
                          onChange={handleChange}
                          error={errors?.password?.message}
                          icon={
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
                          }
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
                </div>
                <Button
                  className="mainButton"
                  theme="red"
                  size="lg"
                  style={{ width: '100%' }}
                  disabled={!(form.username && form.password)}
                  onClick={handleSubmit(onSubmit)}
                  title="Entrar"
                />
                <div className="d-flex justify-content-center align-items-center forgotPassword">
                  <a
                    onClick={() => history.push('/forget-pwd')}
                    className="link"
                    style={{ cursor: 'pointer', color: '#B2140C' }}
                  >
                    Esqueceu a sua senha?
                  </a>
                </div>
              </Form>
            </div>
          </Col>
        </Container>
      </div>
    </>
  );
};

export default Login;
