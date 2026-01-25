import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import Calendar from "./Calendar";
import {Field, FieldProps} from "formik";
import Svg from "./Svg";

export default function DatePicker({name, title, placeholder}: {
  name: string,
  title: string,
  placeholder: string
}) {
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useLayoutEffect(() => {
    if (!isOpen) return;
    if (!containerRef.current || !calendarRef.current) return;
    const container = containerRef.current;
    const calendar = calendarRef.current;
    let boundary: HTMLElement | null = container.parentElement;
    if (!boundary) return;
    let boundaryRect = boundary.getBoundingClientRect();
    const inputRect = container.getBoundingClientRect();
    const calendarRect = calendar.getBoundingClientRect();
    const spaceBelow = boundaryRect.bottom - inputRect.bottom;
    const spaceAbove = inputRect.top - boundaryRect.top;
    if (
        calendarRect.height > spaceBelow &&
        calendarRect.height > spaceAbove &&
        boundary.parentElement
    ) {
      boundary = boundary.parentElement;
      boundaryRect = boundary.getBoundingClientRect();
    }
    let top = inputRect.height - 19;
    let left = 0;
    if (inputRect.bottom + calendarRect.height > boundaryRect.bottom) {
      top = boundaryRect.bottom - calendarRect.height - inputRect.top;
    }
    if (inputRect.left + calendarRect.width > boundaryRect.right) {
      left = boundaryRect.right - inputRect.left - calendarRect.width;
    }
    if (inputRect.left + left < boundaryRect.left) {
      left = boundaryRect.left - inputRect.left;
    }
    calendarRef.current.style.top = `${top}px`;
    calendarRef.current.style.left = `${left}px`;
  }, [isOpen]);

  return (
      <Field name={name}>
        {({field, form, meta}: FieldProps) => {
          const selectedDate = (date: Date) => {
            form.setFieldValue(name, date.toISOString());
            setIsOpen(false);
          };
          return (
              <div ref={containerRef} className="input-container date">
                <div className="label-block">
                  <p className="input-label">{title}</p>
                  <input {...field} readOnly placeholder={placeholder}
                         value={field.value ? new Date(field.value).toLocaleDateString() : ""}
                         onClick={() => setIsOpen((v) => !v)}/>
                  <Svg path="calendar" fill="rgba(125, 133, 146, 1)"/>
                  {isOpen && (<Calendar classList="small" ref={calendarRef} value={field.value ? new Date(field.value) : new Date()} onChange={selectedDate}/>)}
                </div>
                {meta.touched && meta.error && <span className="error">{meta.error}</span>}
              </div>
          );
        }}
      </Field>
  );
}