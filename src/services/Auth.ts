import {useNavigate} from "react-router-dom";
import api from "./Api";
import {ResponseCompany, Token, ApiResponse, ApiError, getInviteInfo, confirmInvite} from "../interfaces/AuthInterface";
import {User} from "./User";
import {useNotifications} from "./NitificationProvider";

export function useAuth() {
  const navigate = useNavigate();
  const {addNotification} = useNotifications();

  const getCurrentUser = async () => {
    try {
      const {data} = await api.get<ApiResponse<User>>(`/auth/get_current_user`);
      return data;
    } catch (error) {
      const err = error as ApiError;
      addNotification(err.message, "warning")
      return err;
    }
  };

  const login = async (email: string, password: string, rememberMe: boolean) => {
    try {
      const {data} = await api.post<ApiResponse<Token>>(`/auth/login`, {email, password});
      if (data.status) setToken(data.response.accessToken, data.response.refreshToken, rememberMe);
      return data;
    } catch (error) {
      const err = error as ApiError;
      addNotification(err.message, "warning")
      return err;
    }
  };

  const register = async (phone: string, email: string, password: string) => {
    try {
      const {data} = await api.post<ApiResponse<Token>>(`/auth/register`, {phone, email, password});
      if (data.status) setToken(data.response.accessToken, data.response.refreshToken, true);
      return data;
    } catch (error) {
      const err = error as ApiError;
      addNotification(err.message, "warning")
      return err;
    }
  };

  const updateUser = async (id: number, why_use: string, role: string, self_employed: boolean, company_id: number) => {
    try {
      const {data} = await api.put<ApiResponse<boolean>>(`/auth/update_user`, {
        id,
        why_use,
        role,
        self_employed,
        company_id
      });
      return data;
    } catch (error) {
      const err = error as ApiError;
      addNotification(err.message, "warning")
      return err;
    }
  };

  const createCompany = async (name: string, direction: string, team_size: string, owner_id: number) => {
    try {
      const {data} = await api.post<ApiResponse<ResponseCompany>>(`/auth/create_company`, {
        name,
        direction,
        team_size,
        owner_id
      });
      return data;
    } catch (error) {
      const err = error as ApiError;
      addNotification(err.message, "warning")
      return err;
    }
  };

  const inviteMembers = async (company_id: number, invited_by: number, emails: string[]) => {
    try {
      const {data} = await api.post<ApiResponse<boolean>>(`/auth/invite_members`, {
        company_id,
        invited_by,
        emails
      });
      return data;
    } catch (error) {
      const err = error as ApiError;
      addNotification(err.message, "warning")
      return err;
    }
  };

  const checkPhone = async (phone: string) => {
    try {
      const {data} = await api.post<ApiResponse<{ code: string }>>(`/auth/check_phone`, {phone});
      return data;
    } catch (error) {
      const err = error as ApiError;
      addNotification(err.message, "warning")
      return err;
    }
  };

  const checkEmail = async (email: string) => {
    try {
      const {data} = await api.post<ApiResponse<boolean>>(`/auth/check_email`, {email});
      return data;
    } catch (error) {
      const err = error as ApiError;
      addNotification(err.message, "warning")
      return err;
    }
  };

  const checkCode = async (phone: string, code: string) => {
    try {
      const {data} = await api.post<ApiResponse<boolean>>(`/auth/check_code`, {phone, code});
      return data;
    } catch (error) {
      const err = error as ApiError;
      addNotification(err.message, "warning")
      return err;
    }
  };

  const getInviteInfo = async (token: string) => {
    try {
      const {data} = await api.post<ApiResponse<getInviteInfo>>(`/auth/get_invite_info`, {token});
      return data;
    } catch (error) {
      const err = error as ApiError;
      addNotification(err.message, "warning")
      return err;
    }
  };

  const confirmInvite = async (formData: confirmInvite) => {
    try {
      const {data} = await api.post<ApiResponse<boolean>>(`/auth/confirm_invite`, formData);
      return data;
    } catch (error) {
      const err = error as ApiError;
      addNotification(err.message, "warning")
      return err;
    }
  };

  const setToken = (accessToken: string, refreshToken: string, rememberMe: boolean) => {
    localStorage.setItem("ACCESS_TOKEN", accessToken);
    localStorage.setItem("REFRESH_TOKEN", refreshToken);
    localStorage.setItem("REMEMBER_ME", String(rememberMe));
  };

  const logout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("REFRESH_TOKEN");
    localStorage.removeItem("REMEMBER_ME");
    navigate("/login");
  };

  return {
    login,
    getCurrentUser,
    logout,
    checkPhone,
    checkEmail,
    checkCode,
    register,
    createCompany,
    updateUser,
    inviteMembers,
    getInviteInfo,
    confirmInvite
  };
}
