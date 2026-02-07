import React, {useEffect, useState} from "react";
import {ProjectList} from "../../services/Project";
import Button from "../component/Button";
import {AssigneeUser} from "../../services/Task";
import Status from "../component/Status";
import {useNavigate} from "react-router-dom";

export default function ProjectDetails({projectItem}: { projectItem: ProjectList | null }) {
  const navigate = useNavigate();
  const [assignees, setAssignees] = useState<AssigneeUser[]>([]);

  useEffect(() => {
    if (!projectItem?.tasks) return;
    const map = new Map<number, AssigneeUser>();
    projectItem.tasks.forEach(task  => {
      if (task.assigneeUser) {
        map.set(task.assigneeUser.id, task.assigneeUser);
      }
    });
    setAssignees(Array.from(map.values()));
  }, [projectItem]);

  const edinProject = () => {
    if (projectItem) navigate(`/add-project/${projectItem?.id}`)
  }

  return (
      <div className="projects-menu card">
        <div className="projects-menu-details">
          <Button classList="btn-image black projects-edit" path="edit" click={edinProject}/>
          <h5 className="projects-number-title">Project Number</h5>
          <p className="projects-number">{projectItem?.projectNumber}</p>
          <h5 className="projects-description-title">Description</h5>
          <p className="projects-description">{projectItem?.description}</p>
          <h5 className="projects-reporter-title">Reporter</h5>
          <div className="projects-reporter">
            <img src={projectItem?.reporterUser?.avatar?.url || "/images/userTemplate.png"}
                 alt={projectItem?.reporterUser?.avatar?.publicId} className="reporter-img"/>
            <p className="reporter-name">
              {projectItem?.reporterUser?.first_name && projectItem?.reporterUser?.last_name ? (projectItem.reporterUser.first_name + " " + projectItem.reporterUser.last_name) : "No Name"}
            </p>
          </div>
          <h5 className="projects-assignees-title">Assignees</h5>
          <div className="projects-assignees">
            {assignees.map(item=> <img key={item.id} src={item.avatar?.url || "/images/userTemplate.png"} alt={item.avatar?.publicId} className="assignees-img"/>)}
            {assignees.length > 3 && <span className="other-assignees-user">+{assignees.length - 3}</span>}
          </div>
          <h5 className="projects-priority-title">Priority</h5>
          <div className="projects-priority">
            <Status priority={projectItem?.priority!} />
          </div>
          <h5 className="projects-dead-line-title">Dead Line</h5>
          <p className="projects-dead-line">{projectItem && new Date(projectItem?.deadLine).toLocaleDateString("uk-UK", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</p>
          <p className="projects-created">{projectItem && (new Date(projectItem.starts).toLocaleDateString("uk-UK", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }))}</p>
          <div className="projects-resources">
            <Button path="addFile" classList="btn-image purple"/>
            <Button path="addLink" classList="btn-image green"/>
          </div>
        </div>
      </div>
  );
}