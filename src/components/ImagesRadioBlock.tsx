import React from "react";
import {Field, useFormikContext} from "formik";
import ImageUploader from "./ImageUploader";

export default function ImagesRadioBlock() {
  const {errors} = useFormikContext<{ avatar: string }>();

  const imagesForRadio = [
    "workroom/resurses/Task1_gixmvg",
    "workroom/resurses/Task2_hbvptb",
    "workroom/resurses/Task3_jz6j5z",
    "workroom/resurses/Task4_cewmet",
    "workroom/resurses/project1_xeehbh",
    "workroom/resurses/project2_vc9nju",
    "workroom/resurses/project3_bwlnch",
    "workroom/resurses/project4_lypm6h",
    "workroom/resurses/project5_btpcby",
    "workroom/resurses/project6_x9usde",
    "workroom/resurses/project7_edyoif"
  ];

  return (
      <div className="select-image-block">
        <h6 className="select-image-title">Select image</h6>
        <p className="select-image-text">
          Select or upload an avatar for the project (available formats: jpg, png)
        </p>
        <div className="select-image-grid">
          {imagesForRadio.map((item, index) =>
              <label key={index} className="select-image-item">
                <Field type="radio" name="avatar" value={item}/>
                <img
                    alt="image-progect"
                    className="select-image-img"
                    src={`https://res.cloudinary.com/dbdkhalab/image/upload/v1768143865/${item}.png`}
                />
              </label>
          )}
          <ImageUploader name="avatar" classList="radio-btn"/>
        </div>
        {errors?.avatar && (
            <span className="error">{errors.avatar}</span>
        )}
      </div>
  );
}