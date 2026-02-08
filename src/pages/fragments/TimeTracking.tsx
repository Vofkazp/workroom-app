import React from "react";
import Modal from "../../components/component/Modal";
import ProgressCircle from "../../components/component/ProgressCircle";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import DurationPicker from "../../components/inputs/DurationPicker";
import DatePicker from "../../components/inputs/DatePicker";
import TextArea from "../../components/inputs/TextArea";
import Button from "../../components/component/Button";
import TimePicker from "../../components/inputs/TimePicker";
import {useTask} from "../../services/Task";
import {useNotifications} from "../../services/NitificationProvider";
import {useParams} from "react-router-dom";

type InitialValues = {
  spent_minutes: number | null;
  date: string;
  time: string;
  description: string;
}

export default function TimeTracking({estimate, openModal, closeModal}: {
  estimate: { original: string, logged: string, progress: number },
  openModal: boolean,
  closeModal: (status: boolean) => void
}) {
  const {createTimeTrack} = useTask();
  const {addNotification} = useNotifications();
  const {taskId} = useParams();

  const initialValues = {
    spent_minutes: null,
    date: "",
    time: "",
    description: ""
  }

  const regexp = {
    description: /^[а-яА-Яa-zA-Z0-9,.!?@#$%^&*()_+=\-/ ]{10,500}$/
  }

  const spent_minutes = Yup.number().required("Укажите длительность");
  const date = Yup.string().required("Выберете дату");
  const time = Yup.string().required("Выберете время");
  const description = Yup.string().matches(regexp.description, "Количество символов от 10 до 500").required("Введите описание");

  const schemas = {
    custom: Yup.object().shape({
      spent_minutes, date, time, description
    })
  }

  const saveForm = async (values: InitialValues) => {
    const started_at = getStartDate(values.date, values.time);
    const result = await createTimeTrack({
      task_id: Number(taskId),
      spent_minutes: values.spent_minutes!,
      started_at,
      description: values.description
    });
    if (result?.status) {
      closeModal(true);
      addNotification("Log збережено!", "success");
    }
  }

  const getStartDate = (date: string, time: string) => {
    const data = new Date(date);
    const times = time.split(":");
    const year = data.getFullYear();
    const month = data.getMonth();
    const day = data.getDate();
    const hour = times[0];
    const minutes = times[1];
    return new Date(year, month, day, Number(hour), Number(minutes));
  }

  return (
      <Modal isOpen={openModal} title="Time Tracking" onClose={() => closeModal(false)}>
        <div className="modal-body">
          <div className="timer-tracking-container">
            <div className="timer-tracking">
              <ProgressCircle value={estimate.progress} size={38}/>
              <div>
                <p className="details-timer-time">{estimate.logged} logged</p>
                <p className="details-timer-original-time">Original Estimate {estimate.original}</p>
              </div>
            </div>
          </div>
          <Formik initialValues={initialValues} validationSchema={schemas.custom} onSubmit={saveForm}>
            <Form className="modal-form">
              <DurationPicker name="spent_minutes" title="Time spent" placeholder="Set time spent"/>
              <div className="input-row">
                <DatePicker name="date" title="Date" placeholder="Select Date"/>
                <TimePicker name="time" title="Time" placeholder="Select Time"/>
              </div>
              <TextArea title="Work Description" placeholder="Add some description of the task" name="description"/>
              <Button classList="btn-primary" title="Save Task" type="submit"/>
            </Form>
          </Formik>
        </div>
      </Modal>
  );
}