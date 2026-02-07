import React, {useEffect, useState} from "react";
import {Outlet, useNavigate, useParams} from "react-router-dom";
import {ProjectList, useProject} from "../services/Project";

export default function ProjectLayout() {
  const {projectId, type} = useParams();
  const navigate = useNavigate();
  const {getProjectsList} = useProject();
  const [projectsList, setProjectsList] = useState<ProjectList[]>([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const response = await getProjectsList();
    if (response?.status) {
      setProjectsList(response.response);
      const id = response.response[0]?.id || 0;
      if (!projectId) navigate(`/projects/${id}/type/${type || "list"}`);
    }
  }

  return (
      <>
        <Outlet context={{projectsList}}/>
      </>
  );
}