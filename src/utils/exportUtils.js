import * as XLSX from 'xlsx';

// export const exportToExcel = (schedule) => {
//   const wb = XLSX.utils.book_new();

//   // Overview Sheet
//   const overviewData = [['Date', 'Class', 'Total Meetings', 'Present', 'Absent', 'Late']];
//   for (const date in schedule) {
//     for (const className in schedule[date].classes) {
//       const classData = schedule[date].classes[className];
//       overviewData.push([
//         date,
//         className,
//         classData.count,
//         classData.present,
//         classData.absent,
//         classData.late,
//       ]);
//     }
//   }
//   const overviewSheet = XLSX.utils.aoa_to_sheet(overviewData);
//   XLSX.utils.book_append_sheet(wb, overviewSheet, 'Overview');

//   // Date-wise Sheets
//   for (const date in schedule) {
//     const dateData = [['Student Name', 'Class Name', 'Age', 'Meeting Link', 'Attendance Status']];

//     schedule[date].meetings.forEach((meeting) => {
//       // Format hyperlink
//       const link = meeting.link?.startsWith("http")
//         ? {
//             f: `HYPERLINK("${meeting.link}", "${meeting.link}")`,
//           }
//         : '';

//       dateData.push([
//         meeting.student_name || '',
//         meeting.class_name || '',
//         String(meeting.age || ''), // ensure it's a string
//         link,
//         meeting.status || '',
//       ]);
//     });

//     const sheet = XLSX.utils.aoa_to_sheet(dateData);
//     XLSX.utils.book_append_sheet(wb, sheet, `Date - ${date}`);
//   }

//   // Export File
//   XLSX.writeFile(wb, 'MeetingSchedule.xlsx');
// };

export const exportToExcel = (schedule) => {
  for (const date in schedule) {
    const rows = schedule[date].meetings?.map((data) => ({
      student_name: data?.student_name,
      class_name: data?.class_name,
      age: data?.age,
      link: data?.link,
      status: data?.status,
    }));
  
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows || []);
  
    XLSX.utils.book_append_sheet(workbook, worksheet, "MeetingSchedule");
    XLSX.utils.sheet_add_aoa(worksheet, [
      ['Student Name', 'Class Name', 'Age', 'Meeting Link', 'Attendance Status']
    ]);
    XLSX.writeFile(workbook, "MeetingSchedule.xlsx", { compression: true });
  }
};