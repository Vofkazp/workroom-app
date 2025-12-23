import React from "react";
import Select from "../../components/Select";
import {roleList, whyUse} from "../../resurses/SelectList";

export default function RegisterPageSteep2({why_use, role, self_employed, onSave}: {
  why_use: number,
  role: number,
  self_employed: boolean,
  onSave: (name: string, value: number) => void
}) {

  return (
      <>
        <span className="sign-up-content-steeps">Step 2/4</span>
        <h2 className="sign-up-title">Tell about yourself</h2>
        <Select title="Why will you use the service?" list={whyUse} name="why_use" value={why_use}
                errorText="Incorrect data"
                changed={onSave}/>
        <Select title="What describes you best?" list={roleList} name="role" value={role}
                errorText="Incorrect data"
                changed={onSave}/>
        <div className="input-container input-radio">
          <p className="input-label">Are you self-employed?</p>
          <label>
            <input
                type="radio"
                name="describes"
                value={1}
                checked={self_employed}
                onChange={(e) => onSave("self_employed", +e.target.value)}
            />
            <span className="input-radio-title">Yes</span>
          </label>
          <label>
            <input
                type="radio"
                name="describes"
                value={0}
                checked={!self_employed}
                onChange={(e) => onSave("self_employed", +e.target.value)}
            />
            <span className="input-radio-title">No</span>
          </label>
        </div>
      </>
  );
}