import React from "react";
import {useNotifications} from "../services/NitificationProvider";

export default function Dashboard() {
  const {addNotification} = useNotifications();

  const add = () => {
    addNotification("Test message from page!", "warning");
  }

  return (
      <div>
          <div className="content-wrapper">
            <div className="breadcrumb-block">
              <p className="breadcrumb-title">Welcome back, Evan!</p>
            </div>
            <div className="title-block">
              <h1 className="content-title">Dashboard</h1>
              <div className="date-picker">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                  <path
                      d="M7 3C7 2.44772 7.44772 2 8 2C8.55228 2 9 2.44772 9 3L9 4L15 4L15 3C15 2.44772 15.4477 2 16 2C16.5523 2 17 2.44772 17 3L17 4C19.2091 4 21 5.79086 21 8L21 18C21 20.2091 19.2091 22 17 22L7 22C4.79086 22 3 20.2091 3 18L3 8C3 5.79086 4.79086 4 7 4L7 3ZM15 6C15 6.55228 15.4477 7 16 7C16.5523 7 17 6.55228 17 6L17.1493 6.00549C18.1841 6.08183 19 6.94564 19 8L19 9L5 9L5 8L5.00549 7.85074C5.08183 6.81588 5.94564 6 7 6C7 6.55228 7.44772 7 8 7C8.55228 7 9 6.55228 9 6L15 6ZM19 11L5 11L5 18C5 19.0544 5.81588 19.9182 6.85074 19.9945L7 20L17 20C18.0544 20 18.9182 19.1841 18.9945 18.1493L19 18L19 11Z"
                      fill="rgb(10,22,41)" fillRule="evenodd"/>
                </svg>
                <span className="date-text">Nov 16, 2020 - Dec 16, 2020</span>
              </div>
            </div>
            <button onClick={add}>add</button>
            {/*<div className="dashboard-grid">*/}
            {/*  <div className="card">*/}
            {/*    <div className="card-header">*/}
            {/*      <h5 className="card-title">Workload</h5>*/}
            {/*      <button className="btn view-all">*/}
            {/*        <span className="title">View all</span>*/}
            {/*        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">*/}
            {/*          <path*/}
            {/*              d="M9.29289 7.29289C9.65338 6.93241 10.2206 6.90468 10.6129 7.2097L10.7071 7.29289L14.7071 11.2929C15.0676 11.6534 15.0953 12.2206 14.7903 12.6129L14.7071 12.7071L10.7071 16.7071C10.3166 17.0976 9.68342 17.0976 9.29289 16.7071C8.93241 16.3466 8.90468 15.7794 9.2097 15.3871L9.29289 15.2929L12.585 12L9.29289 8.70711C8.93241 8.34662 8.90468 7.77939 9.2097 7.3871L9.29289 7.29289Z"*/}
            {/*              fill="currentColor" fill-rule="evenodd"/>*/}
            {/*        </svg>*/}
            {/*      </button>*/}
            {/*    </div>*/}
            {/*    <div className="card-body workload">*/}
            {/*      <div className="item">*/}
            {/*        <div className="item-avatar" style="--avatar:url('../images/avatar1.png'); --progress:75;">*/}
            {/*          <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="none">*/}
            {/*            <circle cx="30" cy="30" r="28" stroke="rgb(125,133,146)" stroke-opacity="0.2" stroke-width="2"/>*/}
            {/*            <circle className="progress" cx="30" cy="30" r="28" stroke="rgb(63,140,255)" stroke-width="2"*/}
            {/*                    stroke-linecap="round" fill="none" transform="rotate(-90 30 30)"/>*/}
            {/*          </svg>*/}
            {/*        </div>*/}
            {/*        <p className="item-name">Shawn Stone</p>*/}
            {/*        <p className="item-profession">UI/UX Designer</p>*/}
            {/*        <span className="item-level">Middle</span>*/}
            {/*      </div>*/}
            {/*      <div className="item">*/}
            {/*        <div className="item-avatar" style="--avatar:url('../images/avatar2.png'); --progress:70;">*/}
            {/*          <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="none">*/}
            {/*            <circle cx="30" cy="30" r="28" stroke="rgb(125,133,146)" stroke-opacity="0.2" stroke-width="2"/>*/}
            {/*            <circle className="progress" cx="30" cy="30" r="28" stroke="rgb(63,140,255)" stroke-width="2"*/}
            {/*                    stroke-linecap="round" fill="none" transform="rotate(-90 30 30)"/>*/}
            {/*          </svg>*/}
            {/*        </div>*/}
            {/*        <p className="item-name">Randy Delgado</p>*/}
            {/*        <p className="item-profession">UI/UX Designer</p>*/}
            {/*        <span className="item-level">Junior</span>*/}
            {/*      </div>*/}
            {/*      <div className="item">*/}
            {/*        <div className="item-avatar" style="--avatar:url('../images/avatar3.png'); --progress:60;">*/}
            {/*          <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="none">*/}
            {/*            <circle cx="30" cy="30" r="28" stroke="rgb(125,133,146)" stroke-opacity="0.2" stroke-width="2"/>*/}
            {/*            <circle className="progress" cx="30" cy="30" r="28" stroke="rgb(63,140,255)" stroke-width="2"*/}
            {/*                    stroke-linecap="round" fill="none" transform="rotate(-90 30 30)"/>*/}
            {/*          </svg>*/}
            {/*        </div>*/}
            {/*        <p className="item-name">Emily Tyler</p>*/}
            {/*        <p className="item-profession">Copywriter</p>*/}
            {/*        <span className="item-level">Middle</span>*/}
            {/*      </div>*/}
            {/*      <div className="item">*/}
            {/*        <div className="item-avatar" style="--avatar:url('../images/avatar4.png'); --progress:93;">*/}
            {/*          <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="none">*/}
            {/*            <circle cx="30" cy="30" r="28" stroke="rgb(125,133,146)" stroke-opacity="0.2" stroke-width="2"/>*/}
            {/*            <circle className="progress" cx="30" cy="30" r="28" stroke="rgb(63,140,255)" stroke-width="2"*/}
            {/*                    stroke-linecap="round" fill="none" transform="rotate(-90 30 30)"/>*/}
            {/*          </svg>*/}
            {/*        </div>*/}
            {/*        <p className="item-name">Louis Castro</p>*/}
            {/*        <p className="item-profession">Copywriter</p>*/}
            {/*        <span className="item-level">Senior</span>*/}
            {/*      </div>*/}
            {/*      <div className="item">*/}
            {/*        <div className="item-avatar" style="--avatar:url('../images/avatar5.png'); --progress:43;">*/}
            {/*          <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="none">*/}
            {/*            <circle cx="30" cy="30" r="28" stroke="rgb(125,133,146)" stroke-opacity="0.2" stroke-width="2"/>*/}
            {/*            <circle className="progress" cx="30" cy="30" r="28" stroke="rgb(63,140,255)" stroke-width="2"*/}
            {/*                    stroke-linecap="round" fill="none" transform="rotate(-90 30 30)"/>*/}
            {/*          </svg>*/}
            {/*        </div>*/}
            {/*        <p className="item-name">Blake Silva</p>*/}
            {/*        <p className="item-profession">IOS Developer</p>*/}
            {/*        <span className="item-level">Senior</span>*/}
            {/*      </div>*/}
            {/*      <div className="item">*/}
            {/*        <div className="item-avatar" style="--avatar:url('../images/avatar6.png'); --progress:69;">*/}
            {/*          <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="none">*/}
            {/*            <circle cx="30" cy="30" r="28" stroke="rgb(125,133,146)" stroke-opacity="0.2" stroke-width="2"/>*/}
            {/*            <circle className="progress" cx="30" cy="30" r="28" stroke="rgb(63,140,255)" stroke-width="2"*/}
            {/*                    stroke-linecap="round" fill="none" transform="rotate(-90 30 30)"/>*/}
            {/*          </svg>*/}
            {/*        </div>*/}
            {/*        <p className="item-name">Joel Phillips</p>*/}
            {/*        <p className="item-profession">UI/UX Designer</p>*/}
            {/*        <span className="item-level">Middle</span>*/}
            {/*      </div>*/}
            {/*      <div className="item">*/}
            {/*        <div className="item-avatar" style="--avatar:url('../images/avatar7.png'); --progress:59;">*/}
            {/*          <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="none">*/}
            {/*            <circle cx="30" cy="30" r="28" stroke="rgb(125,133,146)" stroke-opacity="0.2" stroke-width="2"/>*/}
            {/*            <circle className="progress" cx="30" cy="30" r="28" stroke="rgb(63,140,255)" stroke-width="2"*/}
            {/*                    stroke-linecap="round" fill="none" transform="rotate(-90 30 30)"/>*/}
            {/*          </svg>*/}
            {/*        </div>*/}
            {/*        <p className="item-name">Wayne Marsh</p>*/}
            {/*        <p className="item-profession">Copywriter</p>*/}
            {/*        <span className="item-level">Junior</span>*/}
            {/*      </div>*/}
            {/*      <div className="item">*/}
            {/*        <div className="item-avatar" style="--avatar:url('../images/avatar8.png'); --progress:82;">*/}
            {/*          <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="none">*/}
            {/*            <circle cx="30" cy="30" r="28" stroke="rgb(125,133,146)" stroke-opacity="0.2" stroke-width="2"/>*/}
            {/*            <circle class="progress" cx="30" cy="30" r="28" stroke="rgb(63,140,255)" stroke-width="2"*/}
            {/*                    stroke-linecap="round" fill="none" transform="rotate(-90 30 30)"/>*/}
            {/*          </svg>*/}
            {/*        </div>*/}
            {/*        <p class="item-name">Oscar Holloway</p>*/}
            {/*        <p class="item-profession">UI/UX Designer</p>*/}
            {/*        <span class="item-level">Middle</span>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*  <div className="card">*/}
            {/*    <div class="card-header">*/}
            {/*      <h5 class="card-title">Nearest Events</h5>*/}
            {/*      <button class="btn view-all">*/}
            {/*        <span class="title">View all</span>*/}
            {/*        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">*/}
            {/*          <path*/}
            {/*              d="M9.29289 7.29289C9.65338 6.93241 10.2206 6.90468 10.6129 7.2097L10.7071 7.29289L14.7071 11.2929C15.0676 11.6534 15.0953 12.2206 14.7903 12.6129L14.7071 12.7071L10.7071 16.7071C10.3166 17.0976 9.68342 17.0976 9.29289 16.7071C8.93241 16.3466 8.90468 15.7794 9.2097 15.3871L9.29289 15.2929L12.585 12L9.29289 8.70711C8.93241 8.34662 8.90468 7.77939 9.2097 7.3871L9.29289 7.29289Z"*/}
            {/*              fill="currentColor" fill-rule="evenodd"/>*/}
            {/*        </svg>*/}
            {/*      </button>*/}
            {/*    </div>*/}
            {/*    <div class="card-body nearest">*/}
            {/*      <ul class="nearest-list">*/}
            {/*        <li class="nearest-item indicator-up">*/}
            {/*          <div class="title-row">*/}
            {/*            <p class="title">Presentation of the new department</p>*/}
            {/*            <span class="icon-status up"></span>*/}
            {/*          </div>*/}
            {/*          <div class="date-row">*/}
            {/*            <p class="date">Today | 5:00 PM</p>*/}
            {/*            <p class="time">4h</p>*/}
            {/*          </div>*/}
            {/*        </li>*/}
            {/*        <li class="nearest-item indicator-down">*/}
            {/*          <div class="title-row">*/}
            {/*            <p class="title">Anna’s Birthday</p>*/}
            {/*            <span class="icon-status down"></span>*/}
            {/*          </div>*/}
            {/*          <div class="date-row">*/}
            {/*            <p class="date">Today | 6:00 PM</p>*/}
            {/*            <p class="time">4h</p>*/}
            {/*          </div>*/}
            {/*        </li>*/}
            {/*        <li class="nearest-item indicator-down">*/}
            {/*          <div class="title-row">*/}
            {/*            <p class="title">Ray’s Birthday</p>*/}
            {/*            <span class="icon-status down"></span>*/}
            {/*          </div>*/}
            {/*          <div class="date-row">*/}
            {/*            <p class="date">Tomorrow | 2:00 PM</p>*/}
            {/*            <p class="time">4h</p>*/}
            {/*          </div>*/}
            {/*        </li>*/}
            {/*      </ul>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*  <div class="projects">*/}
            {/*    <div class="project-header">*/}
            {/*      <h5 class="project-title">Projects</h5>*/}
            {/*      <button class="btn view-all">*/}
            {/*        <span class="title">View all</span>*/}
            {/*        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">*/}
            {/*          <path*/}
            {/*              d="M9.29289 7.29289C9.65338 6.93241 10.2206 6.90468 10.6129 7.2097L10.7071 7.29289L14.7071 11.2929C15.0676 11.6534 15.0953 12.2206 14.7903 12.6129L14.7071 12.7071L10.7071 16.7071C10.3166 17.0976 9.68342 17.0976 9.29289 16.7071C8.93241 16.3466 8.90468 15.7794 9.2097 15.3871L9.29289 15.2929L12.585 12L9.29289 8.70711C8.93241 8.34662 8.90468 7.77939 9.2097 7.3871L9.29289 7.29289Z"*/}
            {/*              fill="currentColor" fill-rule="evenodd"/>*/}
            {/*        </svg>*/}
            {/*      </button>*/}
            {/*    </div>*/}
            {/*    <ul class="projects-list">*/}
            {/*      <li class="project-item">*/}
            {/*        <div class="project-info">*/}
            {/*          <div class="info-row">*/}
            {/*            <img src="./images/Task1.png" alt="Task 1" class="task-img">*/}
            {/*              <div class="info-block">*/}
            {/*                <p class="task-number">PN0001265</p>*/}
            {/*                <p class="task-name">Medical App (iOS native)</p>*/}
            {/*              </div>*/}
            {/*          </div>*/}
            {/*          <div class="date-row">*/}
            {/*            <div class="task-date">*/}
            {/*              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24"*/}
            {/*                   fill="none">*/}
            {/*                <path*/}
            {/*                    d="M7 2C7 1.44772 7.44772 1 8 1C8.55228 1 9 1.44772 9 2L9 3L15 3L15 2C15 1.44772 15.4477 1 16 1C16.5523 1 17 1.44772 17 2L17 3C19.2091 3 21 4.79086 21 7L21 17C21 19.2091 19.2091 21 17 21L7 21C4.79086 21 3 19.2091 3 17L3 7C3 4.79086 4.79086 3 7 3L7 2ZM15 5C15 5.55228 15.4477 6 16 6C16.5523 6 17 5.55228 17 5L17.1493 5.00549C18.1841 5.08183 19 5.94564 19 7L19 8L5 8L5 7L5.00549 6.85074C5.08183 5.81588 5.94564 5 7 5C7 5.55228 7.44772 6 8 6C8.55228 6 9 5.55228 9 5L15 5Z"*/}
            {/*                    fill="rgb(125,133,146)" fill-rule="evenodd"/>*/}
            {/*              </svg>*/}
            {/*              <p class="date">Created Sep 12, 2020</p>*/}
            {/*            </div>*/}
            {/*            <div class="status">*/}
            {/*              <span class="icon-status up"></span>*/}
            {/*              <p class="status-title medium">Medium</p>*/}
            {/*            </div>*/}
            {/*          </div>*/}
            {/*        </div>*/}
            {/*        <div class="project-data">*/}
            {/*          <h5 class="data-title">Project Data</h5>*/}
            {/*          <div class="task-info">*/}
            {/*            <div class="info-item">*/}
            {/*              <p class="title">All tasks</p>*/}
            {/*              <p class="value">34</p>*/}
            {/*            </div>*/}
            {/*            <div class="info-item">*/}
            {/*              <p class="title">Active tasks</p>*/}
            {/*              <p class="value">13</p>*/}
            {/*            </div>*/}
            {/*            <div class="info-item">*/}
            {/*              <p class="title">Assignees</p>*/}
            {/*              <div class="users">*/}
            {/*                <img src="./images/avatar5.png" alt="avatar 5" class="user-item">*/}
            {/*                  <img src="./images/avatar.png" alt="avatar" class="user-item">*/}
            {/*                    <img src="./images/avatar8.png" alt="avatar 8" class="user-item">*/}
            {/*                      <span class="other-user">+2</span>*/}
            {/*              </div>*/}
            {/*            </div>*/}
            {/*          </div>*/}
            {/*        </div>*/}
            {/*      </li>*/}
            {/*      <li class="project-item">*/}
            {/*        <div class="project-info">*/}
            {/*          <div class="info-row">*/}
            {/*            <img src="./images/Task2.png" alt="Task 1" class="task-img">*/}
            {/*              <div class="info-block">*/}
            {/*                <p class="task-number">PN0001221</p>*/}
            {/*                <p class="task-name">Food Delivery Service</p>*/}
            {/*              </div>*/}
            {/*          </div>*/}
            {/*          <div class="date-row">*/}
            {/*            <div class="task-date">*/}
            {/*              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24"*/}
            {/*                   fill="none">*/}
            {/*                <path*/}
            {/*                    d="M7 2C7 1.44772 7.44772 1 8 1C8.55228 1 9 1.44772 9 2L9 3L15 3L15 2C15 1.44772 15.4477 1 16 1C16.5523 1 17 1.44772 17 2L17 3C19.2091 3 21 4.79086 21 7L21 17C21 19.2091 19.2091 21 17 21L7 21C4.79086 21 3 19.2091 3 17L3 7C3 4.79086 4.79086 3 7 3L7 2ZM15 5C15 5.55228 15.4477 6 16 6C16.5523 6 17 5.55228 17 5L17.1493 5.00549C18.1841 5.08183 19 5.94564 19 7L19 8L5 8L5 7L5.00549 6.85074C5.08183 5.81588 5.94564 5 7 5C7 5.55228 7.44772 6 8 6C8.55228 6 9 5.55228 9 5L15 5Z"*/}
            {/*                    fill="rgb(125,133,146)" fill-rule="evenodd"/>*/}
            {/*              </svg>*/}
            {/*              <p class="date">Created Sep 10, 2020</p>*/}
            {/*            </div>*/}
            {/*            <div class="status">*/}
            {/*              <span class="icon-status up"></span>*/}
            {/*              <p class="status-title medium">Medium</p>*/}
            {/*            </div>*/}
            {/*          </div>*/}
            {/*        </div>*/}
            {/*        <div class="project-data">*/}
            {/*          <h5 class="data-title">Project Data</h5>*/}
            {/*          <div class="task-info">*/}
            {/*            <div class="info-item">*/}
            {/*              <p class="title">All tasks</p>*/}
            {/*              <p class="value">50</p>*/}
            {/*            </div>*/}
            {/*            <div class="info-item">*/}
            {/*              <p class="title">Active tasks</p>*/}
            {/*              <p class="value">24</p>*/}
            {/*            </div>*/}
            {/*            <div class="info-item">*/}
            {/*              <p class="title">Assignees</p>*/}
            {/*              <div class="users">*/}
            {/*                <img src="./images/avatar5.png" alt="avatar 5" class="user-item">*/}
            {/*                  <img src="./images/avatar4.png" alt="avatar 4" class="user-item">*/}
            {/*                    <img src="./images/avatar2.png" alt="avatar 2" class="user-item">*/}
            {/*              </div>*/}
            {/*            </div>*/}
            {/*          </div>*/}
            {/*        </div>*/}
            {/*      </li>*/}
            {/*      <li class="project-item">*/}
            {/*        <div class="project-info">*/}
            {/*          <div class="info-row">*/}
            {/*            <img src="./images/Task3.png" alt="Task 1" class="task-img">*/}
            {/*              <div class="info-block">*/}
            {/*                <p class="task-number">PN0001290</p>*/}
            {/*                <p class="task-name">Food Delivery Service</p>*/}
            {/*              </div>*/}
            {/*          </div>*/}
            {/*          <div class="date-row">*/}
            {/*            <div class="task-date">*/}
            {/*              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24"*/}
            {/*                   fill="none">*/}
            {/*                <path*/}
            {/*                    d="M7 2C7 1.44772 7.44772 1 8 1C8.55228 1 9 1.44772 9 2L9 3L15 3L15 2C15 1.44772 15.4477 1 16 1C16.5523 1 17 1.44772 17 2L17 3C19.2091 3 21 4.79086 21 7L21 17C21 19.2091 19.2091 21 17 21L7 21C4.79086 21 3 19.2091 3 17L3 7C3 4.79086 4.79086 3 7 3L7 2ZM15 5C15 5.55228 15.4477 6 16 6C16.5523 6 17 5.55228 17 5L17.1493 5.00549C18.1841 5.08183 19 5.94564 19 7L19 8L5 8L5 7L5.00549 6.85074C5.08183 5.81588 5.94564 5 7 5C7 5.55228 7.44772 6 8 6C8.55228 6 9 5.55228 9 5L15 5Z"*/}
            {/*                    fill="rgb(125,133,146)" fill-rule="evenodd"/>*/}
            {/*              </svg>*/}
            {/*              <p class="date">Created May 28, 2020</p>*/}
            {/*            </div>*/}
            {/*            <div class="status">*/}
            {/*              <span class="icon-status down"></span>*/}
            {/*              <p class="status-title low">Low</p>*/}
            {/*            </div>*/}
            {/*          </div>*/}
            {/*        </div>*/}
            {/*        <div class="project-data">*/}
            {/*          <h5 class="data-title">Project Data</h5>*/}
            {/*          <div class="task-info">*/}
            {/*            <div class="info-item">*/}
            {/*              <p class="title">All tasks</p>*/}
            {/*              <p class="value">23</p>*/}
            {/*            </div>*/}
            {/*            <div class="info-item">*/}
            {/*              <p class="title">Active tasks</p>*/}
            {/*              <p class="value">20</p>*/}
            {/*            </div>*/}
            {/*            <div class="info-item">*/}
            {/*              <p class="title">Assignees</p>*/}
            {/*              <div class="users">*/}
            {/*                <img src="./images/avatar5.png" alt="avatar 5" class="user-item">*/}
            {/*                  <img src="./images/avatar.png" alt="avatar" class="user-item">*/}
            {/*                    <img src="./images/avatar8.png" alt="avatar 8" class="user-item">*/}
            {/*                      <span class="other-user">+5</span>*/}
            {/*              </div>*/}
            {/*            </div>*/}
            {/*          </div>*/}
            {/*        </div>*/}
            {/*      </li>*/}
            {/*    </ul>*/}
            {/*  </div>*/}
            {/*  <div class="card">*/}
            {/*    <div class="card-header">*/}
            {/*      <h5 class="card-title">Activity Stream</h5>*/}
            {/*    </div>*/}
            {/*    <div class="card-body activity">*/}
            {/*      <div class="user-activity-block">*/}
            {/*        <div class="user-item">*/}
            {/*          <img src="./images/avatar8.png" alt="avatar 8" class="user-activity-img">*/}
            {/*            <div class="user-activity-details">*/}
            {/*              <p class="user-activity-name">Oscar Holloway</p>*/}
            {/*              <p class="user-activity-profession">UI/UX Designer</p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <p class="activity-status update">Updated the status of Mind Map task to In Progress</p>*/}
            {/*        <p class="activity-status attach">Attached files to the task</p>*/}
            {/*      </div>*/}
            {/*      <div class="user-activity-block">*/}
            {/*        <div class="user-item">*/}
            {/*          <img src="./images/avatar3.png" alt="avatar 3" class="user-activity-img">*/}
            {/*            <div class="user-activity-details">*/}
            {/*              <p class="user-activity-name">Emily Tyler</p>*/}
            {/*              <p class="user-activity-profession">Copywriter</p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <p class="activity-status update">Updated the status of Mind Map task to In Progress</p>*/}
            {/*      </div>*/}
            {/*      <button class="btn view-all">*/}
            {/*        <span class="title">View more</span>*/}
            {/*        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">*/}
            {/*          <path*/}
            {/*              d="M16.7071 9.29289C17.0676 9.65338 17.0953 10.2206 16.7903 10.6129L16.7071 10.7071L12.7071 14.7071C12.3466 15.0676 11.7794 15.0953 11.3871 14.7903L11.2929 14.7071L7.29289 10.7071C6.90237 10.3166 6.90237 9.68342 7.29289 9.29289C7.65338 8.93241 8.22061 8.90468 8.6129 9.2097L8.70711 9.29289L12 12.585L15.2929 9.29289C15.6534 8.93241 16.2206 8.90468 16.6129 9.2097L16.7071 9.29289Z"*/}
            {/*              fill="currentColor" fill-rule="evenodd"/>*/}
            {/*        </svg>*/}
            {/*      </button>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>
      </div>
  );
}