import {useNavigate} from "react-router-dom";
import api from "./Api";
import {
  ResponseAxios,
  ResponseAxiosCompany,
  ResponseCheckCode,
  ResponseCodeAxios,
  ResponseUser
} from "../interfaces/AuthInterface";

export function useAuth() {
  const navigate = useNavigate();

  const getCurrentUser = async () => {
    try {
      const response: ResponseUser = await api.get(`/auth/get_current_user`);
      return response.data;
    } catch {
      logout();
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response: ResponseAxios = await api.post(`/auth/login`, {email, password});
      if (response.status === 200 && response.data.status) setToken(response.data.response.accessToken, response.data.response.refreshToken);
      return response.data;
    } catch {
      logout();
    }
  };

  const register = async (phone: string, email: string, password: string) => {
    try {
      const response: ResponseAxios = await api.post(`/auth/register`, {phone, email, password});
      if (response.status === 200 && response.data.status) setToken(response.data.response.accessToken, response.data.response.refreshToken);
      return response.data;
    } catch {
      logout();
    }
  };

  const updateUser = async (id: number, why_use: string, role: string, self_employed: boolean, company_id: number) => {
    try {
      const response: ResponseCheckCode = await api.put(`/auth/update_user`, {id, why_use, role, self_employed, company_id});
      return response.data;
    } catch {
      logout();
    }
  };

  const createCompany = async (name: string, direction: string, team_size: string, owner_id: number) => {
    try {
      const response: ResponseAxiosCompany = await api.post(`/auth/create_company`, {name, direction, team_size, owner_id});
      return response.data;
    } catch(error: any) {
      return error.response.data;
    }
  };

  const inviteMembers = async (company_id: number, invited_by: number, emails: string[]) => {
    try {
      const response: ResponseCheckCode = await api.post(`/auth/invite_members`, {company_id, invited_by, emails});
      return response.data;
    } catch(error: any) {
      return error.response.data;
    }
  };

  const checkPhone = async (phone: string) => {
    try {
      const response: ResponseCodeAxios = await api.post(`/auth/check_phone`, {phone});
      return response.data;
    } catch (err: any) {
      return err.response.data;
    }
  };

  const checkCode = async (phone: string, code: string) => {
    try {
      const response: ResponseCheckCode = await api.post(`/auth/check_code`, {phone, code});
      return response.data;
    } catch (err: any) {
      return err.response.data;
    }
  };

  const setToken = (accessToken: string, refreshToken: string) => {
    localStorage.setItem("ACCESS_TOKEN", accessToken);
    localStorage.setItem("REFRESH_TOKEN", refreshToken);
  };

  const logout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("REFRESH_TOKEN");
    navigate("/login");
  };

  return {login, getCurrentUser, logout, checkPhone, checkCode, register, createCompany, updateUser, inviteMembers};
}
