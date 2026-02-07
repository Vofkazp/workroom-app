import React, {useEffect, useRef, useState} from "react";
import {Field, FieldProps} from "formik";
import Svg from "../component/Svg";
import DurationSelector from "./DurationSelector";

export default function DurationPicker({name, title, placeholder}: {
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

  const formatedValue = (duration: number | null) => {
    if (duration === null || duration === 0) return "";
    const days = Math.trunc(duration / 1440);
    const hours = Math.trunc((duration % 1440) / 60);
    const minutes = duration % 60;
    const parts: string[] = [];
    if (days) parts.push(`${days}d`);
    if (hours) parts.push(`${hours}h`);
    if (minutes) parts.push(`${minutes}m`);
    return parts.join(" ");
  }

  return (
      <Field name={name}>
        {({field, form, meta}: FieldProps) => {
          const selectedDuration = (duration: number) => {
            form.setFieldValue(name, duration);
            setIsOpen(false);
          };
          return (
              <div className="input-container date">
                <div className="label-block">
                  <p className="input-label">{title}</p>
                  <input {...field} readOnly placeholder={placeholder}
                         value={formatedValue(field.value)}
                         onClick={() => setIsOpen((v) => !v)}/>
                  <Svg path="time" fill="rgb(125, 133, 146)"/>
                  {isOpen && (<DurationSelector ref={durationElem} value={field.value} onChange={selectedDuration}/>)}
                </div>
                {meta.touched && meta.error && <span className="error">{meta.error}</span>}
              </div>
          );
        }}
      </Field>
  );
}