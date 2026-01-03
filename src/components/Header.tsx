import React from 'react';
import Svg from "./Svg";

export default function Header() {
  return (
      <header className="main-header">
        <label className="search-block">
          <Svg path="search" />
          <input type="search" className="search-input" placeholder="Search"/>
        </label>
        <div className="right-block">
          <button className="notifications">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
              <path
                  d="M12 2C15.9511 2 19.169 5.13941 19.2961 9.06012L19.3 9.30112L19.3 13.8019C19.3 14.6917 19.9831 15.4218 20.8533 15.4962L21.1332 15.5094C22.2445 15.6286 22.2872 17.2401 21.2614 17.4741L21.1332 17.4954L21 17.5024L3 17.5024L2.86683 17.4954C1.71106 17.3714 1.71106 15.6334 2.86683 15.5094L3.14668 15.4962C3.96851 15.4259 4.62352 14.7708 4.69376 13.9486L4.7 13.8019L4.7 9.30112C4.7 5.26886 7.96828 2 12 2ZM13.557 19.103C14.3277 19.103 14.8087 19.9381 14.422 20.6047C13.9211 21.4684 12.9983 22 12 22C11.0017 22 10.0789 21.4684 9.57796 20.6047C9.21064 19.9714 9.62639 19.1861 10.3296 19.1092L10.443 19.103L13.557 19.103ZM6.70442 9.0826C6.81899 6.25617 9.14611 4 12 4C14.9271 4 17.3 6.37335 17.3 9.30112L17.3 13.8019L17.3051 13.9984L17.3276 14.2563C17.3797 14.6817 17.504 15.0848 17.6878 15.453L17.714 15.502L6.285 15.502L6.3122 15.453L6.41182 15.2362C6.59742 14.7951 6.7 14.3105 6.7 13.8019L6.7 9.30112L6.70442 9.0826Z"
                  fill="currentColor" fillRule="evenodd"/>
            </svg>
          </button>
          <div className="header-select" id="select1">
            <div className="select-block">
              <img src="./images/avatar.png" alt="avatar" className="avatar-img"/>
              <span className="select-text">Evan Yates</span>
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
                  <li className="list-item selected">Current Projects</li>
                  <li className="list-item">Backlog</li>
                  <li className="list-item">Completed Projects</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
  );
}