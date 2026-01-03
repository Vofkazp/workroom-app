import React, {useEffect, useState} from "react";
import Svg from "./Svg";
import {pathList} from "../resurses/PathList";
import {useLocation, useNavigate} from "react-router-dom";
import Button from "./Button";
import {useAuth} from "../services/Auth";

interface MenuList {
  id: number;
  title: string;
  path: string;
  svgPathName: keyof typeof pathList;
}

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const {logout} = useAuth();
  const [path, setPath] = useState(location.pathname);

  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);

  const menuList: MenuList[] = [
    {
      id: 1,
      title: "Dashboard",
      path: "/",
      svgPathName: "dashboardIcon"
    },
    {
      id: 2,
      title: "Projects",
      path: "/projects",
      svgPathName: "projectsIcon"
    },
    {
      id: 3,
      title: "Calendar",
      path: "/calendar",
      svgPathName: "calendarIcon"
    },
    {
      id: 4,
      title: "Vacations",
      path: "/vacations",
      svgPathName: "vacationsIcon"
    },
    {
      id: 5,
      title: "Employees",
      path: "/employees",
      svgPathName: "employeesIcon"
    },
    {
      id: 6,
      title: "Messenger",
      path: "/messenger",
      svgPathName: "messengerIcon"
    },
    {
      id: 7,
      title: "Info Portal",
      path: "/portal",
      svgPathName: "portalIcon"
    }
  ];

  const goTo = (path: string) => {
    navigate(path);
  }

  const support = () => {

  }

  const logoutBtn = () => {
    logout();
  }

  return (
      <aside className="sidebar">
        <div className="sidebar-logo">
          <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="none">
            <rect width="50" height="50" x="0" y="0" rx="12"
                  fill="rgb(63,140,255)"/>
            <path
                d="M17.9999 25C16.3499 25 15 23.6501 15 22.0002C15 20.3499 16.3499 19 17.9999 19C19.6499 19 21 20.3499 21 22.0002C21 23.6501 19.6499 25 17.9999 25Z"
                fill="rgb(255,255,255)" fillRule="evenodd"/>
            <path
                d="M43 18.3448C43 13.2052 38.725 9 33.5 9L33.4998 9C28.275 9 24 13.2052 24 18.3448L24 32C24 32 42.9983 29.9193 43 18.346C43 18.3456 43 18.3452 43 18.3448Z"
                fill="rgb(255,255,255)" fillRule="evenodd"/>
            <path
                d="M7 35.4993L7 35.4978C7.00183 27.4474 21 26 21 26L21 35.4993C21 39.0746 17.8499 42 14 42C10.1499 42 7 39.0746 7 35.4993ZM12.1605 35.4993C12.1605 36.4388 12.9882 37.2076 14 37.2076C15.0116 37.2076 15.8392 36.4388 15.8392 35.4993C15.8392 34.5596 15.0116 33.791 14 33.791C12.9882 33.791 12.1605 34.5596 12.1605 35.4993Z"
                fill="rgb(255,255,255)" fillRule="evenodd"/>
          </svg>
        </div>
        <ul className="side-menu">
          {menuList.map(item => (
              <li key={item.id} className={`menu-item ${path === item.path ? "active" : ""}`}
                  onClick={() => goTo(item.path)}>
                <div className="menu-item-row">
                  <Svg path={item.svgPathName}/>
                  <span className="menu-item-title">{item.title}</span>
                </div>
              </li>
          ))}
        </ul>
        <div className="support-block">
          <div className="support-item">
            <Button click={support} classList="btn-primary btn-primary-icon reverse" path="support" title="Support"/>
          </div>
        </div>
        <Button click={logoutBtn} title="Logout" path="logout" classList="logout-btn"/>
      </aside>
  );
}