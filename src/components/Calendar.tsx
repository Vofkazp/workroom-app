import React, {useEffect, useRef, useState} from "react";
import Button from "./Button";

type CalendarDay = {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
};

type CalendarWeek = CalendarDay[];

export default function Calendar({value, onChange, setOpen}: {value: Date | null, onChange: (date: Date) => void, setOpen: (open: boolean) => void}) {
  const WEEK_DAYS = 7;
  const ref = useRef<HTMLDivElement>(null);
  const [selectedDate, setSelectedDate] = useState(value || new Date());
  const [currentDate, setCurrentDate] = useState(value || new Date());

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const selectDate = (day: number, isCurrent: boolean) => {
    if(isCurrent) {
      const selected = new Date(year, month, day);
      onChange(selected);
      setCurrentDate(selected);
      setSelectedDate(selected);
    } else {
      const newMonth = day > 15 ? month - 1 : month + 1;
      setCurrentDate(new Date(year, newMonth));
    }
  };

  function getCalendarMatrix(year: number, month: number): CalendarWeek[] {
    const result: CalendarDay[] = [];
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const startWeekDay = firstDayOfMonth.getDay() || 7;
    for (let i = startWeekDay - 1; i > 0; i--) {
      const date = new Date(year, month, 1 - i);
      result.push(buildDay(date, false));
    }
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const date = new Date(year, month, day);
      result.push(buildDay(date, true));
    }
    while (result.length % WEEK_DAYS !== 0) {
      const date = new Date(year, month, lastDayOfMonth.getDate() + (result.length % 7));
      result.push(buildDay(date, false));
    }
    const weeks: CalendarWeek[] = [];
    for (let i = 0; i < result.length; i += WEEK_DAYS) {
      weeks.push(result.slice(i, i + WEEK_DAYS));
    }
    return weeks;
  }

  function buildDay(date: Date, isCurrentMonth: boolean): CalendarDay {
    const today = new Date();
    return {
      date,
      day: date.getDate(),
      isCurrentMonth,
      isToday:
          date.getFullYear() === today.getFullYear() &&
          date.getMonth() === today.getMonth() &&
          date.getDate() === today.getDate(),
      isSelected: date.getTime() === selectedDate.getTime()
    };
  }

  const weeks: CalendarWeek[] = getCalendarMatrix(year, month);

  return (
      <div className="modal-calendar" ref={ref}>
        <div className="modal-calendar-header">
          <Button click={() => setCurrentDate(new Date(year, month - 1))} path="arrowLeft" classList="arrow-btn"/>
          <p className="date-title">{currentDate.toLocaleString("uk", {month: "long", year: "numeric"})}</p>
          <Button click={() => setCurrentDate(new Date(year, month + 1))} path="arrowRight" classList="arrow-btn"/>
        </div>
        <div className="modal-calendar-body">
          <table className="calendar-table">
            <thead>
            <tr>
              <th><span className="day-name">Mon</span></th>
              <th><span className="day-name">Tue</span></th>
              <th><span className="day-name">Wed</span></th>
              <th><span className="day-name">Thu</span></th>
              <th><span className="day-name">Fri</span></th>
              <th><span className="day-name">Sat</span></th>
              <th><span className="day-name">Sun</span></th>
            </tr>
            </thead>
            <tbody>
            {weeks.map((week, i) =>
                <tr key={i}>
                  {week.map((day, index) =>
                      <td key={index}>
                        <span
                            className={`day-number${day.isCurrentMonth ? "" : " not-this-month"}${day.isToday ? " current-day" : ""}${day.isSelected ? " active" : ""}`}
                            onClick={() => selectDate(day.day, day.isCurrentMonth)}
                        >{day.day}</span>
                      </td>
                  )}
                </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
  );
}