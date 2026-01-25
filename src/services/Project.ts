import api from "./Api";
import {ResponseAxios} from "../interfaces/AuthInterface";
import {ProjectType} from "../pages/AddProject";

export type ResponseProject<T> = {
  status: boolean;
  response: T;
  message?: string;
}

export type ProjectList = {
  id: number;
  reporter: number;
  projectNumber: string;
  name: string;
  priority: number;
  description: string;
  starts: string;
  deadLine: string;
  avatar: string;
  isLink: boolean;
  links: { link: string; title: string; }[],
  isImages: boolean;
  images: { publicId: string; }[]
}

export function useProject() {

  const createProject = async (data: ProjectType) => {
    try {
      const response: ResponseAxios<ResponseProject<ProjectType>> = await api.post(`/project`, data);
      return response.data;
    } catch(error: any) {
      return error.data;
    }
  };

  const getProjectsList = async () => {
    try {
      const response: ResponseAxios<ResponseProject<ProjectList[]>> = await api.post(`/project/list`);
      return response.data;
    } catch(error: any) {
      return error.data;
    }
  };

  return {createProject, getProjectsList};
}