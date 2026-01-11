import React, {JSX} from "react";

export default function TextArea({title, placeholder, name, value, error, errorText, disabled = false, changed}: {
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
        <p className="input-label">{title}</p>
        <textarea rows={4} name={name} placeholder={placeholder} autoComplete="off" value={value}
                  onInput={(e) => changed(name, (e.target as HTMLInputElement).value)}
                  disabled={disabled}></textarea>
        <span className="error">{errorText}</span>
      </div>
  );
}