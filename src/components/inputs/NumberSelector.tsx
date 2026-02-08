import React from "react";
import Button from "../component/Button";

export default function NumberSelector({title, inc, value, selected, maxValue = 1000000}: {
  title: string,
  inc: number,
  value: number,
  maxValue?: number,
  selected: (value: number) => void
}) {
  return (
      <div>
        <p className="column-name">{title}</p>
        <div className="number-selector">
          <Button classList="chevron-btn" path="chevron_up" click={() => selected(value + inc)} disabled={maxValue === value}/>
          <span className="selector-value">{value}</span>
          <Button classList="chevron-btn" path="chevron_down" click={() => selected(value - inc)}
                  disabled={value === 0}/>
        </div>
      </div>
  );
}