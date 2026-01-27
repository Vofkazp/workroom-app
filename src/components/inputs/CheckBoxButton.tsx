import React from "react";
import {Field} from "formik";
import {pathList} from "../../resurses/PathList";
import Svg from "../Svg";

type PathKey = keyof typeof pathList;

export default function CheckBoxButton({name, classList, path, fill}: {name: string, classList: string, path?: PathKey, fill?: string}) {
  return (
      <label className={`btn btn-image ${classList}`}>
        {path && <Svg path={path} fill={fill} />}
        <Field name={name} type="checkbox"/>
      </label>
  );
}