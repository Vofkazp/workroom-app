import React from "react";
import Input from "../components/Input";
import CheckBox from "../components/CheckBox";
import Button from "../components/Button";
import {useNavigate} from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import {useAuth} from "../services/Auth";
import * as Yup from "yup";
import {Form, Formik} from "formik";
import {useNotifications} from "../services/NitificationProvider";

export default function Login() {
  const navigate = useNavigate();
  const {addNotification} = useNotifications();
  const {login} = useAuth();

  const initialValues = {
    email: "vofkazp@gmail.com",
    password: "Qwerty123+",
    remember_me: true
  };

  const regexp = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/
  }

  const email = Yup.string().matches(regexp.email, "Должно быть в формате 'youremail@gmail.com'").required("Введите email");
  const password = Yup.string()
      .matches(regexp.password, "Минимум 8 символов, одна заглавная, одна строчная, цифра и спецсимвол")
      .required("Введите пароль");
  const remember_me = Yup.boolean();

  const schemas = {
    custom: Yup.object().shape({
      email, remember_me, password
    })
  }

  const loginUser = (values: any) => {
    login(values.email, values.password, values.remember_me).then((result) => {
      if (result) {
        navigate("/");
      } else {
        addNotification("Неправильный логин или пароль!", "warning");
      }
    });
  }

  const register = () => {
    navigate("/register");
  }

  const forgotPassword = () => {
    console.log('forgotPassword');
  }

  return (
      <div className="main-content sign-in">
        <div className="sign-in-content">
          <div className="sign-in-info">
            <div className="sign-in-info-row">
              <img src="/images/logo_white.png" alt="logo" className="sign-in-logo"/>
              <h3 className="sign-in-info-title">Woorkroom</h3>
            </div>
            <p className="sign-in-info-description">Your place to work<br/>Plan. Create. Control.</p>
            <img src="/images/Illustration.png" alt="illustration" className="sign-in-info-illustration"/>
          </div>
          <div className="sign-in-form">
            <Formik initialValues={initialValues} validationSchema={schemas.custom} onSubmit={loginUser}>
              <Form>
                <h2 className="sign-in-form-title">Sign In to Woorkroom</h2>
                <div className="sign-in-form-inputs">
                  <Input name="email" title="Email Address" placeholder="youremail@gmail.com"/>
                  <PasswordInput name="password" title="Password" placeholder="Your password"/>
                  <div className="row">
                    <CheckBox name="remember_me" title="Remember me"/>
                    <Button title="Forgot Password?" classList="text-btn secondary" click={forgotPassword}/>
                  </div>
                  <Button type="submit" title="Sign In" path="arrowRight"
                          classList="btn-primary btn-primary-icon w-170"/>
                  <Button title="Don’t have an account?" classList="text-btn primary" click={register}/>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
  );
}