import React, {useEffect, useMemo, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {ProjectList, useProject} from "../services/Project";
import {TaskType, useTask} from "../services/Task";
import Button from "../components/component/Button";
import ProjectDetails from "../components/blocks/ProjectDetails";
import SelectStatus from "../components/component/SelectStatus";
import AddTask from "./fragments/AddTask";
import Status from "../components/component/Status";
import ProgressCircle from "../components/component/ProgressCircle";

export default function TaskInfo() {
  const navigate = useNavigate();
  const {projectId, taskId, type} = useParams();
  const {getProjectItem} = useProject();
  const {getTaskItem} = useTask();
  const [projectItem, setProjectItem] = useState<ProjectList | null>(null);
  const [taskItem, setTaskItem] = useState<TaskType | null>(null);
  const [statusIndex, setStatusIndex] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadProjectItem();
    loadTaskId();
  }, [projectId]);

  const loadProjectItem = async () => {
    const result = await getProjectItem(Number(projectId));
    if (result?.status) setProjectItem(result.response);
  }

  const loadTaskId = async () => {
    const result = await getTaskItem(Number(taskId));
    if (result?.status) setTaskItem(result.response);
  }

  const attachments = useMemo(() => {
    if (!taskItem) return {links: [], images: []};
    return {
      links: taskItem.isLink ? taskItem.links.filter(l => l.link) : [],
      images: taskItem.isImages ? taskItem.images.filter(i => i.publicId) : [],
    };
  }, [taskItem]);

  const backToProject = () => {
    navigate(`/projects/${projectId}/type/${type}`);
  }

  const addTask = (status: boolean) => {
    setIsOpen(false);
    if (status) loadTaskId();
  }

  const computedEstimate = (duration: number | null) => {
    if (duration === null || duration === 0) return "";
    const days = Math.trunc(duration / 1440);
    const hours = Math.trunc((duration % 1440) / 60);
    const minutes = duration % 60;
    const parts: string[] = [];
    if (days) parts.push(`${days}d`);
    if (hours) parts.push(`${hours}h`);
    if (minutes) parts.push(`${minutes}m`);
    return parts.join(" ");
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
        <div className="projects-grid task-details">
          <ProjectDetails projectItem={projectItem}/>
          <div className="tasks">
            <div className="tasks-header">
              <div className="tasks-header-title-block">
                <h4 className="tasks-header-title">Task Details</h4>
              </div>
              <div className="tasks-header-filter">
                <Button classList="icon-btn" path="edit"/>
              </div>
            </div>
            <div className="tasks-details card">
              <div className="details-header">
                <div className="details-header-title-block">
                  <h4 className="details-header-number">{taskItem?.taskNumber}</h4>
                  <p className="details-header-name">{taskItem?.name}</p>
                </div>
                <SelectStatus status={statusIndex} setStatus={setStatusIndex}/>
              </div>
              <p className="task-details-description">{taskItem?.description}</p>
              <div className="task-details-resources">
                <Button path="addFile" classList="btn-image purple"/>
                <Button path="addLink" classList="btn-image green"/>
              </div>
              <h5 className="task-details-attachments-title">Task Attachments
                ({attachments.images.length + attachments.links.length})</h5>
              <div className="task-details-attachments">
                {attachments.images.map((item, index) =>
                    <div key={index} className="attachments-item" style={{backgroundImage: `url(${item.url})`}}>
                      <Button path="addFile" classList="btn-image purple"/>
                      <div className="attachment-info">
                        <p className="attachment-name" title={item.name}>{item.name}</p>
                        <p className="attachment-data">{new Date(item.createdAt!).toLocaleString("uk-UK", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}</p>
                      </div>
                    </div>
                )}
              </div>
              <div className="task-details-links">
                {attachments.links.map((item, index) =>
                    <a
                        key={index}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="task-details-link-item"
                    >
                      {item.title}
                    </a>
                )}
              </div>
              <div className="divider"></div>
              <h5 className="recent-activity">Recent Activity</h5>
              {/*<div className="activity-item">*/}
              {/*  <div className="activity-user">*/}
              {/*    <img src="/images/avatar4.png" alt="avatar" className="activity-avatar"/>*/}
              {/*    <div>*/}
              {/*      <p className="activity-user-name">Oscar Holloway</p>*/}
              {/*      <p className="activity-user-profession">UI/UX Designer</p>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*  <p className="activity-status-item update">*/}
              {/*    Updated the status of <span className="task-name">Mind Map</span> task to <span*/}
              {/*      className="task-status">In Progress</span>*/}
              {/*  </p>*/}
              {/*  <p className="activity-status-item file">*/}
              {/*    Attached files to <span className="task-name">Mind Map</span> task*/}
              {/*  </p>*/}
              {/*</div>*/}
              {/*<div className="activity-item">*/}
              {/*  <div className="activity-user">*/}
              {/*    <img src="/images/avatar3.png" alt="avatar" className="activity-avatar"/>*/}
              {/*    <div>*/}
              {/*      <p className="activity-user-name">Emily Tyler</p>*/}
              {/*      <p className="activity-user-profession">Copywriter</p>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*  <p className="activity-status-item update">*/}
              {/*    Updated the status of <span className="task-name">Mind Map</span> task to <span*/}
              {/*      className="task-status">In Progress</span>*/}
              {/*  </p>*/}
              {/*</div>*/}
              {/*<button className="btn view-all">*/}
              {/*  <span className="title">View more</span>*/}
              {/*  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">*/}
              {/*    <path*/}
              {/*        d="M16.7071 9.29289C17.0676 9.65338 17.0953 10.2206 16.7903 10.6129L16.7071 10.7071L12.7071 14.7071C12.3466 15.0676 11.7794 15.0953 11.3871 14.7903L11.2929 14.7071L7.29289 10.7071C6.90237 10.3166 6.90237 9.68342 7.29289 9.29289C7.65338 8.93241 8.22061 8.90468 8.6129 9.2097L8.70711 9.29289L12 12.585L15.2929 9.29289C15.6534 8.93241 16.2206 8.90468 16.6129 9.2097L16.7071 9.29289Z"*/}
              {/*        fill="currentColor" fillRule="evenodd"/>*/}
              {/*  </svg>*/}
              {/*</button>*/}
            </div>
          </div>
          <div className="task-info-details">
            <div className="card">
              <h5 className="details-title">Task Info</h5>
              <h6 className="info-details-title">Reporter</h6>
              <div className="info-details-user">
                <img src={taskItem?.reporterUser?.avatar.url || "/images/userTemplate.png"} alt="avatar" className="info-details-avatar"/>
                <p className="info-details-user-name">{taskItem?.reporterUser?.first_name + " " + taskItem?.reporterUser?.last_name}</p>
              </div>
              <h6 className="info-details-title">Assigned</h6>
              <div className="info-details-user">
                <img src={taskItem?.assigneeUser?.avatar.url || "/images/userTemplate.png"} alt="avatar" className="info-details-avatar"/>
                <p className="info-details-user-name">{taskItem?.assigneeUser?.first_name + " " + taskItem?.assigneeUser?.last_name}</p>
              </div>
              <h6 className="info-details-title">Priority</h6>
              <div className="info-status">
                <Status priority={taskItem?.priority!} />
              </div>
              <div className="info-details-timer-card">
                <h5 className="details-timer-title">Time tracking</h5>
                <div className="details-timer-info">
                  <ProgressCircle value={10} size={38}/>
                  <div>
                    <p className="details-timer-time">{computedEstimate(taskItem?.spentTotal || null) || "0h"} logged</p>
                    <p className="details-timer-original-time">Original Estimate {computedEstimate(taskItem?.estimate || null)}</p>
                  </div>
                </div>
                <Button path="time_btn" classList="btn-primary btn-primary-icon reverse" title="Log time" />
              </div>
              <h6 className="info-details-title">Dead Line</h6>
              <p className="info-details-text">{new Date(taskItem?.deadLine!).toLocaleString("uk-UK", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}</p>
              <p className="projects-created">Created {new Date(taskItem?.createdAt!).toLocaleString("uk-UK", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}</p>
            </div>
          </div>
          {isOpen && <AddTask openModal={isOpen} closeModal={addTask}/>}
        </div>
      </div>
  );
}