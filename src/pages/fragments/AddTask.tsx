import React, {useEffect, useMemo, useState} from "react";
import Modal from "../../components/component/Modal";
import {Form, Formik} from "formik";
import Input from "../../components/inputs/Input";
import * as Yup from "yup";
import Select from "../../components/inputs/Select";
import {groupList, priorityList} from "../../resurses/SelectList";
import DatePicker from "../../components/inputs/DatePicker";
import TextArea from "../../components/inputs/TextArea";
import Button from "../../components/component/Button";
import CheckBoxButton from "../../components/inputs/CheckBoxButton";
import LinksBlock from "../../components/blocks/LinksBlock";
import ImagesBlock from "../../components/blocks/ImagesBlock";
import DurationPicker from "../../components/inputs/DurationPicker";
import {User, useUser} from "../../services/User";
import SelectUser from "../../components/inputs/SelectUser";
import {TaskType, useTask} from "../../services/Task";
import {useNotifications} from "../../services/NitificationProvider";
import Loader from "../../components/component/Loader";
import {useParams} from "react-router-dom";

export default function AddTask({openModal, closeModal}: {
  openModal: boolean,
  closeModal: (status: boolean) => void
}) {
  const {projectId} = useParams();
  const {getUserList} = useUser();
  const {createTask} = useTask();
  const {addNotification} = useNotifications();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getUserList();
      if (res?.status) setUsers(res.response);
    })();
  }, []);

  const initialValues = useMemo(() => ({
    projectId: Number(projectId),
    name: "",
    group: 1,
    estimate: null,
    deadLine: "",
    priority: 1,
    assignee: null,
    description: "",
    isLink: false,
    links: [{link: "", title: ""}],
    isImages: false,
    images: [{publicId: ""}]
  }), [projectId]);

  const regexp = {
    name: /^[а-яА-Яa-zA-Z0-9,.!?@#$%^&*()_+=\-/ ]{2,50}$/,
    description: /^[а-яА-Яa-zA-Z0-9,.!?@#$%^&*()_+=\-/ ]{10,500}$/
  }

  const name = Yup.string().matches(regexp.name, "Количество символов от 2 до 50").required("Введите название");
  const group = Yup.number().required("Выберете группу");
  const estimate = Yup.number().required("Укажите длительность");
  const deadLine = Yup.string().required("Выберете дату");
  const priority = Yup.number().required("Выберете степень приоритета");
  const assignee = Yup.number().required("Выберете исполнителя");
  const description = Yup.string().matches(regexp.description, "Количество символов от 10 до 500").required("Введите описание");
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
      name, group, estimate, deadLine, priority, assignee, description, isLink, links, isImages, images
    })
  }

  const saveForm = (values: TaskType) => {
    setLoading(true);
    createTask({...values, status: 1}).then(res => {
      if (res?.status) {
        addNotification("Задачу створено", "success");
        closeModal(true);
      }
    }).finally(() => setLoading(false));
  }

  return (
      <Modal isOpen={openModal} title="Add Task" onClose={() => closeModal(false)}>
        <div className="modal-body">
          {loading ? <Loader size="large" speed="average"/> :
              <Formik initialValues={initialValues} validationSchema={schemas.custom} onSubmit={saveForm}
                      enableReinitialize>
                <Form className="modal-form">
                  <Input title="Task Name" placeholder="Task Name" name="name"/>
                  <Select title="Task Group" list={groupList} name="group"/>
                  <div className="input-row">
                    <DurationPicker name="estimate" title="Estimate" placeholder="Select duration"/>
                    <DatePicker name="deadLine" title="Dead Line" placeholder="Select Date"/>
                  </div>
                  <Select title="Priority" list={priorityList} name="priority"/>
                  <SelectUser title="Assignee" list={users} name="assignee" placeholder="Select Assignee"/>
                  <TextArea title="Description" placeholder="Add some description of the task" name="description"/>
                  <LinksBlock/>
                  <ImagesBlock/>
                  <div className="row">
                    <CheckBoxButton name="isImages" path="addFile" classList="purple"/>
                    <CheckBoxButton name="isLink" path="addLink" classList="green"/>
                  </div>
                  <Button type="submit" title="Save Task" classList="btn-primary" style={{marginTop: 10}}/>
                </Form>
              </Formik>}
        </div>
      </Modal>
  );
}