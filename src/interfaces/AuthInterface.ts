export interface ResponseAxios<T> {
  status: number;
  data: T;
}

export interface ResponseAPI<T> {
  status: string;
  response: T;
  message?: string;
  error?: string;
}

export interface ResponseCompany {
  status: boolean;
  response: {
    companyName: string;
    companyId: number;
  }
}

export interface ResponseCode {
  status: boolean;
  code: string;
}

export interface ResponseCheckCode {
  status: boolean;
  response: boolean;
}

export interface ResponseUser {
  status: boolean;
  response: User | null;
}

export interface User {
  id: number;
  first_name: string | null;
  last_name: string | null;
  gender: number | null;
  birthday: string | null;
  phone: string;
  email: string;
  position: string | null;
  experience: string | null;
  avatar: string | null;
  why_use: string;
  role: string;
  self_employed: boolean;
  company_id: number;
  created_at: string;
  updated_at: string;
}

export interface Token {
  status: boolean;
  response: {
    accessToken: string;
    refreshToken: string;
  }
}

export interface ResponseFile {
  status: boolean;
  response: {
    publicId: string;
    url: string;
  };
}

export interface ResponseFileResult {
  status: boolean;
  response: boolean;
}