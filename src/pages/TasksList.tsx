import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import NoProject from "./fragments/NoProject";
import AddTask from "./fragments/AddTask";
import {useTask} from "../services/Task";

export default function TasksList() {
  const {id, type} = useParams();
  const {getTaskList} = useTask();
  const [taskList, setTaskList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadTasks(true);
    console.log("project/" + id + "/" + type);
  }, [id, type]);

  const loadTasks = async (status: boolean) => {
    setIsOpen(false);
    if (status) {
      getTaskList(Number(id)).then((res => {
        console.log(res);
      }));
      //SetTaskList(result);
    }
  }

  return (
      <>
        {isOpen && <AddTask openModal={isOpen} closeModal={loadTasks}/>}
        {taskList.length === 0 ?
            <NoProject type="task" openModal={() => setIsOpen(true)}/> :
            <>
              <div className="tasks-list-block">
                <h4 className="tasks-list-title">Active Tasks</h4>
                <ul className="tasks-list active-task">
                  <li className="task-item card">
                    <div className="task-item-element">
                      <p className="task-item-title">Task Name</p>
                      <p className="task-item-value">Research</p>
                    </div>
                    <div className="task-item-element">
                      <p className="task-item-title">Estimate</p>
                      <p className="task-item-value">2d 4h</p>
                    </div>
                    <div className="task-item-element">
                      <p className="task-item-title">Spent Time</p>
                      <p className="task-item-value">1d 2h</p>
                    </div>
                    <div className="task-item-element">
                      <p className="task-item-title">Assignee</p>
                      <div className="task-item-value">
                        <img src="/images/avatar5.png" alt="avatar 5" className="user-item"/>
                      </div>
                    </div>
                    <div className="task-item-element">
                      <p className="task-item-title">Priority</p>
                      <div className="task-item-value">
                        <div className="task-priority medium">Medium</div>
                      </div>
                    </div>
                    <div className="task-item-status">
                      <p className="item-status done">Done</p>
                    </div>
                    {/*<div className="progress-value" style="--progress: 75;">*/}
                    {/*  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">*/}
                    {/*    <circle cx="12" cy="12" r="10" stroke="rgb(125,133,146)" stroke-opacity="0.2" stroke-width="2"/>*/}
                    {/*    <circle className="progress" cx="12" cy="12" r="10" stroke="rgb(63,140,255)" stroke-width="2"*/}
                    {/*            stroke-linecap="round" fill="none" transform="rotate(-90 12 12)"/>*/}
                    {/*  </svg>*/}
                    {/*</div>*/}
                  </li>
                  <li className="task-item card">
                    <div className="task-item-element">
                      <p className="task-item-title">Task Name</p>
                      <p className="task-item-value">Mind Map</p>
                    </div>
                    <div className="task-item-element">
                      <p className="task-item-title">Estimate</p>
                      <p className="task-item-value">1d 2h</p>
                    </div>
                    <div className="task-item-element">
                      <p className="task-item-title">Spent Time</p>
                      <p className="task-item-value">4h 25m</p>
                    </div>
                    <div className="task-item-element">
                      <p className="task-item-title">Assignee</p>
                      <div className="task-item-value">
                        <img src="/images/avatar5.png" alt="avatar 5" className="user-item"/>
                      </div>
                    </div>
                    <div className="task-item-element">
                      <p className="task-item-title">Priority</p>
                      <div className="task-item-value">
                        <div className="task-priority medium">Medium</div>
                      </div>
                    </div>
                    <div className="task-item-status">
                      <p className="item-status progress">In Progress</p>
                    </div>
                    {/*<div className="progress-value" style="--progress: 15;">*/}
                    {/*  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">*/}
                    {/*    <circle cx="12" cy="12" r="10" stroke="rgb(125,133,146)" stroke-opacity="0.2" stroke-width="2"/>*/}
                    {/*    <circle className="progress" cx="12" cy="12" r="10" stroke="rgb(63,140,255)" stroke-width="2"*/}
                    {/*            stroke-linecap="round" fill="none" transform="rotate(-90 12 12)"/>*/}
                    {/*  </svg>*/}
                    {/*</div>*/}
                  </li>
                  <li className="task-item card">
                    <div className="task-item-element">
                      <p className="task-item-title">Task Name</p>
                      <p className="task-item-value">UX sketches</p>
                    </div>
                    <div className="task-item-element">
                      <p className="task-item-title">Estimate</p>
                      <p className="task-item-value">4d</p>
                    </div>
                    <div className="task-item-element">
                      <p className="task-item-title">Spent Time</p>
                      <p className="task-item-value">2d 2h 20m</p>
                    </div>
                    <div className="task-item-element">
                      <p className="task-item-title">Assignee</p>
                      <div className="task-item-value">
                        <img src="/images/avatar2.png" alt="avatar 2" className="user-item"/>
                      </div>
                    </div>
                    <div className="task-item-element">
                      <p className="task-item-title">Priority</p>
                      <div className="task-item-value">
                        <div className="task-priority low">Low</div>
                      </div>
                    </div>
                    <div className="task-item-status">
                      <p className="item-status progress">In Progress</p>
                    </div>
                    {/*<div className="progress-value" style="--progress: 15;">*/}
                    {/*  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">*/}
                    {/*    <circle cx="12" cy="12" r="10" stroke="rgb(125,133,146)" stroke-opacity="0.2" stroke-width="2"/>*/}
                    {/*    <circle className="progress" cx="12" cy="12" r="10" stroke="rgb(63,140,255)" stroke-width="2"*/}
                    {/*            stroke-linecap="round" fill="none" transform="rotate(-90 12 12)"/>*/}
                    {/*  </svg>*/}
                    {/*</div>*/}
                  </li>
                  <li className="task-item card">
                    <div className="task-item-element">
                      <p className="task-item-title">Task Name</p>
                      <p className="task-item-value">UI Login + Registration</p>
                    </div>
                    <div className="task-item-element">
                      <p className="task-item-title">Estimate</p>
                      <p className="task-item-value">2d</p>
                    </div>
                    <div className="task-item-element">
                      <p className="task-item-title">Spent Time</p>
                      <p className="task-item-value">3h 15m</p>
                    </div>
                    <div className="task-item-element">
                      <p className="task-item-title">Assignee</p>
                      <div className="task-item-value">
                        <img src="/images/avatar1.png" alt="avatar 1" className="user-item"/>
                      </div>
                    </div>
                    <div className="task-item-element">
                      <p className="task-item-title">Priority</p>
                      <div className="task-item-value">
                        <div className="task-priority low">Low</div>
                      </div>
                    </div>
                    <div className="task-item-status">
                      <p className="item-status todo">To Do</p>
                    </div>
                    {/*<div className="progress-value" style="--progress: 54;">*/}
                    {/*  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">*/}
                    {/*    <circle cx="12" cy="12" r="10" stroke="rgb(125,133,146)" stroke-opacity="0.2" stroke-width="2"/>*/}
                    {/*    <circle className="progress" cx="12" cy="12" r="10" stroke="rgb(63,140,255)" stroke-width="2"*/}
                    {/*            stroke-linecap="round" fill="none" transform="rotate(-90 12 12)"/>*/}
                    {/*  </svg>*/}
                    {/*</div>*/}
                  </li>
                  <li className="task-item card">
                    <div className="task-item-element">
                      <p className="task-item-title">Task Name</p>
                      <p className="task-item-value">UI Login + Registration</p>
                    </div>
                    <div className="task-item-element">
                      <p className="task-item-title">Estimate</p>
                      <p className="task-item-value">2d 4h</p>
                    </div>
                    <div className="task-item-element">
                      <p className="task-item-title">Spent Time</p>
                      <p className="task-item-value">1d 2h</p>
                    </div>
                    <div className="task-item-element">
                      <p className="task-item-title">Assignee</p>
                      <div className="task-item-value">
                        <img src="/images/avatar3.png" alt="avatar 3" className="user-item"/>
                      </div>
                    </div>
                    <div className="task-item-element">
                      <p className="task-item-title">Priority</p>
                      <div className="task-item-value">
                        <div className="task-priority medium">Medium</div>
                      </div>
                    </div>
                    <div className="task-item-status">
                      <p className="item-status review">In Review</p>
                    </div>
                    {/*<div className="progress-value" style="--progress: 78;">*/}
                    {/*  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">*/}
                    {/*    <circle cx="12" cy="12" r="10" stroke="rgb(125,133,146)" stroke-opacity="0.2" stroke-width="2"/>*/}
                    {/*    <circle className="progress" cx="12" cy="12" r="10" stroke="rgb(63,140,255)" stroke-width="2"*/}
                    {/*            stroke-linecap="round" fill="none" transform="rotate(-90 12 12)"/>*/}
                    {/*  </svg>*/}
                    {/*</div>*/}
                  </li>
                  <li className="task-item card">
                    <div className="task-item-element">
                      <p className="task-item-title">Task Name</p>
                      <p className="task-item-value">UI for other screens</p>
                    </div>
                    <div className="task-item-element">
                      <p className="task-item-title">Estimate</p>
                      <p className="task-item-value">2d 4h</p>
                    </div>
                    <div className="task-item-element">
                      <p className="task-item-title">Spent Time</p>
                      <p className="task-item-value">1d 2h</p>
                    </div>
                    <div className="task-item-element">
                      <p className="task-item-title">Assignee</p>
                      <div className="task-item-value">
                        <img src="/images/avatar6.png" alt="avatar 6" className="user-item"/>
                      </div>
                    </div>
                    <div className="task-item-element">
                      <p className="task-item-title">Priority</p>
                      <div className="task-item-value">
                        <div className="task-priority low">Low</div>
                      </div>
                    </div>
                    <div className="task-item-status">
                      <p className="item-status progress">In Progress</p>
                    </div>
                    {/*<div className="progress-value" style="--progress: 15;">*/}
                    {/*  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">*/}
                    {/*    <circle cx="12" cy="12" r="10" stroke="rgb(125,133,146)" stroke-opacity="0.2" stroke-width="2"/>*/}
                    {/*    <circle className="progress" cx="12" cy="12" r="10" stroke="rgb(63,140,255)" stroke-width="2"*/}
                    {/*            stroke-linecap="round" fill="none" transform="rotate(-90 12 12)"/>*/}
                    {/*  </svg>*/}
                    {/*</div>*/}
                  </li>
                </ul>
              </div>
              <div className="tasks-list-block">
                <h4 className="tasks-list-title">Backlog</h4>
                <ul className="tasks-list backlog-task">
                  <li className="task-item card">
                    <div className="task-item-element">
                      <p className="task-item-title">Task Name</p>
                      <p className="task-item-value">Animation for buttons</p>
                    </div>
                    <div className="task-item-element">
                      <p className="task-item-title">Estimate</p>
                      <p className="task-item-value">2d 4h</p>
                    </div>
                    <div className="task-item-element">
                      <p className="task-item-title">Spent Time</p>
                      <p className="task-item-value">1d 2h</p>
                    </div>
                    <div className="task-item-element">
                      <p className="task-item-title">Assignee</p>
                      <div className="task-item-value">
                        <img src="/images/avatar7.png" alt="avatar 7" className="user-item"/>
                      </div>
                    </div>
                    <div className="task-item-element">
                      <p className="task-item-title">Priority</p>
                      <div className="task-item-value">
                        <div className="task-priority medium">Medium</div>
                      </div>
                    </div>
                    {/*<div className="progress-value" style="--progress: 0;">*/}
                    {/*  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">*/}
                    {/*    <circle cx="12" cy="12" r="10" stroke="rgb(125,133,146)" stroke-opacity="0.2" stroke-width="2"/>*/}
                    {/*    <circle className="progress" cx="12" cy="12" r="10" stroke="rgb(63,140,255)" stroke-width="2"*/}
                    {/*            stroke-linecap="round" fill="none" transform="rotate(-90 12 12)"/>*/}
                    {/*  </svg>*/}
                    {/*</div>*/}
                  </li>
                  <li className="task-item card">
                    <div className="task-item-element">
                      <p className="task-item-title">Task Name</p>
                      <p className="task-item-value">Preloader</p>
                    </div>
                    <div className="task-item-element">
                      <p className="task-item-title">Estimate</p>
                      <p className="task-item-value">2d 4h</p>
                    </div>
                    <div className="task-item-element">
                      <p className="task-item-title">Spent Time</p>
                      <p className="task-item-value">1d 2h</p>
                    </div>
                    <div className="task-item-element">
                      <p className="task-item-title">Assignee</p>
                      <div className="task-item-value">
                        <img src="/images/avatar8.png" alt="avatar 8" className="user-item"/>
                      </div>
                    </div>
                    <div className="task-item-element">
                      <p className="task-item-title">Priority</p>
                      <div className="task-item-value">
                        <div className="task-priority low">Low</div>
                      </div>
                    </div>
                    {/*<div className="progress-value" style="--progress: 0;">*/}
                    {/*  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">*/}
                    {/*    <circle cx="12" cy="12" r="10" stroke="rgb(125,133,146)" stroke-opacity="0.2" stroke-width="2"/>*/}
                    {/*    <circle className="progress" cx="12" cy="12" r="10" stroke="rgb(63,140,255)" stroke-width="2"*/}
                    {/*            stroke-linecap="round" fill="none" transform="rotate(-90 12 12)"/>*/}
                    {/*  </svg>*/}
                    {/*</div>*/}
                  </li>
                </ul>
              </div>
            </>}
      </>
  );
}