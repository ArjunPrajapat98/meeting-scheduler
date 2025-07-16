export const scheduleMeetings = (students, selectedDates) => {
  const sortedStudents = [...students].sort((a, b) => b.age - a.age);
  
  const schedule = {};
  selectedDates.forEach(date => {
    schedule[date] = {
      classes: {},
      meetings: []
    };
  });
  
  const classCounts = {};
  selectedDates.forEach(date => {
    classCounts[date] = {};
  });
  
  const getBestDateForClass = (className) => {
    let bestDate = selectedDates[0];
    let minCount = Infinity;
    
    selectedDates.forEach(date => {
      const count = classCounts[date][className] || 0;
      if (count < minCount) {
        minCount = count;
        bestDate = date;
      }
    });
    
    return bestDate;
  };
  console.log('data', sortedStudents)
  sortedStudents.forEach(student => {
    for (let i = 0; i < student.meetings; i++) {
      const bestDate = getBestDateForClass(student.class_name);
      
      const meeting = {
        id: `${student.student_name}-${i}-${Date.now()}`,
        student_name: student.student_name,
        class_name: student.class_name,
        age: student.age,
        instructor_name: student.instructor_name,
        date: bestDate,
        status: 'Pending',
        link: `https://meet.google.com/${student.student_name.replace(/\s+/g, '-')}-${i}`
      };
      
      schedule[bestDate].meetings.push(meeting);
      
      if (!classCounts[bestDate][student.class_name]) {
        classCounts[bestDate][student.class_name] = 0;
      }
      classCounts[bestDate][student.class_name]++;
      
      if (!schedule[bestDate].classes[student.class_name]) {
        schedule[bestDate].classes[student.class_name] = {
          count: 0,
          present: 0,
          absent: 0,
          late: 0
        };
      }
      schedule[bestDate].classes[student.class_name].count++;
    }
  });
  console.log('schedule data', schedule)
  return schedule;
};

export const updateAttendance = (schedule, meetingId, newStatus) => {
  const newSchedule = { ...schedule };

  for (const date in newSchedule) {
    const dateData = newSchedule[date];
    const meetings = [...dateData.meetings];
    const meetingIndex = meetings.findIndex(m => m.id === meetingId);

    if (meetingIndex !== -1) {
      const oldMeeting = meetings[meetingIndex];
      const prevStatus = oldMeeting.status || 'Pending';
      const className = oldMeeting.class_name;

      const updatedMeeting = {
        ...oldMeeting,
        status: newStatus,
      };

      meetings[meetingIndex] = updatedMeeting;

      const classStats = { ...dateData.classes[className] };

      console.log('classStats', classStats)
      
      if (prevStatus !== newStatus) {
        if (classStats[prevStatus.toLowerCase()] > 0) {
          classStats[prevStatus.toLowerCase()]--;
        }
        classStats[newStatus.toLowerCase()] = (classStats[newStatus.toLowerCase()] || 0) + 1;
      }

      newSchedule[date] = {
        ...dateData,
        meetings,
        classes: {
          ...dateData.classes,
          [className]: classStats,
        },
      };

      break;
    }
  }
  console.log('newSchedule', newSchedule)
  return newSchedule;
};