import React from "react";

export default function TasksList() {
  return (
      <div className="tasks">
        <div className="tasks-header">
          <div className="tasks-header-title-block">
            <h4 className="tasks-header-title">Tasks</h4>
          </div>
          <div className="tasks-header-view">
            <button className="btn icon-btn active">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                <path
                    d="M21 5C21.5523 5 22 5.44772 22 6C22 6.51284 21.614 6.93551 21.1166 6.99327L21 7L3 7C2.44772 7 2 6.55228 2 6C2 5.48716 2.38604 5.06449 2.88338 5.00673L3 5L21 5ZM21 11C21.5523 11 22 11.4477 22 12C22 12.5128 21.614 12.9355 21.1166 12.9933L21 13L3 13C2.44772 13 2 12.5523 2 12C2 11.4872 2.38604 11.0645 2.88338 11.0067L3 11L21 11ZM22 18C22 17.4477 21.5523 17 21 17L3 17L2.88338 17.0067C2.38604 17.0645 2 17.4872 2 18C2 18.5523 2.44772 19 3 19L21 19L21.1166 18.9933C21.614 18.9355 22 18.5128 22 18Z"
                    fill="currentColor" fillRule="evenodd"/>
              </svg>
            </button>
            <button className="btn icon-btn">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                <path
                    d="M21 2C21.5523 2 22 2.44772 22 3C22 3.51284 21.614 3.93551 21.1166 3.99327L21 4L3 4C2.44772 4 2 3.55228 2 3C2 2.48716 2.38604 2.06449 2.88338 2.00673L3 2L21 2ZM20 7.76923L20 14.2308C20 15.7602 18.6569 17 17 17L16 17C14.3431 17 13 15.7602 13 14.2308L13 7.76923C13 6.23983 14.3431 5 16 5L17 5C18.6569 5 20 6.23983 20 7.76923ZM18 14.1111L18 7.88889C18 7.39797 17.5523 7 17 7L16 7C15.4477 7 15 7.39797 15 7.88889L15 14.1111C15 14.602 15.4477 15 16 15L17 15C17.5523 15 18 14.602 18 14.1111ZM8 5L7 5C5.34315 5 4 6.42709 4 8.1875L4 18.8125C4 20.5729 5.34315 22 7 22L8 22C9.65685 22 11 20.5729 11 18.8125L11 8.1875C11 6.42709 9.65685 5 8 5ZM7 7L8 7C8.55228 7 9 7.48502 9 8.08333L9 18.9167C9 19.515 8.55228 20 8 20L7 20C6.44772 20 6 19.515 6 18.9167L6 8.08333C6 7.48502 6.44772 7 7 7Z"
                    fill="currentColor" fillRule="evenodd"/>
              </svg>
            </button>
            <button className="btn icon-btn">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                <path
                    d="M12 2C12.5128 2 12.9355 2.38604 12.9933 2.88338L13 3L13 4L15 4C16.6569 4 18 5.34315 18 7L18 8C18 9.65685 16.6569 11 15 11L13 11L13 13L19 13C20.6569 13 22 14.3431 22 16L22 17C22 18.6569 20.6569 20 19 20L13 20L13 21C13 21.5523 12.5523 22 12 22C11.4872 22 11.0645 21.614 11.0067 21.1166L11 21L11 20L10 20C8.34315 20 7 18.6569 7 17L7 16C7 14.3431 8.34315 13 10 13L11 13L11 11L5 11C3.34315 11 2 9.65685 2 8L2 7C2 5.34315 3.34315 4 5 4L11 4L11 3C11 2.44772 11.4477 2 12 2ZM12 18L19 18C19.5523 18 20 17.5523 20 17L20 16C20 15.4477 19.5523 15 19 15L10 15C9.44772 15 9 15.4477 9 16L9 17C9 17.5523 9.44772 18 10 18L12 18ZM15 9L12 9L5 9C4.44772 9 4 8.55228 4 8L4 7C4 6.44772 4.44772 6 5 6L12 6L15 6C15.5523 6 16 6.44772 16 7L16 8C16 8.55228 15.5523 9 15 9Z"
                    fill="currentColor" fillRule="evenodd"/>
              </svg>
            </button>
          </div>
          <div className="tasks-header-filter">
            <button className="btn icon-btn">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                <path
                    d="M6 2L17.0926 2C17.8274 2 18.5366 2.26964 19.0857 2.75777C20.3241 3.85853 20.4356 5.75474 19.3349 6.99309L14.5463 12.379L14.5463 18.7639C14.5463 19.0598 14.4912 19.3523 14.3845 19.6269L14.2948 19.8292C13.7065 21.0058 12.2757 21.4827 11.0991 20.8944L10.2047 20.4472C9.18832 19.939 8.54631 18.9002 8.54631 17.7639L8.54631 12.381L3.75777 6.99309C3.31845 6.49885 3.05611 5.87498 3.00804 5.21952L3 5C3 3.34315 4.34315 2 6 2ZM17.0926 4L6 4C5.44772 4 5 4.44772 5 5C5 5.24491 5.08988 5.48131 5.25259 5.66436L10.2937 11.3356C10.4564 11.5187 10.5463 11.7551 10.5463 12L10.5463 17.7639C10.5463 18.1427 10.7603 18.489 11.0991 18.6584L11.9935 19.1056C12.1822 19.1999 12.4116 19.1234 12.506 18.9348C12.5325 18.8817 12.5463 18.8232 12.5463 18.7639L12.5463 12C12.5463 11.7551 12.6362 11.5187 12.7989 11.3356L17.84 5.66436C18.207 5.25158 18.1698 4.61951 17.757 4.25259C17.5739 4.08988 17.3375 4 17.0926 4Z"
                    fill="currentColor" fillRule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>
        {/*<div className="tasks-list-block">*/}
        {/*  <h4 className="tasks-list-title">Active Tasks</h4>*/}
        {/*  <ul className="tasks-list active-task">*/}
        {/*    <li className="task-item card">*/}
        {/*      <div className="task-item-element">*/}
        {/*        <p className="task-item-title">Task Name</p>*/}
        {/*        <p className="task-item-value">Research</p>*/}
        {/*      </div>*/}
        {/*      <div className="task-item-element">*/}
        {/*        <p className="task-item-title">Estimate</p>*/}
        {/*        <p className="task-item-value">2d 4h</p>*/}
        {/*      </div>*/}
        {/*      <div className="task-item-element">*/}
        {/*        <p className="task-item-title">Spent Time</p>*/}
        {/*        <p className="task-item-value">1d 2h</p>*/}
        {/*      </div>*/}
        {/*      <div className="task-item-element">*/}
        {/*        <p className="task-item-title">Assignee</p>*/}
        {/*        <div className="task-item-value">*/}
        {/*          <img src="./images/avatar5.png" alt="avatar 5" className="user-item"/>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className="task-item-element">*/}
        {/*        <p className="task-item-title">Priority</p>*/}
        {/*        <div className="task-item-value">*/}
        {/*          <div className="task-priority medium">Medium</div>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className="task-item-status">*/}
        {/*        <p className="item-status done">Done</p>*/}
        {/*      </div>*/}
        {/*      <div className="progress-value" style="--progress: 75;">*/}
        {/*        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">*/}
        {/*          <circle cx="12" cy="12" r="10" stroke="rgb(125,133,146)" stroke-opacity="0.2" stroke-width="2"/>*/}
        {/*          <circle className="progress" cx="12" cy="12" r="10" stroke="rgb(63,140,255)" stroke-width="2"*/}
        {/*                  stroke-linecap="round" fill="none" transform="rotate(-90 12 12)"/>*/}
        {/*        </svg>*/}
        {/*      </div>*/}
        {/*    </li>*/}
        {/*    <li className="task-item card">*/}
        {/*      <div className="task-item-element">*/}
        {/*        <p className="task-item-title">Task Name</p>*/}
        {/*        <p className="task-item-value">Mind Map</p>*/}
        {/*      </div>*/}
        {/*      <div className="task-item-element">*/}
        {/*        <p className="task-item-title">Estimate</p>*/}
        {/*        <p className="task-item-value">1d 2h</p>*/}
        {/*      </div>*/}
        {/*      <div className="task-item-element">*/}
        {/*        <p className="task-item-title">Spent Time</p>*/}
        {/*        <p className="task-item-value">4h 25m</p>*/}
        {/*      </div>*/}
        {/*      <div className="task-item-element">*/}
        {/*        <p className="task-item-title">Assignee</p>*/}
        {/*        <div className="task-item-value">*/}
        {/*          <img src="./images/avatar5.png" alt="avatar 5" className="user-item"/>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className="task-item-element">*/}
        {/*        <p className="task-item-title">Priority</p>*/}
        {/*        <div className="task-item-value">*/}
        {/*          <div className="task-priority medium">Medium</div>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className="task-item-status">*/}
        {/*        <p className="item-status progress">In Progress</p>*/}
        {/*      </div>*/}
        {/*      <div className="progress-value" style="--progress: 15;">*/}
        {/*        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">*/}
        {/*          <circle cx="12" cy="12" r="10" stroke="rgb(125,133,146)" stroke-opacity="0.2" stroke-width="2"/>*/}
        {/*          <circle className="progress" cx="12" cy="12" r="10" stroke="rgb(63,140,255)" stroke-width="2"*/}
        {/*                  stroke-linecap="round" fill="none" transform="rotate(-90 12 12)"/>*/}
        {/*        </svg>*/}
        {/*      </div>*/}
        {/*    </li>*/}
        {/*    <li className="task-item card">*/}
        {/*      <div className="task-item-element">*/}
        {/*        <p className="task-item-title">Task Name</p>*/}
        {/*        <p className="task-item-value">UX sketches</p>*/}
        {/*      </div>*/}
        {/*      <div className="task-item-element">*/}
        {/*        <p className="task-item-title">Estimate</p>*/}
        {/*        <p className="task-item-value">4d</p>*/}
        {/*      </div>*/}
        {/*      <div className="task-item-element">*/}
        {/*        <p className="task-item-title">Spent Time</p>*/}
        {/*        <p className="task-item-value">2d 2h 20m</p>*/}
        {/*      </div>*/}
        {/*      <div className="task-item-element">*/}
        {/*        <p className="task-item-title">Assignee</p>*/}
        {/*        <div className="task-item-value">*/}
        {/*          <img src="./images/avatar2.png" alt="avatar 2" className="user-item"/>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className="task-item-element">*/}
        {/*        <p className="task-item-title">Priority</p>*/}
        {/*        <div className="task-item-value">*/}
        {/*          <div className="task-priority low">Low</div>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className="task-item-status">*/}
        {/*        <p className="item-status progress">In Progress</p>*/}
        {/*      </div>*/}
        {/*      <div className="progress-value" style="--progress: 15;">*/}
        {/*        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">*/}
        {/*          <circle cx="12" cy="12" r="10" stroke="rgb(125,133,146)" stroke-opacity="0.2" stroke-width="2"/>*/}
        {/*          <circle className="progress" cx="12" cy="12" r="10" stroke="rgb(63,140,255)" stroke-width="2"*/}
        {/*                  stroke-linecap="round" fill="none" transform="rotate(-90 12 12)"/>*/}
        {/*        </svg>*/}
        {/*      </div>*/}
        {/*    </li>*/}
        {/*    <li className="task-item card">*/}
        {/*      <div className="task-item-element">*/}
        {/*        <p className="task-item-title">Task Name</p>*/}
        {/*        <p className="task-item-value">UI Login + Registration</p>*/}
        {/*      </div>*/}
        {/*      <div className="task-item-element">*/}
        {/*        <p className="task-item-title">Estimate</p>*/}
        {/*        <p className="task-item-value">2d</p>*/}
        {/*      </div>*/}
        {/*      <div className="task-item-element">*/}
        {/*        <p className="task-item-title">Spent Time</p>*/}
        {/*        <p className="task-item-value">3h 15m</p>*/}
        {/*      </div>*/}
        {/*      <div className="task-item-element">*/}
        {/*        <p className="task-item-title">Assignee</p>*/}
        {/*        <div className="task-item-value">*/}
        {/*          <img src="./images/avatar1.png" alt="avatar 1" className="user-item"/>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className="task-item-element">*/}
        {/*        <p className="task-item-title">Priority</p>*/}
        {/*        <div className="task-item-value">*/}
        {/*          <div className="task-priority low">Low</div>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className="task-item-status">*/}
        {/*        <p className="item-status todo">To Do</p>*/}
        {/*      </div>*/}
        {/*      <div className="progress-value" style="--progress: 54;">*/}
        {/*        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">*/}
        {/*          <circle cx="12" cy="12" r="10" stroke="rgb(125,133,146)" stroke-opacity="0.2" stroke-width="2"/>*/}
        {/*          <circle className="progress" cx="12" cy="12" r="10" stroke="rgb(63,140,255)" stroke-width="2"*/}
        {/*                  stroke-linecap="round" fill="none" transform="rotate(-90 12 12)"/>*/}
        {/*        </svg>*/}
        {/*      </div>*/}
        {/*    </li>*/}
        {/*    <li className="task-item card">*/}
        {/*      <div className="task-item-element">*/}
        {/*        <p className="task-item-title">Task Name</p>*/}
        {/*        <p className="task-item-value">UI Login + Registration</p>*/}
        {/*      </div>*/}
        {/*      <div className="task-item-element">*/}
        {/*        <p className="task-item-title">Estimate</p>*/}
        {/*        <p className="task-item-value">2d 4h</p>*/}
        {/*      </div>*/}
        {/*      <div className="task-item-element">*/}
        {/*        <p className="task-item-title">Spent Time</p>*/}
        {/*        <p className="task-item-value">1d 2h</p>*/}
        {/*      </div>*/}
        {/*      <div className="task-item-element">*/}
        {/*        <p className="task-item-title">Assignee</p>*/}
        {/*        <div className="task-item-value">*/}
        {/*          <img src="./images/avatar3.png" alt="avatar 3" className="user-item"/>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className="task-item-element">*/}
        {/*        <p className="task-item-title">Priority</p>*/}
        {/*        <div className="task-item-value">*/}
        {/*          <div className="task-priority medium">Medium</div>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className="task-item-status">*/}
        {/*        <p className="item-status review">In Review</p>*/}
        {/*      </div>*/}
        {/*      <div className="progress-value" style="--progress: 78;">*/}
        {/*        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">*/}
        {/*          <circle cx="12" cy="12" r="10" stroke="rgb(125,133,146)" stroke-opacity="0.2" stroke-width="2"/>*/}
        {/*          <circle className="progress" cx="12" cy="12" r="10" stroke="rgb(63,140,255)" stroke-width="2"*/}
        {/*                  stroke-linecap="round" fill="none" transform="rotate(-90 12 12)"/>*/}
        {/*        </svg>*/}
        {/*      </div>*/}
        {/*    </li>*/}
        {/*    <li className="task-item card">*/}
        {/*      <div className="task-item-element">*/}
        {/*        <p className="task-item-title">Task Name</p>*/}
        {/*        <p className="task-item-value">UI for other screens</p>*/}
        {/*      </div>*/}
        {/*      <div className="task-item-element">*/}
        {/*        <p className="task-item-title">Estimate</p>*/}
        {/*        <p className="task-item-value">2d 4h</p>*/}
        {/*      </div>*/}
        {/*      <div className="task-item-element">*/}
        {/*        <p className="task-item-title">Spent Time</p>*/}
        {/*        <p className="task-item-value">1d 2h</p>*/}
        {/*      </div>*/}
        {/*      <div className="task-item-element">*/}
        {/*        <p className="task-item-title">Assignee</p>*/}
        {/*        <div className="task-item-value">*/}
        {/*          <img src="./images/avatar6.png" alt="avatar 6" className="user-item"/>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className="task-item-element">*/}
        {/*        <p className="task-item-title">Priority</p>*/}
        {/*        <div className="task-item-value">*/}
        {/*          <div className="task-priority low">Low</div>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className="task-item-status">*/}
        {/*        <p className="item-status progress">In Progress</p>*/}
        {/*      </div>*/}
        {/*      <div className="progress-value" style="--progress: 15;">*/}
        {/*        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">*/}
        {/*          <circle cx="12" cy="12" r="10" stroke="rgb(125,133,146)" stroke-opacity="0.2" stroke-width="2"/>*/}
        {/*          <circle className="progress" cx="12" cy="12" r="10" stroke="rgb(63,140,255)" stroke-width="2"*/}
        {/*                  stroke-linecap="round" fill="none" transform="rotate(-90 12 12)"/>*/}
        {/*        </svg>*/}
        {/*      </div>*/}
        {/*    </li>*/}
        {/*  </ul>*/}
        {/*</div>*/}
        {/*<div className="tasks-list-block">*/}
        {/*  <h4 className="tasks-list-title">Backlog</h4>*/}
        {/*  <ul className="tasks-list backlog-task">*/}
        {/*    <li className="task-item card">*/}
        {/*      <div className="task-item-element">*/}
        {/*        <p className="task-item-title">Task Name</p>*/}
        {/*        <p className="task-item-value">Animation for buttons</p>*/}
        {/*      </div>*/}
        {/*      <div className="task-item-element">*/}
        {/*        <p className="task-item-title">Estimate</p>*/}
        {/*        <p className="task-item-value">2d 4h</p>*/}
        {/*      </div>*/}
        {/*      <div className="task-item-element">*/}
        {/*        <p className="task-item-title">Spent Time</p>*/}
        {/*        <p className="task-item-value">1d 2h</p>*/}
        {/*      </div>*/}
        {/*      <div className="task-item-element">*/}
        {/*        <p className="task-item-title">Assignee</p>*/}
        {/*        <div className="task-item-value">*/}
        {/*          <img src="./images/avatar7.png" alt="avatar 7" className="user-item"/>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className="task-item-element">*/}
        {/*        <p className="task-item-title">Priority</p>*/}
        {/*        <div className="task-item-value">*/}
        {/*          <div className="task-priority medium">Medium</div>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className="progress-value" style="--progress: 0;">*/}
        {/*        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">*/}
        {/*          <circle cx="12" cy="12" r="10" stroke="rgb(125,133,146)" stroke-opacity="0.2" stroke-width="2"/>*/}
        {/*          <circle className="progress" cx="12" cy="12" r="10" stroke="rgb(63,140,255)" stroke-width="2"*/}
        {/*                  stroke-linecap="round" fill="none" transform="rotate(-90 12 12)"/>*/}
        {/*        </svg>*/}
        {/*      </div>*/}
        {/*    </li>*/}
        {/*    <li className="task-item card">*/}
        {/*      <div className="task-item-element">*/}
        {/*        <p className="task-item-title">Task Name</p>*/}
        {/*        <p className="task-item-value">Preloader</p>*/}
        {/*      </div>*/}
        {/*      <div className="task-item-element">*/}
        {/*        <p className="task-item-title">Estimate</p>*/}
        {/*        <p className="task-item-value">2d 4h</p>*/}
        {/*      </div>*/}
        {/*      <div className="task-item-element">*/}
        {/*        <p className="task-item-title">Spent Time</p>*/}
        {/*        <p className="task-item-value">1d 2h</p>*/}
        {/*      </div>*/}
        {/*      <div className="task-item-element">*/}
        {/*        <p className="task-item-title">Assignee</p>*/}
        {/*        <div className="task-item-value">*/}
        {/*          <img src="./images/avatar8.png" alt="avatar 8" className="user-item"/>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className="task-item-element">*/}
        {/*        <p className="task-item-title">Priority</p>*/}
        {/*        <div className="task-item-value">*/}
        {/*          <div className="task-priority low">Low</div>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className="progress-value" style="--progress: 0;">*/}
        {/*        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">*/}
        {/*          <circle cx="12" cy="12" r="10" stroke="rgb(125,133,146)" stroke-opacity="0.2" stroke-width="2"/>*/}
        {/*          <circle className="progress" cx="12" cy="12" r="10" stroke="rgb(63,140,255)" stroke-width="2"*/}
        {/*                  stroke-linecap="round" fill="none" transform="rotate(-90 12 12)"/>*/}
        {/*        </svg>*/}
        {/*      </div>*/}
        {/*    </li>*/}
        {/*  </ul>*/}
        {/*</div>*/}
      </div>
  );
}