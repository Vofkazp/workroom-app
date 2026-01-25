import React, {useEffect, useRef, useState} from "react";
import {ErrorMessage, Field, FieldProps} from "formik";
import {User} from "../services/User";

export default function SelectUser({title, list, name, placeholder}: {
  title: string;
  list: User[];
  name: string;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
      <div className="input-container">
        <div className="label-block">
          <p className="input-label">{title}</p>
          <Field name={name}>
            {({field, form}: FieldProps) => {
              const selectedItem = async (item: User) => {
                await form.setFieldValue(name, item.id, true);
                await form.setFieldTouched(name, true, false);
                setOpen(false);
              };

              const foundItem = list.find(i => i.id === field.value);
              const selectedName = foundItem
                  ? `${foundItem.first_name} ${foundItem.last_name}`
                  : undefined;

              return (
                  <div
                      className={`select-item ${open ? "open" : ""}`}
                      ref={ref}
                      tabIndex={0}
                      role="combobox"
                      aria-expanded={open}
                  >
                    <div className="select-item-input" onClick={() => setOpen((o) => !o)}>
                      {selectedName ?? placeholder}
                    </div>
                    {open && (
                        <ul
                            className="select-item-list"
                            role="listbox"
                            ref={listRef}
                            style={{"--i": list.length} as React.CSSProperties}
                        >
                          {list.map((item, i) => (
                              <li
                                  key={item.id}
                                  role="option"
                                  aria-selected={field.value === item.id}
                                  className={`select-list-item ${field.value === item.id ? "selected" : ""}`}
                                  onClick={() => selectedItem(item)}
                              >
                                {item.avatar && (
                                    <img
                                        src={item.avatar.url}
                                        alt={item.avatar.publicId}
                                    />
                                )}
                                <span>{item.first_name + " " + item.last_name}</span>
                              </li>
                          ))}
                        </ul>
                    )}
                  </div>);
            }}
          </Field>
        </div>
        <ErrorMessage name={name}>{(msg) => <span className="error">{msg}</span>}</ErrorMessage>
      </div>
  );
}