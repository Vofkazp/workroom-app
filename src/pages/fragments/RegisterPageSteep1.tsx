import React, {useEffect, useRef, useState} from "react";
import SelectItem from "../../components/SelectItem";
import Button from "../../components/Button";
import Input from "../../components/Input";
import PasswordInput from "../../components/PasswordInput";
import {useAuth} from "../../services/Auth";
import MaskedInput from "../../components/MaskedInput";
import InputCode from "../../components/InputCode";
import {phonePrefix} from "../../resurses/phonePrefix";

export default function RegisterPageSteep1({
                                             prefixPhone,
                                             savePhonePrefix,
                                             phone,
                                             phoneError,
                                             savePhone,
                                             isCode,
                                             email,
                                             emailError,
                                             saveEmail,
                                             password,
                                             passError,
                                             savePass
                                           }: {
  prefixPhone: number,
  savePhonePrefix: (value: number) => void,
  phone: string,
  phoneError: boolean,
  savePhone: (value: string) => void,
  isCode: (value: boolean) => void,
  email: string,
  emailError: boolean,
  saveEmail: (name: string, value: string) => void,
  password: string,
  passError: boolean,
  savePass: (name: string, value: string) => void,
}) {

  const {checkPhone, checkCode} = useAuth();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [timer, setTimer] = useState("05:00");

  useEffect(() => {
    return () => stopTimer();
  }, []);

  const checkMyPhone = () => {
    stopTimer();
    checkPhone("+" + prefixPhone + phone).then(res => {
      if (res.status) {
        console.log(res.response);
        startTimer();
      }
    });
  }

  const saveMyPhone = (value: string) => {
    savePhone(value);
    isCode(false);
    if(value.length === 11) checkMyPhone();
  }

  const startTimer = () => {
    let time = 5 * 60;
    intervalRef.current = setInterval(() => {
      let minutes = Math.floor(time / 60);
      let seconds = time % 60;
      let n_minutes = minutes < 10 ? "0" + minutes : minutes;
      let n_seconds = seconds < 10 ? "0" + seconds : seconds;
      setTimer(`${n_minutes}:${n_seconds}`);
      if (time <= 0) {
        stopTimer();
      }
      time--;
    }, 1000);
  }

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  const sendCode = (code: string) => {
    checkCode("+" + prefixPhone + phone, code).then(res => {
      if (res.status) {
        stopTimer();
      }
      isCode(res.status);
    })
  }

  return (
      <>
        <span className="sign-up-content-steeps">Step 1/4</span>
        <h2 className="sign-up-title">Valid your phone</h2>
        <div className={`input-container ${phoneError && "error"}`}>
          <label className="label-block">
            <p className="input-label">Mobile Number</p>
            <div className="inputs-row-elements">
              <SelectItem value={prefixPhone} name={"phone_prefix"} list={phonePrefix}
                          selected={(name, value) => savePhonePrefix(value)}/>
              <MaskedInput
                  mask="_ (___) ___-__-__"
                  value={phone}
                  onChange={saveMyPhone}
              />
            </div>
          </label>
          <span className="error">Невірний формат телефону</span>
        </div>
        <InputCode sendCode={sendCode}/>
        <p className="sms-info">
          SMS was sent to your number +{prefixPhone}{phone}<br/>
          It will be valid for {timer}
        </p>
        <Input type="text" name="email" value={email} title="Email Address"
               placeholder="youremail@gmail.com"
               error={emailError}
               errorText="Невірний формат Email" changed={saveEmail}/>
        <PasswordInput type="password" name="password" value={password} title="Create Password"
                       placeholder="Your password"
                       error={passError}
                       errorText="Невірний формат" changed={savePass}/>
      </>
  );
}