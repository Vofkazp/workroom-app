import React, {useEffect, useRef, useState} from "react";
import SelectItem from "../../components/SelectItem";
import Input from "../../components/Input";
import PasswordInput from "../../components/PasswordInput";
import {useAuth} from "../../services/Auth";
import MaskedInput from "../../components/MaskedInput";
import InputCode from "../../components/InputCode";
import {phonePrefix} from "../../resurses/phonePrefix";
import * as Yup from "yup";
import {Form, Formik} from "formik";
import Button from "../../components/Button";
import PhoneAutoCheck from "../../components/PhoneAutoCheck";
import {useNotifications} from "../../services/NitificationProvider";

type Props = {
  phonePref: number;
  phoneNumber: string;
  emailString: string;
  passwordString: string;
}

export default function RegisterPageSteep1({phonePref, phoneNumber, emailString, passwordString}: Props) {
  const {addNotification} = useNotifications();

  const initialValues = {
    phone_prefix: phonePref,
    phone: phoneNumber,
    email: emailString,
    password: passwordString,
    isCode: false,
    smsCode: ""
  };

  const regexp = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/
  }

  const phone_prefix = Yup.number();
  const phone = Yup.string().length(11, "Неправильный номер");
  const email = Yup.string().matches(regexp.email, "Должно быть в формате 'youremail@gmail.com'").required("Введите email");
  const password = Yup.string()
      .matches(regexp.password, "Минимум 8 символов, одна заглавная, одна строчная, цифра и спецсимвол")
      .required("Введите пароль");
  const isCode = Yup.boolean().oneOf([true], "Код не подтверждён");
  const smsCode = Yup.string()
      .length(4, "Введите 4-значный код");

  const schemas = {
    custom: Yup.object().shape({
      phone_prefix, phone, email, password, isCode, smsCode
    })
  }

  const {checkPhone, checkCode} = useAuth();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [timer, setTimer] = useState("05:00");

  useEffect(() => {
    return () => stopTimer();
  }, []);

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

  const nextSteep = (values: any) => {
    console.log(values);
  }

  return (
      <div className="sign-up-content-block card">
        <Formik initialValues={initialValues} validationSchema={schemas.custom} onSubmit={nextSteep}>
          {({values, errors, setFieldValue}) => {
            const sendCode = (code: string) => {

              checkCode("+" + values.phone_prefix + values.phone, code).then(res => {
                setFieldValue("isCode", res.status);
                if (res.status) {
                  stopTimer();
                } else {
                  addNotification(res.message, "warning");
                }
              });
            }

            const checkMyPhone = (phone: string) => {
              stopTimer();
              checkPhone(phone).then(res => {
                if (res?.status) {
                  console.log(res.response);
                  startTimer();
                } else {
                  addNotification(res.message, "warning");
                }
              })
            }

            return (
                <Form>
                  <PhoneAutoCheck onCheck={checkMyPhone}/>
                  <div className="sign-up-content">
                    <span className="sign-up-content-steeps">Step 1/4</span>
                    <h2 className="sign-up-title">Valid your phone</h2>
                    <div className="input-container">
                      <label className="label-block">
                        <p className="input-label">Mobile Number</p>
                        <div className="inputs-row-elements">
                          <SelectItem name="phone_prefix" list={phonePrefix}/>
                          <MaskedInput
                              mask="_ (___) ___-__-__"
                              name="phone"
                          />
                        </div>
                      </label>
                      {errors.phone && <span className="error">{errors.phone}</span>}
                    </div>
                    <InputCode sendCode={sendCode}/>
                    <p className="sms-info">
                      SMS was sent to your number +{values.phone_prefix}{values.phone}<br/>
                      It will be valid for {timer}
                    </p>
                    <Input name="email" title="Email Address" placeholder="youremail@gmail.com"/>
                    <PasswordInput name="password" title="Create Password" placeholder="Your password"/>
                  </div>
                  <div className="sign-up-content-footer">
                    <div>
                      {/*{steep > 1 && <Button title="Previous" path="back" classList="back" click={prevSteep}/>}*/}
                    </div>
                    <Button type="submit" title="Next Step" path="arrowRight"
                            classList="btn-primary btn-primary-icon"/>
                  </div>
                </Form>
            )
          }}
        </Formik>
      </div>
  );
}