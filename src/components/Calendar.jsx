import React, { useState } from 'react';
import { useMeetingContext } from '../context/MeetingContext';
import {
  getDaysInMonth,
  getFirstDayOfMonth,
  isSameDay,
  formatDate,
  getMonthName
} from '../utils/dateUtils';
import DateCell from './DateCell';

const Calendar = () => {
  const { addDate, removeDate, selectedDates } = useMeetingContext();
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDateClick = (date) => {
    const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const dateStr = formatDate(normalizedDate);

    if (selectedDates.includes(dateStr)) {
      removeDate(dateStr);
    } else {
      addDate(normalizedDate);
    }
  };

  const calendarGrid = [];
  let dayCount = 1;

  for (let week = 0; week < 6; week++) {
    const weekCells = [];

    for (let day = 0; day < 7; day++) {
      if ((week === 0 && day < firstDayOfMonth) || dayCount > daysInMonth) {
        weekCells.push(<td key={`empty-${week}-${day}`} className="empty-cell"></td>);
      } else {
        const cellDate = new Date(year, month, dayCount);
        const dateStr = formatDate(cellDate);
        const isSelected = selectedDates.includes(dateStr);
        const isToday = isSameDay(cellDate, new Date());

        weekCells.push(
          <td key={`day-${dayCount}`} className="calendar-cell">
            <DateCell
              date={cellDate}
              isSelected={isSelected}
              isToday={isToday}
              onClick={() => handleDateClick(cellDate)}
            />
          </td>
        );

        dayCount++;
      }
    }

    calendarGrid.push(<tr key={`week-${week}`}>{weekCells}</tr>);
  }

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={prevMonth} className="nav-button">&lt;</button>
        <h2>{getMonthName(month)} {year}</h2>
        <button onClick={nextMonth} className="nav-button">&gt;</button>
      </div>

      <table className="calendar-grid">
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>{calendarGrid}</tbody>
      </table>

      <div className="selected-dates">
        <h3>Selected Dates:</h3>
        <div className="date-tags">
          {selectedDates.map((date) => (
            <span key={date} className="date-tag">
              {date}
              <button onClick={() => removeDate(date)} className="remove-date">&times;</button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
