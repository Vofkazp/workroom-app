import React from "react";
import Button from '../components/Button';
import Input from "../components/Input";
import PasswordInput from "../components/PasswordInput";
import CheckBox from "../components/CheckBox";
import Svg from "../components/Svg";
import InputCode from "../components/InputCode";
import MaskedInput from "../components/MaskedInput";
import {whyUse} from "../resurses/SelectList";
import Select from "../components/Select";
import TextArea from "../components/TextArea";
import CheckBoxButton from "../components/CheckBoxButton";

export const content = [
  {
    name: "buttons",
    title: "Buttons",
    components: [
      {
        example: (<Button classList="btn-primary btn-primary-icon reverse" path="support" title="Support"/>),
        code: '<Button classList="btn-primary btn-primary-icon reverse" path="support" title="Support"/>',
        comment: "Коментар"
      },
      {
        example: (
            <Button title="Sign In" path="arrowRight" classList="btn-primary btn-primary-icon w-170"/>),
        code: '<Button title="Sign In" path="arrowRight" classList="btn-primary btn-primary-icon w-170"/>',
        comment: "Коментар"
      },
      {
        example: (<Button title="Don’t have an account?" classList="text-btn primary" />),
        code: '<Button title="Don’t have an account?" classList="text-btn primary"/>',
        comment: "Коментар"
      },
      {
        example: (<Button title="Forgot Password?" classList="text-btn secondary" />),
        code: '<Button title="Forgot Password?" classList="text-btn secondary"/>',
        comment: "Коментар"
      },
      {
        example: (<Button classList="icon-btn" path="notification"/>),
        code: '<Button classList="icon-btn" path="notification" />',
        comment: "Коментар"
      },
      {
        example: (<CheckBoxButton name="isLink" path="addLink" classList="green"/>),
        code: '<CheckBoxButton name="isLink" path="addLink" classList="green"/>',
        comment: "const isLink = Yup.boolean();"
      }
    ]
  },
  {
    name: "inputs",
    title: "Inputs",
    components: [
      {
        example: (
            <Input name="email" title="Email Address" placeholder="youremail@gmail.com"/>),
        code: '<Input name="email" title="Email Address" placeholder="youremail@gmail.com"/>',
        comment: "const email = Yup.string().matches(/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/, \"Должно быть в формате 'example@test.com'\").required(\"Введите название\");"
      },
      {
        example: (<PasswordInput name="password" title="Password" placeholder="Your password"/>),
        code: '<PasswordInput name="password" title="Password" placeholder="Your password"/>',
        comment: "const password = Yup.string()\n" +
            "      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\w\\s]).{8,}$/, \"Минимум 8 символов, одна заглавная, одна строчная, цифра и спецсимвол\")\n" +
            "      .required(\"Введите пароль\");"
      },
      {
        example: (<CheckBox name="remember_me" title="Remember me"/>),
        code: '<CheckBox name="remember_me" title="Remember me"/>',
        comment: "const remember_me = Yup.boolean();"
      },
      // {
      //   example: (<InputCode sendCode={() => {
      //   }}/>),
      //   code: '<InputCode sendCode={()=>{}}/>',
      //   comment: "Коментар"
      // },
      // {
      //   example: (<div className='input-container'><MaskedInput mask="+38 (___) ___-__-__" value={""} onChange={() => {
      //   }}/></div>),
      //   code: '<div className="input-container"><MaskedInput mask="+38 (___) ___-__-__" value={""} onChange={() => {}}/></div>',
      //   comment: "Коментар"
      // },
      {
        example: (<Select title="Why will you use the service?" list={whyUse} name="why_use"/>),
        code: '<Select title="Why will you use the service?" list={whyUse} name="why_use"/>',
        comment: "const why_use = Yup.number().required(\"Выберете...\");"
      },
      {
        example: (<TextArea title="Description" name="description" placeholder="Add some description of the project"/>),
        code: '<TextArea title="Description" name="description" placeholder="Add some description of the project"/>',
        comment: "const description = Yup.string().matches(/^[а-яА-Яa-zA-Z0-9,.!?@#$%^&*()_+=\\-*/ ]{10,500}$/, \"Количество символов от 10 до 500\").required(\"Введите описание\");"
      }
    ]
  },
  {
    name: "other",
    title: "Others",
    components: [
      {
        example: (<Svg path={"eye"}/>),
        code: '<Svg path={"eye"} />',
        comment: "Коментар"
      },
      {
        example: (<Svg path={"notification"}/>),
        code: 'const {addNotification} = useNotifications(); const add = () => { addNotification("Test message from page!", "warning"); }',
        comment: "Коментар"
      }
    ]
  }
]