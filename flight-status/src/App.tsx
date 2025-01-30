import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FlightTable from './components/FlightTable.tsx';
import FlightDetails from './components/FlightDetails.tsx';
const App: React.FC = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<FlightTable />} />
      <Route path="/flight/:id" element={<FlightDetails />} /> {/* Define route for flight details */}
    </Routes>
  </Router>
  );
}

export default App;
