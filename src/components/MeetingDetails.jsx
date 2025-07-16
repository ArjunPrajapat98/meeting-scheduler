import React from 'react';
import { useMeetingContext } from '../context/MeetingContext';
import { updateAttendance } from '../utils/scheduleUtils';

const MeetingDetails = ({ meetings, date }) => {
  const { setScheduledMeetings, scheduledMeetings } = useMeetingContext();
  
  const handleStatusChange = (meetingId, status) => {
    const updatedSchedule = updateAttendance(scheduledMeetings, meetingId, status);
    setScheduledMeetings(updatedSchedule);
  };

  console.log("meetings", meetings)
  
  return (
    <div className="meeting-details">
      <h5>Meeting Details</h5>
      
      {meetings.length === 0 ? (
        <p>No meetings scheduled for this date.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Class</th>
              <th>Age</th>
              <th>Link</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {meetings?.map(meeting => (
              <tr key={meeting.id}>
                <td>{meeting.student_name}</td>
                <td>{meeting.class_name}</td>
                <td>{meeting.age}</td>
                <td>
                  <a href={meeting.link} target="_blank" rel="noopener noreferrer">
                    Join Meeting
                  </a>
                </td>
                <td>
                  <select 
                    value={meeting.status} 
                    onChange={(e) => handleStatusChange(meeting.id, e.target.value)}
                    className={`status-select ${meeting.status.toLowerCase()}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Late">Late</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MeetingDetails;