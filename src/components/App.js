// src/components/App.js
/*
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import MainContent from './MainContent';
import LoginPage from './LoginPage'; 

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
        <Header />
        <MainContent/>
        </div>
        <div className ='Login'>
        <Routes>
        <Route path="/login" element={<LoginPage />} />
       </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
*/
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import MainContent from './MainContent';
import LoginPage from './LoginPage'; 

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Routes>
          <Route path="/" element={<><Header /><MainContent /></>} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;





