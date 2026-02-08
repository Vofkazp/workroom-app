import React, {useEffect, useState} from 'react';
import {statusList} from "../../resurses/SelectList";

type Selected = {
  id: number;
  name: string;
  class: string;
}

export default function StatusInfo({status}: {status: number}) {
  const [selected, setSelected] = useState<Selected>();

  useEffect(() => {
    const index = statusList.findIndex((item) => item.id === status);
    if (index > -1) setSelected(statusList[index]);
  }, [status]);

  return (
      <div className="task-item-status">
        <p className={`item-status ${selected?.class}`}>{selected?.name}</p>
      </div>
  )
}