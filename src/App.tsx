import React from 'react';
import './App.css';
import Display from './components/DisplayWindow';
import ResetButton from './components/reset';

function App() {
  return (
    <div className="App">
      <div className = "Headline"> UQ Degree Planner</div>
      <div className = "Display"> <Display /> </div>
      <div className = "ResetButton"> <ResetButton /> </div>
    </div>
  );
}

export default App;
