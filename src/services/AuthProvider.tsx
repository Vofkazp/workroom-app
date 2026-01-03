import React, {createContext, ReactNode, useCallback, useContext, useState} from "react";
import {User} from "../interfaces/AuthInterface";

interface UserAuthInfo {
  isAuth: boolean;
  user: User | null;
}

interface UserContext {
  authData: UserAuthInfo;
  saveAuthData: (data: UserAuthInfo) => void;
}

const AuthContext = createContext<UserContext | null>(null);

export default function AuthProvider({children}: { children: ReactNode }) {
  const [authData, setAuthData] = useState<UserAuthInfo>({isAuth: false, user: null});

  const saveAuthData = useCallback((data: UserAuthInfo) => {
    setAuthData(data);
  }, []);

  return (
      <AuthContext.Provider value={{authData, saveAuthData}}>
        {children}
      </AuthContext.Provider>
  );
}

export const useAuthentication = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuthentication must be used inside AuthProvider');
  }
  return ctx;
}