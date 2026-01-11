import React, {JSX} from 'react';
import {pathList} from "../resurses/PathList";

type PathKey = keyof typeof pathList;

export default function Svg({path, fill = "currentColor"}: { path: PathKey, fill?: string }): JSX.Element {
  return (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
        <path d={pathList[path]} fill={fill} fillRule="evenodd"/>
      </svg>
  );
}