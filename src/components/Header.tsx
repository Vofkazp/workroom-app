import React, {useEffect, useRef, useState} from 'react';
import Svg from "./Svg";
import Modal from "./Modal";
import Button from "./Button";
import {useAuthentication} from "../services/AuthProvider";
import {useLocation, useNavigate} from "react-router-dom";

export default function Header() {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const {authData} = useAuthentication();
  const [modal, setModal] = useState(false);
  const [openSelect, setOpenSelect] = useState(false);
  const [path, setPath] = useState(location.pathname);

  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpenSelect(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const goToPage = (page: string) => {
    setOpenSelect(false);
    navigate(page);
  }

  return (
      <header className="main-header">
        <label className="search-block">
          <Svg path="search"/>
          <input type="search" className="search-input" placeholder="Search"/>
        </label>
        <div className="right-block">
          <Button click={() => setModal(true)} classList="icon-btn" path="notification"/>
          <div className={`header-select ${openSelect ? "open" : ""}`} ref={ref}>
            <div className="select-block" onClick={() => setOpenSelect(!openSelect)}>
              <img src={authData.user?.avatar || "./images/userTemplate.png"} alt="avatar" className="avatar-img"/>
              <span
                  className="select-text">{authData.user && authData.user.first_name && authData.user.last_name ? `${authData.user?.first_name} ${authData.user?.last_name}` : "No name"}</span>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                <path
                    d="M0.292893 0.292893C0.653377 -0.0675907 1.22061 -0.0953203 1.6129 0.209705L1.70711 0.292893L5.70711 4.29289C6.06759 4.65338 6.09532 5.22061 5.7903 5.6129L5.70711 5.70711L1.70711 9.70711C1.31658 10.0976 0.683418 10.0976 0.292893 9.70711C-0.0675907 9.34662 -0.0953203 8.77939 0.209705 8.3871L0.292893 8.29289L3.585 5L0.292893 1.70711C-0.0675907 1.34662 -0.0953203 0.779392 0.209705 0.387101L0.292893 0.292893Z"
                    fill="currentColor" fillRule="nonzero"
                    transform="matrix(6.12323e-17,1,-1,6.12323e-17,17,9)"/>
              </svg>
            </div>
            <div className="select-list">
              <div className="list-wrapper">
                <ul className="list-block">
                  <li className={`list-item ${path === "/current-projects" ? "selected" : ""}`}
                      onClick={() => goToPage("current-projects")}>Current Projects
                  </li>
                  <li className={`list-item ${path === "/backlog" ? "selected" : ""}`}
                      onClick={() => goToPage("backlog")}>Backlog
                  </li>
                  <li className={`list-item ${path === "/competed-projects" ? "selected" : ""}`}
                      onClick={() => goToPage("competed-projects")}>Completed Projects
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Modal isOpen={modal} title="Notifications" classList="filter-modal" onClose={() => setModal(false)}>
          <div>Notifications</div>
        </Modal>
      </header>
  );
}