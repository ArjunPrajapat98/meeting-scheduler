import React from 'react';
import { useMeetingContext } from '../context/MeetingContext';

const StudentFilter = () => {
  const { filters, setFilters } = useMeetingContext();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  console.log('filters data', filters)
  
  return (
    <div className="filter-container">
      <h3> Filters </h3>
      <div className="filter-controls">
        <div className="filter-group">
          <label htmlFor="className">Class Name:</label>
          <input
            type="text"
            id="className"
            name="className"
            value={filters.className}
            onChange={handleChange}
            placeholder="Filter by class..."
          />
        </div>
        
        <div className="filter-group">
          <label htmlFor="studentName">Student Name:</label>
          <input
            type="text"
            id="studentName"
            name="studentName"
            value={filters.studentName}
            onChange={handleChange}
            placeholder="Filter by student..."
          />
        </div>
      </div>
    </div>
  );
};

export default StudentFilter;