import React, {JSX} from "react";
import Svg from "./Svg";
import {pathList} from "../resurses/PathList";

type PathKey = keyof typeof pathList;

export default function Button({title, path, fill, classList, style, disabled = false, click}: {
  title?: string;
  path?: PathKey;
  fill?: string;
  classList?: string;
  disabled?: boolean;
  click: () => void;
  style?: React.CSSProperties;
}): JSX.Element {
  return (
      <button className={`btn ${classList}`} onClick={click} style={style} disabled={disabled}>
        {title && <span className="title">{title}</span>}
        {path && <Svg path={path} fill={fill} />}
      </button>
  );
}