import React, {forwardRef, useEffect, useState} from "react";
import Button from "../component/Button";
import NumberSelector from "./NumberSelector";

type DurationProps = {
  value: string;
  onChange: (time: string) => void;
}

const TimeSelector = forwardRef<HTMLDivElement, DurationProps>(({value, onChange}, ref) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    if (value.includes(":")) {
      const arr = value.split(":");
      setHours(Number(arr[0]));
      setMinutes(Number(arr[1]));
    }
  }, [value]);

  const saveMinutes = (value: number) => {
    if (value === 60 && hours < 23) {
      setHours(prev => prev + 1);
      setMinutes(0);
    } else {
      setMinutes(value);
    }
  }

  return (
      <div className="duration-selector" ref={ref}>
        <div className="selector-grid">
          <NumberSelector title="Hours" inc={1} value={hours} selected={setHours} maxValue={23}/>
          <NumberSelector title="Minutes" inc={5} value={minutes} selected={saveMinutes} maxValue={60}/>
        </div>
        <div className="selector-footer">
          <Button click={() => onChange(`${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`)}
                  title="Apply" classList="text-btn primary"/>
        </div>
      </div>
  );
});

export default TimeSelector;