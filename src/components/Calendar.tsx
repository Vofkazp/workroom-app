import React, {useState, forwardRef} from "react";
import Button from "./Button";

type CalendarDay = {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
};

type CalendarWeek = CalendarDay[];

interface CalendarProps {
  value: Date;
  classList?: string;
  onChange: (date: Date) => void;
}

const Calendar = forwardRef<HTMLDivElement, CalendarProps>(({value, classList, onChange}, ref) => {
  const WEEK_DAYS = 7;
  const [selectedDate, setSelectedDate] = useState(value || new Date());
  const [currentDate, setCurrentDate] = useState(value || new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const selectDate = (day: number, isCurrent: boolean) => {
    if (isCurrent) {
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
      <div className={`modal-calendar${classList ? " " + classList : ""}`} ref={ref}>
        <div className="modal-calendar-header">
          <button className="btn arrow-btn" onClick={() => setCurrentDate(new Date(year - 1, month))}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
              <path d="M18 7L16 7L11 12L16 17L18 17L13 12L18 7Z" fill="currentColor"
                    fillRule="evenodd"/>
              <path d="M13 7L11 7L6 12L11 17L13 17L8 12L13 7Z" fill="currentColor"
                    fillRule="evenodd"/>
            </svg>
          </button>
          <Button click={() => setCurrentDate(new Date(year, month - 1))} path="arrowLeft" classList="arrow-btn"/>
          <p className="date-title">{currentDate.toLocaleString("uk", {month: "long", year: "numeric"})}</p>
          <Button click={() => setCurrentDate(new Date(year, month + 1))} path="arrowRight" classList="arrow-btn"/>
          <button className="btn arrow-btn" onClick={() => setCurrentDate(new Date(year + 1, month))}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                 width="24" height="24" fill="none">
              <path d="M6 17L8 17L13 12L8 7L6 7L11 12L6 17Z" fill="currentColor" fillRule="evenodd"/>
              <path d="M11 17L13 17L18 12L13 7L11 7L16 12L11 17Z" fill="currentColor" fillRule="evenodd"/>
            </svg>
          </button>
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
});

export default Calendar;