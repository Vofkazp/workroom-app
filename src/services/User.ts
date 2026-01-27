import api from "./Api";
import {ApiError, ApiResponse} from "../interfaces/AuthInterface";
import {useNotifications} from "./NitificationProvider";

export type User = {
  id: number;
  first_name: string | null;
  last_name: string | null;
  gender: number | null;
  birthday: string | null;
  phone: string;
  email: string;
  position: string | null;
  experience: string | null;
  avatar: { url: string, publicId: string } | null;
  why_use: string;
  role: string;
  self_employed: boolean;
  company_id: number;
  created_at: string;
  updated_at: string;
};

export function useUser() {
  const {addNotification} = useNotifications();

  const getUserList = async () => {
    try {
      const {data} = await api.get<ApiResponse<User[]>>(`/user/list`);
      return data;
    } catch (error) {
      const err = error as ApiError;
      addNotification(err.message, "warning")
      return err;
    }
  };

  return {getUserList};
}