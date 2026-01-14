import React from "react";
import Input from "./Input";
import Button from "./Button";
import {FieldArray, useFormikContext} from "formik";

type LinkItem = {
  link: string;
  title: string;
};

export default function LinksBlock() {
  const {values, errors} = useFormikContext<{
    isLink: boolean;
    links: LinkItem[];
  }>();

  if (!values.isLink) return null;
  return (
      <FieldArray
          name="links"
          render={arrayHelpers => (
              <div className="links-block-container">
                {values.links.map((_: any, index: number) =>
                    <div className="links-block-item" key={index}>
                      <div className="links-block-input">
                        <Input title="External link" placeholder="Reference"
                               name={`links.${index}.link`}/>
                        <Input title="Title" placeholder="Link description"
                               name={`links.${index}.title`}/>
                      </div>
                      <Button
                          click={() => arrayHelpers.remove(index)}
                          fill="red"
                          path="close"
                      />
                    </div>
                )}
                {typeof errors?.links === "string" && (
                    <span className="error">{errors.links}</span>
                )}
                <Button
                    click={() => arrayHelpers.push({link: "", title: ""})}
                    classList="btn-image black"
                    path="add"
                    style={{marginBottom: 15, marginTop: 8}}
                />
              </div>
          )}
      />
  );
}