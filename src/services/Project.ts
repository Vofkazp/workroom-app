import api from "./Api";
import {ApiError, ApiResponse} from "../interfaces/AuthInterface";
import {useNotifications} from "./NitificationProvider";

export type ProjectType = {
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
};

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
  const {addNotification} = useNotifications();

  const createProject = async (formData: ProjectType) => {
    try {
      const {data} = await api.post<ApiResponse<boolean>>(`/project`, formData);
      return data;
    } catch (error) {
      const err = error as ApiError;
      addNotification(err.message, "warning")
      return err;
    }
  };

  const getProjectsList = async () => {
    try {
      const {data} = await api.post<ApiResponse<ProjectList[]>>(`/project/list`);
      return data;
    } catch (error) {
      const err = error as ApiError;
      addNotification(err.message, "warning")
      return err;
    }
  };

  return {createProject, getProjectsList};
}