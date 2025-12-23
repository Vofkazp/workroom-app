import React, {JSX} from "react";

export default function Input({type, title, placeholder, name, value, error, errorText, disabled = false, changed}: {
  type: string;
  title: string;
  placeholder: string;
  name: string;
  value: string;
  error: boolean;
  errorText: string;
  disabled?: boolean;
  changed: (name: string, value: string) => void
}): JSX.Element {

  return (
      <div className={`input-container ${error && "error"}`}>
        <label className="label-block">
          <p className="input-label">{title}</p>
          <input name={name} type={type} value={value} placeholder={placeholder}
                 onInput={(e) => changed(name, (e.target as HTMLInputElement).value)} disabled={disabled}/>
        </label>
        <span className="error">{errorText}</span>
      </div>
  );
}