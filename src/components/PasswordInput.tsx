import React, {JSX} from "react";
import Button from "./Button";
import {ErrorMessage, Field} from "formik";

export default function PasswordInput({title, placeholder, name}: {
  title: string;
  placeholder: string;
  name: string;
}): JSX.Element {
  const [type, setType] = React.useState<string>("password");

  const hidden = () => {
    setType(type === "password" ? "text" : "password");
  }

  return (
      <div className="input-container">
        <label className="label-block">
          <p className="input-label">{title}</p>
          <Field type={type} name={name} placeholder={placeholder} autoComplete="off"/>
          <Button path="eye" classList="password-btn" click={hidden}/>
        </label>
        <ErrorMessage name={name}>{(msg) => <span className="error">{msg}</span>}</ErrorMessage>
      </div>
  );
}