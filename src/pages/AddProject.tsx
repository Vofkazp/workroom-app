import React, {useEffect, useState} from "react";
import Button from "../components/component/Button";
import Input from "../components/inputs/Input";
import Select from "../components/inputs/Select";
import TextArea from "../components/inputs/TextArea";
import {priorityList} from "../resurses/SelectList";
import DatePicker from "../components/inputs/DatePicker";
import {useNavigate, useParams} from "react-router-dom";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import CheckBoxButton from "../components/inputs/CheckBoxButton";
import LinksBlock from "../components/blocks/LinksBlock";
import ImagesBlock from "../components/blocks/ImagesBlock";
import ImagesRadioBlock from "../components/blocks/ImagesRadioBlock";
import {ProjectType, useProject} from "../services/Project";
import Loader from "../components/component/Loader";
import {useNotifications} from "../services/NitificationProvider";

export default function AddProject() {
  const {projectId} = useParams();
  const navigate = useNavigate();
  const {createProject, getProjectItem, updateProject} = useProject();
  const {addNotification} = useNotifications();
  const [loading, setLoading] = useState(false);
  const [projectItem, setProjectItem] = useState({
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
  });

  useEffect(() => {
    if (projectId) {
      loadProjectItem();
    }
  }, []);

  const loadProjectItem = async () => {
    const result = await getProjectItem(Number(projectId));
    if (result?.status) setProjectItem({...result.response, avatar: result.response.avatar.publicId});
  }

  const regexp = {
    name: /^[а-яА-Яa-zA-Z0-9,.!?@#$%^&*()_+=\-/ ]{2,100}$/,
    description: /^[а-яА-Яa-zA-Z0-9,.!?@#$%^&*()_+=\-/ ]{10,500}$/
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
    otherwise: (schema) => schema.strip(),
  });
  const images = Yup.array().when("isImages", {
    is: true,
    then: (schema) =>
        schema.of(
            Yup.object({
              publicId: Yup.string().required("Загрузите изображение"),
            })
        ).min(1, "Добавьте хотя бы одно изображение"),
    otherwise: (schema) => schema.strip(),
  });


  const schemas = {
    custom: Yup.object().shape({
      name, starts, deadLine, priority, description, isLink, links, isImages, images, avatar
    })
  }

  const toProjects = () => {
    navigate("/projects");
  }

  const saveForm = (values: ProjectType) => {
    setLoading(true);
    if (projectId) {
      updateProject({...values, id: Number(projectId)}).then(res => {
        if (res?.status) {
          addNotification("Проєкт змінено", "success");
          navigate("/projects");
        } else {
          addNotification(res?.message || "Unexpected error", "warning");
        }
      }).finally(() => setLoading(false));
    } else {
      createProject(values).then(res => {
        if (res?.status) {
          addNotification("Проєкт створено", "success");
          navigate("/projects");
        } else {
          addNotification(res?.message || "Unexpected error", "warning");
        }
      }).finally(() => setLoading(false));
    }
  }

  return (
      <div className="main-content add-project">
        <div className="add-project-block card">
          {loading ? <Loader size="large" speed="average"/> : <>
            <Button click={toProjects} path="close" fill="rgb(10,22,41)" classList="icon"/>
            <Formik initialValues={projectItem} validationSchema={schemas.custom} onSubmit={saveForm}
                    enableReinitialize>
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
          </>}
        </div>
      </div>
  );
}