// MainContent.js
import React from 'react';
import SearchBar from './SearchBar';
import MyList from './MyList';
import './MainContent.css';

function MainContent() {
  return (
    <div className="main">
      <div className="kensaku">
        <SearchBar />
      </div>
      <div className="kirikae">
        <h1>MyList</h1>
        <button>読んでる</button>
        <button>読みたい</button>
      </div>
      <div className="mylist">
        <MyList/>
      </div>
    </div>
  );
}

export default MainContent;
