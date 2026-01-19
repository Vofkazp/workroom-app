import React, {useEffect, useState} from "react";
import {Outlet, useNavigate, useParams} from "react-router-dom";
import Button from "../components/Button";
import ProjectMenu from "../components/ProjectMenu";
import {ProjectList, useProject} from "../services/Project";
import NoProject from "../pages/fragments/NoProject";
import TaskHeader from "../components/TaskHeader";

export type TypePage = "list" | "board" | "timeline";

export default function ProjectLayout() {
  const {id, type} = useParams();
  const navigate = useNavigate();
  const {getProjectsList} = useProject();
  const [projectsList, setProjectsList] = useState<ProjectList[]>([]);
  const [activeId, setActiveId] = useState<number | undefined>(Number(id));
  const [typePage, setTypePage] = useState<TypePage>(type as TypePage || "list");

  useEffect(() => {
    getProjectsList().then(res => {
      setProjectsList(res);
      if (!id) setActiveId(res[0].id);
    })
  }, []);

  useEffect(() => {
    navigate(`/projects/${activeId}/${typePage}`);
  }, [activeId, typePage]);

  const addProject = () => {
    navigate("/add-project");
  }

  return (
      <div>
        <div className="content-wrapper">
          <div className="title-block">
            <h1 className="content-title">Projects</h1>
            <Button click={addProject} title="Add Project" classList="btn-primary btn-primary-icon reverse" path="add"/>
          </div>
          <div className="projects-grid">
            <ProjectMenu list={projectsList} active={activeId} checkActiveId={setActiveId}/>
            <div className="tasks">
              {projectsList.length === 0 ?
                  <NoProject type="project"/> :
                  <>
                    <TaskHeader type={typePage} checkType={setTypePage}/>
                    <Outlet/>
                  </>
              }
            </div>
          </div>
        </div>
      </div>
  );
}