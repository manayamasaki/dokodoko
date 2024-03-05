// src/components/App.js
// import React from 'react';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import MainContent from './MainContent';
import './App.css';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';

function App() {
  return (
    <div className="App">
        <Router>
        <div className="App">
          <Routes>
          <Route path="/" element={<><Header /><MainContent /></>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;





