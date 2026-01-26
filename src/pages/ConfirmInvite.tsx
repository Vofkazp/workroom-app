import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../services/Auth";
import {useNotifications} from "../services/NitificationProvider";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import Input from "../components/Input";
import {genderList} from "../resurses/SelectList";
import Select from "../components/Select";
import DatePicker from "../components/DatePicker";
import PasswordInput from "../components/PasswordInput";
import ImageUploader from "../components/ImageUploader";
import SelectItem from "../components/SelectItem";
import {phonePrefix} from "../resurses/phonePrefix";
import MaskedInput from "../components/MaskedInput";
import Button from "../components/Button";

export default function ConfirmInvite() {
  const location = useLocation();
  const navigate = useNavigate();
  const {getInviteInfo, confirmInvite} = useAuth();
  const {addNotification} = useNotifications();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const [inviteId, setInviteId] = useState<number | null>(null);
  const [email, setEmail] = useState<string>("");
  const [company, setCompany] = useState<{
    id: number,
    name: string,
    direction: string,
    location: string | null,
    owner_id: number,
    team_size: string
    created_at: Date,
  } | null>(null);
  const [user, setUser] = useState<{
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    avatar: { url: string, publicId: string }
  } | null>(null);

  const initialValues = {
    first_name: "",
    last_name: "",
    gender: 1,
    birthday: null,
    phone_prefix: 3,
    phone: "80",
    password: "",
    avatar: ""
  }

  const regexp = {
    name: /^[а-яА-Яa-zA-Z0-9,.!?@#$%^&*()_+=\-/ ]{2,50}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/
  }

  const first_name = Yup.string().matches(regexp.name, "Количество символов от 2 до 50").required("Введите имя");
  const last_name = Yup.string().matches(regexp.name, "Количество символов от 2 до 50").required("Введите фамилию");
  const gender = Yup.number().required("Выберите пол");
  const birthday = Yup.string().required("Выберете дату рождения");
  const phone_prefix = Yup.number();
  const phone = Yup.string()
      .matches(/^\d+$/, "Только цифры")
      .test(
          "len-11",
          "Неправильный номер",
          (value) => !value || value.length === 11
      )
      .required("Введите номер телефона");
  const password = Yup.string()
      .matches(regexp.password, "Мин. 8 симв., одна загл., одна строчн., цифра и спецсимвол")
      .required("Введите пароль");
  const avatar = Yup.string().required("Выберете изображение");


  const schemas = {
    custom: Yup.object().shape({
      first_name, last_name, gender, birthday, phone_prefix, phone, password, avatar
    })
  }

  const CreateUser = (values: typeof initialValues) => {
    confirmInvite({
      ...values,
      isRegister: true,
      isConfirm: false,
      invite_id: inviteId,
      email,
      phone: "+" + values.phone_prefix + values.phone
    }).then(res => {
      if (res.status) {
        navigate("/");
      } else {
        addNotification(res.message || "Unknown error!", "warning");
      }
    });
  }

  useEffect(() => {
    const getInvite = async (token: string) => {
      const invite = await getInviteInfo(token);
      if (invite.status) {
        if (invite.response.invite_id) setInviteId(invite.response.invite_id);
        if (invite.response.email) setEmail(invite.response.email);
        if (invite.response.user) setUser(invite.response.user);
        if (invite.response.company) setCompany(invite.response.company);
      } else {
        addNotification(invite.message || "Unknown error!", "warning");
      }
    }
    if (token) {
      getInvite(token);
    }
  }, [token]);

  const acceptInvite = () => {
    confirmInvite({
      isRegister: false,
      isConfirm: true,
      invite_id: inviteId,
      user_id: user?.id
    }).then(res => {
      if (res.status) {
        navigate("/");
      } else {
        addNotification(res.message || "Unknown error!", "warning");
      }
    });
  }

  return (
      <div className="main-content add-project">
        <div className="add-project-block card">
          {user ?
              <div className="add-project-content create-user">
                <h2 className="add-project-title">Accept user</h2>
                <p>Вас запросили до компанії {company?.name}</p>
                <p>Щоб почати працювати разом, підтвердіть запрошення!</p>
                <Button title="Accept" classList="btn-primary" click={acceptInvite}/>
              </div> :
              <div className="add-project-content create-user">
                <h2 className="add-project-title">Register new user</h2>
                <p>Вас запросили до компанії {company?.name}</p>
                <p>Щоб почати працювати разом, завершіть реєстрацію!</p>
                <Formik initialValues={initialValues} validationSchema={schemas.custom} onSubmit={CreateUser}>
                  {({errors, touched}) => {
                    return (<Form>
                      <div className="create-user-form">
                        <p>Avatar</p>
                        <ImageUploader name={`avatar`}/>
                        <Input title="First name" placeholder="First name" name="first_name"/>
                        <Input title="Last name" placeholder="Last name" name="last_name"/>
                        <Select title="Gender" list={genderList} name="gender"/>
                        <DatePicker title="Birthday" name="birthday" placeholder="Select Date"/>
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
                        <PasswordInput name="password" title="Create Password" placeholder="Your password"/>
                        <Button type="submit" title="Register" classList="btn-primary"/>
                      </div>
                    </Form>)
                  }}
                </Formik>
              </div>}
        </div>
      </div>
  );
}