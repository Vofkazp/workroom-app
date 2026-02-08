import React, {useEffect, useRef, useState} from "react";
import {Field, FieldProps} from "formik";
import Svg from "../component/Svg";
import TimeSelector from "./TimeSelector";

export default function TimePicker({name, title, placeholder}: {
  name: string,
  title: string,
  placeholder: string
}) {
  const [isOpen, setIsOpen] = useState(false);
  const durationElem = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (durationElem.current && !durationElem.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
      <Field name={name}>
        {({field, form, meta}: FieldProps) => {
          const selectedDuration = (time: string) => {
            form.setFieldValue(name, time);
            setIsOpen(false);
          };
          return (
              <div className="input-container date">
                <div className="label-block">
                  <p className="input-label">{title}</p>
                  <input {...field} readOnly placeholder={placeholder}
                         value={field.value}
                         onClick={() => setIsOpen((v) => !v)}/>
                  <Svg path="time" fill="rgb(125, 133, 146)"/>
                  {isOpen && (<TimeSelector ref={durationElem} value={field.value} onChange={selectedDuration}/>)}
                </div>
                {meta.touched && meta.error && <span className="error">{meta.error}</span>}
              </div>
          );
        }}
      </Field>
  );
}