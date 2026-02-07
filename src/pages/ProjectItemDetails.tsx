import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useTask} from "../services/Task";
import Button from "../components/component/Button";
import TaskHeader from "../components/blocks/TaskHeader";
import NoProject from "./fragments/NoProject";
import TasksList from "./TasksList";
import AddTask from "./fragments/AddTask";
import {TaskListObject} from "./ProjectItem";
import ProjectDetails from "../components/blocks/ProjectDetails";
import {ProjectList, useProject} from "../services/Project";

export default function ProjectItemDetails() {
  const navigate = useNavigate();
  const {projectId, type} = useParams();
  const {getProjectItem} = useProject();
  const {getTaskList} = useTask();
  const [taskList, setTaskList] = useState<TaskListObject>({active: [], backlog: []});
  const [isOpen, setIsOpen] = useState(false);
  const [projectItem, setProjectItem] = useState<ProjectList | null>(null);

  useEffect(() => {
    loadProjectItem();
    loadTasks();
  }, [projectId]);

  const loadProjectItem = async () => {
    const result = await getProjectItem(Number(projectId));
    if (result?.status) setProjectItem(result.response);
  }

  const loadTasks = async () => {
    const result = await getTaskList(Number(projectId));
    if (result?.status) {
      const active = result.response.filter(item => item.spentTotal !== null);
      const backlog = result.response.filter(item => item.spentTotal === null);
      setTaskList({active, backlog});
    }
  }

  const backToProject = () => {
    navigate(`/projects/${projectId}/type/${type}`);
  }

  const addTask = (status: boolean) => {
    setIsOpen(false);
    if (status) loadTasks();
  }

  return (
      <div className="content-wrapper">
        <div className="breadcrumb-block">
          <Button title="Back to Projects" classList="back" path="arrowLeft" click={backToProject}/>
        </div>
        <div className="title-block">
          <h1 className="content-title">{projectItem?.name}</h1>
          <Button click={() => setIsOpen(true)} title="Add Task" classList="btn-primary btn-primary-icon reverse"
                  path="add"/>
        </div>
        <div className="projects-grid">
          <ProjectDetails projectItem={projectItem}/>
          <div className="tasks">
            <TaskHeader isDetails={true}/>
            {taskList.active.length === 0 && taskList.backlog.length === 0 ?
                <NoProject type="task" openModal={() => setIsOpen(true)}/> :
                <TasksList list={taskList}/>}
            {isOpen && <AddTask openModal={isOpen} closeModal={addTask}/>}
          </div>
        </div>
      </div>
  );
}