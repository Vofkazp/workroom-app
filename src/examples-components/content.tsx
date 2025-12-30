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

export const content = [
  {
    name: "buttons",
    title: "Buttons",
    components: [
      {
        example: (<Button title="Sign In" path="arrowRight" classList="btn-primary btn-primary-icon" click={() => {
        }}/>),
        code: '<Button title="Sign In" path="arrowRight" classList="btn-primary btn-primary-icon" click={() => {}}/>',
        comment: "Коментар"
      },
      {
        example: (<Button title="Don’t have an account?" classList="text-btn primary" click={() => {
        }}/>),
        code: '<Button title="Don’t have an account?" classList="text-btn primary" click={() => {}}/>',
        comment: "Коментар"
      },
      {
        example: (<Button title="Forgot Password?" classList="text-btn secondary" click={() => {
        }}/>),
        code: '<Button title="Forgot Password?" classList="text-btn secondary" click={() => {}}/>',
        comment: "Коментар"
      }
    ]
  },
  {
    name: "inputs",
    title: "Inputs",
    components: [
      {
        example: (
            <Input type="text" name="email" value={""} title="Email Address" placeholder="youremail@gmail.com"
                   error={false} errorText="Невірний формат Email" changed={() => {
            }}/>),
        code: '<Input type="text" name="email" value={"value"} title="Email Address" placeholder="youremail@gmail.com" error={false} errorText="Невірний формат Email" changed={()=>{}}/>',
        comment: "Коментар"
      },
      {
        example: (<PasswordInput type="password" name="password" value={"Password"} title="Password"
                                 placeholder="Your password"
                                 error={false} errorText="Невірний формат" changed={() => {
        }}/>),
        code: '<PasswordInput type="password" name="password" value={"Password"} title="Password" placeholder="Your password" error={false} errorText="Невірний формат" changed={()=>{}}/>',
        comment: "Коментар"
      },
      {
        example: (<CheckBox name="remember_me" value={true} title="Remember me" changed={() => {
        }}/>),
        code: '<CheckBox name="remember_me" value={true} title="Remember me" changed={()=>{}}/>',
        comment: "Коментар"
      },
      {
        example: (<InputCode sendCode={() => {
        }}/>),
        code: '<InputCode sendCode={()=>{}}/>',
        comment: "Коментар"
      },
      {
        example: (<div className='input-container'><MaskedInput mask="+38 (___) ___-__-__" value={""} onChange={() => {
        }}/></div>),
        code: '<div className="input-container"><MaskedInput mask="+38 (___) ___-__-__" value={""} onChange={() => {}}/></div>',
        comment: "Коментар"
      },
      {
        example: (<Select title="Why will you use the service?" list={whyUse} name="why_use" value={1}
                          errorText="Incorrect data" changed={() => {
        }}/>),
        code: '<Select title="Why will you use the service?" list={whyUse} name="why_use" value={1} errorText="Incorrect data" changed={() => {}}/>',
        comment: "Коментар"
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
      }
    ]
  }
]