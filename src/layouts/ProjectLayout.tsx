import React from "react";
import {Outlet, useNavigate} from "react-router-dom";
import Button from "../components/Button";
import ProjectMenu from "../components/ProjectMenu";

export default function ProjectLayout() {
  const navigate = useNavigate();

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
            <ProjectMenu/>
            <Outlet/>
          </div>
        </div>
      </div>
  );
}