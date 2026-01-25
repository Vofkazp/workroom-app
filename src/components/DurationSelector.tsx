import React, {forwardRef, useState} from "react";
import Button from "./Button";
import NumberSelector from "./NumberSelector";

type DurationProps = {
  value: number;
  onChange: (duration: number) => void;
}

const DurationSelector = forwardRef<HTMLDivElement, DurationProps>(({value, onChange}, ref) => {
  const [totalMinutes, setTotalMinutes] = useState(value);

  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;

  const setDays = (d: number) => {
    setTotalMinutes(d * 1440 + hours * 60 + minutes);
  };

  const setHours = (h: number) => {
    setTotalMinutes(days * 1440 + h * 60 + minutes);
  };

  const setMinutes = (m: number) => {
    setTotalMinutes(days * 1440 + hours * 60 + m);
  };

  return (
      <div className="duration-selector" ref={ref}>
        <div className="selector-grid">
          <NumberSelector title="Days" inc={1} value={days} selected={setDays}/>
          <NumberSelector title="Hours" inc={1} value={hours} selected={setHours}/>
          <NumberSelector title="Minutes" inc={5} value={minutes} selected={setMinutes}/>
        </div>
        <div className="selector-footer">
          <Button click={() => onChange(totalMinutes)} title="Apply" classList="text-btn primary"/>
        </div>
      </div>
  );
});

export default DurationSelector;