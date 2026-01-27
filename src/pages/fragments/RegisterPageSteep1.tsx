import React, {useEffect, useRef, useState} from "react";
import SelectItem from "../../components/inputs/SelectItem";
import Input from "../../components/inputs/Input";
import PasswordInput from "../../components/inputs/PasswordInput";
import {useAuth} from "../../services/Auth";
import MaskedInput from "../../components/inputs/MaskedInput";
import InputCode from "../../components/inputs/InputCode";
import * as Yup from "yup";
import {Form, Formik, FormikHelpers} from "formik";
import Button from "../../components/Button";
import PhoneAutoCheck from "../../components/PhoneAutoCheck";
import {useNotifications} from "../../services/NitificationProvider";
import {phonePrefix} from "../../resurses/SelectList";

type Props = {
  phonePref: number;
  phoneNumber: string;
  emailString: string;
  passwordString: string;
  onChecked: (form: FormValues) => void;
}

export type FormValues = {
  phone_prefix: number;
  phone: string;
  email: string;
  password: string;
  isCode: boolean;
  isValidCode?: boolean;
}

export default function RegisterPageSteep1({phonePref, phoneNumber, emailString, passwordString, onChecked}: Props) {
  const {addNotification} = useNotifications();
  const {checkPhone, checkCode, checkEmail} = useAuth();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [timer, setTimer] = useState("05:00");
  const [isResend, setIsResend] = useState(false);

  const initialValues = {
    phone_prefix: phonePref,
    phone: phoneNumber,
    email: emailString,
    password: passwordString,
    isCode: false,
    isValidCode: undefined
  };

  const regexp = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/
  }

  const phone_prefix = Yup.number();
  const phone = Yup.string()
      .matches(/^\d+$/, "Только цифры")
      .test(
          "len-11",
          "Неправильный номер",
          (value) => !value || value.length === 11
      )
      .required("Введите номер телефона");
  const email = Yup.string().matches(regexp.email, "Должно быть в формате 'youremail@gmail.com'").required("Введите email");
  const password = Yup.string()
      .matches(regexp.password, "Мин. 8 симв., одна загл., одна строчн., цифра и спецсимвол")
      .required("Введите пароль");
  const isCode = Yup.boolean();
  const isValidCode = Yup.boolean().oneOf([true], "Неправильный код.");

  const schemas = {
    custom: Yup.object().shape({
      phone_prefix, phone, email, password, isCode, isValidCode
    })
  }

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
        setIsResend(true);
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

  const nextSteep = async (values: FormValues, form: FormikHelpers<FormValues>) => {
    if (values.isValidCode) {
      const result = await checkEmail(values.email);
      if (result.status) {
        onChecked(values);
      } else {
        addNotification(result.message, "warning");
        form.setFieldError("email", "Такий email уже зареєстровано!");
      }
    } else if (values.isValidCode === undefined) {
      addNotification("Введите код!", "warning");
    }
  }

  return (
      <Formik<FormValues> initialValues={initialValues} validationSchema={schemas.custom} onSubmit={nextSteep}>
        {({values, errors, touched, setFieldValue}) => {
          const sendCode = (code: string) => {
            checkCode("+" + values.phone_prefix + values.phone, code).then(res => {
              setFieldValue("isValidCode", res.status);
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
                setFieldValue("isCode", res.status);
              } else {
                addNotification(res.message, "warning");
              }
            })
          }

          const resendCode = async () => {
            checkMyPhone("+" + values.phone_prefix + values.phone);
            setIsResend(false);
          }

          return (
              <Form>
                <PhoneAutoCheck onCheck={checkMyPhone}/>
                <div className="sign-up-content-block card">
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
                      {touched.phone && errors.phone && (
                          <span className="error">{errors.phone}</span>
                      )}
                    </div>
                    {values.isCode && <>
                      <InputCode sendCode={sendCode}/>
                      <p className="sms-info">
                        SMS was sent to your number +{values.phone_prefix}{values.phone}<br/>
                        It will be valid for {timer}
                        {isResend && <Button click={resendCode} style={{marginTop: 10}} title="Resend code in"
                                             classList="text-btn primary"/>}
                      </p>
                    </>}
                    <Input name="email" title="Email Address" placeholder="youremail@gmail.com"/>
                    <PasswordInput name="password" title="Create Password" placeholder="Your password"/>
                  </div>
                  <div className="sign-up-content-footer">
                    <div></div>
                    <Button type="submit" title="Next Step" path="arrowRight"
                            classList="btn-primary btn-primary-icon"/>
                  </div>
                </div>
              </Form>
          )
        }}
      </Formik>
  );
}