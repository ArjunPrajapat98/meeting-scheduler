// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React from 'react';
import { MeetingProvider } from './context/MeetingContext';
import Calendar from './components/Calendar';
import StudentFilter from './components/StudentFilter';
import ScheduleForm from './components/ScheduleForm';
import Overview from './components/Overview';
import './App.css';

function App() {
  return (
    <MeetingProvider>
      <div className="app-container">
        <header className="app-header">
          <h1>Meeting Scheduler</h1>
        </header>
        
        <main className="app-content">
          <div className="scheduling-section">
            <div className="left-panel">
              <StudentFilter />
              <Calendar />
              <ScheduleForm />
            </div>
            
            <div className="right-panel">
              <Overview />
            </div>
          </div>
        </main>
      </div>
    </MeetingProvider>
  );
}

export default App;