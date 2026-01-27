import React, {useEffect, useState} from "react";
import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../services/Auth";
import Sidebar from "../components/blocks/Sidebar";
import Header from "../components/blocks/Header";
import {useAuthentication} from "../services/AuthProvider";

export default function MainLayout() {
  const {logout, getCurrentUser} = useAuth();
  const {authData, saveAuthData} = useAuthentication();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const handleUnload = () => {
      const isRememberMe = localStorage.getItem("REMEMBER_ME");
      if (isRememberMe === "false") {
        logout();
      }
    };
    window.addEventListener("unload", handleUnload);
    return () => {
      window.removeEventListener("unload", handleUnload);
    };
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("ACCESS_TOKEN");
      if (!token) {
        setChecking(false);
        return;
      }
      const user = await getCurrentUser();
      if (user?.status) saveAuthData({isAuth: true, user: user.response});

      setChecking(false);
    }
    checkAuth();
  }, []);

  if (checking) return null;

  if (!authData.isAuth) {
    return <Navigate to="/login" replace />;
  }

  return (
      <div className="main-content">
        <Sidebar/>
        <main className="main">
          <Header/>
          <Outlet/>
        </main>
      </div>
  );
}