import React from 'react';
import { useMeetingContext } from '../context/MeetingContext';
import {exportToExcel} from '../utils/exportUtils'

const ScheduleForm = () => {
  const { generateSchedule, scheduledMeetings, selectedDates } = useMeetingContext();
  
  const hasScheduledMeetings = Object.keys(scheduledMeetings)?.length > 0;
  
  return (
    <div className="schedule-form">
      <div className="form-actions">
        <button 
          onClick={generateSchedule} 
          className="btn btn-primary"
          disabled={selectedDates.length === 0}
        >
          Generate Schedule
        </button>
        
        {hasScheduledMeetings && (
          <button 
            onClick={() => exportToExcel(scheduledMeetings)} 
            className="btn btn-export"
          >
            Export to Excel
          </button>
        )}
      </div>
      
      {selectedDates?.length === 0 && (
        <p className="info-message">Please select at least one date to generate a schedule.</p>
      )}
    </div>
  );
};

export default ScheduleForm;