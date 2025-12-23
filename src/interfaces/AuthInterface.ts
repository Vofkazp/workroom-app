export interface ResponseAxios {
  status: number;
  data: {
    status: boolean;
    response: Token;
  };
}

export interface ResponseAxiosCompany {
  status: number;
  data: {
    status: boolean;
    response: {
      companyName: string;
      companyId: number;
    }
  };
}

export interface ResponseCodeAxios {
  status: number;
  data: {
    status: boolean;
    code: string;
  };
}

export interface ResponseCheckCode {
  status: number;
  data: {
    status: boolean;
    response: boolean;
  }
}

export interface ResponseUser {
  status: number;
  data: {
    status: boolean;
    response: {
      id: number;
      first_name: string;
      last_name: string;
      gender: number;
      birthday: string;
      phone: string;
      email: string;
      position: string;
      experience: string;
      avatar: string;
      why_use: string;
      role: string;
      self_employed: boolean;
      company_id: number;
      created_at: string;
      updated_at: string;
    }
  };
}

export interface Token {
  accessToken: string;
  refreshToken: string
}