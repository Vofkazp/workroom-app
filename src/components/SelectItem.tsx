import React, {useEffect, useRef, useState} from "react";
import {Field, FieldProps} from "formik";

export default function SelectItem({list, name, placeholder = "Выберите значение"}: {
  list: { value: number; label: string }[];
  name: string;
  placeholder?: string
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

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
      <Field name={name}>
        {({field, form}: FieldProps) => {
          const selectedItem = (i: number) => {
            form.setFieldValue(name, list[i].value);
            form.setFieldTouched(name, true);
            setOpen(false);
          };

          return (
              <div
                  className={`select-item ${open ? "open" : ""}`}
                  ref={ref}
                  tabIndex={0}
                  role="combobox"
                  aria-expanded={open}
              >
                <div className="select-item-input" onClick={() => setOpen((o) => !o)}>
                  {list.find((i) => i.value === field.value)?.label ?? placeholder}
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
                              key={item.value}
                              role="option"
                              aria-selected={field.value === item.value}
                              className={`select-list-item ${field.value === item.value ? "selected" : ""} ${activeIndex === i ? "active" : ""}`}
                              onMouseEnter={() => setActiveIndex(i)}
                              onClick={() => selectedItem(i)}
                          >
                            <span>{item.label}</span>
                          </li>
                      ))}
                    </ul>
                )}
              </div>);
        }}
      </Field>
  );
}
