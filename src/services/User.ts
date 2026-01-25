import api from "./Api";
import {ResponseAxios} from "../interfaces/AuthInterface";
import {ResponseProject} from "./Project";

export type User = {
  avatar: {url: string, publicId: string} | null;
  birthday: string;
  company_id: number;
  created_at: string;
  data_save_token: string;
  email: string;
  experience: string;
  first_name: string;
  gender: number;
  id: number;
  last_name: string;
  password: string;
  phone: string;
  position: number;
  refresh_token: string;
  role: string;
  self_employed: boolean;
  updated_at: string;
  why_use: string;
}

export function useUser() {

  const getUserList = async () => {
    try {
      const response: ResponseAxios<ResponseProject<User[]>> = await api.get(`/user/list`);
      return response.data;
    } catch(error: any) {
      return error.data;
    }
  };

  return {getUserList};
}