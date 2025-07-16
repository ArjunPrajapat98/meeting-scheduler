import React from 'react';

const DateCell = ({ date, isSelected, isToday, onClick }) => {
  const day = date.getDate();
  
  return (
    <div 
      className={`date-cell ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <div className="date-number">{day}</div>
      {isToday && <div className="today-indicator">Today</div>}
      {isSelected && <div className="selected-indicator">✓</div>}
    </div>
  );
};

export default DateCell;