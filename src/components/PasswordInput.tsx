import React, {JSX} from "react";
import Button from "./Button";

export default function PasswordInput({type, title, placeholder, name, value, error, errorText, disabled = false, changed}: {
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
  const [newType, setNewType] = React.useState<string>(type);

  const hidden = () => {
    if (newType === "password") {
      setNewType("text");
    } else {
      setNewType("password");
    }
  }

  return (
      <div className={`input-container ${error && "error"}`}>
        <label className="label-block">
          <p className="input-label">{title}</p>
          <input name={name} type={newType} value={value} placeholder={placeholder}
                 onInput={(e) => changed(name, (e.target as HTMLInputElement).value)} disabled={disabled}/>
          <Button path="eye" click={hidden}/>
        </label>
        <span className="error">{errorText}</span>
      </div>
  );
}