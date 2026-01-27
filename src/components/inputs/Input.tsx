import React, {JSX} from "react";
import {Field, ErrorMessage} from "formik";

export default function Input({title, placeholder, name}: {
  title: string;
  placeholder: string;
  name: string;
}): JSX.Element {

  return (
      <div className="input-container">
        <label className="label-block">
          <p className="input-label">{title}</p>
          <Field name={name} placeholder={placeholder}/>
        </label>
        <ErrorMessage name={name}>{(msg) => <span className="error">{msg}</span>}</ErrorMessage>
      </div>
  );
}