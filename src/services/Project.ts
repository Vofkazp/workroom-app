import api from "./Api";
import {ApiError, ApiResponse} from "../interfaces/AuthInterface";
import {useNotifications} from "./NitificationProvider";
import {TaskType} from "./Task";

export type ProjectType = {
  id?: number;
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

export type Avatar = {
  url: string;
  publicId: string;
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
  avatar: Avatar;
  isLink: boolean;
  links: { link: string; title: string; }[],
  isImages: boolean;
  images: { publicId: string; }[];
  reporterUser: {
    id: number,
    first_name: string,
    last_name: string,
    avatar: { url: string, publicId: string },
    phone: string,
    email: string,
  },
  tasks: TaskType[]
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

  const updateProject = async (formData: ProjectType) => {
    try {
      const {data} = await api.put<ApiResponse<boolean>>(`/project`, formData);
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

  const getProjectItem = async (id: number) => {
    try {
      const {data} = await api.get<ApiResponse<ProjectList>>(`/project/${id}`);
      return data;
    } catch (error) {
      const err = error as ApiError;
      addNotification(err.message, "warning")
      return err;
    }
  };

  return {createProject, getProjectsList, getProjectItem, updateProject};
}