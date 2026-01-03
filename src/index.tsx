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
import NotificationContainer from "./components/NotificationContainer";
import AuthProvider from "./services/AuthProvider";

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
              </Route>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/components" element={<ComponentLayout/>}/>
            </Routes>
          </BrowserRouter>
        </NotificationProvider>
      </AuthProvider>
    </React.StrictMode>
);
