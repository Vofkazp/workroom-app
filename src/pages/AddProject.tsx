import React from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import TextArea from "../components/TextArea";
import {priorityList} from "../resurses/SelectList";
import DatePicker from "../components/DatePicker";
import {useNavigate} from "react-router-dom";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import CheckBoxButton from "../components/CheckBoxButton";
import LinksBlock from "../components/LinksBlock";
import ImagesBlock from "../components/ImagesBlock";
import ImagesRadioBlock from "../components/ImagesRadioBlock";

export default function AddProject() {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    priority: 1,
    description: "",
    starts: "",
    deadLine: "",
    avatar: "",
    isLink: false,
    links: [{link: "", title: ""}],
    isImages: false,
    images: [{publicId: ""}]
  };

  const regexp = {
    name: /^[а-яА-Яa-zA-Z]{2,20}$/,
    description: /^[а-яА-Яa-zA-Z0-9,.!?@#$%^&*()_+=\-*/ ]{10,500}$/
  }

  const name = Yup.string().matches(regexp.name, "Количество символов от 2 до 20").required("Введите название");
  const priority = Yup.number().required("Выберете степень приоритета");
  const description = Yup.string().matches(regexp.description, "Количество символов от 10 до 500").required("Введите описание");
  const avatar = Yup.string().required("Выберете или загрузите изображение");
  const starts = Yup.string().required("Выберете дату");
  const deadLine = Yup.string().required("Выберете дату");
  const isLink = Yup.boolean();
  const isImages = Yup.boolean();
  const links = Yup.array().when("isLink", {
    is: true,
    then: (schema) =>
        schema.of(
            Yup.object({
              link: Yup.string()
                  .url("Некорректная ссылка")
                  .required("Ссылка обязательна"),
              title: Yup.string().required("Введите название"),
            })
        ).min(1, "Добавьте хотя бы одну ссылку"),
    otherwise: (schema) => schema.notRequired(),
  });
  const images = Yup.array().when("isImages", {
    is: true,
    then: (schema) =>
        schema.of(
            Yup.object({
              publicId: Yup.string().required("Загрузите изображение"),
            })
        ).min(1, "Добавьте хотя бы одно изображение"),
    otherwise: (schema) => schema.notRequired(),
  });


  const schemas = {
    custom: Yup.object().shape({
      name, starts, deadLine, priority, description, isLink, links, isImages, images, avatar
    })
  }

  const toProjects = () => {
    navigate("/projects");
  }

  const saveForm = (values: any) => {
    console.log(values)
  }

  return (
      <div className="main-content add-project">
        <div className="add-project-block card">
          <Button click={toProjects} path="close" fill="rgb(10,22,41)" classList="icon"/>
          <Formik initialValues={initialValues} validationSchema={schemas.custom} onSubmit={saveForm}>
            <Form>
              <div className="add-project-content">
                <h2 className="add-project-title">Add Project</h2>
                <div className="add-project-form-grid">
                  <div>
                    <Input title="Project Name" placeholder="Project Name" name="name"/>
                    <div className="row">
                      <DatePicker title="Starts" name="starts" placeholder="Select Date"/>
                      <DatePicker title="Dead Line" name="deadLine" placeholder="Select Date"/>
                    </div>
                    <Select title="Priority" list={priorityList} name="priority"/>
                    <TextArea title="Description" name="description"
                              placeholder="Add some description of the project"/>
                    <LinksBlock/>
                    <ImagesBlock/>
                  </div>
                  <div>
                    <ImagesRadioBlock/>
                    <div className="row">
                      <CheckBoxButton name="isImages" path="addFile" classList="purple"/>
                      <CheckBoxButton name="isLink" path="addLink" classList="green"/>
                    </div>
                  </div>
                </div>
                <Button type="submit" title="Save Project" classList="btn-primary"/>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
  );
}