import React, {JSX, useEffect, useRef, useState} from "react";
import {statusList} from "../../resurses/SelectList";

type Selected = {
  id: number;
  name: string;
  class: string;
}

export default function SelectStatus({status, setStatus}: { status: number, setStatus: (index: number) => void }): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Selected>();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const index = statusList.findIndex((item) => item.id === status);
    if (index > -1) setSelected(statusList[index]);
  }, [status]);

  const selectItem = (item: Selected) => {
    setStatus(item.id);
    setIsOpen(false);
  }

  return (
      <div className={`select-status-project${isOpen ? " open" : ""}`} ref={ref}>
        <div className={`status-block-view todo ${selected?.class}`} onClick={() => setIsOpen(prev => !prev)}>
          <p className="status-title">{selected?.name}</p>
          <svg viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg" width="10" height="6" fill="none">
            <path
                d="M9.70711 0.292893C10.0676 0.653377 10.0953 1.22061 9.7903 1.6129L9.70711 1.70711L5.70711 5.70711C5.34662 6.06759 4.77939 6.09532 4.3871 5.7903L4.29289 5.70711L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292893C0.653377 -0.0675907 1.22061 -0.0953203 1.6129 0.209705L1.70711 0.292893L5 3.585L8.29289 0.292893C8.65338 -0.0675907 9.22061 -0.0953203 9.6129 0.209705L9.70711 0.292893Z"
                fill="currentColor" fillRule="evenodd"/>
          </svg>
        </div>
        <ul className="select-status-list">
          {statusList.map(item =>
              <li key={item.id} className={`select-status-item${status === item.id ? ' active' : ''}`}
                  onClick={() => selectItem(item)}>
                <span className="status-name">{item.name}</span>
              </li>
          )}
        </ul>
      </div>
  );
}