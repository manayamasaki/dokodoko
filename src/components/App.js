// src/components/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import MainContent from './MainContent';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage'; 

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Routes>
          <Route path="/" element={<><Header /><MainContent /></>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;





