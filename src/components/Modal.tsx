import React from "react";
import Button from "./Button";

interface Props {
  isOpen: boolean;
  title: string;
  classList?: string;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({isOpen, title, classList = "", onClose, children}: Props) {
  return (
      <div className={`modal ${classList}${isOpen ? " modal-open" : ""}`}>
        <div className="modal-background" onClick={() => onClose()}></div>
        <div className="modal-content">
          <div className="modal-header">
            <Button click={() => onClose()} path="close" classList="icon"/>
            <h3 className="modal-title">{title}</h3>
            <div className="divider"></div>
          </div>
          {children}
        </div>
      </div>
  );
}