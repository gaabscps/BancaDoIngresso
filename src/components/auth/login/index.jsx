import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Col, Form, FormGroup, Input, Label, Button } from "reactstrap";
import { translate, setLanguage } from "react-switch-lang";
import Cookies from "universal-cookie";
import { IS_LOADING, ADD_USER } from "../../../redux/actionTypes";
import {
  setAuthLocalStorage,
  isAuthenticated,
} from "../../../helpers/localStorage";
import { useHistory } from "react-router";

import api from "../../../services/api";

import Loader from "../../../layout/loader";
import { cpfMask } from "../../../utils/input-mask";

const baseUrl = process.env.REACT_APP_BASE_URL;
const prefixBaseUrl = process.env.REACT_APP_SUFFIX_BASE_URL;

const Login = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [togglePassword, setTogglePassword] = useState(false);
  const [values, setValues] = useState({ cpf: "" });
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({
    username: false,
    password: false,
  });

  const cookies = new Cookies();

  const HideShowPassword = (tPassword) => {
    setTogglePassword(!tPassword);
  };

  useEffect(() => {
    if (isAuthenticated()) {
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
      // const userData = await api.get(
      //   url + "/client/" + result.data.user.id,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${result.data.token}`,
      //     },
      //   }
      //   )
      // console.log("ID", userData);
      const {
        data: { token, user },
      } = result;
      const localStorage = {
        token,
        user,
      };
      setAuthLocalStorage(localStorage);

      window.location.href = "/";
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
                  <Label className="loginFormText">
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
                    placeholder="123.456.789-00"
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
                  <Label className="loginFormText">
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
                    placeholder="1234567"
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
                  <Input id="checkbox1" type="checkbox" />
                  <Label className="loginFormText" for="checkbox1">
                    Lembrar senha
                  </Label>
                </div>
              </FormGroup>
              <Button
                color="primary"
                className="btn-block loginForm"
                style={{ marginTop: "60px" }}
              >
                Entrar
              </Button>
              <div className="d-flex justify-content-center align-items-center forgotPassword">
                <a
                  onClick={() => history.push("/forget-pwd")}
                  className="link"
                  href="#javascript"
                >
                  Esqueceu a senha?
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
