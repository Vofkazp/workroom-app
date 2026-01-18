import api from "./Api";
import {ResponseAxios} from "../interfaces/AuthInterface";
import {ProjectType} from "../pages/AddProject";

interface ResponseCreateProject {
  status: boolean;
  response: ProjectType
}

export function useProject() {

  const createProject = async (data: ProjectType) => {
    try {
      const response: ResponseAxios<ResponseCreateProject> = await api.post(`/project`, data);
      return response.data;
    } catch {

    }
  };

  return {createProject};
}