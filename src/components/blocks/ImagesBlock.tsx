import React from "react";
import {FieldArray, getIn, useFormikContext} from "formik";
import ImageUploader from "../component/ImageUploader";
import Button from "../component/Button";

export default function ImagesBlock() {
  const {values, errors} = useFormikContext<{
    isImages: boolean;
    images: { publicId: string }[];
  }>();

  if (!values.isImages) return null;

  return (
      <FieldArray
          name="images"
          render={arrayHelpers => (
              <div>
                <div className="images-grid">
                  {values.images.map((_, index) => {
                    const error = getIn(errors, `images.${index}.publicId`);
                    return (
                        <div className="images-grid-item" key={index}>
                          <Button
                              click={() => arrayHelpers.remove(index)}
                              fill="red"
                              path="close"
                              style={{marginLeft: "auto"}}
                          />
                          <ImageUploader name={`images.${index}.publicId`}/>
                          {error && <span className="error">{error}</span>}
                        </div>
                    );
                  })}
                  {typeof errors?.images === "string" && (
                      <span className="error">{errors.images}</span>
                  )}
                  <Button
                      click={() => arrayHelpers.push({publicId: ""})}
                      classList="btn-image black"
                      path="add"
                  />
                </div>
              </div>
          )}
      />
  );
}