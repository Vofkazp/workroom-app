import React, {JSX} from "react";
import SelectItem from "./SelectItem";
import {ErrorMessage} from "formik";

export default function Select({title, list, name}: {
  title: string;
  list: { value: number; label: string }[];
  name: string;
}): JSX.Element {

  return (
      <div className="input-container">
        <div className="label-block">
          <p className="input-label">{title}</p>
          <SelectItem list={list} name={name}/>
        </div>
        <ErrorMessage name={name}>{(msg) => <span className="error">{msg}</span>}</ErrorMessage>
      </div>
  );
}