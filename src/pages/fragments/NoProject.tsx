import React from "react";
import Button from "../../components/component/Button";
import {useNavigate} from "react-router-dom";

export default function NoProject({type, openModal}: { type: "project" | "task", openModal?: () => void }) {
  const navigate = useNavigate();

  const addItem = () => {
    if (type === "project") {
      navigate("/add-project");
    } else {
      openModal?.();
    }
  }

  return (
      <div className="no-tasks">
        <img src="/images/No-tasks.png" alt="No tasks" className="no-tasks-img"/>
        <h4 className="no-tasks-title">
          {type === "project" ? "There are no projects here yet\nLet's add them" : "There are no tasks in this project yet\nLet's add them"}
        </h4>
        <Button click={addItem} title={type === "project" ? "Add Project" : "Add Task"}
                classList="btn-primary btn-primary-icon reverse" path="add"/>
      </div>
  );
}