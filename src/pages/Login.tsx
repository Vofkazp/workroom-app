import React, {useState} from "react";
import Input from "../components/Input";
import CheckBox from "../components/CheckBox";
import Button from "../components/Button";
import {useNavigate} from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import {useAuth} from "../services/Auth";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({email: "Vofkazp@gmail.com", password: "Qwe123", remember_me: true});
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const {login} = useAuth();

  const onSave = (name: string, value: string | boolean) => {
    setEmailError(false);
    setPassError(false);
    setForm(prev => ({...prev, [name]: value}));
  }

  const checkForm = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    const isEmail = emailPattern.test(form.email);
    const isPassword = passwordPattern.test(form.password);
    setEmailError(!isEmail);
    setPassError(!isPassword);
    return isEmail && isPassword;
  }

  const loginUser = () => {
    if (checkForm()) {
      login(form.email, form.password, form.remember_me).then(() => {
        navigate("/");
      });
    }
  }

  const register = () => {
    navigate("/register");
  }

  const clickBtn = () => {
    console.log('click');
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
            <h2 className="sign-in-form-title">Sign In to Woorkroom</h2>
            <div className="sign-in-form-inputs">
              <Input type="text" name="email" value={form.email} title="Email Address" placeholder="youremail@gmail.com"
                     error={emailError}
                     errorText="Невірний формат Email" changed={onSave}/>
              <PasswordInput type="password" name="password" value={form.password} title="Password"
                             placeholder="Your password"
                             error={passError}
                             errorText="Невірний формат" changed={onSave}/>
              <div className="row">
                <CheckBox name="remember_me" value={form.remember_me} title="Remember me" changed={onSave}/>
                <Button title="Forgot Password?" classList="text-btn secondary" click={clickBtn}/>
              </div>
              <Button title="Sign In" path="arrowRight" classList="btn-primary btn-primary-icon w-170" click={loginUser}/>
              <Button title="Don’t have an account?" classList="text-btn primary" click={register}/>
            </div>
          </div>
        </div>
      </div>
  );
}