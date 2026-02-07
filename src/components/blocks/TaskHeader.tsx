import React from "react";
import Button from "../component/Button";
import {useNavigate, useParams} from "react-router-dom";

export default function TaskHeader({isDetails}: { isDetails: boolean }) {
  const {projectId, type} = useParams();
  const navigate = useNavigate();

  const goToPage = (type: string) => {
    navigate(`/projects/${projectId}/${isDetails ? 'details' : 'type'}/${type}`);
  }

  return (
      <div className="tasks-header">
        <div className="tasks-header-title-block">
          <h4 className="tasks-header-title">Tasks</h4>
        </div>
        <div className="tasks-header-view">
          <Button path="taskListBtn" classList={`icon-btn${type === "list" ? " active" : ""}`}
                  click={() => goToPage("list")}/>
          <Button path="taskBoardBtn" classList={`icon-btn${type === "board" ? " active" : ""}`}
                  click={() => goToPage("board")}/>
          <Button path="taskTimelineBtn" classList={`icon-btn${type === "timeline" ? " active" : ""}`}
                  click={() => goToPage("timeline")}/>
        </div>
        <div className="tasks-header-filter">
          <Button path="filterBtn" classList="icon-btn"/>
        </div>
      </div>
  );
}