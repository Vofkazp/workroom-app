import React, {CSSProperties, JSX} from "react";

export default function ProgressCircle({value, size = 24}: {value: number, size?: number}): JSX.Element {
  return (
      <div className="progress-value" style={{"--progress": value} as CSSProperties}>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none">
          <circle cx="12" cy="12" r="10" stroke="rgb(125,133,146)" strokeOpacity="0.2" strokeWidth="2"/>
          <circle className="progress" cx="12" cy="12" r="10" stroke="rgb(63,140,255)" strokeWidth="2"
                  strokeLinecap="round" fill="none" transform="rotate(-90 12 12)"/>
        </svg>
      </div>
  );
}