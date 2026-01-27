import {User} from "../services/User";

export type ApiSuccess<T> = {
  status: true;
  response: T;
};

export type ApiError = {
  status: false;
  message: string;
  error?: string;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export interface ResponseCompany {
  companyName: string;
  companyId: number;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface getInviteInfo {
  invite_id: number;
  email: string;
  company_id: number;
  company: Company | null,
  user: User | null
}

export interface confirmInvite {
  first_name?: string;
  last_name?: string;
  gender?: number;
  birthday?: string | null;
  phone?: string;
  email?: string;
  password?: string;
  avatar?: string;
  user_id?: number;
  isRegister: boolean;
  isConfirm: boolean;
  invite_id: number | null;
}

export interface Company {
  id: number,
  name: string,
  direction: string,
  location: string | null,
  owner_id: number,
  team_size: string
  created_at: Date,
}

export interface ResponseFile {
    publicId: string;
    url: string;
}


export interface ResponseAxios<T> {
  status: number;
  data: T;
}