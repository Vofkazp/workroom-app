import React, {useEffect} from "react";
import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../services/Auth";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {useAuthentication} from "../services/AuthProvider";

export default function MainLayout() {
  const {logout, getCurrentUser} = useAuth();
  const {authData, saveAuthData} = useAuthentication();

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

  const authenticated = async () => {
    const user = await getCurrentUser();
    if(user?.status) {
      saveAuthData({isAuth: true, user: user.response});
    }
  }

  if(!authData.isAuth) {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (!token) {
      return <Navigate to="/login" replace/>;
    } else {
      authenticated();
    }
  }

  return (
      <div className="main-content">
        <Sidebar/>
        <main className="main">
          <Header />
          <Outlet/>
        </main>
      </div>
  );
}