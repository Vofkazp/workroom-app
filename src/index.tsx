import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './styles/styles.scss';

import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ComponentLayout from "./examples-components/ComponentLayout";
import NotificationProvider from "./services/NitificationProvider";
import NotificationContainer from "./components/component/NotificationContainer";
import AuthProvider from "./services/AuthProvider";
import ProjectLayout from "./layouts/ProjectLayout";
import AddProject from "./pages/AddProject";
import ConfirmInvite from "./pages/ConfirmInvite";
import TaskInfo from "./pages/TaskInfo";
import ProjectItem from "./pages/ProjectItem";
import ProjectItemDetails from "./pages/ProjectItemDetails";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
      <AuthProvider>
        <NotificationProvider>
          <NotificationContainer/>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainLayout/>}>
                <Route index element={<Dashboard/>}/>
                <Route path="projects" element={<ProjectLayout/>}>
                  <Route path=":projectId/task/:taskId/:type" element={<TaskInfo/>}/>
                  <Route path=":projectId/type/:type" element={<ProjectItem/>}/>
                  <Route path=":projectId/details/:type" element={<ProjectItemDetails/>}/>
                </Route>
              </Route>
              <Route path="add-project" element={<AddProject/>}/>
              <Route path="add-project/:projectId" element={<AddProject/>}/>
              <Route path="login" element={<Login/>}/>
              <Route path="register" element={<Register/>}/>
              <Route path="confirm-invitation" element={<ConfirmInvite/>}/>
              <Route path="components" element={<ComponentLayout/>}/>
            </Routes>
          </BrowserRouter>
        </NotificationProvider>
      </AuthProvider>
    </React.StrictMode>
);
