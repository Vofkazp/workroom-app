import React, {useState} from "react";
import Calendar from "./Calendar";

export default function DatePicker({value, name, title, placeholder, onChange}: {
  value: string,
  name: string,
  title: string,
  placeholder: string,
  onChange: (name: string, date: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(value ? new Date(value) : null);
  const selectedDate = (date: Date) => {
    setCurrentDate(date);
    setIsOpen(false);
    onChange(name, date.toISOString());
  };

  return (
      <div className="input-container">
        <div className="label-block">
          <p className="input-label">{title}</p>
          <input readOnly name={name}
                 value={currentDate ? currentDate.toLocaleDateString() : ""}
                 onClick={() => setIsOpen(!isOpen)} type="text" placeholder={placeholder}/>
          {isOpen && (<Calendar value={currentDate} onChange={selectedDate} setOpen={setIsOpen}/>)}
        </div>
        <span className="error">Incorrect data</span>
      </div>
  );
}