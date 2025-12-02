import React from "react";
import {Navigate, Outlet} from "react-router-dom";

export default function MainLayout() {

  const token = localStorage.getItem("access_token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
      <div className="main-content">
        MainLayout
        <Outlet />
      </div>
  );
}