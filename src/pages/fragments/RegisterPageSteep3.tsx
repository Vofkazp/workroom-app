import React from "react";
import {businessDirection, teamSizeList} from "../../resurses/SelectList";
import Select from "../../components/Select";
import Input from "../../components/Input";

export default function RegisterPageSteep3({name, nameError, direction, team_size, onSave}: {
  name: string;
  nameError: boolean;
  direction: number,
  team_size: number,
  onSave: (name: string, value: string | number) => void
}) {

  return (
      <>
        <span className="sign-up-content-steeps">Step 3/4</span>
        <h2 className="sign-up-title">Tell about your company</h2>
        <Input type="text" title="Your Company’s Name" placeholder="Company’s Name" name="name" value={name}
               error={nameError} errorText="Обов'язкове поле. Мінімум 2 символи" changed={onSave}/>
        <Select title="Business Direction" list={businessDirection} name="direction" value={direction}
                errorText="Incorrect data"
                changed={onSave}/>
        <div className="input-container">
          <p className="input-label">How many people in your team?</p>
          <div className="inputs-grid">
            {teamSizeList.map((item, index) => <label key={index}>
              <input type="radio" name="team_size" value={team_size} onChange={() => onSave("team_size", item.value)}
                     checked={team_size === item.value}/>
              <span className="input-radio-title">{item.label}</span>
            </label>)}
          </div>
        </div>
      </>
  );
}