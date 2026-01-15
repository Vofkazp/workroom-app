import React from "react";
import Select from "../../components/Select";
import {roleList, whyUse} from "../../resurses/SelectList";
import {Field, Form, Formik} from "formik";
import Button from "../../components/Button";
import * as Yup from "yup";

type Props = {
  whyUseItem: number,
  roles: number,
  selfEmployed: string,
  onChecked: (form: SelectValues) => void;
  prevSteep: () => void;
}

export type SelectValues = {
  why_use: number;
  role: number;
  self_employed: string;
}

export default function RegisterPageSteep2({whyUseItem, roles, selfEmployed, onChecked, prevSteep}: Props) {

  const initialValues = {
    why_use: whyUseItem,
    role: roles,
    self_employed: selfEmployed,
  };

  const why_use = Yup.number();
  const role = Yup.number();
  const self_employed = Yup.string();

  const schemas = {
    custom: Yup.object().shape({
      why_use, role, self_employed
    })
  }

  const nextSteep = (values: SelectValues) => {
    onChecked(values);
  }

  return (
      <Formik<SelectValues> initialValues={initialValues} validationSchema={schemas.custom} onSubmit={nextSteep}>
        <Form>
          <div className="sign-up-content-block card">
            <div className="sign-up-content">
              <span className="sign-up-content-steeps">Step 2/4</span>
              <h2 className="sign-up-title">Tell about yourself</h2>
              <Select title="Why will you use the service?" list={whyUse} name="why_use"/>
              <Select title="What describes you best?" list={roleList} name="role"/>
              <div className="input-container input-radio" role="group" aria-labelledby="self_employed-group">
                <p className="input-label">Are you self-employed?</p>
                <label>
                  <Field type="radio" name="self_employed" value="true"/>
                  <span className="input-radio-title">Yes</span>
                </label>
                <label>
                  <Field type="radio" name="self_employed" value="false"/>
                  <span className="input-radio-title">No</span>
                </label>
              </div>
            </div>
            <div className="sign-up-content-footer">
              <Button title="Previous" path="back" classList="back" click={prevSteep}/>
              <Button type="submit" title="Next Step" path="arrowRight"
                      classList="btn-primary btn-primary-icon"/>
            </div>
          </div>
        </Form>
      </Formik>
  );
}