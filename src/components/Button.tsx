import React, {JSX} from "react";
import Svg from "./Svg";
import {pathList} from "../resurses/PathList";

type PathKey = keyof typeof pathList;

type btnType = "submit" | "reset" | "button";

export default function Button({title, type = "button", path, fill, classList, style, disabled = false, click}: {
  title?: string;
  type?: btnType;
  path?: PathKey;
  fill?: string;
  classList?: string;
  disabled?: boolean;
  click?: () => void;
  style?: React.CSSProperties;
}): JSX.Element {
  return (
      <button type={type} className={`btn ${classList}`} onClick={click} style={style} disabled={disabled}>
        {title && <span className="title">{title}</span>}
        {path && <Svg path={path} fill={fill} />}
      </button>
  );
}