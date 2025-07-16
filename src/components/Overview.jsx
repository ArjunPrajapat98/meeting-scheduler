import React from 'react';
import { useMeetingContext } from '../context/MeetingContext';
import MeetingDetails from './MeetingDetails';

const Overview = () => {
  const { scheduledMeetings } = useMeetingContext();
  
  if (Object.keys(scheduledMeetings)?.length === 0) {
    return (
      <div className="overview-container">
        <h3>Meeting Overview</h3>
        <p>No schedule generated yet. Please select dates and generate a schedule.</p>
      </div>
    );
  }
  
  // Calculate totals
  let totalMeetings = 0;
  let totalPresent = 0;
  let totalAbsent = 0;
  let totalLate = 0;
  
  for (const date in scheduledMeetings) {
    for (const className in scheduledMeetings[date].classes) {
      const classData = scheduledMeetings[date].classes[className];
      totalMeetings += classData.count;
      totalPresent += classData.present;
      totalAbsent += classData.absent;
      totalLate += classData.late;
    }
  }
  
  return (
    <div className="overview-container">
      <h3>Meeting Overview</h3>
      
      <div className="summary-cards">
        <div className="summary-card">
          <h4>Total Meetings</h4>
          <p className="total">{totalMeetings}</p>
        </div>
        
        <div className="summary-card">
          <h4>Present</h4>
          <p className="present">{totalPresent}</p>
        </div>
        
        <div className="summary-card">
          <h4>Absent</h4>
          <p className="absent">{totalAbsent}</p>
        </div>
        
        <div className="summary-card">
          <h4>Late</h4>
          <p className="late">{totalLate}</p>
        </div>
      </div>
      
      <div className="date-overviews">
        {Object.entries(scheduledMeetings).map(([date, dateData]) => (
          <div key={date} className="date-overview">
            <h4>{date}</h4>
            
            <div className="class-summary">
              <h5>Class Summary</h5>
              <table>
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Total</th>
                    <th>Present</th>
                    <th>Absent</th>
                    <th>Late</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(dateData.classes).map(([className, classData]) => (
                    <tr key={className}>
                      <td>{className}</td>
                      <td>{classData.count}</td>
                      <td>{classData.present}</td>
                      <td>{classData.absent}</td>
                      <td>{classData.late}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <MeetingDetails meetings={dateData.meetings} date={date} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;