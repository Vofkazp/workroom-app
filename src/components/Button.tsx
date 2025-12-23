import React, {JSX} from "react";
import Svg from "./Svg";
import {pathList} from "../resurses/PathList";

type PathKey = keyof typeof pathList;

export default function Button({title, path, classList, disabled = false, click}: {
  title?: string;
  path?: PathKey;
  classList?: string;
  disabled?: boolean;
  click: () => void
}): JSX.Element {
  return (
      <button className={`btn ${classList}`} onClick={click} disabled={disabled}>
        {title && <span className="title">{title}</span>}
        {path && <Svg path={path} />}
      </button>
  );
}