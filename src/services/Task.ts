import api from "./Api";
import {ApiError, ApiResponse} from "../interfaces/AuthInterface";
import {useNotifications} from "./NitificationProvider";

export type Links = {
  link: string;
  title: string;
}

export type Images = {
  publicId: string;
  url?: string;
  name?: string;
  size?: number;
  createdAt?: string;
}

export type AssigneeUser = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  avatar: {
    url: string;
    publicId: string;
  };
}

export type TaskType = {
  id?: number;
  projectId: number;
  taskNumber?: string;
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
  assigneeUser?: AssigneeUser;
  spentTotal?: number | null;
  reporter?: number;
  reporterUser?: {
    id: number;
    first_name: string;
    last_name: string;
    avatar: {
      url: string;
      publicId: string;
    }
  };
  createdAt?: string;
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

  const getTaskItem = async (id: number) => {
    try {
      const {data} = await api.get<ApiResponse<TaskType>>(`/task/${id}`);
      return data;
    } catch (error) {
      const err = error as ApiError;
      addNotification(err.message, "warning")
      return err;
    }
  };

  return {createTask, getTaskList, getTaskItem};
}