import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  Form, FormGroup, Button } from "reactstrap";
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

import EmailComponent from "./steps/email";
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
    "Enviar Código",
    "Confirmar",
    "Finalizar",
  ]);
  const [form, setForm] = useState({});
  const [step, setStep] = useState(0);

  const cookies = new Cookies();

  const loading = useSelector((content) => content.General.loading);

  const handleForm = ({ currentTarget: { value, name } }) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleEmail = async () => {
    try {
      dispatch({
        type: IS_LOADING,
        payload: {
          loading: true,
        },
      });
      const data = {
        user: {
          email: form.email,
        },
      };

      const result = await api.post("/v1/adm/auth/recover_password", data);
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
        handleEmail();
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
      history.push("/dashboard/default");
    }
    const cookieLang = cookies.get("language");
    if (!cookieLang) {
      setLanguage("en");
    } else {
      setLanguage(cookieLang);
    }
  }, [cookies, history]);

  return (
    <>
      <Loader />
        <div className="login-card">
          <div>
            <div className="login-main login-tab">
              <a className="logo text-center" href="#javascript">
                <img
                className="img-fluid for-light"
                src={require("../../../assets/images/logo/logoBanca.png")}
                alt="looginpage"
                />
              </a>
              <Form
                className="theme-form"
                onSubmit={loading ? () => {} : handleStep}
              >
                {step !== 3 && (
                  <>
                    <h5 className="text-center mb-2 f-w-100">
                      Passo {step + 1} de 3
                    </h5>
                    <h4>Esqueceu sua senha?</h4>
                    <p>{titles[step]}</p>
                  </>
                )}
                {step === 0 && (
                  <EmailComponent form={form} handleForm={handleForm} />
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
                    <Button color="primary" className="btn-block">
                      {labelButton[step]}
                    </Button>
                    {step === 0 && (
                      <Button
                        onClick={() => history.push("/")}
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

export default translate(ForgetPassword);
