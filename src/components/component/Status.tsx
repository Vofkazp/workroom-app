import React from 'react';
import {priorityList} from "../../resurses/SelectList";

export default function Status({priority}: {priority: number}) {

  const getPriorityName = (value: number): string => {
    const name = priorityList.find(elem => elem.value === value)?.label;
    return name || "";
  }

  return (
      <div className={`priority-component ${getPriorityName(priority).toLowerCase()}`}>{getPriorityName(priority)}</div>
  );
}