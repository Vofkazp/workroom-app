import React from "react";
import {ProjectList} from "../../services/Project";
import Button from "../component/Button";
import {useNavigate, useParams} from "react-router-dom";

export default function ProjectMenu({list, checkActiveId}: {
  list: ProjectList[],
  checkActiveId: (id: number) => void,
}) {
  const navigate = useNavigate();
  const {projectId, type} = useParams();

  const click = (id: number) => {
    checkActiveId(id);
  }

  const getToDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/projects/${projectId}/details/${type}`);
  }

  return (
      <div className="projects-menu card">
        <div className="project-menu-header">
          <h5 className="project-header-title">Current Projects</h5>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
            <path
                d="M0.292893 0.292893C0.653377 -0.0675907 1.22061 -0.0953203 1.6129 0.209705L1.70711 0.292893L5.70711 4.29289C6.06759 4.65338 6.09532 5.22061 5.7903 5.6129L5.70711 5.70711L1.70711 9.70711C1.31658 10.0976 0.683418 10.0976 0.292893 9.70711C-0.0675907 9.34662 -0.0953203 8.77939 0.209705 8.3871L0.292893 8.29289L3.585 5L0.292893 1.70711C-0.0675907 1.34662 -0.0953203 0.779392 0.209705 0.387101L0.292893 0.292893Z"
                fill="rgb(10,22,41)" fillRule="nonzero" transform="matrix(6.12323e-17,1,-1,6.12323e-17,17,9)"/>
          </svg>
        </div>
        <ul className="projects-menu-list">
          {list?.map((elem) =>
              <li key={elem.id} className={`projects-menu-item${Number(projectId) === elem.id ? ' active' : ''}`}
                  onClick={() => click(elem.id)}>
                <div className="projects-item-card">
                  <p className="project-item-number">{elem.projectNumber}</p>
                  <p className="project-item-name">{elem.name}</p>
                  <Button classList="view-all" path="chevron_btn" title="View details" click={getToDetails}/>
                </div>
              </li>
          )}
        </ul>
      </div>
  );
}