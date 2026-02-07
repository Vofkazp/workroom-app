import React from "react";
import {TaskType} from "../../services/Task";
import ProgressCircle from "../component/ProgressCircle";
import {useNavigate, useParams} from "react-router-dom";
import Status from "../component/Status";

export default function TaskListItem({task}: { task: TaskType }) {
  const navigate = useNavigate();
  const {projectId, type} = useParams();

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

  const goToTask = (taskId: number | undefined) => {
    if (taskId) navigate(`/projects/${projectId}/task/${taskId}/${type}`);
  }

  return (
      <li className="task-item card" onClick={() => goToTask(task.id)}>
        <div className="task-item-element">
          <p className="task-item-title">Task Name</p>
          <p className="task-item-value">{task.name}</p>
        </div>
        <div className="task-item-element">
          <p className="task-item-title">Estimate</p>
          <p className="task-item-value">{computedEstimate(task.estimate)}</p>
        </div>
        <div className="task-item-element">
          <p className="task-item-title">Spent Time</p>
          <p className="task-item-value">{task.spentTotal || "0h"}</p>
        </div>
        <div className="task-item-element">
          <p className="task-item-title">Assignee</p>
          <div className="task-item-value">
            <img src={task.assigneeUser?.avatar?.url || "/images/userTemplate.png"}
                 alt={task.assigneeUser?.avatar?.publicId} className="user-item"/>
          </div>
        </div>
        <div className="task-item-element">
          <p className="task-item-title">Priority</p>
          <div className="task-item-value">
            <Status priority={task.priority}/>
          </div>
        </div>
        {task.spentTotal &&
            <div className="task-item-status">
              <p className="item-status done">Done</p>
            </div>}
        <ProgressCircle value={0}/>
      </li>
  );
}