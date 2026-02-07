import React from "react";
import {TaskType} from "../services/Task";
import TaskListItem from "../components/blocks/TaskListItem";
import {TaskListObject} from "./ProjectItem";

export default function TasksList({list}: { list: TaskListObject }) {

  return (
      <>
        <div className="tasks-list-block">
          <h4 className="tasks-list-title">Active Tasks</h4>
          <ul className="tasks-list active-task">
            {list.active.map((task: TaskType, index: number) => <TaskListItem task={task} key={index}/>)}
          </ul>
        </div>
        <div className="tasks-list-block">
          <h4 className="tasks-list-title">Backlog</h4>
          <ul className="tasks-list backlog-task">
            {list.backlog.map((task: TaskType, index: number) => <TaskListItem task={task} key={index}/>)}
          </ul>
        </div>
      </>
  );
}