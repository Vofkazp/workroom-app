import React from "react";
import {businessDirection, teamSizeList} from "../../resurses/SelectList";
import Select from "../../components/Select";
import Input from "../../components/Input";
import * as Yup from "yup";
import Button from "../../components/Button";
import {Field, Form, Formik, FormikProps} from "formik";

type Props = {
  Name: string;
  Direction: number,
  teamSize: number,
  onChecked: (form: CompanyValues) => void;
  prevSteep: () => void;
}

export type CompanyValues = {
  name: string;
  direction: number,
  team_size: number,
}

export default function RegisterPageSteep3({Name, Direction, teamSize, onChecked, prevSteep}: Props) {

  const initialValues = {
    name: Name,
    direction: Direction,
    team_size: teamSize,
  };

  const regexp = {
    name: /^[а-яА-Яa-zA-Z0-9,.!?@#$%^&*()_+=\-*/ ]{2,50}$/
  }

  const name = Yup.string().matches(regexp.name, "Количество символов от 2 до 50").required("Введите название");
  const direction = Yup.number();
  const team_size = Yup.number();

  const schemas = {
    custom: Yup.object().shape({
      name, direction, team_size
    })
  }

  const nextSteep = (values: CompanyValues) => {
    onChecked(values);
  }

  return (
      <Formik<CompanyValues> initialValues={initialValues} validationSchema={schemas.custom} onSubmit={nextSteep}>
        {({values}: FormikProps<CompanyValues>) => (
            <Form>
              <div className="sign-up-content-block card">
                <div className="sign-up-content">
                  <span className="sign-up-content-steeps">Step 3/4</span>
                  <h2 className="sign-up-title">Tell about your company</h2>
                  <Input title="Your Company’s Name" placeholder="Company’s Name" name="name"/>
                  <Select title="Business Direction" list={businessDirection} name="direction"/>
                  <div className="input-container">
                    <p className="input-label">How many people in your team?</p>
                    <div className="inputs-grid" role="group" aria-labelledby="team_size-group">
                      {teamSizeList.map((item, index) => <label key={index}>
                        <Field type="radio" name="team_size" value={item.value.toString()}
                               checked={item.value.toString() === values.team_size.toString()}/>
                        <span className="input-radio-title">{item.label}</span>
                      </label>)}
                    </div>
                  </div>
                </div>
                <div className="sign-up-content-footer">
                  <Button title="Previous" path="back" classList="back" click={prevSteep}/>
                  <Button type="submit" title="Next Step" path="arrowRight"
                          classList="btn-primary btn-primary-icon"/>
                </div>
              </div>
            </Form>
        )}
      </Formik>
  );
}