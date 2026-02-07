import React from "react";
import Input from "../../components/inputs/Input";
import Button from "../../components/component/Button";
import * as Yup from "yup";
import {FieldArray, Form, Formik, FormikProps} from "formik";
import Loader from "../../components/component/Loader";

type Props = {
  Emails: string[];
  isLoading: boolean;
  onChecked: (emails: { emails: string[] }) => void;
  prevSteep: () => void;
}

export default function RegisterPageSteep4({Emails, isLoading, onChecked, prevSteep}: Props) {
  const initialValues = {
    emails: Emails
  };

  const regexp = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  }

  const schema = Yup.object({
    emails: Yup.array()
        .of(
            Yup.string()
                .trim()
                .matches(regexp.email, "Должно быть в формате youremail@gmail.com")
                .required("Введите email")
        )
        .test(
            "unique",
            "Email не должны повторяться",
            (value) => !value || new Set(value).size === value.length
        )
        .min(1, "Добавьте хотя бы один email")
  });

  const nextSteep = (values: { emails: string[] }) => {
    onChecked(values);
  }

  return (
      <Formik<{ emails: string[] }> initialValues={initialValues} validationSchema={schema}
                                    onSubmit={nextSteep}>
        {({values, errors}: FormikProps<{ emails: string[] }>) => (
            <Form>
              <div className="sign-up-content-block card">
                <div className="sign-up-content">
                  {isLoading ? <Loader size="large" speed="average"/> :
                      <>
                        <span className="sign-up-content-steeps">Step 4/4</span>
                        <h2 className="sign-up-title">Invite Team Members</h2>
                        <FieldArray
                            name="emails"
                            render={arrayHelpers => (
                                <>
                                  {values.emails.map((_, index: number) =>
                                      <div key={index} className="row">
                                        <Input title="Member’s Email" placeholder="memberemail@gmail.com"
                                               name={`emails.${index}`}/>
                                        <Button
                                            click={() => arrayHelpers.remove(index)}
                                            fill="red"
                                            path="close"
                                            style={{marginTop: 15, marginLeft: 10}}
                                        />
                                      </div>
                                  )}
                                  {typeof errors.emails === "string" &&
                                      <span className="error-msg">{errors.emails}</span>}
                                  <Button title="Add another Member" path="add" classList="back"
                                          click={() => arrayHelpers.push('')}/>
                                </>
                            )}
                        />
                      </>}
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