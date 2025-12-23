import React from 'react';

export default function CheckBox({name, value, title, changed}: {
  name: string,
  value: boolean,
  title: string,
  changed: (name: string, value: boolean) => void
}) {
  return (
      <div className="check-box-item">
        <label>
          <input type="checkbox" className="check-box-input" name={name} checked={value} onChange={(e) => changed(name, e.target.checked)} />
          <span className="check-box-label">{title}</span>
        </label>
      </div>
  );
}