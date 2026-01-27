import React from 'react';
import {Field} from "formik";

export default function CheckBox({name, title}: {
  name: string,
  title: string
}) {
  return (
      <div className="check-box-item">
        <label>
          <Field type="checkbox" name={name}/>
          <span className="check-box-label">{title}</span>
        </label>
      </div>
  );
}