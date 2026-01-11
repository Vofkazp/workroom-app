import React, {Fragment, useState} from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import TextArea from "../components/TextArea";
import {priorityList} from "../resurses/SelectList";
import DatePicker from "../components/DatePicker";
import ImageUploader from "../components/ImageUploader";
import {useNavigate} from "react-router-dom";

type Link = {
  title: string;
  link: string;
};

type Images = {
  publicId: string;
};

type Form = {
  name: string;
  priority: number;
  description: string;
  starts: string;
  deadLine: string;
  isLink: boolean;
  links: Link[];
  isImages: boolean;
  images: Images[];
  image: string;
}

export default function AddProject() {
  const navigate = useNavigate();
  const [form, setForm] = useState<Form>(
      {
        name: "",
        priority: 1,
        description: "",
        starts: "",
        deadLine: "",
        isLink: false,
        links: [{link: "", title: ""}],
        isImages: false,
        images: [{publicId: ""}],
        image: ""
      }
  );

  const addToForm = (name: string, value: string | number) => {
    setForm(prev => ({...prev, [name]: value}));
  }

  const toProjects = () => {
    navigate("/projects");
  }

  const checkForm = () => {
    for (const name in form) {
      const key = name as keyof typeof form;
      console.log(key + " = " + form[key]);
    }
  }

  const addLinkToForm = <K extends keyof Link>(index: number, name: K, value: Link[K]) => {
    setForm((prev) => ({
      ...prev,
      links: prev.links.map((link, i) =>
          i === index ? {...link, [name]: value} : link
      ),
    }));
  }

  const saveForm = () => {
    checkForm();
  }

  const addFile = () => {
    setForm(prev => ({...prev, isImages: !prev.isImages}))
  }

  const addLink = () => {
    setForm(prev => ({...prev, isLink: !prev.isLink}))
  }

  const addItemLink = () => {
    setForm(prev => ({...prev, links: [...prev.links, {link: "", title: ""}]}));
  }

  const addItemImage = () => {
    setForm(prev => ({...prev, images: [...prev.images, {publicId: ""}]}));
  }

  const addImageToForm = (index: number, value: string) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.map((img, i) =>
          i === index ? {...img, publicId: value} : img
      ),
    }));
  }

  const addImage = () => {

  }

  return (
      <div className="main-content add-project">
        <div className="add-project-block card">
          <Button click={toProjects} path="close" fill="rgb(10,22,41)" classList="icon"/>
          <div className="add-project-content">
            <h2 className="add-project-title">Add Project</h2>
            <div className="add-project-form-grid">
              <div>
                <Input type="text" title="Project Name" placeholder="Project Name" name="name" value={form.name}
                       error={false} errorText="Incorrect data" changed={addToForm}/>
                <div className="row">
                  <DatePicker title="Starts" name="starts" placeholder="Select Date" value={form.starts}
                              onChange={addToForm}/>
                  <DatePicker title="Dead Line" name="deadLine" placeholder="Select Date" value={form.deadLine}
                              onChange={addToForm}/>
                </div>
                <Select title="Priority" list={priorityList} name="priority"
                        value={form.priority} errorText="Incorrect data" changed={addToForm}/>
                <TextArea title="Description" name="description" error={false} errorText="Incorrect data"
                          placeholder="Add some description of the project" value={form.description}
                          changed={addToForm}/>
              </div>
              <div>
                <div className="select-image-block">
                  <h6 className="select-image-title">Select image</h6>
                  <p className="select-image-text">
                    Select or upload an avatar for the project (available formats: jpg, png)
                  </p>
                  <div className="select-image-grid">
                    <label className="select-image-item">
                      <input type="radio" name="select-image"/>
                      <img src="./images/Task1.png" alt="image" className="select-image-img"/>
                    </label>
                    <label className="select-image-item">
                      <input type="radio" name="select-image"/>
                      <img src="./images/Task2.png" alt="image" className="select-image-img"/>
                    </label>
                    <label className="select-image-item">
                      <input type="radio" name="select-image"/>
                      <img src="./images/Task3.png" alt="image" className="select-image-img"/>
                    </label>
                    <label className="select-image-item">
                      <input type="radio" name="select-image"/>
                      <img src="./images/Task4.png" alt="image" className="select-image-img"/>
                    </label>
                    <label className="select-image-item">
                      <input type="radio" name="select-image"/>
                      <img src="./images/project1.png" alt="image" className="select-image-img"/>
                    </label>
                    <label className="select-image-item">
                      <input type="radio" name="select-image"/>
                      <img src="./images/project2.png" alt="image" className="select-image-img"/>
                    </label>
                    <label className="select-image-item">
                      <input type="radio" name="select-image"/>
                      <img src="./images/project3.png" alt="image" className="select-image-img"/>
                    </label>
                    <label className="select-image-item">
                      <input type="radio" name="select-image"/>
                      <img src="./images/project4.png" alt="image" className="select-image-img"/>
                    </label>
                    <label className="select-image-item">
                      <input type="radio" name="select-image"/>
                      <img src="./images/project5.png" alt="image" className="select-image-img"/>
                    </label>
                    <label className="select-image-item">
                      <input type="radio" name="select-image"/>
                      <img src="./images/project6.png" alt="image" className="select-image-img"/>
                    </label>
                    <label className="select-image-item">
                      <input type="radio" name="select-image"/>
                      <img src="./images/project7.png" alt="image" className="select-image-img"/>
                    </label>
                    <Button click={addImage} classList="icon-btn" path="uploadImg" fill="rgb(63,140,255)"/>
                  </div>
                </div>
                {form.isLink &&
                    <div>
                      {form.links.map((item, index) =>
                          <Fragment key={index}>
                            <Input type="text" title="Reference" placeholder="External link" name="link"
                                   value={item.link}
                                   error={false} errorText="Incorrect data"
                                   changed={(_, value) => addLinkToForm(index, "link", value)}/>
                            <Input type="text" title="Title" placeholder="Description link" name="title"
                                   value={item.title}
                                   error={false} errorText="Incorrect data"
                                   changed={(_, value) => addLinkToForm(index, "title", value)}/>
                            <hr/>
                          </Fragment>
                      )}
                      <Button click={addItemLink} classList="btn-image black" path="add"
                              style={{marginBottom: 15, marginTop: 8}}/>
                    </div>
                }
                {form.isImages && <div className="images-grid">
                  {form.images.map((item, index) =>
                      <Fragment key={index}>
                        <ImageUploader value={item.publicId} name="publicId"
                                       onChange={(_, value) => addImageToForm(index, value)}/>
                      </Fragment>
                  )}
                  <Button click={addItemImage} classList="btn-image black" path="add"
                          style={{marginBottom: 15, marginTop: 8}}/>
                </div>}
                <div className="row">
                  <Button click={addFile} path="addFile" classList="btn-image purple"/>
                  <Button click={addLink} path="addLink" classList="btn-image green"/>
                </div>
              </div>
            </div>
            <Button click={saveForm} title="Save Project" classList="btn-primary"/>
          </div>
        </div>
      </div>
  );
}