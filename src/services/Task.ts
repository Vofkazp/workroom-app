import api from "./Api";
import {ResponseAxios} from "../interfaces/AuthInterface";
import {ResponseProject} from "./Project";
import {TaskType} from "../pages/fragments/AddTask";

export function useTask() {

  const createTask = async (task: TaskType) => {
    try {
      const response: ResponseAxios<ResponseProject<boolean>> = await api.post(`/task`, task);
      return response.data;
    } catch(error: any) {
      return error.data;
    }
  };

  const getTaskList = async (id: number) => {
    try {
      const response: ResponseAxios<ResponseProject<any>> = await api.post(`/task/list`, {id});
      return response.data;
    } catch(error: any) {
      return error.data;
    }
  };

  return {createTask, getTaskList};
}