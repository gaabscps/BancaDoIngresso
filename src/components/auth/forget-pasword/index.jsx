import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormGroup, Button } from "reactstrap";
import { translate, setLanguage } from "react-switch-lang";
import { useHistory } from "react-router";
import Cookies from "universal-cookie";

import {
  setAuthLocalStorage,
  isAuthenticated,
  addToLocalStorage,
  removeLocalStorage,
} from "../../../helpers/localStorage";

import api from "../../../services/api";

import Loader from "../../../layout/loader";

import { IS_LOADING } from "../../../redux/actionTypes";

import CpfComponent from "./steps/cpf";
import CodeComponent from "./steps/code";
import PasswordComponent from "./steps/password";
import SuccessComponent from "./steps/success";

const tempToken = process.env.REACT_APP_TEMP_TOKEN;
const baseUrl = process.env.REACT_APP_BASE_URL;
const prefixBaseUrl = process.env.REACT_APP_SUFFIX_BASE_URL;

const ForgetPassword = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [titles, setTitles] = useState([
    "Digite seu e-mail para receber o código de recuperação",
    "Digite o código de validação que foi enviado por e-mail para continuar",
    "Sua nova senha deve ser diferente de uma senha anterior",
  ]);
  const [labelButton, setLabelButton] = useState([
    "Enviar link de recuperação",
    "Ir para a página de entrada",
    "Alterar a minha senha",
  ]);
  const [form, setForm] = useState({});
  const [step, setStep] = useState(0);

  const cookies = new Cookies();

  const loading = useSelector((content) => content.General?.loading);

  const goBack = () => {
    history.push("/");
  };

  const handleForm = ({ currentTarget: { value, name } }) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleCpf = async () => {
    try {
      dispatch({
        type: IS_LOADING,
        payload: {
          loading: true,
        },
      });
      const data = {
        user: {
          cpf: form.cpf,
        },
      };

      const result = await api.post("/v1/adm/auth/recover-password", data);
      const {
        data: { confirmate_code },
      } = result;

      addToLocalStorage(tempToken, confirmate_code.token);
      setStep(step + 1);
    } catch (error) {
    } finally {
      dispatch({
        type: IS_LOADING,
        payload: {
          loading: false,
        },
      });
    }
  };

  const handleCode = async () => {
    try {
      dispatch({
        type: IS_LOADING,
        payload: {
          loading: true,
        },
      });
      const data = {
        confirmation: {
          code: form.code,
        },
      };
      const result = await api.post("confirmation/code", data);
      const {
        data: { password_change },
      } = result;

      addToLocalStorage(tempToken, password_change.token);
      setStep(step + 1);
    } catch (error) {
    } finally {
      dispatch({
        type: IS_LOADING,
        payload: {
          loading: false,
        },
      });
    }
  };

  const handleLogin = async ({ userName }) => {
    console.log(userName, form.password);
    const initialToken = Buffer.from(
      `${userName}:${form.password}`,
      "utf8"
    ).toString("base64");

    const url = baseUrl + prefixBaseUrl;
    const result = await api.post(
      url + "signin",
      {},
      {
        headers: {
          Authorization: `Basic ${initialToken}`,
        },
      }
    );
    const {
      data: { token, user },
    } = result;

    const localStorage = {
      token,
      user,
    };
    setAuthLocalStorage(localStorage);
    window.location.href = "/";
  };

  const handlePassword = async () => {
    try {
      dispatch({
        type: IS_LOADING,
        payload: {
          loading: true,
        },
      });
      const data = {
        user: {
          password: form.password,
        },
      };
      const result = await api.post("users/password", data);
      setStep(step + 1);
      const {
        data: {
          data: { user },
        },
      } = result;
      removeLocalStorage(tempToken);
      setTimeout(() => {
        handleLogin(user);
      }, 7000);
    } catch (error) {
    } finally {
      dispatch({
        type: IS_LOADING,
        payload: {
          loading: false,
        },
      });
    }
  };

  const handleStep = (e) => {
    e.preventDefault();
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
    }
  };

  useEffect(() => {
    if (isAuthenticated()) {
      history.push("/dashboard/admin");
    }
  }, [history]);

  return (
    <>
      <Loader />
      <div className="login-card" style={{ padding: "75px" }}>
        <div>
          <div className="login-main login-tab">
            <a className="logo text-center">
              <img
                className="img-fluid for-light"
                src={require("../../../assets/images/logo/logoBanca.png")}
                alt="looginpage"
              />
            </a>
            <Form
              className="theme-form "
              onSubmit={loading ? () => {} : handleStep}
            >
              <div style={{ display: "grid", justifyContent: "center" }}>
                {step !== 3 && (
                  <>
                    <div style={{ display: "-webkit-box" }}>
                      <img
                        src={require("../../../assets/images/svg/goBackArrow.svg")}
                        style={{
                          paddingRight: "25px",
                          paddingTop: "10px",
                          cursor: "pointer",
                        }}
                        onClick={goBack}
                      />
                      <div style={{ display: "grid" }}>
                        <h4 className="forgotPasswordLabel">
                          Esqueceu sua senha?
                        </h4>
                      </div>
                    </div>
                    <p style={{ width: "450px" }} className="subTitleMain">
                      Digite abaixo o seu CPF para receber o link de recuperação
                      de senha em seu e-mail cadastrado
                    </p>
                  </>
                )}
                {step === 0 && (
                  <CpfComponent form={form} handleForm={handleForm} />
                )}
                {step === 1 && (
                  <CodeComponent form={form} handleForm={handleForm} />
                )}
                {step === 2 && (
                  <PasswordComponent form={form} handleForm={handleForm} />
                )}
                {step === 3 && <SuccessComponent />}
                {step !== 3 && (
                  <FormGroup className="mb-0 mt-4">
                    <Button
                      color="primary"
                      className="btn-block mainButton"
                      style={{ marginTop: "200px" }}
                    >
                      <div className="loginFormText">{labelButton[step]}</div>
                    </Button>
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
                        style={{ color: "#B2140C", backgroundColor: "#B2140C" }}
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
