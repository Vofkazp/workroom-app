import React, {useEffect, useState} from "react";
import TaskHeader from "../components/blocks/TaskHeader";
import {useNavigate, useOutletContext, useParams} from "react-router-dom";
import {TaskType, useTask} from "../services/Task";
import TasksList from "./TasksList";
import AddTask from "./fragments/AddTask";
import NoProject from "./fragments/NoProject";
import Button from "../components/component/Button";
import ProjectMenu from "../components/blocks/ProjectMenu";
import {ProjectList} from "../services/Project";

export type TaskListObject = {
  active: TaskType[];
  backlog: TaskType[];
}

export default function ProjectItem() {
  const navigate = useNavigate();
  const {projectsList} = useOutletContext<{ projectsList: ProjectList[] }>();
  const {projectId, type} = useParams();
  const {getTaskList} = useTask();
  const [taskList, setTaskList] = useState<TaskListObject>({active: [], backlog: []});
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (Number(projectId) > 0) {
      loadTasks();
    }
  }, [projectId]);

  const loadTasks = async () => {
    const result = await getTaskList(Number(projectId));
    if (result?.status) {
      const active = result.response.filter(item => item.spentTotal !== null);
      const backlog = result.response.filter(item => item.spentTotal === null);
      setTaskList({active, backlog});
    }
  }

  const addTask = (status: boolean) => {
    setIsOpen(false);
    if (status) loadTasks();
  }

  const addProject = () => {
    navigate("/add-project");
  }

  const loadProjectItem = (id: number) => {
    navigate(`/projects/${id}/type/${type}`);
  }

  return (
      <div className="content-wrapper">
        <div className="title-block">
          <h1 className="content-title">Projects</h1>
          <Button click={addProject} title="Add Project" classList="btn-primary btn-primary-icon reverse"
                  path="add"/>
        </div>
        <div className="projects-grid">
          <ProjectMenu list={projectsList} checkActiveId={loadProjectItem}/>
          <div className="tasks">
            <TaskHeader isDetails={false}/>
            {projectsList.length === 0 ?
                <NoProject type="project"/> :
                <>
                {taskList.active.length === 0 && taskList.backlog.length === 0 ?
                    <NoProject type="task" openModal={() => setIsOpen(true)}/> :
                    <TasksList list={taskList}/>}
                {isOpen && <AddTask openModal={isOpen} closeModal={addTask}/>}
                </>
            }
          </div>
        </div>
      </div>
  );
}