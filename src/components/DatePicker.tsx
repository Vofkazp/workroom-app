import React, {useState} from "react";
import Calendar from "./Calendar";
import {Field, FieldProps} from "formik";

export default function DatePicker({name, title, placeholder}: {
  name: string,
  title: string,
  placeholder: string
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
      <Field name={name}>
        {({field, form, meta}: FieldProps) => {
          const selectedDate = (date: Date) => {
            form.setFieldValue(name, date.toISOString());
            setIsOpen(false);
          };
          return (<div className="input-container">
            <div className="label-block">
              <p className="input-label">{title}</p>
              <input {...field} readOnly placeholder={placeholder}
                     value={field.value ? new Date(field.value).toLocaleDateString() : ""}
                     onClick={() => setIsOpen((v) => !v)}/>
              {isOpen && (<Calendar value={field.value ? new Date(field.value) : new Date()} onChange={selectedDate}
                                    setOpen={setIsOpen}/>)}
            </div>
            {meta.touched && meta.error && <span className="error">{meta.error}</span>}
          </div>);
        }}
      </Field>
  );
}