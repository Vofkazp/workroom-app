import React, {JSX} from "react";
import SelectItem from "./SelectItem";

export default function Select({title, list, name, value, error=false, errorText, disabled = false, changed}: {
  title: string;
  list: { value: number; label: string }[];
  name: string;
  value: number;
  error?: boolean;
  errorText: string;
  disabled?: boolean;
  changed: (name: string, value: number) => void
}): JSX.Element {

  return (
      <div className={`input-container ${error && "error"}`}>
        <div className="label-block">
          <p className="input-label">{title}</p>
          <SelectItem list={list} value={value} name={name} selected={(n, value) => changed(n, value)} disabled={disabled}/>
        </div>
        <span className="error">{errorText}</span>
      </div>
  );
}