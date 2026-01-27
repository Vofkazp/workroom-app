import React, {JSX} from "react";
import {ErrorMessage, Field} from "formik";

export default function TextArea({title, placeholder, name}: {
  title: string;
  placeholder: string;
  name: string;
}): JSX.Element {
  return (
      <div className="input-container">
        <p className="input-label">{title}</p>
        <Field name={name} placeholder={placeholder} component="textarea" rows={4} />
        <ErrorMessage name={name}>{(msg) => <span className="error">{msg}</span>}</ErrorMessage>
      </div>
  );
}