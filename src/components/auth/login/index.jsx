import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Col, Form, FormGroup, Input, Label, Button } from "reactstrap";
import { translate, setLanguage } from "react-switch-lang";
import Cookies from "universal-cookie";
import { IS_LOADING, ADD_USER } from "../../../redux/actionTypes";
import {
  setAuthLocalStorage,
  isAuthenticated,
  getLocalStorage,
} from "../../../helpers/localStorage";
import { useHistory } from "react-router";

import api from "../../../services/api";

import Loader from "../../../layout/loader";
import { cpfMask } from "../../../utils/input-mask";
import { setAuthSessionStorage } from "../../../helpers/sessionStorage ";

const baseUrl = process.env.REACT_APP_BASE_URL;
const prefixBaseUrl = process.env.REACT_APP_SUFFIX_BASE_URL;

const Login = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [togglePassword, setTogglePassword] = useState(false);
  const [values, setValues] = useState({ cpf: "" });
  const [form, setForm] = useState({});
  const [isCheck, setIsCheck] = useState(false);
  const [errors, setErrors] = useState({
    username: false,
    password: false,
  });

  const cookies = new Cookies();

  const HideShowPassword = (tPassword) => {
    setTogglePassword(!tPassword);
  };

  useEffect(() => {
    if (getLocalStorage("token")) {
      setAuthSessionStorage({
        token: getLocalStorage("token"),
        user: getLocalStorage("user"),
      });
      history.push("/dashboard/admin");
    }
  }, [cookies, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch({
        type: IS_LOADING,
        payload: {
          loading: true,
        },
      });
      const initialToken = Buffer.from(
        `${form.username}:${form.password}`,
        "utf8"
      ).toString("base64");

      const url = baseUrl + prefixBaseUrl;
      const result = await api.post(
        url + "auth",
        {
          grant_type: "client_credentials",
        },
        {
          headers: {
            Authorization: `Basic ${initialToken}`,
          },
        }
      );
      const {
        data: { token, user },
      } = result;
      const storage = {
        token,
        user,
      };
      if (isCheck) {
        setAuthLocalStorage(storage);
      }
      setAuthSessionStorage(storage);
      console.log("Check:", isCheck);

      history.push("/dashboard/admin");
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

  const handleChange = ({ currentTarget: { name, value } }) => {
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
              <img
                className="img-fluid for-light"
                src={require("../../../assets/images/logo/logoBanca.png")}
                alt="looginpage"
              />
            </a>
            <Form className="loginCard" noValidate="" onSubmit={handleSubmit}>
              <div style={{ marginBottom: "50px" }}>
                <div className="pageTitle">
                  Seja bem-vindo(a)! Entre com a sua conta
                </div>
                <div className="subTitleMain">
                  Digite abaixo o seu CPF e sua senha para entrar
                </div>
              </div>
              <div className="form-row ">
                <Col className="loginField">
                  <Label className="loginFormLabel">
                    <img
                      className="mr-2"
                      src={require("../../../assets/images/svg/idCard.svg")}
                    />
                    Seu CPF
                  </Label>
                  <Input
                    name="username"
                    className="form-control loginForm"
                    required=""
                    placeholder="Digite seu CPF"
                    value={form?.username ? cpfMask(form?.username) : ""}
                    onChange={handleChange}
                    isValid={!errors.username}
                    maxLength="14"
                  />
                  <span>
                    {errors.username && "O campo do CPF é obrigatório!"}
                  </span>
                  <div className="valid-feedback">{"Looks good!"}</div>
                </Col>
                <Col>
                  <Label className="loginFormLabel">
                    <img
                      className="mr-2"
                      src={require("../../../assets/images/svg/loginLock.svg")}
                    />
                    Senha
                  </Label>
                  <Input
                    className="form-control loginForm"
                    type={togglePassword ? "text" : "password"}
                    required=""
                    placeholder="Digite sua senha"
                    name="password"
                    value={form?.password || ""}
                    onChange={handleChange}
                  />
                  <div
                    className="show-hide"
                    onClick={() => HideShowPassword(togglePassword)}
                  >
                    <img
                      className="d-flex justify-content-center align-items-center passwordIcon"
                      src={require("../../../assets/images/login/eye.png")}
                    />
                  </div>
                  <span>
                    {errors.username && "O campo senha é obrigatório!"}
                  </span>
                  <div className="valid-feedback">{"Looks good!"}</div>
                </Col>
              </div>
              <FormGroup className="d-flex justify-content-between align-items-center mb-2">
                <div className="checkbox ml-3" style={{ marginTop: "25px" }}>
                  <Input
                    id="checkbox1"
                    type="checkbox"
                    onChange={() => setIsCheck(!isCheck)}
                  />
                  <Label className="loginFormLabel" for="checkbox1">
                    Mantenha-me conectado
                  </Label>
                </div>
              </FormGroup>
              <Button
                className="mainButton"
                style={{ marginTop: "60px" }}
              >
                <div className="loginFormText">
                 Entrar
                </div>
              </Button>
              <div className="d-flex justify-content-center align-items-center forgotPassword">
                <a
                  onClick={() => history.push("/forget-pwd")}
                  className="link"
                  href="#javascript"
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

export default translate(Login);
