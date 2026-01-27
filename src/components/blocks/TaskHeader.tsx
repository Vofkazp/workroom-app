import React from "react";
import Button from "../Button";
import {TypePage} from "../../layouts/ProjectLayout";

export default function TaskHeader({type, checkType}: { type: TypePage, checkType: (type: TypePage) => void }) {

  return (
      <div className="tasks-header">
        <div className="tasks-header-title-block">
          <h4 className="tasks-header-title">Tasks</h4>
        </div>
        <div className="tasks-header-view">
          <Button path="taskListBtn" classList={`icon-btn${type === "list" ? " active" : ""}`}
                  click={() => checkType("list")}/>
          <Button path="taskBoardBtn" classList={`icon-btn${type === "board" ? " active" : ""}`}
                  click={() => checkType("board")}/>
          <Button path="taskTimelineBtn" classList={`icon-btn${type === "timeline" ? " active" : ""}`}
                  click={() => checkType("timeline")}/>
        </div>
        <div className="tasks-header-filter">
          <Button path="filterBtn" classList="icon-btn"/>
        </div>
      </div>
  );
}