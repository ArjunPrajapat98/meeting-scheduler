import React, { createContext, useState, useContext, useMemo } from 'react';
import dummyData from '../data/dummyData';
import { scheduleMeetings } from '../utils/scheduleUtils';

const MeetingContext = createContext();

export const MeetingProvider = ({ children }) => {

  const [students, setStudents] = useState(dummyData);
  const [selectedDates, setSelectedDates] = useState([]);
  const [scheduledMeetings, setScheduledMeetings] = useState({});
  const [filters, setFilters] = useState({ className: '', studentName: '' });

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesClassName = filters.className ?
        student.class_name.toLowerCase().includes(filters.className.toLowerCase()) : true;
      const matchesStudentName = filters.studentName ?
        student.student_name.toLowerCase().includes(filters.studentName.toLowerCase()) : true;
      return matchesClassName && matchesStudentName;
    });
  }, [students, filters]);

  const formatDateLocal = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const addDate = (date) => {
    const dateStr = formatDateLocal(date);
    if (!selectedDates.includes(dateStr)) {
      setSelectedDates([...selectedDates, dateStr]);
    }
  };

  const removeDate = (dateStr) => {
    setSelectedDates(selectedDates.filter(d => d !== dateStr));
  };

  const generateSchedule = () => {
    if (selectedDates.length === 0) {
      alert('Please select at least one date');
      return;
    }

    const schedule = scheduleMeetings(filteredStudents, selectedDates);
    setScheduledMeetings(schedule);
  };

  const value = {
    students,
    filteredStudents,
    selectedDates,
    scheduledMeetings,
    filters,
    addDate,
    removeDate,
    generateSchedule,
    setFilters,
    setScheduledMeetings
  };

  return (
    <MeetingContext.Provider value={value}>
      {children}
    </MeetingContext.Provider>
  );
};

export const useMeetingContext = () => useContext(MeetingContext);