import api from "./Api";
import {ApiError, ApiResponse} from "../interfaces/AuthInterface";
import {useNotifications} from "./NitificationProvider";

export type Links = {
  link: string;
  title: string;
}

export type Images = {
  publicId: string;
}

export type TaskType = {
  id?: number;
  projectId: number;
  name: string;
  group: number;
  estimate: number | null;
  deadLine: string;
  priority: number;
  assignee: number | null;
  description: string;
  isLink: boolean;
  links: Links[];
  isImages: boolean;
  images: Images[];
  status?: number;
}

export function useTask() {
  const {addNotification} = useNotifications();

  const createTask = async (task: TaskType) => {
    try {
      const {data} = await api.post<ApiResponse<boolean>>(`/task`, task);
      return data;
    } catch (error) {
      const err = error as ApiError;
      addNotification(err.message, "warning")
      return err;
    }
  };

  const getTaskList = async (id: number) => {
    try {
      const {data} = await api.post<ApiResponse<TaskType[]>>(`/task/list`, {id});
      return data;
    } catch (error) {
      const err = error as ApiError;
      addNotification(err.message, "warning")
      return err;
    }
  };

  return {createTask, getTaskList};
}