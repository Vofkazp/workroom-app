import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../services/Auth";

export default function MainLayout() {
  const {logout} = useAuth();

  const token = localStorage.getItem("ACCESS_TOKEN");

  if (!token) {
    return <Navigate to="/login" replace/>;
  }

  return (
      <div className="main-content">
        <div>
          MainLayout
          <button onClick={logout}>Logout</button>
        </div>
        <Outlet/>
      </div>
  );
}